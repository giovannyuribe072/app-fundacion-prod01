import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './components/services/auth.service';
import { Guard } from './authguard.guard';
import { AlertPage } from './components/alert/alert.page';
import { DatePage } from './components/util/date.page';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './components/util/dutch-paginator-intl'; 
import { ServidorCorreoService } from './components/services/servidorcorreo.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule, 
    HttpClientModule, 
    MatTableExporterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   ],
  providers: [
    StatusBar,
    SplashScreen,
    //SERVICIOS
    AlertPage, 
    DatePage,
    Guard,
    AuthService,
    ServidorCorreoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
