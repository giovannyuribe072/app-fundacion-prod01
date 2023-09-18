/**
 * FACTURA DE GARANTIAS PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
* Copyright 2020-2021 Start HASTECNOLOGIA S.A.S 
* @author HASTECNOLOGIA S.A.S Copyright 2020-2021 The FUNDACION SAN JOSE Authors
* pathweb=(HASTECNOLOGIA SAS/menu/periodocobertura)
* pathAplicationConfig=periodocobertura.page.html
* SecurityContext: @angular/fire/auth, APPLICATION_XML,'Access-Control-Allow-Origin' (solo por peticion Get se accede a este metodo)
* periodocobertura v0.0.1 (HASTECNOLOGIA SAS/menu/creacionusuarios) 
* Copyright 2020-2021 FUNDACION SAN JOSE, Inc. 
* Licensed under MIT (HASTECNOLOGIA SAS)
 * @author HASTECNOLOGIA S.A.S
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/components/model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from 'src/app/components/alert/alert.page'; 
import { AuthService } from 'src/app/components/services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { CobroService } from '../../services/cobro.service';
import { Intermediario } from '../../model/intermediario.model';
import { CarteraModal } from '../../model/carteramodal.model';
import { Cartera } from '../../model/cartera.model';
import { Campana } from '../../model/campana.model';

@Component({
  selector: 'app-buscarclientes',
  templateUrl: 'buscarclientes.page.html',
  styleUrls: ['buscarclientes.page.scss']
})
export class BuscarClientesPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsCartera: string[] = ['identificacion', 'nombres', 'apellidos', 'saldo', 'nrocredito', 'pagare', 'estado', 'intermediario','valorcuota','cuotas'];
  optionselectintermediario: string = 'close';
  carteras: CarteraModal;
  documento: any;
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private cobroservice: CobroService,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
      
    
    this.auth.loginUser(this.user).then(res => { 
    }, error => {
      if (error.status == 304) {
      } else if (error.status == 400) {
        this.alertPage.presentAlert("Clave incorrecta.");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o correo incorrectos. /" + error.message + ".");
      }
    });
  }
 
  /**
* Controlador opción ver garantias unica intermediario
* Metodo principal:openVer(Garantias);  
* @param Garantias
* @return optionsearch;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openConsultar() {
    this.carteras = new CarteraModal();
    this.carteras.cartera = new Array<Cartera>();
    this.dataSource = new MatTableDataSource<any>(this.carteras.cartera);
    setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
    this.cargador.getCargador(150)
    if (this.documento) {
      var pase = false;
      if (this.user.role === 'Super Maestro'||this.user.role === 'Coordinador') {
        this.cobroservice.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
              this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                });});
              pase = true;
              this.carteras.cartera.push(garantia)
            });
            if (pase) {
              this.dataSource = new MatTableDataSource<any>(this.carteras.cartera);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de cobranza " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        this.cobroservice.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO").where("intermediario", "==", this.user.maestro)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data())) 
              this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                });});
              pase = true;
              this.carteras.cartera.push(garantia)
            }); 
              if (pase) {
                this.dataSource = new MatTableDataSource<any>(this.carteras.cartera);
                setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
              } else {
                this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de cobranza " + this.documento + " ingresada.")
                this.documento = '';
              } 
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      if (this.user.role === 'Cobrador' ) {
        var validacamp = false;
        this.cobroservice.getAfsFirestore().collection("campana").where("cobrador", "==", this.user.email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var camp : Campana = JSON.parse(JSON.stringify(doc.data()))
            validacamp = true;
            this.cobroservice.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO").where("intermediario", "==", camp.intermediario)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
                this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                    garantia.intermediariodes = intermediario.sigla;
                  });});
                pase = true;
                this.carteras.cartera.push(garantia)
              }); 
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

           })
           }); 
           let mypromise = function functionOne() {
            //Empieza la promesa
            return new Promise((resolve, reject) => {
              return setTimeout(
                () => {
                  if (pase == true) {
                    resolve(pase);
                  } else {
                    resolve(pase);
                  }
                }, 2000
              );
            });
          };
          mypromise().then(() => {
            if (!pase) {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de cobranza " + this.documento + " ingresada en la campaña asignada.")
              this.documento = '';
             } else {
              this.dataSource = new MatTableDataSource<any>(this.carteras.cartera);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            
            }
          }) 
      }
    } else {
      this.documento = 'No a ingresado';
      this.alertPage.presentAlert("Error!. " + "Ingrese" + " no. Identificación de cobranza " + " creada.")
      this.documento = '';
    }
  }






}





