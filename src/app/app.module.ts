import { AuthGuardService } from './auth-guard.service';
import { LoginService } from './services/loginService';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./modulos/admin/admin.component";
import { AuthComponent } from "./modulos/auth/auth.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from './modulos/shared/shared.module';
import { MenuItems } from "./modulos/shared/menu-items/menu-items";
import { BreadcrumbsComponent } from "./modulos/breadcrumbs/breadcrumbs.component";
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { NotFoundComponent } from "./modulos/maintenance/notfound/notfound.component";
import { VendedorService } from './services/vendedorService';
import { FornecedorService } from './services/fornecedorService';
import { CEPService } from './services/cepService';
import { MercadoService } from './services/mercadoService';
import { FilialService } from './services/filalservice';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    BrMaskerModule,
    BrowserCookiesModule.forRoot()
  ],
  providers: [
    MenuItems,
    LoginService,
    FilialService,
    VendedorService,
    FornecedorService,
    CEPService,
    MercadoService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
