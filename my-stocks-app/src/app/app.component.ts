import { Component} from '@angular/core';
import { TransferenciaService } from './services/transferencia.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  chart: any = [];


  constructor(private service1: TransferenciaService){

  }

  transferir2($event) {

    let stockPrices = $event.res['results'].map((res) => res.close);

    console.log(stockPrices);
    let stockDates = $event.res['results'].map((res) => res.date);
    console.log(stockDates);

    console.log("construindo o chart");
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: stockDates,
        datasets: [{
          label: $event.stock,
          data: stockPrices,
          borderColor: '#81c995',
          fill: false
        }]
      },
      options: {
        legend: {
          display: true
        }
      }
    });

    console.log("adicionando input extrato: ");
    console.log($event);
    this.service1.adicionar($event);
  }
}
