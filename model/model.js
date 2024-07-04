function getAvaliacoesDoAluno(aluno_ID, avaliacoes) {
    let result = avaliacoes.filter(avaliacao => (avaliacao.aluno_ID == aluno_ID));
    return result;
};
function getBimestresDasAvaliacoes(avaliacoes, filter) {

    const bimestres = [];

    avaliacoes.forEach(avaliacao => {

        const existe = bimestres.indexOf(avaliacao.bimestre) >= 0;

        if (!existe && (!filter || (!!filter && filter == avaliacao.bimestre))) {
            bimestres.push(avaliacao.bimestre);
        }
    });

    return bimestres;
};

function getAvaliacoesDoBimestre(bimestre, avaliacoes) {
    let result = avaliacoes.filter(avaliacao => (avaliacao.bimestre == bimestre));
    return result;
};

function getDisciplinasDoBimestre(avaliacoes,filter) {

    const disciplinas = [];

    avaliacoes.forEach(avaliacao => {

        const existe = disciplinas.indexOf(avaliacao.disciplina) >= 0;

        if (!existe && (!filter || (!!filter && filter == avaliacao.disciplina))) {
            disciplinas.push(avaliacao.disciplina);
        }
    });

    return disciplinas;
};


function getAvaliacoesDaDisciplina(disciplina, avaliacoes) {
    return avaliacoes.filter(avaliacao => (avaliacao.disciplina == disciplina));
};

function getMediaPondareda(avaliacoes) {

    const pesoTotal = avaliacoes.reduce((peso, avaliacao) => {
        return (peso + avaliacao.peso)
    }, 0);

    const notaTotal = avaliacoes.reduce((nota, avaliacao) => {
        return (nota + (avaliacao.nota * avaliacao.peso))
    }, 0);

    return pesoTotal == 0 ? 0 : notaTotal / pesoTotal;
};

function getBoletimDaDisciplina(avaliacoes) {

    return {
        "aluno_ID": avaliacoes[0].aluno_ID,
        "bimestre": avaliacoes[0].bimestre,
        "disciplina": avaliacoes[0].disciplina,
        "media": getMediaPondareda(avaliacoes),
    };
};

module.exports = {
    getAvaliacoesDoAluno,
    getBimestresDasAvaliacoes,
    getAvaliacoesDoBimestre,
    getDisciplinasDoBimestre,
    getAvaliacoesDaDisciplina,
    getBoletimDaDisciplina
};
