namespace cap.boletim.types;

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
