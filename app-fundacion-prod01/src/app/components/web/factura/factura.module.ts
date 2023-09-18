import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalVerPage, FacturaPage, ModalPage } from './factura.page'; 
import { MatTableModule} from  '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';  
import { MatTableExporterModule } from 'mat-table-exporter';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableExporterModule,
    RouterModule.forChild([{ path: '', component: FacturaPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalPage }])
  ],
  declarations: [FacturaPage,ModalVerPage,ModalPage ]
})
export class FacturaPageModule {}
