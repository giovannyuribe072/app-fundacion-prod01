import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalLinealizadaMensualPage,ModalVerPage, GarantiasPage, ModalPage, ModalEliminarPage, ModalEditarPage, ModalEditarConfirmPage, ModalSumarCarguePage } from './garantias.page'; 
import { MatTableModule} from  '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';  
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatCheckboxModule} from '@angular/material/checkbox'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableExporterModule,
    MatCheckboxModule,
    RouterModule.forChild([{ path: '', component: GarantiasPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalPage },{ path: '', component: ModalEliminarPage },{ path: '', component: ModalEditarPage },{ path: '', component: ModalEditarConfirmPage },{ path: '', component: ModalSumarCarguePage },{ path: '', component: ModalLinealizadaMensualPage }])
  ],
  declarations: [GarantiasPage,ModalVerPage,ModalPage,ModalEliminarPage,ModalEditarPage,ModalEditarConfirmPage,ModalSumarCarguePage ,ModalLinealizadaMensualPage]
})
export class GarantiasPageModule {}
