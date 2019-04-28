import { LoginService } from '../../services/loginService';
import {Component,OnInit,ElementRef,ViewChild
} from "@angular/core";
import { FormGroup} from "@angular/forms";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss"
  ]
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  submitted = false;

  @ViewChild("username") username: ElementRef;
  @ViewChild("password") senha: ElementRef; 
0
  constructor() { }

  ngOnInit() { }

  get f() {
    return this.formLogin.controls;
  }
  route(){

  }


}
