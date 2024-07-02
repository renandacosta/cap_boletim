const cds = require('@sap/cds')
const model = require('../model/model');

module.exports = async (srv) => {

    const db = await cds.connect.to('db');

    srv.before('CREATE', 'Boletins', (req) => {
        return req.error(400, `O método ${req.method} não é valido.`);
    });

    srv.on('READ', 'Boletins', async (req) => {

        let alunoResponse = [];
        let boletim = [];

        if (req._params[0].aluno_ID) {
            alunoResponse = await SELECT.from(db.entities.Alunos).where({ "ID": req._params[0].aluno_ID });
        } else {
            alunoResponse = await SELECT.from(db.entities.Alunos);
        };

        alunoResponse.forEach(async aluno => {

            const avaliacoesDoAluno = await SELECT.from(db.entities.Avaliacoes).where({ "aluno_ID": aluno.ID });
            const bimestresDasAvaliacoes = model.getBimestresDasAvaliacoes(avaliacoesDoAluno);

            bimestresDasAvaliacoes.forEach(bimestre => {

                const avaliacoesDoBimestre = model.getAvaliacoesDoBimestre(bimestre, avaliacoesDoAluno);
                const disciplinasDoBimestre = model.getDisciplinasDoBimestre(avaliacoesDoBimestre);

                disciplinasDoBimestre.forEach(disciplina => {

                    const avaliacoesDaDisciplina = model.getAvaliacoesDaDisciplina(disciplina, avaliacoesDoBimestre);
                    boletim.pop(model.getBoletimDaDisciplina(avaliacoesDaDisciplina));

                });
            });
        });
        return boletim;
    });
};

