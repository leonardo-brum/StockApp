import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespFinanceiroPageRoutingModule } from './resp-financeiro-routing.module';

import { RespFinanceiroPage } from './resp-financeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespFinanceiroPageRoutingModule
  ],
  declarations: [RespFinanceiroPage]
})
export class RespFinanceiroPageModule {}
