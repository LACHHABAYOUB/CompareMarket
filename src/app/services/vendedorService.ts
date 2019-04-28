import { Injectable } from '@angular/core';
import { Utils } from '../../assets/helpers/utils';
import { Mercado } from '../models/mercado';
import { Vendor } from '../models/vendedor';

declare var amf: any;

@Injectable()
export class VendedorService {
  private service = 'VendedorService';
  listar(index: number, numIni: number, numFim: number, params: Array<String>) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Listar', [index, numIni, numFim, params]);
  }
  salvar(vendedor: Vendor, mercado: Mercado) {
    // console.log(`mercadoModel`, mercado);

    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'SaveOrUpdate', [vendedor, mercado]);
  }

  remover(id: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Excluir', [id]);
  }


  localizar(index: number) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );
    return amfClient.invoke(this.service, 'Locate', [index]);
  }

  locateByCNPJ(cnpj: string) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'locateByCnpj', [cnpj]);
  }

}
