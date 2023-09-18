import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalPage, ModalVerLinealizadaPage, ModalVerMensualPage, ModalVerPage, PeriodoCoberturaPage } from './periodocobertura.page'; 
import { MatTableModule} from  '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';  

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: PeriodoCoberturaPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalVerLinealizadaPage },{ path: '', component: ModalPage },{ path: '', component: ModalVerMensualPage }])
  ],
  declarations: [PeriodoCoberturaPage,ModalVerPage,ModalVerLinealizadaPage,ModalPage,ModalVerMensualPage ]
})
export class PeriodoCoberturaPageModule {}
