import { Injectable } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioLogado } from '../models/usuarioLogado';
import { Utils } from '../../assets/helpers/utils';

declare var amf: any;

@Injectable()
export class LoginService {
  autenticado: boolean = false;
  usuario: Usuario;
  private messageSource = new BehaviorSubject(new Usuario());
  currentMessage = this.messageSource.asObservable();
  private service = 'RecuperaSenhaService';
  constructor(private cookies: CookiesService) {
  }

  login(usuario: Usuario) {
    const amfClient = new amf.Client(
      'LoginService',
      Utils.urlService
    );

    return amfClient.invoke('LoginService', 'Logar', [usuario]);
  }

  logout() {
    const amfClient = new amf.Client(
      'LoginService',
      Utils.urlService
    );

    return amfClient.invoke('LoginService', 'LogOut', []);
  }

  changeSenha(usuario: Usuario, senhaAntiga: string, considerasenhaAntiga: boolean) {
    const amfClient = new amf.Client(
      'UsuarioService',
      Utils.urlService
    );

    return amfClient.invoke('UsuarioService', 'AlterarSenha', [usuario, senhaAntiga, considerasenhaAntiga]);
  }

  validarLogin(usuarioLogado: UsuarioLogado): String {
    if (!usuarioLogado.usuario) {
      return 'Usuário ou Senha Inválidos!!!';
    } else if (usuarioLogado.situacao === 'I') {
      return 'Usuário Inativo.\nEntre em contato com a Administração.';
    }

    this.autenticado = true;
    return '';
  }

  requestRecoverychave(email: String) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'SolicitaChave', [email]);
  }

  requestChangePassword(email: String, chave: String) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'RecuperaSenha', [email, chave]);
  }

  requestListareRecuperarSenha(filtro: number, params: ['']) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'Listar', [filtro, params]);
  }

  requestTrocarSenha(params: Array<any>) {
    const amfClient = new amf.Client(
      this.service,
      Utils.urlService
    );

    return amfClient.invoke(this.service, 'TrocarSenha', [false, params]);
  }

  loadUserById(id: number) {
    const amfClient = new amf.Client(
      'UsuarioService',
      Utils.urlService
    );

    return amfClient.invoke('UsuarioService', 'Locate', [id]);
  }

  isautenticado(): boolean {
    const login = this.cookies.get('login');
    const senha = this.cookies.get('senha');
    const userId = this.cookies.get('userId');

    if (login && senha && userId) {
      this.autenticado = true;
    } else {
      this.autenticado = false;
    }
    return this.autenticado;
  }

  setUsuario(usuario: Usuario) {
    this.messageSource.next(usuario);
  }

  swichUser(id) {
    const amfClient = new amf.Client(
      'LoginService',
      Utils.urlService
    );

    return amfClient.invoke('LoginService', 'TrocarUsuario', [id]);
  }

}
