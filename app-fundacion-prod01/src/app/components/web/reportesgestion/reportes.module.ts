import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {  HomePage } from './reportes.page'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { HomePageRoutingModule } from './reportes-routing.module';  
import {  ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from  '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule, 
    AngularFireStorageModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule 
  ],
  declarations: [HomePage] 
})
export class HomePageModule {}
