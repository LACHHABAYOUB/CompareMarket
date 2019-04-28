import { Usuario } from "./usuario";
import { Cadastrao } from "./cadastrao";

export class Filial extends Cadastrao {
  _explicitType: 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Filial';
  codFilial: Number;
  // cnpj: String;
  // contato: String;
  usuario: Usuario;
}
