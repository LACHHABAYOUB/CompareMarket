import { Cadastrao } from './cadastrao';
import { Endereco } from './endereco';

export class Fornecedor extends Cadastrao {
    _explicitType: 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Fornecedor';
    codFilial: number;

    /*constructor(
        id: number,
        nome: string,
        dataCadastro: string,
        foneComercial: string,
        email: string,
        situacao: string,
        endereco: Endereco,
        cnpj: string,
        contato: string,
        fantasia: string,
        codFilial: number) {
        super(id, nome, dataCadastro, foneComercial, email, situacao, endereco, cnpj, contato, fantasia);
        this.codFilial = codFilial;
        }*/

    constructor(){
        super();
    }


}
