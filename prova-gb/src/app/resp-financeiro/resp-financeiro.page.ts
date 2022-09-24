import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-resp-financeiro',
  templateUrl: './resp-financeiro.page.html',
  styleUrls: ['./resp-financeiro.page.scss'],
})
export class RespFinanceiroPage implements OnInit {

  prestacoes: any[];

  constructor(private service: SystemService, private router: Router) { }

  ngOnInit() {
    this.prestacoes = this.service.getRegistrosPrestacaoContas();
  }


  aprovarConta(IDAtual: any){

    this.service.alterarStatusPrestacao(IDAtual, 'Aprovada');
    this.prestacoes = this.service.getRegistrosPrestacaoContas();
  }

  refazerConta(IDAtual: any){

    this.service.alterarStatusPrestacao(IDAtual, 'Refazer');
    this.prestacoes = this.service.getRegistrosPrestacaoContas();
  }


  logout() {
    this.service.logado = null;
    this.router.navigate(['/login'])
  }

}
