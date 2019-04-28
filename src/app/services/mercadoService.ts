import { Injectable } from '@angular/core';
import { Utils } from '../../assets/helpers/utils';
import { Mercado } from '../models/mercado';

declare var amf: any;

@Injectable()
export class MercadoService {
  private service='MercadoService'
  listar(index: number, numIni: number, numFim: number, params: Array<String>) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Listar', [index, numIni, numFim, params]);
  }

  salvar(mercadomodel: Mercado) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'SaveOrUpdate', [mercadomodel]);
  }

  remover(id: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Excluir', [id]);
  }

  localizar(id: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );
    return amfClient.invoke(this.service, 'Locate', [id]);
  }

  locateByCNPJ(cnpj: string) {
    const amfClient = new amf.Client(
      this.service,
       Utils.urlService
    );

    return amfClient.invoke(this.service, 'locateByCnpj', [cnpj]);
  }
  

}
