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

      const historico = this.service.yahooFinanceHistorical(this.dataInicio, this.dataFim);
      // .subscribe(historico => {
      console.log(historico);

      const stockPricesCloses = historico.results.map((res) => res.close); // stockPrices é um array com todos os preços da ação
      const resultsDividendos =  this.service.yahooFinanceDividend();
      // .subscribe(resultsDividendos => {
        // histórico de dividendos

        // resultsDividendos = resultsDividendos.results; // just for subscribe
        console.log(resultsDividendos);

        //dividendYield = valor do ultimo dividendo distribuido / preço da ação no dia que o dividendo foi distribuido
        //eslint-disable-next-line max-len
        const dividendYield = resultsDividendos[resultsDividendos.length - 1].amount / historico.results.find((e) => e.date === resultsDividendos[resultsDividendos.length - 1].date).close;

        //eslint-disable-next-line max-len
        const valorEmitir = {
          stock: stockSubscribe,
          currentStockPrice: stockPricesCloses[stockPricesCloses.length - 1],
          dividendos: resultsDividendos[resultsDividendos.length - 1],
          yield: dividendYield,
          res: historico,
        };
        console.log(valorEmitir);
        const stockPrices = valorEmitir.res.results.map((res) => res.close);
        const stockDates = valorEmitir.res.results.map((res) => res.date);

        console.log('construindo o chart: '+this.stock);

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
                label: this.stock,
                data: stockPrices,
                borderColor: '#81c995',
                fill: false,
              },
            ],
          },
        });

        console.log('adicionando input extrato: ');

        this.service.adicionar(valorEmitir);
      // });
      // }); // fim do subscribe
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
