import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguimientoPage} from './seguimiento.page'; 
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
    RouterModule.forChild([{ path: '', component:SeguimientoPage }])
  ],
  declarations: [SeguimientoPage ]
})
export class SeguimientoPageModule {}
