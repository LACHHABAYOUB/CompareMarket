import { Cadastrao } from '../models/cadastrao';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';
import { Mercado } from '../models/mercado';
import { Utils } from '../../assets/helpers/utils';

declare var amf: any;

@Injectable()
export class FornecedorService {
  private service = 'FornecedorService';
  listar(index: number, numIni: number, numFim: number, params: Array<String>) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke('FornecadoService', 'Listar', [index, numIni, numFim, params]);
  }

  salvar(_mercadomodel: Mercado, _fornecador: Fornecedor) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'SaveOrUpdate', [_mercadomodel, _fornecador]);
  }

  remover(mercadoId: number, id: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'ExcluiMercForn', [mercadoId, id]);
  }

  localizar(index: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );
    return amfClient.invoke(this.service, 'Locate', [index]);
  }

  localizarPorCNPJ(cnpj: string) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke('FornecadoService', 'locateByCnpj', [cnpj]);
  }

  //it's cadastro because they are sending cadastrao in the Flex code 
  findMercadoFornecedor(mercado: Cadastrao, cadastrao: Cadastrao) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke('FornecadoService', 'consultaMercForn', [mercado, cadastrao]);
  }
}
