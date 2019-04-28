import { Cadastrao } from "./cadastrao";

export class Usuario {
   _explicitType: string = 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Usuario';
   id: number;
   cadastrao: Cadastrao;
   login: string;
   senha: string;
   nome: string;
   email: string;
   tipo: string;
   situacao: string;
   permissoes: any[];
   agrupaCotacao: string;
   chave: string;
   dtExpiraChave: Date;
}
