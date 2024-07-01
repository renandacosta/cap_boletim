const cds = require('@sap/cds')

module.exports = async (srv) => {

    const db = await cds.connect.to('db');

    srv.before('CREATE', 'Boletins', (req) => {
        return req.error(400, `O método ${req.method} não é valido.`);
    });

    srv.on('READ', 'Boletins', async (req) => {

        let AlunoResponse = [];
        let result = [];

        if (req._params[0].aluno_ID) {
            AlunoResponse = await SELECT.from(db.entities.Alunos).where({ "ID": req._params[0].aluno_ID });
        } else {
            AlunoResponse = await SELECT.from(db.entities.Alunos);
        }

        console.log(AlunoResponse)

        AlunoResponse.forEach(async Aluno => {

            const AvaliacoesTodas = await SELECT.from(db.entities.Avaliacoes);

            //console.log(AvaliacoesTodas);

            AvaliacoesTodas.forEach(AvaliacaoTodas => {

                // console.log(AvaliacaoTodas);
                let hasBimestre = result.find(AvaliacaoBimestre => AvaliacaoBimestre.bimestre === AvaliacaoTodas.bimestre);

                console.log(hasBimestre);

                if (!hasBimestre) {

                    //console.log(result)

                    const AvaliacoesBimestre = AvaliacoesTodas.filter(AvaliacaoBimestre => AvaliacaoBimestre.bimestre === AvaliacaoTodas.bimestre)

                    AvaliacoesBimestre.forEach(AvaliacaoBimestre => {

                        // console.log(AvaliacaoBimestre);

                        if (!result.find(AvaliacaoDisciplina => AvaliacaoBimestre.disciplina === AvaliacaoDisciplina.disciplina
                            && AvaliacaoBimestre.bimestre === AvaliacaoDisciplina.bimestre)) {

                            const Avaliacoes = AvaliacoesBimestre.filter(Avaliacao => AvaliacaoBimestre.disciplina === Avaliacao.disciplina
                                && AvaliacaoBimestre.bimestre === Avaliacao.bimestre)

                            // console.log(Avaliacoes);

                            let pesoTotal = 0;
                            let notaTotal = 0;

                            Avaliacoes.forEach(Avaliacao => {

                                // console.log(Avaliacao);

                                pesoTotal = + Avaliacao.peso;
                                notaTotal = +  (Avaliacao.nota * Avaliacao.peso);
                            })


                            result.push({
                                aluno_ID: Aluno.ID,
                                Bimestre: AvaliacaoBimestre.bimestre,
                                Disciplina: AvaliacaoBimestre.disciplina,
                                media: notaTotal / pesoTotal
                            })

                        }
                    })
                }

            });


        });

       // console.log(result)
        return result;
    });

};

