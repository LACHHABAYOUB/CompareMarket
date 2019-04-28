import { LoginService } from '../../services/loginService';
import { CEP } from './../../models/cep';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BrMaskerIonic3, BrMaskModel } from 'brmasker-ionic-3';
import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { Cadastrao } from '../../models/cadastrao';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Endereco } from '../../models/endereco';
import { Mercado } from '../../models/mercado';
import { Utils } from '../../../assets/helpers/utils';
import { CEPService } from '../../services/cepService';
import { MercadoService } from '../../services/mercadoService';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: [
    './mercado.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [BrMaskerIonic3],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class MercadoComponent implements OnInit {
  MercadoService: MercadoService;
  rows: any;
  formAdd: any;
  submitted: boolean = false;
  modalLarge: any;
  configOpenRightBar: string;
  isLoadingMercado: boolean = false;
  loginService: LoginService;
  usuario: Usuario;

  formFiltros: FormGroup;
  eFiltroTextoObrigatorio: boolean = false;
  mostrarInputsCodigoFilial: boolean = false;

  @ViewChild("pesquisa") pesquisa: ElementRef;
  @ViewChild("cnpjFiltro") cnpjFiltro: ElementRef;
  @ViewChild("cnpj") cnpj: ElementRef;
  @ViewChild("telefone") telefone: ElementRef;
  @ViewChild("cancelButton") cancelButton: ElementRef;
  @ViewChild("codFilialDe") codFilialDe: ElementRef;
  @ViewChild("codFilialAte") codFilialAte: ElementRef;
 
  isFiltroTextoObrigatorio: boolean = false;
  mostrarInputCNPJ: boolean = false;

  estados: Object[] = [{ data: "AC" }, { data: "AL" }, { data: "AP" }, { data: "AM" }, { data: "BA" }, { data: "CE" }, { data: "DF" }, { data: "GO" }, { data: "ES" }, { data: "MA" }, { data: "MT" }, { data: "MS" }, { data: "MG" }, { data: "PA" }, { data: "PB" }, { data: "PR" }, { data: "PE" }, { data: "PI" }, { data: "RJ" }, { data: "RN" }, { data: "RS" }, { data: "RO" }, { data: "RR" }, { data: "SP" }, { data: "SC" }, { data: "SE" }, { data: "TO" }]

  dataCadastrao: Date = new Date();

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  eUsuarioAdmin: boolean = false;


  constructor(_MercadoService: MercadoService, _loginService: LoginService, public brMaskerIonic3: BrMaskerIonic3,
    public _CEPService: CEPService) {
    this.MercadoService = _MercadoService;
    this.loginService = _loginService;
  }

  openBasicSwal() {
    swal({
      title: 'Errado',
      text: 'você deveria tentar novamente!'
    }).catch(swal.noop);
  }

  ngOnInit() {
    this.formAdd = new FormGroup({
      cnpj: new FormControl(this.formatarCNPJ(), Validators.required),
      situacao: new FormControl('', [Validators.required]),
      SGS: new FormControl('', [Validators.required]),
      nomefantasia: new FormControl('', [Validators.required]),
      contato: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      cep: new FormControl(''),
      endereco: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      estado: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      trabalhaTresCasasDecimais: new FormControl('', [Validators.required])
      
    });

   this.formFiltros = new FormGroup({
      codFilialDe: new FormControl('', Validators.required),
      codFilialAte: new FormControl('', Validators.required),
      filtro: new FormControl()
    });

    this.loginService.currentMessage.subscribe((message) => {
      this.usuario = message;
      if (this.usuario.tipo === 'AD') {
        const eAdministrador = localStorage.getItem('eAdministrador');
        this.eUsuarioAdmin = (eAdministrador ? parseInt(eAdministrador) : 0) > 0
      }
    });

    this.listar();
  }

  public listar() {
    let filtro = this.formFiltros.get('filtro').value ? this.formFiltros.get('filtro').value : "999999";
    const eFiltroCodFilialSelecionado = this.eFiltroCodFilialSelecionado();
    let pesquisa = this.pesquisa.nativeElement.value;;

    let idUsuarioDe: String = "0";
    let idUsuarioAte: String = "999999";
    let params: String[] = [];
    let index: number = filtro ? parseInt(filtro) : 999999;

    if (this.usuario.tipo !== "AD") {
      idUsuarioDe = this.usuario.cadastrao.id.toString();
      idUsuarioAte = this.usuario.cadastrao.id.toString();
    }
    params.push(idUsuarioDe);
    params.push(idUsuarioAte);

    if (eFiltroCodFilialSelecionado) {
      params.push(this.codFilialDe.nativeElement.value);
      params.push(this.codFilialAte.nativeElement.value);
    }

    if (!eFiltroCodFilialSelecionado && filtro !== "999999") {
      if (!pesquisa) {
        this.eFiltroTextoObrigatorio = true;
        return false;
      } else {
        this.eFiltroTextoObrigatorio = false;
      }
      params.push(pesquisa);
    } else {
      this.eFiltroTextoObrigatorio = false;
      this.pesquisa.nativeElement.value = '';;
    }
    this.isLoadingMercado = true;
    this.MercadoService.listar(index, 0, 999999, params)
      .then(res => {
        this.rows = res.data.body.registros;
        this.isLoadingMercado = false;
      }, err => {
        console.log('error', err);
        this.isLoadingMercado = false;

      });
  }
  public onListar() {
    let filtro = this.formFiltros.get('filtro').value ? this.formFiltros.get('filtro').value : "999999";
    if (filtro === 5) {
      if (this.formFiltros.controls.CNPJ.invalid) {
        return;
      }
    }
    this.listar();
  }

  get f() {
    return this.formAdd.controls;
  }

  showWarningSwal(message: string, callback = () => { }) {
    swal({
      title: 'Atençâo',
      text: `${message}`,
      type: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok!'
    }).then(function () {
      callback();
    }).catch(swal.noop);
  }

  handleInputChange(event) {
    let radio = event.target.value;
    if (radio === "5") {
      this.mostrarInputCNPJ = true;
      this.pesquisa.nativeElement.value = "";
    } else {
      this.mostrarInputCNPJ = false;
      this.cnpjFiltro.nativeElement.value = ""
    }
  }
  public eFiltroCodFilialSelecionado() {
    let filtro = this.formFiltros.get('filtro').value ? this.formFiltros.get('filtro').value : "999999";
    return parseInt(filtro) === 3;
  }

  onChangeFiltro(event) {
    let radio = event.target.value;
    this.eFiltroTextoObrigatorio = false;
    if (radio === "3") {
      this.mostrarInputsCodigoFilial = true;
      this.pesquisa.nativeElement.value = "";
    } else {
      this.mostrarInputsCodigoFilial = false;
      this.codFilialDe.nativeElement.value = 0;
      this.codFilialAte.nativeElement.value = 0;
    }
  }
  mostrarMensagemSucesso(message: string, callback = () => { }) {
    swal({
      title: 'Bom trabalho!',
      text: `${message}`,
      type: 'success'
    }).then(function () {
      callback();
    }).catch(swal.noop);

  }

  mostrarMensagemErro(message: string, callback = () => { }) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then(function () {
      swal(
        'Excluído!',
        'Seu arquivo foi excluído.',
        'success'
      );
    }).catch(swal.noop);

  }


  showWarningSwaldelete(message: string, callback = () => { }) {
    swal({
      title: 'Atençâo',
      text: `Não é possível excluir o mercado. 
      Existe filial cadastrada para o mercado selecionado`,
      type: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok!'
    }).then(function () {
      callback();
    }).catch(swal.noop);
  }


  openConfirmsSwal() {
    swal({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then(function () {
      swal(
        'Excluído!',
        'Seu arquivo foi excluído.',
        'success'
      );
    }).catch(swal.noop);
  }


  adicionar() {
    this.submitted = true;
    let cnpj = this.cnpj.nativeElement.value
    let telefone = this.telefone.nativeElement.value;
    this.formAdd.patchValue({ cnpj: cnpj, telefone: telefone });

    if (this.formAdd.invalid) {
      return false;
    } else {
      const endereco = new Endereco();
      endereco._explicitType = 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Endereco';
      endereco.endereco = this.f.endereco.value;
      endereco.numero = this.f.numero.value;
      endereco.bairro = this.f.bairro.value;
      endereco.cep = this.f.cep.value;
      endereco.cidade = this.f.cidade.value;
      endereco.uf = this.f.estado.value;

      const mercadomodel = new Mercado();
      mercadomodel._explicitType = 'br.com.sgsistemas.cotacao.cotacaoweb.beans.Mercado';
      mercadomodel.id = -1;
      mercadomodel.clienteSgs = this.f.SGS.value;
      mercadomodel.nome = this.f.nomefantasia.value;
      mercadomodel.cnpjClienteSG = this.removerFormatoCNPJ(cnpj);
      mercadomodel.situacao = this.f.situacao.value;
      mercadomodel.email = this.f.email.value;
      mercadomodel.contato = this.f.contato.value;
      mercadomodel.foneComercial = this.f.telefone.value;
      mercadomodel.trabalhaTresCasasDecimais = this.f.trabalhaTresCasasDecimais.value;
      let dataAtual = new Date();
      mercadomodel.dataCadastro = `${dataAtual.getDate()}/${dataAtual.getMonth()}/${dataAtual.getFullYear()}`;
      mercadomodel.endereco = endereco;
      const mercado = Object.assign(mercadomodel, new Mercado);



      this.MercadoService.salvar(mercado).then(
        res => {
          let message = res.data.body;
          if (message.search('Sucesso') > 0) {
            if (mercado.id === -1) {
              message = `Usuário padrão cadastrado: Login: ${this.f.cnpj.value.replace(/[\/.-]/g, "")}\n Senha: ${this.f.cnpj.value.replace(/[\/.-]/g, "")}`;
            }
          }

          this.mostrarMensagemSucesso(message, () => {
            this.rows.push(mercado);
            this.carregar();
            this.cancelButton.nativeElement.click();
            this.listar();
          });
        },
        err => {
          this.showWarningSwal(err.message.split(':')[1]);
        });
    }

  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  public delete(event) {
    let index = event.currentTarget.id;
    this.MercadoService.remover(index)
      .then(res => {
        let deleteagora = res.data.body;
        this.mostrarMensagemErro(deleteagora, () => {

          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i].id === parseInt(index)) {
              this.rows.splice(i, 1);
              break;
            }
          }
        });
        this.listar();
      }, err => {
        this.showWarningSwaldelete(err.message.split(':')[1]);
        console.log('error', err);
      });
  }

  public alterar(event) {

    let index = event.currentTarget.id;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].id === parseInt(index)) {
        this.rows.splice(i, 1);
        break
      }
    }

    this.MercadoService.localizar(index)
      .then(res => {
        let deleteagora = res.data.body;
        this.mostrarMensagemErro(deleteagora, () => {
          this.rows.push(deleteagora);
          this.carregar();
        });

      }, err => {
        this.showWarningSwaldelete(err.message.split(':')[1]);
      });
  }

  public formatarCNPJ(): string {
    const config: BrMaskModel = new BrMaskModel();
    config.person = true;
    return this.brMaskerIonic3.writeCreateValue("", config);
  }

  public isFiltroCNPJSelecionado() {
    let filtro = this.formFiltros.get('filtro').value ? this.formFiltros.get('filtro').value : "999999";
    return parseInt(filtro) === 5;
  }

  public localizarCNPJ(event) {
    let cnpj = event.target.value;
    let cpnjValidationResult = Utils.check_cnpj(cnpj);
    if (!cpnjValidationResult['status']) {
      this.showWarningSwal(cpnjValidationResult['message']);
      this.carregar();
      return false;
    }
  }



  localizarCEP(event) {
    let cepNumber = event.target.value;

    cepNumber = cepNumber.replace(/[\.-]/g, "");
    this._CEPService.getCEP(parseInt(cepNumber)).then((res) => {
      if (res) {
        let cep = Object.assign(res, new CEP());
        this.formAdd.patchValue({ endereco: cep.logradouro, bairro: cep.bairro, cidade: cep.localidade, complemento: cep.complemento, estado: cep.uf });
      }
    }).catch((err) => {
      console.log('error', err);
      this.localizarCEP2(event);
    });
  }

  localizarCEP2(event) {
    let cepNumber = event.target.value;
    cepNumber = cepNumber.replace(/[\.-]/g, "");
    this._CEPService.getCEP2(parseInt(cepNumber)).then((res) => {
      if (res) {
        let cep = Object.assign(res, new CEP());
        this.formAdd.patchValue({ endereco: cep.logradouro, bairro: cep.bairro, cidade: cep.cidade, complemento: cep.complemento, estado: cep.uf });
      }
    }).catch((err) => {
      console.log('error', err);
    });
  }

  carregar(cadastrao: Cadastrao = null) {
    this.formAdd.patchValue(
      {
        situacao: cadastrao ? cadastrao.situacao : 'A',
        SGS: cadastrao ? cadastrao.nome : '',
        cidade: cadastrao ? cadastrao.endereco.cidade : '',
        complemento: cadastrao ? cadastrao.endereco.endereco : '',
        estado: cadastrao ? cadastrao.endereco.uf : 'PR',
        cep: cadastrao ? cadastrao.endereco.cep : '',
        bairro: cadastrao ? cadastrao.endereco.bairro : '',
        telefone: cadastrao ? cadastrao.foneComercial : '',
        nomefantasia: cadastrao ? cadastrao.fantasia : '',
        contato: cadastrao ? cadastrao.contato : ''
      }
    );
    this.setDataCadastro(cadastrao ? cadastrao.dataCadastro.toString() : null);

  }

  setDataCadastro(dataCadastrao: String = new Date().toDateString()) {
    let dataAtual = new Date();
    const dataArray = dataCadastrao ? dataCadastrao.split('/') : [`${dataAtual.getDate()}`, `${dataAtual.getMonth()}`, `${dataAtual.getFullYear()}`];
    let dataAlterada = new Date(parseInt(dataArray[2]), parseInt(dataArray[1]) - 1, parseInt(dataArray[0]));
    this.dataCadastrao = dataAlterada;
  }

  removerFormatoCNPJ(cnpj: string) {
    if (cnpj == null) {
      return cnpj;
    }
    else
      cnpj = cnpj.replace(new RegExp("\\.", 'g'), "");
    cnpj = cnpj.replace(new RegExp("\\/", 'g'), "");
    cnpj = cnpj.replace(new RegExp("\\-", 'g'), "");
    return cnpj;
  }

}
