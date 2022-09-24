import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaboradorPage } from './colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: ColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradorPageRoutingModule {}
