import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalVerLinealizadaPage, ModalVerPage, HistoricoPage,ModalVerMensualPage } from './historico.page'; 
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
    RouterModule.forChild([{ path: '', component: HistoricoPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalVerLinealizadaPage },{ path: '', component: ModalVerMensualPage }])
  ],
  declarations: [HistoricoPage,ModalVerPage,ModalVerLinealizadaPage,ModalVerMensualPage ]
})
export class HistoricoPageModule {}
