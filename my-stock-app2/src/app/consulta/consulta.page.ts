import { SystemService } from './../service/system.service';
import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  dividendoTotal: number;
  stock: string;

  allStocks: any[];
  dataInicio: any;
  dataFim: any;
  mensagemConsulta: string;
  chart: any = [];

  transferencias: any;

  constructor(private service: SystemService, private router: Router) {}

  ngOnInit() {
    this.stock = '';
    Chart.register(...registerables);
    const dataAtual = new Date();
    this.allStocks = this.service.yahooFinanceExchanges();

    const datepipe: DatePipe = new DatePipe('pt-br');
    this.dataInicio = datepipe.transform(
      new Date().setFullYear(dataAtual.getFullYear() - 1),
      'yyyy-MM-dd'
    );
    this.dataFim = datepipe.transform(new Date(), 'yyyy-MM-dd');

    this.transferencias = this.service.transferencias();
  }

  consultarAcao() {
    console.log(this.stock);
    if (this.stock === '') {
      this.mensagemConsulta = 'Digite um ativo!';
    }
    if (!(this.stock === '')) {

      this.mensagemConsulta = '';
      console.log('Buscar Ação desejada: ' + this.stock);

      this.stock = this.stock.split(' ')[0]; // capturando código da ação

      this.service.setStock(this.stock); // setando a ação em questão no service1

      const stockSubscribe = this.stock;
      let dividendYield = 0.0; // dividendYield começa zerado
      let dividendo = 0;

      // const historico
      this.service.yahooFinanceHistorical(this.dataInicio, this.dataFim)
      .subscribe(historico => {
      console.log(historico);

      const stockPricesCloses = historico.results.map((res) => res.close); // stockPrices é um array com todos os preços da ação

      setTimeout(() => { // delay para iniciar a segunda chamada -> é necessário ter 1s entre requisições para o endpoint
        console.log('Iniciando parte 2');

        // const resultsDividendos
        this.service.yahooFinanceDividend()
        .subscribe(resultsDividendos => {
          // histórico de dividendos

          if(resultsDividendos.total !== 0){
          resultsDividendos = resultsDividendos.results; // just for subscribe
          console.log(resultsDividendos);

          //dividendYield = valor do ultimo dividendo distribuido / preço da ação no dia que o dividendo foi distribuido
          try {
            //eslint-disable-next-line max-len
            dividendYield = resultsDividendos[resultsDividendos.length - 1].amount / historico.results.find((e) => e.date === resultsDividendos[resultsDividendos.length - 1].date).close;

          } catch (error) {
            dividendYield = 0.0;
            console.log('Nenhum dividendo no tempo selecionado');
            this.mensagemConsulta = 'Nenhum dividendo no tempo selecionado';
          }
          dividendo = resultsDividendos[resultsDividendos.length - 1];
        } else {
            console.log('Nenhum dividendo para ação escolhida');
            this.mensagemConsulta = 'Nenhum dividendo para ação escolhida';
          }

          //eslint-disable-next-line max-len
          const valorEmitir = {
            stock: stockSubscribe,
            currentStockPrice: stockPricesCloses[stockPricesCloses.length - 1],
            dividendos: dividendo,
            yield: dividendYield,
            res: historico,
          };
          console.log(valorEmitir);
          const stockPrices = valorEmitir.res.results.map((res) => res.close);
          const stockDates = valorEmitir.res.results.map((res) => res.date);

          console.log('construindo o chart: '+stockSubscribe);

          const chartStatus = Chart.getChart('canvas'); // <canvas> id
          if (chartStatus !== undefined) {
            chartStatus.destroy();
          }

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: stockDates,
              datasets: [
                {
                  label: stockSubscribe,
                  data: stockPrices,
                  borderColor: '#81c995',
                  fill: false,
                },
              ],
            },
          });

          console.log('adicionando input extrato: ');

          this.service.adicionar(valorEmitir);
        }); // fim do subscribe 2° chamada
       }, 1000);
      }); // fim do subscribe

    } else {
      console.log('Nada capturado no input');
    }

    this.limparCampos();
  }

  clickedPerson(){
    this.router.navigate(['/perfil']);
  }

  limparCampos() {
    this.stock = '';
  }
}
