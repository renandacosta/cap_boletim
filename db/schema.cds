namespace cap.boletim.project;

type Bimestre       : String enum { B1; B2; B3; B4; }
type Disciplina     : String enum { Português; Matemática; Filosofia; História; Geografica; Química; Física; Sociologia; Inglês; }
type TipoAvaliacao  : String enum { Prova; Teste; Trabalho; Seminário; Outro; }

using { cuid } from '@sap/cds/common';

entity Alunos : cuid {
    nome       : String        @description: 'Nome do aluno';
    dataNasc   : Date          @description: 'Data de nascimento';
    avaliacoes : Composition of many Avaliacoes on avaliacoes.aluno = $self @description: 'Avaliações';

}

entity Avaliacoes : cuid {
    bimestre    : Bimestre      @description: 'Bimestre';
    nome        : Disciplina    @description: 'Nome da disciplina';
    tipo        : TipoAvaliacao @description: 'Tipo da avaliação';
    peso        : Integer       @description: 'Peso da avaliação';
    nota        : Decimal(4,2)  @description: 'Nota';
    aluno       : Association to Alunos;

}

