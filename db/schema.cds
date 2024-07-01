namespace cap.boletim.project;

type Bimestre      : Integer enum {
    PrimeiroBimestre = 1;
    SegundoBimestre  = 2;
    TerceioBimestre  = 3;
    QuartoBimestre   = 4;
}

type Disciplina    : String enum {
    Português;
    Matemática;
    Filosofia;
    História;
    Geografica;
    Química;
    Física;
    Sociologia;
    Inglês;
}

type TipoAvaliacao : String enum {
    Prova;
    Teste;
    Trabalho;
    Seminário;
    Outro;
}

using {cuid} from '@sap/cds/common';

entity Alunos : cuid {
    nome       : String                          @description: 'Nome do aluno';
    dataNasc   : Date                            @description: 'Data de nascimento';
    avaliacoes : Composition of many Avaliacoes
                     on avaliacoes.aluno = $self @description: 'Avaliações';

}

entity Avaliacoes : cuid {
    bimestre : Bimestre              @description: 'Bimestre'            @assert.range: true;
    nome     : Disciplina            @description: 'Nome da disciplina'  @assert.range: true;
    tipo     : TipoAvaliacao         @description: 'Tipo da avaliação'   @assert.range: true;
    peso     : Integer               @description: 'Peso da avaliação'   @assert.range: [
        0,
        3
    ];
    nota     : Decimal(4, 2)         @description: 'Nota'                @assert.range: [
        0,
        10
    ];
    aluno    : Association to Alunos @assert.target;

}
