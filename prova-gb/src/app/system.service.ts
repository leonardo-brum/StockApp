import { Injectable } from '@angular/core';

export const COLABORADOR = 1
export const RESPONSAVEL_FINANCEIRO = 2

@Injectable({
  providedIn: 'root'
})


export class SystemService {

  usuarios: any[];
  username: string;
  isLogado: any;
  logado: any;

  registroPrestacaoContas: any[];
  idPrest: number;

  constructor() {

    this.usuarios = [
      { id: 1, usuario: 'ze', senha: '123', nomeCompleto: 'Ze Teste', perfil: COLABORADOR },
      { id: 2, usuario: 'leonardo', senha: '123', nomeCompleto: 'Leonardo Telles de Brum', perfil: RESPONSAVEL_FINANCEIRO }];

    this.isLogado = false;
    this.logado = null;
    this.idPrest = 0;

    this.registroPrestacaoContas = [
      { idPrest: 0, idUser: 1, dataRegistro: "2022-09-21", mesContabil: "setembro", descricao: "texto magnifico", status: "Aprovada" }
    ]
  }

  login(usuario: string, senha: string): boolean {


    this.usuarios.forEach((usr) => {
      if (usr.usuario === usuario && usr.senha === senha) {
        this.username = usr.nomeCompleto;
        this.isLogado = true;
        this.logado = usr;
      }
    });

    if (this.isLogado) {
      return true;
    } else {
      return false;
    }
  }

  cadastrarPrestacao(idUser: any, dataRegistro: Date, mesContabil: string, descricao: string) {

    this.idPrest = this.idPrest + 1;

    let prestAux = {
      idPrest: this.idPrest,
      idUser: idUser,
      dataRegistro: dataRegistro,
      mesContabil: mesContabil,
      descricao: descricao,
      status: 'Pendente'
    }

    this.registroPrestacaoContas.push(prestAux);

    console.log(this.registroPrestacaoContas);
  }

  getRegistrosPrestacaoContas() {
    return this.registroPrestacaoContas;
  }

  getRegistro(IDtoSearch: number) {
    console.log('get registro ' + IDtoSearch);

    return this.registroPrestacaoContas.find(e => e.idPrest == IDtoSearch);

  }


  alterarPrestacao(IDtoChange: number, novaDataRegistro: Date, novoMesContabil: string, novaDescricao: string) {

    let objIndex = this.registroPrestacaoContas.findIndex((e => e.idPrest == IDtoChange));

    this.registroPrestacaoContas[objIndex].dataRegistro = novaDataRegistro;
    this.registroPrestacaoContas[objIndex].mesContabil = novoMesContabil;
    this.registroPrestacaoContas[objIndex].descricao = novaDescricao;

  }

  alterarStatusPrestacao(IDtoChange: number, novoStatus: string) {

    let objIndex = this.registroPrestacaoContas.findIndex((e => e.idPrest == IDtoChange));
    this.registroPrestacaoContas[objIndex].status = novoStatus;

  }

}
