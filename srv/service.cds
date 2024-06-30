using {cap.boletim.project as db} from '../db/schema';

service Main @(path: '/main') {

    entity Alunos     as projection on db.Alunos;
    entity Avaliacoes as projection on db.Avaliacoes;

}
