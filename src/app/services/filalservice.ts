import { Injectable } from '@angular/core';
import { Filial } from '../models/filial';
import { Utils } from '../../assets/helpers/utils';
import { Mercado } from '../models/mercado';

declare var amf: any;

@Injectable()
export class FilialService {
  private service = 'FilialService';

  listar(index: number, numIni: number, numFim: number, params: Array<String>) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Listar', [index, numIni, numFim, params]);
  }

  salvar(filial: Filial, mercado: Mercado) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'SaveOrUpdate', [filial, mercado]);
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