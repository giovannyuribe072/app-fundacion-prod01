import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreacionUsuariosPage, ModalConfirmacionPage, ModalDeletePage, ModalEditarValoresIntermediarioPage, ModalIntermediarioConfirmacionPage, ModalSuperMaestroPage, ModalCoordinadorPage, ModalCampanasPage, ModalManagerPage, ModalTipoPage, ModalCampanaPage } from './creacionusuarios.page'; 
import { ModalPage } from './creacionusuarios.page'; 
import { ModalVerPage } from './creacionusuarios.page'; 
import { MatTableModule} from  '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';  
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule, 
    MatTableExporterModule,
    RouterModule.forChild([{ path: '', component: CreacionUsuariosPage },{ path: '', component: ModalVerPage },{ path: '', component: ModalPage },{ path: '', component: ModalDeletePage },{ path: '', component: ModalConfirmacionPage },{ path: '', component: ModalIntermediarioConfirmacionPage },{ path: '', component: ModalEditarValoresIntermediarioPage },{ path: '', component: ModalSuperMaestroPage },{ path: '', component: ModalCoordinadorPage },{ path: '', component: ModalCampanasPage },{ path: '', component: ModalManagerPage },{ path: '', component: ModalTipoPage },{ path: '', component: ModalCampanaPage }])
  ],
  declarations: [CreacionUsuariosPage,ModalVerPage,ModalPage,ModalDeletePage,ModalConfirmacionPage,ModalIntermediarioConfirmacionPage,ModalEditarValoresIntermediarioPage,ModalSuperMaestroPage,ModalCoordinadorPage,ModalCampanasPage,ModalManagerPage,ModalTipoPage,ModalCampanaPage]
})
export class CreacionUsuariosPageModule {}
