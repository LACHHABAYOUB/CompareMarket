import { Fornecedor } from "./fornecedor";
import { Cadastrao } from "./cadastrao";

export class Vendor extends Cadastrao {
    _explicitType: 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Vendedor';
    foneResidencial: String;
    foneCelular: String;
    cpf: String;
    fornecedor: Fornecedor;
}
