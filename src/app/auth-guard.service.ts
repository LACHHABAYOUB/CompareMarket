
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./services/loginService";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _authService: LoginService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let outRoutes = /^\/trocarsenha|\/recuperacaosenha|\/login/g;
    if (outRoutes.test(window.location.pathname)) {
      if (this._authService.isautenticado()) {
        this._router.navigate(["/dashboard"]);
      } else {
        if (window.location.pathname === "/login") {
          this._router.navigate(["/"]);
        }
        return true;
      }
      return false;
    }

    if (this._authService.isautenticado()) {
      if (window.location.pathname === "/") {
        window.location.pathname = "/dashboard";
        return false;
      }
      return true;
    }

    if (window.location.pathname !== "/login" && window.location.pathname !== "/" && window.location.pathname !== "/404") {
      this._router.navigate(["/"]);
      return true;
    }

    return true;
  }
}
