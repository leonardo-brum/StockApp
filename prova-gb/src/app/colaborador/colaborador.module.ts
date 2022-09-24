import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColaboradorPageRoutingModule } from './colaborador-routing.module';

import { ColaboradorPage } from './colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColaboradorPageRoutingModule
  ],
  declarations: [ColaboradorPage]
})
export class ColaboradorPageModule {}
