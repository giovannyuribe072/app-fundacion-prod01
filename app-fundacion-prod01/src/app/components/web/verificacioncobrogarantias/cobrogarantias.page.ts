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
import { Garantias } from 'src/app/components/model/garantias.model';
import { CountFiles } from 'src/app/components/model/count.model';
import { ModalController } from '@ionic/angular';
import { GarantiasModal } from 'src/app/components/model/garantiasmodal.model';
import { AuthService } from 'src/app/components/services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { Contact } from '../../model/contact.model';
import { Intermediario } from '../../model/intermediario.model'; 
import { CobroService } from '../../services/cobro.service'; 


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'app-cobrogarantias',
  templateUrl: 'cobrogarantias.page.html',
  styleUrls: ['cobrogarantias.page.scss']
})
export class CobroGarantiasPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsGarantias: string[] = ['intermediario', 'identificacion', 'saldo', 'pagare', 'cartaintruccion', 'liquidacioncredito', 'anexoservicio', 'certificacionriesgo', 'cedulaciudadania', 'garantiapagada', 'eliminar', 'cargardoc'];
  optionselectintermediario: string = 'close';
  garantias: GarantiasModal;
  documento: any;
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private cobroservice: CobroService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getGarantias()
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

  getGarantias() {
    this.garantias = new GarantiasModal();
    this.garantias.garantias = new Array<Garantias>();
    var pase = false;
    if (this.user.role === 'Super Maestro') {
      this.cobroservice.getAfsFirestore().collection("garantias").where("estado", "in", ['EN TRAMITE', 'PAGADA'])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            pase = true;
            var valida = true;
            (garantia.anexoservicio == '' || garantia.anexoservicio == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.anexoservicio).subscribe(function (url) {
                garantia.anexoserviciourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.certificacionriesgo == '' || garantia.certificacionriesgo == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.certificacionriesgo).subscribe(function (url) {
                garantia.certificacionriesgourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.pagarefile == '' || garantia.pagarefile == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.pagarefile).subscribe(function (url) {
                garantia.pagareurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.cartainstruccion == '' || garantia.cartainstruccion == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.cartainstruccion).subscribe(function (url) {
                garantia.cartainstruccionurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.liquidacioncredito == '' || garantia.liquidacioncredito == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.liquidacioncredito).subscribe(function (url) {
                garantia.liquidacioncreditourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.cedulaciudadania == '' || garantia.cedulaciudadania == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.cedulaciudadania).subscribe(function (url) {
                garantia.cedulaciudadaniaurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.liquidaciongarantia == '' || garantia.liquidaciongarantia == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.liquidaciongarantia).subscribe(function (url) {
                garantia.liquidaciongarantiaurlFileUpload = url
              });
            }
            this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                  pase = true;
                  this.garantias.garantias.push(garantia)
                })
                if (pase) {
                  this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                  setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                }
              })

          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
      this.cobroservice.getAfsFirestore().collection("garantias").where("estado", "in", ['EN TRAMITE', 'PAGADA']).where("intermediario", "==", this.user.maestro)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            pase = true;
            var valida = true;
            (garantia.anexoservicio == '' || garantia.anexoservicio == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.anexoservicio).subscribe(function (url) {
                garantia.anexoserviciourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.certificacionriesgo == '' || garantia.certificacionriesgo == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.certificacionriesgo).subscribe(function (url) {
                garantia.certificacionriesgourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.pagarefile == '' || garantia.pagarefile == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.pagarefile).subscribe(function (url) {
                garantia.pagareurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.cartainstruccion == '' || garantia.cartainstruccion == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.cartainstruccion).subscribe(function (url) {
                garantia.cartainstruccionurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.liquidacioncredito == '' || garantia.liquidacioncredito == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.liquidacioncredito).subscribe(function (url) {
                garantia.liquidacioncreditourlFileUpload = url
              });
            }
            var valida = true;
            (garantia.cedulaciudadania == '' || garantia.cedulaciudadania == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.cedulaciudadania).subscribe(function (url) {
                garantia.cedulaciudadaniaurlFileUpload = url
              });
            }
            var valida = true;
            (garantia.liquidaciongarantia == '' || garantia.liquidaciongarantia == null) ? valida = false : null;
            if (valida) {
              this.cobroservice.TareaLeerCloudStorage(garantia.idgarantiaregistro + garantia.liquidaciongarantia).subscribe(function (url) {
                garantia.liquidaciongarantiaurlFileUpload = url
              });
            }
            this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                  pase = true;
                  this.garantias.garantias.push(garantia)
                })
                if (pase) {
                  this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                  setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                }
              })
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }



  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE GARANTIAS. 
* Metodo principal:applyFilterGarantias(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterGarantias(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
  * Abre garantiasmodalaprobar.page.html 
  * Metodo principal:openHistoricoModal(GarantiasTotal);  
  * @param EsquemaUnicoAnticipado
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openLiquidacionModal(element: Garantias) {
    if (element.estado == "EN TRAMITE") {
      sessionStorage.setItem('garantia', JSON.stringify(element))
      const modal = await this.modalController.create({
        component: ModalLiquidacionPage,
        cssClass: 'my-custom-class-parametriza-cobrar'
      });
      modal.onDidDismiss()
        .then((data) => {
          const user = data['data'];
          if (user === 'confirmar') {
            this.ngOnInit()
          }
        });
      return await modal.present();
    } else {
      this.alertPage.presentAlert("Crédito afianzado pagado.")
    }
  }



  /**
   * Abre garantiasmodalaprobar.page.html 
   * Metodo principal:openHistoricoModal(GarantiasTotal);  
   * @param EsquemaUnicoAnticipado
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  async openDevolverModal(element: Garantias) {
    const modal = await this.modalController.create({
      component: ModalDevolverComprobantePage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          var valida = true;
          (element.indicativo == '' || element.indicativo == null || element.indicativo == undefined) ? valida = false : null;
          if (valida) {
            element.saldorestante = (parseFloat(element.saldorestante) + parseFloat(element.saldocobrado)).toString()
            this.cobroservice.ReverseParcialGarantia(element)
            try {
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.pagarefile)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.liquidacioncredito)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.cartainstruccion)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.liquidaciongarantia)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.cedulaciudadania)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.anexoservicio)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.certificacionriesgo)
            } catch (error) {

            }
            const index: number = this.garantias.garantias.indexOf(element);
            this.garantias.garantias.splice(index, 1);
            this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
            setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            this.cobroservice.deleteGarantiaParcial(element)
          } else {
            try {
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.pagarefile)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.liquidacioncredito)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.cartainstruccion)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.liquidaciongarantia)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.cedulaciudadania)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.anexoservicio)
              this.cobroservice.TareaEliminarCloudStorage(element.idgarantiaregistro + element.certificacionriesgo)
            } catch (error) {

            }
            element.pagarefile = ""
            element.pagareurlFileUpload = null
            element.liquidacioncredito = ""
            element.liquidacioncreditourlFileUpload = null
            element.cartainstruccion = ""
            element.cartainstruccionurlFileUpload = null
            element.liquidaciongarantia = ""
            element.liquidaciongarantiaurlFileUpload = null
            element.cedulaciudadania = ""
            element.cedulaciudadaniaurlFileUpload = null
            element.anexoservicio = ""
            element.anexoserviciourlFileUpload = null
            element.certificacionriesgo = ""
            element.certificacionriesgourlFileUpload = null
            element.estado = "CARGADO"
            const index: number = this.garantias.garantias.indexOf(element);
            this.garantias.garantias.splice(index, 1);
            this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
            setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            this.cobroservice.updateGarantia(element)
            this.cobroservice.updateGarantiaLiq(element)
          }
        }
      });
    return await modal.present();

  }




}



/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-devolver-page',
  templateUrl: 'cobrogarantiascargar.page.html',
  styleUrls: ['cobrogarantias.page.scss']
})
export class ModalDevolverComprobantePage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }
  /**
 * Opción confirmación APROBAR CARGUE. 
 * Metodo principal:confirmarEliminacion();  
 * @return dismiss(confirmación);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }
  /**
  * Opción cancelar historico comisiones. 
   * Metodo principal:cancelarEliminacion();  
   * @return dismiss(cancelar);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }
  /**
  * Opción cerrar historico comisiones.  
   * Metodo principal:dismiss(confirmacion);  
   * @return dismiss(confirmacion);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'cobrogarantiasliquidacion.page.html',
  styleUrls: ['cobrogarantias.page.scss']
})
export class ModalLiquidacionPage {
  count: CountFiles[] = [];
  confirmacion: string = 'cancelar';
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  contact: Contact = new Contact();
  uploadfiles: UploadFilesIntermediario[] = [] = new Array<UploadFilesIntermediario>();
  constructor(private auth: AuthService, private correo: ServidorCorreoService, private alertPage: AlertPage, private modalController: ModalController, private cobroservice: CobroService) {
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getCount(); 
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
  * Opción cancelar historico comisiones. 
   * Metodo principal:cancelarEliminacion();  
   * @return dismiss(cancelar);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }
  /**
  * Opción cerrar historico comisiones.  
   * Metodo principal:dismiss(confirmacion);  
   * @return dismiss(confirmacion);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
  /**
* Consulta contadores metodo unico software. 
 * Metodo principal:getCount();  
 * @return CountFiles[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getCount() {
    this.count = new Array<CountFiles>();
    this.cobroservice.getCount().doc('countfiles').get().subscribe((events) => {
      this.count.push(JSON.parse(JSON.stringify(events.data())))
    })
  }
  /**
*  Lee archivos metodo unico software. 
 * Metodo principal:changeListener();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  changeListener($event, string: string): void {

    this.readThis($event.target, string, JSON.parse(sessionStorage.getItem('garantia')));

  }
  /**
  *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string, garantias: Garantias): void {

    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {


      this.count.forEach(element => {
        this.cobroservice.updateCountFiles(element.countfiles + 1);
        let uploadfile = new UploadFilesIntermediario();
        uploadfile.nit = garantias.idgarantiaregistro
        uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
        uploadfile.fileToUpload = file;
        uploadfile.tipfile = string;
        this.getCount();
        this.uploadfiles.push(uploadfile);
      });
    }
    myReader.readAsDataURL(file);
  }



  /**
*  Elimina archivo leido metodo unico software. 
 * Metodo principal:deleteDoc();  
 * @return UploadFilesIntermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  loadDoc() {
    var garantia: Garantias = JSON.parse(sessionStorage.getItem('garantia'))
    var intermediario: Intermediario
    this.cobroservice.getIntermediarios().get().subscribe((event) => {
      event.query.where("nit", "==", garantia.intermediario).get().then((events) => {
        events.forEach(element => {
          intermediario = JSON.parse(JSON.stringify(element.data()))
          this.contact.nom = "NOTIFICACIÓN COBRO DE CRÉDITO AFIANZADO"
          this.contact.ent = intermediario.sigla + " NOTIFICA COBRO DE CRÉDITO AFIANZADO DE " + garantia.identificacion + " POR VALOR DE: " + garantia.saldo
          this.contact.tel = garantia.celular
          this.contact.ciu = garantia.direccionclienteuno
          this.contact.ema = intermediario.email
          this.contact.des = "PAGADA"
          if (intermediario.coberturacreditomora > parseFloat(garantia.saldocobrado)) {
            this.cobroservice.aprobarCobro(JSON.parse(JSON.stringify(element.data())), garantia, this.user)
            if (this.uploadfiles.length >= 0) {
              this.uploadfiles.forEach(element => {
                garantia.liquidaciongarantia = element.nombrefile
                garantia.estado = "PAGADA"
                this.cobroservice.referenciaCloudStorage(element.nit + element.nombrefile);
                this.cobroservice.tareaCloudStorage(element.nit + element.nombrefile, element.fileToUpload);
              });
              this.cobroservice.updateGarantiaLiq(garantia)
              this.contactSend()
            } else {
              this.alertPage.presentAlert("Error, inserte documento")
            }
          } else {
            this.alertPage.presentAlert("Error, Saldo de cobertura insuficiente!")
          }
        })
      })
    })
    this.dismiss('confirmar')

  }


  contactSend() {
    this.correo.getCorreo(this.contact).subscribe(
      res => {
        this.alertPage.presentAlert("Exito. Pronto te contactaremos.").then(() => {
          this.contact = new Contact();
        })
      }, error => console.log(error),
    )

  }
}
