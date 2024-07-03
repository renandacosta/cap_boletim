namespace cap.boletim.project;

using {cuid} from '@sap/cds/common';
using {cap.boletim.types as type} from '../db/types';

entity Alunos : cuid {
    nome       : String                          @description: 'Nome do aluno';
    dataNasc   : Date                            @description: 'Data de nascimento';
    avaliacoes : Composition of many Avaliacoes
                     on avaliacoes.aluno = $self @description: 'Avaliações';


}

entity Avaliacoes : cuid {
    bimestre   : type.Bimestre         @description: 'Bimestre'            @assert.range: true;
    disciplina : type.Disciplina       @description: 'Nome da disciplina'  @assert.range: true;
    tipo       : type.TipoAvaliacao    @description: 'Tipo da avaliação'   @assert.range: true;
    peso       : Integer               @description: 'Peso da avaliação'   @assert.range: [
        0,
        3
    ];
    nota       : Decimal(4, 2)         @description: 'Nota'                @assert.range: [
        0,
        10
    ];
    aluno      : Association to Alunos @assert.target;

}

@cds.persistence.skip
entity Boletins {
    key aluno_ID   : UUID;
        bimestre   : type.Bimestre;
        disciplina : type.Disciplina;
        media      : Decimal(4, 2);

}
