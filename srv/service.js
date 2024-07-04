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
        let kye = {};

        if (req._params[0]) {
            kye = req._params[0];
        }

        const { aluno_ID: KyeAlunoId, bimestre: KyeBimestre, disciplina: KyeDisciplina } = kye;

        if (KyeAlunoId) {
            alunoResponse = await SELECT.from(db.entities.Alunos).where({ "ID": KyeAlunoId });
        } else {
            alunoResponse = await SELECT.from(db.entities.Alunos);
        }

        const avaliacoes = await SELECT.from(db.entities.Avaliacoes);

        alunoResponse.forEach(aluno => {

            const avaliacoesDoAluno = model.getAvaliacoesDoAluno(aluno.ID, avaliacoes);
            const bimestresDasAvaliacoes = model.getBimestresDasAvaliacoes(avaliacoesDoAluno, KyeBimestre);

            bimestresDasAvaliacoes.forEach(bimestre => {

                const avaliacoesDoBimestre = model.getAvaliacoesDoBimestre(bimestre, avaliacoesDoAluno);
                const disciplinasDoBimestre = model.getDisciplinasDoBimestre(avaliacoesDoBimestre, KyeDisciplina);

                disciplinasDoBimestre.forEach(disciplina => {

                    const avaliacoesDaDisciplina = model.getAvaliacoesDaDisciplina(disciplina, avaliacoesDoBimestre);
                    boletim.push(model.getBoletimDaDisciplina(avaliacoesDaDisciplina));

                })
            });
        });

        return boletim;

    });
};

