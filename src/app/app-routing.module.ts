import { AuthGuardService } from './auth-guard.service';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./modulos/admin/admin.component";
import { AuthComponent } from "./modulos/auth/auth.component";
import { NotFoundComponent } from "./modulos/maintenance/notfound/notfound.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        loadChildren: "./modulos/login/login.module#LoginModule"
      },
      {
        path: "login",
        loadChildren: "./modulos/login/login.module#LoginModule"
      },
      {
        path: "recuperacaosenha",
        loadChildren: "./modulos/recuperacaosenha/recuperacaosenha.module#ForgotModule"
      },
      {
        path: "trocarsenha",
        loadChildren: "./modulos/change-password/change-password.module#ChangePasswordModule"
      },
      {
        path: "maintenance/offline-ui",
        loadChildren:
          "./modulos/maintenance/offline-ui/offline-ui.module#OfflineUiModule"
      }
    ]
  },
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: "./modulos/mercado/mercado.module#MercadoModule"
      },
      {
        path: 'dashboard/mercado',
        loadChildren: './modulos/mercado/mercado.module#MercadoModule'
      },
      {
        path: 'dashboard/fornecedor',
        loadChildren: './modulos/fornecedor/fornecedor.module#FornecedorModule'
      },
      {
        path: 'dashboard/filial',
        loadChildren: './modulos/filial/filial.module#FilialModule'
      },
      {
        path: 'dashboard/vendedor',
        loadChildren: './modulos/vendedor/vendedor.module#VendedorModule'
      }
    ],
    canActivate: [AuthGuardService],
  },
  
  {
    path: "404",
    component: NotFoundComponent
      
  },
  {
    path: "**",
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
