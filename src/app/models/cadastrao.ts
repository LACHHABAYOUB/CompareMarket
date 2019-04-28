import { Endereco } from "./endereco";

export class Cadastrao {
    id: number;
    nome: String;
    dataCadastro: String;
    foneComercial: String;
    email: String;
    situacao: String;
    endereco: Endereco;
    cnpj: string;
    contato: string;
    fantasia: string;
    decimais: String;

    constructor(){
    }
}