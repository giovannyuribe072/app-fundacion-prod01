import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {  HomePage,ModalPage } from './home.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { HomePageRoutingModule } from './home-routing.module';  
import {  ReactiveFormsModule } from '@angular/forms';
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
  ],
  declarations: [HomePage,ModalPage] 
})
export class HomePageModule {}
