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
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/components/model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from 'src/app/components/alert/alert.page';
import { Intermediario } from 'src/app/components/model/intermediario.model';
import { Garantias } from 'src/app/components/model/garantias.model';
import { CountFiles } from 'src/app/components/model/count.model';
import { ModalController } from '@ionic/angular';
import { GarantiasModal } from 'src/app/components/model/garantiasmodal.model';
import { GarantiasTotal } from 'src/app/components/model/garantiastotal.model';
import { AuthService } from 'src/app/components/services/auth.service';
import { ComprobanteService } from '../../services/comprobante.service';
import { CargadorService } from '../../services/cargador.services';
import { Correo } from '../../model/correo.model';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'comprobantemodalaprobar.page.html',
  styleUrls: ['comprobante.page.scss']
})
export class ModalPage {
  count: CountFiles[] = [];
  confirmacion: string = 'cancelar';
  garantiastotal: GarantiasTotal = new GarantiasTotal();
  constructor(private alertPage: AlertPage, private modalController: ModalController, private facturaservice: ComprobanteService) {
    this.getCount()
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
    this.facturaservice.getCount().doc('countfiles').get().subscribe((events) => {
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
    this.readThis($event.target, string);
  }
  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.count.forEach(element => {
        this.facturaservice.updateCountFiles(element.countfiles + 1);
        this.garantiastotal.nombrefilecomprobante = '-' + element.countfiles + '-' + file.name;
        this.garantiastotal.fileToUpload = file;
        this.getCount();
      });


    }
    myReader.readAsDataURL(file);
  }


  /**
* Crea Factura de garantias y pone cargue en estado facturado 
* Metodo principal:ModalVerPage();  
* @return void;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearFactura() {
    var nombrefile = true;
    (this.garantiastotal.nombrefilecomprobante == null || this.garantiastotal.nombrefilecomprobante === "") ? nombrefile = false : null;
    if (nombrefile) {
      this.garantiastotal.confirmacion = 'confirmar'
      this.modalController.dismiss(this.garantiastotal)
    } else {
      this.alertPage.presentAlert("Error cargue de Factura, inserte Factura")
    }

  }
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'app-comprobante',
  templateUrl: 'comprobante.page.html',
  styleUrls: ['comprobante.page.scss']
})
export class ComprobantePage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario = new Intermediario();
  garantiastotal: GarantiasTotal = new GarantiasTotal();
  garantiastotales: GarantiasTotal[] = [];
  optionselectintermediario: string = 'close';
  garantias: GarantiasModal;

  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private facturaservice: ComprobanteService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getIntermediarios();
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
  * Consulta Intermediario metodo unico software. 
   * Metodo principal:getIntermediarios(); 
   * @param user 
   * @return Intermediario[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getIntermediarios() {
    this.intermediarios = new Array<Intermediario>();
    var userToLogin = this.facturaservice.getIntermediarios().get().subscribe((event) => {
      if (this.user.role === 'Super Maestro') {
        event.forEach(element => {
          this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
          this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
          setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
          return this.intermediarios;
        });
        if (this.optionselectintermediario === 'open') {
          this.intermediarios.forEach(element => {
            if (this.selectintermediario.nit === element.nit) {
              this.selectIntermediario(element)
            }
          });
        }
      } if (this.user.role === 'Intermediario') {
        event.query.where("email", "==", this.user.email).get().then((events) => {
          events.forEach(element => {
            this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
            this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
            setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
            return this.intermediarios;
          })
          if (this.intermediarios) {
            this.intermediarios.forEach(element => {
              if (element.email === this.user.email) {
                this.selectIntermediario(element)
              }
            });
          }
        });
      } if (this.user.role === 'Maestro') {
        this.cargador.getCargador(0)
        event.query.where("nit", "==", this.user.maestro).get().then((events) => {
          events.forEach(element => {
            this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
            this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
            setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
            return this.intermediarios;
          })
          if (this.intermediarios) {
            this.intermediarios.forEach(element => {
              if (element.nit === this.user.maestro) {
                this.selectIntermediario(element)
              }
            });
          }
        });
      }
      return userToLogin;
    });
  }
  /**
 * FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
 * Metodo principal:applyFilterEsquemaUnico(string); 
 * @param string 
 * @return dataSourceIntermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  applyFilterIntermediarios(filterValue: string) {
    this.dataSourceIntermediario.data.forEach(element => {

    });
    this.dataSourceIntermediario.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceIntermediario.paginator) {
      this.dataSourceIntermediario.paginator.firstPage();
    }
  }
  /**
  * Controlador opción selección intermediario
  * Metodo principal:selectIntermediario();  
  * @return optionselectintermediario;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  selectIntermediario(user: Intermediario) {
    this.cargador.getCargador(0)
    this.selectintermediario = user;
    this.optionselectintermediario = 'open'
    this.getGarantiasTotalesIntermediario();
  }
  /**
* Controlador opción selección otro intermediario
* Metodo principal:selectOtherIntermediario();  
* @return optionselectintermediario;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  selectOtherIntermediario() {
    this.getIntermediarios();
    this.selectintermediario = new Intermediario();
    this.garantiastotal = new GarantiasTotal();
    this.optionselectintermediario = 'close'
  }

  /**
* Consulta comisiones intermediario metodo unico software. 
 * Metodo principal:getComisionesIntermediario();  
 * @return Comisiones[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getGarantiasTotalesIntermediario() {
    this.garantiastotales = new Array<GarantiasTotal>();
    this.facturaservice.getGarantiasTotales().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).orderBy("fechareporte").get().then((events) => {
        events.forEach(element => {
          let garantiaestado: GarantiasTotal = JSON.parse(JSON.stringify(element.data()))
         
          if (garantiaestado.estado === 'FACTURADO' || garantiaestado.estado === 'COMPROBADO') {
            this.garantiastotales.push(garantiaestado)
          }
          return this.garantiastotales;
        })
        if (this.garantiastotales.length === 0) {
          this.alertPage.presentAlert("Error! intermediario, sin cargue de garantías facturado o comprobado.").then(() => { this.optionselectintermediario = 'close' })
        } else { 
          this.consultarGarantias();
        }
      });
    });
  }

  /**
* Crea Factura de garantias y pone cargue en estado facturado 
* Metodo principal:ModalVerPage();  
* @return void;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
* 
  /**
* Controlador opción consultar garantias
* Metodo principal:consultarGarantias();  
* @return openModalConsultar(GarantiasModal);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  consultarGarantias() {
    this.garantias = new GarantiasModal();
    this.garantias.garantiastotal = this.garantiastotales
    this.garantias.intermediario = this.selectintermediario
    this.openModalConsultar(this.garantias);
  }
  /**
  * Abre garantiasmodalver.page.html usuario seleccionado 
  * Metodo principal:ModalVerPage();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openModalConsultar(garantias: GarantiasModal) {
    const modal = await this.modalController.create({
      component: ModalVerPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { garantias }
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.getIntermediarios()
        }
      }).then(() => {
      });
    return await modal.present();
  }




}
/**
 * CONTROLADOR DE LA PAGINA VER GARANTIAS Y CALCULOS TOTALES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'comprobantever-page',
  templateUrl: 'comprobantemodalver.page.html',
  styleUrls: ['comprobante.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() garantias: GarantiasModal;
  optionsearch: string;
  documento: string;
  garantia: Garantias = new Garantias();
  validateOpen = 0;
  correoinfo: Correo = new Correo();
  displayedColumnsGarantiasExcel: string[] = ['intermediario', 'tipoidentificacion', 'identificacion', 'codigociiu', 'apellidos', 'nombres', 'municipiocliente', 'direccionclienteuno', 'direccionclientedos', 'telefonouno', 'telefonodos', 'celular', 'correoelectronico', 'nombrecodeudor', 'identificacioncodeudor', 'direccioncodeudor', 'telefonocodeudor', 'celularcodeudor', 'credito', 'pagare', 'plazo', 'periodo', 'tasa', 'fechadesembolso', 'fechavencimiento', 'amortizacion', 'periodogracia', 'valormontodesembolsado', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal'];
  displayedColumnsGarantias: string[] = ['idgarantia', 'identificacion', 'nombres', 'apellidos', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver'];
  displayedColumnsGarantiasTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'nombrefile', 'nombrefilefactura', 'nombrefilecomprobante', 'carguecomprobante', 'aprobarcomprobante', 'devolvercomprobante'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  @ViewChild('paginatorGarantiasTotal', { read: MatPaginator }) paginatorGarantiasTotal: MatPaginator;
  constructor(private modalController: ModalController,
    private facturaservice: ComprobanteService,
    private alertPage: AlertPage,
    private correo: ServidorCorreoService,
    private cargador: CargadorService,
    private auth:AuthService) { }
  ngOnInit() { 
    
    
    
    this.optionsearch = 'search';
    this.garantias.garantiastotal.forEach(element => {
      this.facturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefilefactura).subscribe(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        element.urlFileUploadFactura = url
      });
      if (element.nombrefilecomprobante) {
        this.facturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefilecomprobante).subscribe(function (url) {
          // `url` is the download URL for 'images/stars.jpg'
          element.urlFileUploadComprobante = url
        });
      } else {
        this.alertPage.presentAlert("No tienes comprobante para el id de reporte de créditos afianzados #" + element.idgarantia)
      }
    });
    this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
    setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
  }

  /**
   * Controlador opción ver garantias unica intermediario
   * Metodo principal:openVer(Garantias);  
   * @param Garantias
   * @return optionsearch;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  openVer(doc: Garantias) {
    this.optionsearch = 'ver';
    this.garantia = doc;
  }
  /**
    *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
     * Metodo principal:verModalCreacionEdit();  
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:changeListener();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  devolverCargue(element: GarantiasTotal) {
    if (element.nombrefilecomprobante) {
      if (element.comprobado) {
        this.openDevolverModal(element)
      } else {
        this.alertPage.presentAlert("Error!, Garantías no comprobadas.")
      }
    } else {
      this.alertPage.presentAlert("Error!, Garantías sin comprobante.")
    }
  }

  /**
  * Abre garantiasmodalaprobar.page.html 
  * Metodo principal:openHistoricoModal(GarantiasTotal);  
  * @param EsquemaUnicoAnticipado
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openDevolverModal(element: GarantiasTotal) {
    const modal = await this.modalController.create({
      component: ModalDevolverComprobantePage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          element.estado = 'DEVUELTO';
          this.facturaservice.updateEstadoCargueGarantia(element, this.user)
          this.alertPage.presentAlert('Cargue de garantías devuelto.').then(() => {
            this.modalController.dismiss()
          })

        }
      });
    return await modal.present();

  }
  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:changeListener();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  close() {
    this.documento = '';
    this.optionsearch = 'search';
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
  this.garantias.garantias = new Array<Garantias>();
  if (this.documento) {
    var pase = false;
    this.facturaservice.getAfsFirestore().collection("garantias").where("estado", "==", 'CARGADO').where("intermediario", "==", this.garantias.garantiastotal[0].intermediario).where("idcomision", "==", parseInt(this.garantias.garantiastotal[0].idcomision)).where("identificacion", "==", parseInt(this.documento)).orderBy("idgarantia").orderBy("idgarantiaregistro").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
        pase = true;
        this.garantias.garantias.push(garantia)
      });
      if (pase) {
        this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
        setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
        this.optionsearch = 'consultar';
      } else {
        this.alertPage.presentAlert("Error!. " + "No existe:" + this.documento + " no. Identificación de garantia " + " Ingresada.")
        this.documento = '';
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });   
  } else {
    this.documento = 'No a ingresado';
    this.alertPage.presentAlert("Error!. " + "Ingrese:" + this.documento + " no. Identificación de garantia " + " creada.")
    this.documento = '';
  }
}
  /**
    * Controlador opción cerrar ver esquema unico intermediario
    * Metodo principal:close();  
    * @return optionsearch;
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  closeConsult() {
    this.optionsearch = 'consultar';
  }
  /**
  *  Cierra garantiasmodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return creacionusuarios.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.alertPage.closeAlert()
    this.modalController.dismiss()
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
 * Controlador opción ver garantias unica intermediario
 * Metodo principal:openVer(Garantias);  
 * @param Garantias
 * @return optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
   exportGarantias(garantiatotal: GarantiasTotal) {
    this.cargador.getCargador(0)
    var pase = false;
    this.garantias.garantias = new Array<Garantias>();
    this.facturaservice.getAfsFirestore().collection("garantias").where("fechareporte", "==", garantiatotal.fechareporte).where("idgarantia", "==", garantiatotal.idgarantia).where("intermediario", "==", garantiatotal.intermediario).orderBy("idgarantiaregistro").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
        pase = true;
        this.garantias.garantias.push(garantia)
      });
      if (pase) {
        this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
        setTimeout(() => {
          var elem = document.getElementById("garantiasexcel");
          elem.click();
          this.dataSource.paginator = this.paginatorGarantias;
        }
        );
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });  
  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE GARANTIAS TOTAL. 
* Metodo principal:applyFilterGarantiasTotal(string); 
* @param string 
* @return dataSourceTotal[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterGarantiasTotal(filterValue: string) {
    this.dataSourceTotal.data.forEach(element => {

    });
    this.dataSourceTotal.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTotal.paginator) {
      this.dataSourceTotal.paginator.firstPage();
    }
  }

  /**
*  Abre garantiasmodalaprobar.page.html  
* Metodo principal:openAprobar(GarantiasTotal);  
* @param GarantiasTotal
* @return openHistoricoModal(GarantiasTotal)
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openAprobar(element: GarantiasTotal) {
    this.openHistoricoModal(element)
  }
  /**
  * Abre garantiasmodalaprobar.page.html 
  * Metodo principal:openHistoricoModal(GarantiasTotal);  
  * @param EsquemaUnicoAnticipado
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openHistoricoModal(element: GarantiasTotal) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class-parametriza'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user.confirmacion === 'confirmar') {
          element.fileToUpload = user.fileToUpload
          element.nombrefilecomprobante = user.nombrefilecomprobante
          element.estado = 'COMPROBADO';
          this.alertPage.closeAlert();
          this.facturaservice.updateEstadoCargueGarantia(element, this.user);
          this.facturaservice.updateTotalCargueGarantiaFactura(element, this.user);
          this.alertPage.presentAlert("Éxito cargue de garantías comprobado.").then(() => {
            this.modalController.dismiss()
            this.facturaservice.getContactSendCont().get().subscribe((event) => {
              event.forEach(elementa => {
                var any: any = elementa.data()
                this.correoinfo.ema = any.email;
                this.correoinfo.des = any.contact + 'id:' + element.idgarantia + '. Estado: ' + element.estado
                this.correoinfo.ent = element.intermediario;
                this.correoinfo.nom = any.nom;
                this.correoinfo.ciu = any.ciu;
                this.contactSend()
              });
            })
            this.facturaservice.RegisterNotificacionEstadoCargueGarantia(element, this.user);
          })

        }
      });
    return await modal.present();
  }

  contactSend() {
    this.correo.getCorreo(this.correoinfo).subscribe(
      res => {
      }, error => error,
    )
  }
  /**
  * Abre garantiasmodalaprobar.page.html 
  * Metodo principal:openHistoricoModal(GarantiasTotal);  
  * @param EsquemaUnicoAnticipado
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  aprobarComprobado(element: GarantiasTotal) {
    if (element.nombrefilecomprobante) {
      if (!element.comprobado) {
        this.facturaservice.aprobarComprobado(this.garantias.intermediario, element, this.user);
        this.alertPage.presentAlert("Éxito! Saldo de coberturas de Garantías aumentado.").then(() => {
          this.getGarantiasTotalesIntermediario()
          this.modalController.dismiss('confirmar')
        })
      } else {
        this.alertPage.presentAlert("Error!, Garantías ya comprobadas.")
      }
    } else {
      this.alertPage.presentAlert("Error!, Garantías sin comprobante.")
    }
  }

  /**
 * Consulta comisiones intermediario metodo unico software. 
  * Metodo principal:getComisionesIntermediario();  
  * @return Comisiones[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getGarantiasTotalesIntermediario() {
    this.garantias.garantiastotal = new Array<GarantiasTotal>();
    this.facturaservice.getGarantiasTotales().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.garantias.intermediario.nit).orderBy("fechareporte").get().then((events) => {
        events.forEach(element => {
          let garantiaestado: GarantiasTotal = JSON.parse(JSON.stringify(element.data()))
          if (garantiaestado.estado === 'FACTURADO' || garantiaestado.estado === 'COMPROBADO') {
            this.garantias.garantiastotal.push(garantiaestado)
          }
          return this.garantias.garantiastotal;
        })
        this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
        setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
      });
    });
  }

}



/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-devolver-page',
  templateUrl: 'comprobantedevolver.page.html',
  styleUrls: ['comprobante.page.scss']
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

