import { Endereco } from "./endereco";

export class Mercado {
  _explicitType:'br.com.sgsistemas.cotacao.cotacaoweb.beans.Mercado';
  id: number;
  contato: string;
  clienteSgs: number;
  cnpjClienteSG: string;
  filial: string;
  trabalhaTresCasasDecimais: string;
  nome: string;
  dataCadastro: string;
  foneComercial: string;
  email: string;
  situacao: string;
  endereco: Endereco;
}
