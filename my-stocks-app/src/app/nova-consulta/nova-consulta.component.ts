import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.scss'],
})
export class NovaConsultaComponent {

  @Output() aoTransferir = new EventEmitter<any>();

  dividendoTotal: number = 0;
  stock: String = undefined;
  allStocks: any [];

  dataInicio: any;
  dataFim: any;


  constructor(private service1: TransferenciaService){

  }

  ngOnInit(){
    this.allStocks = this.service1.yahooFinance_exchanges;
    this.dataInicio = "2021-08-10";
    this.dataFim = "2022-08-10";

  }

  transferir() { // quando o botão search é pressionado

    console.log('Buscar Ação desejada: '+this.stock);

    if(this.stock == ""){
      this.stock = undefined;
    }

    if(this.stock != undefined){

    this.stock = this.stock.split(" ")[0]

    this.service1.setStock(this.stock);

    let stockPrices, histDividendo, resultsDividendos, dividendYield, stockSubscribe = this.stock;

    let historico = this.service1.yahooFinance_historical(this.dataInicio, this.dataFim)
    // .subscribe(historico=>{
      console.log(historico);


      stockPrices = historico['results'].map((res) => res.close);


      histDividendo = this.service1.yahooFinance_dividend(this.stock);

      resultsDividendos = histDividendo['results'];

      // dividendYield = valor do ultimo dividendo distribuido / preço da ação no dia que o dividendo foi distribuido
      dividendYield = (resultsDividendos[resultsDividendos.length -1].amount)/historico['results'].find(e=> e.date == resultsDividendos[resultsDividendos.length -1].date).close;

      const valorEmitir = {stock: stockSubscribe, currentStockPrice: stockPrices[stockPrices.length-1], dividendos: resultsDividendos[resultsDividendos.length -1], dividendYield: dividendYield,res: historico};
      this.aoTransferir.emit(valorEmitir);
    // });



    } else{

      console.log("Nada capturado no input");
    }

    this.limparCampos();


  }

  limparCampos(){
    console.log("limpar input");
    this.stock = "";
  }
}
