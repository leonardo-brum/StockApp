import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.page.html',
  styleUrls: ['./colaborador.page.scss'],
})
export class ColaboradorPage implements OnInit {

  isModalOpenCadastro = false;
  isModalOpenAlteracao = false;

  dataRegistro: Date;
  mesContabil: string;
  descricao: string;
  status: string;


  prestacoes: any[];

  IDAtual: number;

  constructor(private service: SystemService, private router: Router) { }

  ngOnInit() {
    this.prestacoes = this.service.getRegistrosPrestacaoContas();
  }

  setOpenCadastro(isOpen: boolean) {
    this.isModalOpenCadastro = isOpen;
  }

  setOpenAlteracao(isOpen: boolean) {

    this.isModalOpenAlteracao = isOpen;
  }

  carregarPrestacao(IDAtual: any) {

    console.log('ID para alteração: ' + IDAtual);
    this.IDAtual = IDAtual;

    let prestacao = this.service.getRegistro(IDAtual);

    this.dataRegistro = prestacao.dataRegistro;
    this.mesContabil = prestacao.mesContabil;
    this.descricao = prestacao.descricao;
    this.status = prestacao.status;



    this.isModalOpenAlteracao = true;
  }

  alterarPrestacao() {

    if (!(this.status == 'Aprovada')) {
      
      this.service.alterarPrestacao(this.IDAtual, this.dataRegistro, this.mesContabil, this.descricao);

      this.prestacoes = this.service.getRegistrosPrestacaoContas();

      if(this.status == 'Refazer'){
        this.service.alterarStatusPrestacao(this.IDAtual, 'Pendente');
      }

    } else {
      console.log('NÃO É POSSIVEL ALTERAR PRESTAÇÕES COM STATUS APROVADA');
      
    }

    this.zerarCarteiraComponentView();

    this.isModalOpenAlteracao = false;
  }

  salvarPrestacao() {

    this.service.cadastrarPrestacao(this.service.logado.id, this.dataRegistro, this.mesContabil, this.descricao);
    this.zerarCarteiraComponentView();

    this.prestacoes = this.service.getRegistrosPrestacaoContas();

    this.isModalOpenCadastro = false;
  }

  zerarCarteiraComponentView() {
    this.dataRegistro = null;
    this.mesContabil = '';
    this.descricao = '';
  }

  logout() {
    this.service.logado = null;
    this.router.navigate(['/login'])
  }

}
