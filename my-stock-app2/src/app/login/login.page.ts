import { SystemService } from './../service/system.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  retornoLogin: string;

  constructor(private service: SystemService, private router: Router ) { }

  ngOnInit() {
  }

  login(){

    const access = this.service.login(this.username, this.password);

    if (access) {
      this.router.navigate(['/consulta']);
      this.retornoLogin = 'Logado com sucesso!';

    } else {
      this.retornoLogin = 'Acesso não autorizado.';
    }
  }
}
