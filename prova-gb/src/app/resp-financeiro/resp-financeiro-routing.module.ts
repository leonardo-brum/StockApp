import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespFinanceiroPage } from './resp-financeiro.page';

const routes: Routes = [
  {
    path: '',
    component: RespFinanceiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespFinanceiroPageRoutingModule {}
