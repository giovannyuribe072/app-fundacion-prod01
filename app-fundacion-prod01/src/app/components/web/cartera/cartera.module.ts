import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalVerPage, CarteraPage, ModalEliminarPage, ModalEditarPage, ModalEditarConfirmPage } from './cartera.page'; 
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
    RouterModule.forChild([{ path: '', component: CarteraPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalEliminarPage },{ path: '', component: ModalEditarConfirmPage }])
  ],
  declarations: [CarteraPage,ModalVerPage,ModalEliminarPage,ModalEditarPage,ModalEditarConfirmPage]
})
export class CarteraPageModule {}
