import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';
import { COLABORADOR } from '../system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  retornoLogin: string;

  constructor(private service: SystemService, private router: Router) { }

  ngOnInit() {

    this.username = '';
    this.password = '';
  }


  login() {

    const access = this.service.login(this.username, this.password);

    if (access) {

      this.retornoLogin = 'Logado com sucesso!';
      console.log('id logado: '+this.service.logado.id);
      
      if (this.service.logado.perfil == COLABORADOR) {
        this.router.navigate(['/colaborador']);
      } else {
        this.router.navigate(['/resp-financeiro']);
      }

    } else {
      this.retornoLogin = 'Acesso não autorizado.';
    }
  }

}
