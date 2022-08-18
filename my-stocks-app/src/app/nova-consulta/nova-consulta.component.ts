import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { TransferenciaService } from '../services/transferencia.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.scss'],
})
export class NovaConsultaComponent {

  @Output() aoTransferir = new EventEmitter<any>();

  dividendoTotal: number = 0;
  stock: String = "";
  allStocks: any [];

  dataInicio: any;
  dataFim: any;


  constructor(private service1: TransferenciaService){

  }

  ngOnInit(){

    const dataAtual = new Date();

    this.allStocks = this.service1.yahooFinance_exchanges;

    const datepipe: DatePipe = new  DatePipe('pt-br')
    this.dataFim = datepipe.transform(dataAtual, 'yyyy-MM-dd');
    this.dataInicio = datepipe.transform(new Date().setFullYear(dataAtual.getFullYear() - 1), 'yyyy-MM-dd');

  }

  consultarAcao() { // quando o botão search é pressionado


    if(this.stock != ""){
      console.log('Buscar Ação desejada: '+this.stock);

    this.stock = this.stock.split(" ")[0] // capturando código da ação

    this.service1.setStock(this.stock); // setando a ação em questão no service1

    let stockPrices, histDividendo, resultsDividendos, dividendYield, stockSubscribe = this.stock;

    let historico = this.service1.yahooFinance_historical(this.dataInicio, this.dataFim)
    // .subscribe(historico=>{
      console.log(historico);


      stockPrices = historico['results'].map((res) => res.close); // stockPrices é um array com todos os preços da ação


      histDividendo = this.service1.yahooFinance_dividend(); // histórico de dividendos

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
    this.stock = "";
  }
}
