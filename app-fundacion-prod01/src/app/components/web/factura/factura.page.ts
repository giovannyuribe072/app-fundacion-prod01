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
import { User } from '../../model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from '../../alert/alert.page';
import { Intermediario } from '../../model/intermediario.model';
import { Garantias } from '../../model/garantias.model';
import { CountFiles } from '../../model/count.model';
import { ModalController } from '@ionic/angular';
import { GarantiasModal } from '../../model/garantiasmodal.model';
import { GarantiasTotal } from '../../model/garantiastotal.model';
import { AuthService } from '../../services/auth.service';
import { FacturaService } from '../../services/factura.service';
import { CargadorService } from '../../services/cargador.services';
import { Correo } from '../../model/correo.model';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'facturamodalaprobar.page.html',
  styleUrls: ['factura.page.scss']
})
export class ModalPage {
  count: CountFiles[] = [];
  confirmacion: string = 'cancelar';
  garantiastotal: GarantiasTotal = new GarantiasTotal();
  constructor(private alertPage: AlertPage, private modalController: ModalController, private facturaservice: FacturaService) {
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
        this.garantiastotal.nombrefilefactura = '-' + element.countfiles + '-' + file.name;
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
    (this.garantiastotal.nombrefilefactura == null || this.garantiastotal.nombrefilefactura === "") ? nombrefile = false : null;
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
  selector: 'app-factura',
  templateUrl: 'factura.page.html',
  styleUrls: ['factura.page.scss']
})
export class FacturaPage implements OnInit {
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
    private facturaservice: FacturaService,
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
        this.alertPage.presentAlert("Clave incorrecta");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o Correo incorrectos /" + error.message);
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
    this.selectintermediario = user;
    this.optionselectintermediario = 'open'
    this.cargador.getCargador(0)
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
          if (garantiaestado.estado === 'APROBADO' || garantiaestado.estado === 'FACTURADO') {
            this.garantiastotales.push(garantiaestado)
          }
          return this.garantiastotales;
        })
        if (this.garantiastotales.length === 0) {
          this.alertPage.presentAlert("Error! intermediario, sin cargue de garantías aprobado o facturado.").then(() => { this.optionselectintermediario = 'close' })
        } else {
          this.consultarGarantias();
        }
      });
    });
  }

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
        var datapase = true;
        const user = data['data'];
        (user === undefined) ? datapase = false : null;
        if (datapase) {

        }
      });
    return await modal.present();
  }

}
/**
 * CONTROLADOR DE LA PAGINA VER GARANTIAS Y CALCULOS TOTALES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'facturaver-page',
  templateUrl: 'facturamodalver.page.html',
  styleUrls: ['factura.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() garantias: GarantiasModal;
  optionsearch: string;
  documento: string;
  garantia: Garantias = new Garantias();
  displayedColumnsGarantiasExcel: string[] = ['intermediario', 'tipoidentificacion', 'identificacion', 'codigociiu', 'apellidos', 'nombres', 'municipiocliente', 'direccionclienteuno', 'direccionclientedos', 'telefonouno', 'telefonodos', 'celular', 'correoelectronico', 'nombrecodeudor', 'identificacioncodeudor', 'direccioncodeudor', 'telefonocodeudor', 'celularcodeudor', 'credito', 'pagare', 'plazo', 'periodo', 'tasa', 'fechadesembolso', 'fechavencimiento', 'amortizacion', 'periodogracia', 'valormontodesembolsado', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal'];
  displayedColumnsGarantias: string[] = ['idgarantia', 'identificacion', 'nombres', 'apellidos', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver'];
  displayedColumnsGarantiasTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'nombrefile', 'nombrefilefactura', 'carguefactura', 'devolver'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsComision: string[] = ['intermediario', 'nombrefile']; 
  validateOpen = 0; 
  correoinfo: Correo = new Correo();
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  @ViewChild('paginatorGarantiasTotal', { read: MatPaginator }) paginatorGarantiasTotal: MatPaginator; 
  constructor(private modalController: ModalController,
    private facturaservice: FacturaService,
    private alertPage: AlertPage,
    private correo: ServidorCorreoService, 
    private cargador: CargadorService,
    private auth:AuthService) { }
  ngOnInit() {    
    
    
    
    this.optionsearch = 'search';
    this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
    setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal); 
    this.garantias.garantiastotal.forEach(element => { 
      this.facturaservice.getAfsFirestore().collection('garantiasfile').doc(element.idcoleccionfile)
      if (element.nombrefilefactura) {
        this.facturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefilefactura).subscribe(function (url) {
          // `url` is the download URL for 'images/stars.jpg'
          element.urlFileUploadFactura = url
        });
      } else {
        this.alertPage.presentAlert("No tienes factura para el id de reporte de créditos afianzados #" + element.idgarantia)
      }
      if (element.nombrefile) {
        this.facturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefile).subscribe(function (url) {
          // `url` is the download URL for 'images/stars.jpg'
          element.urlFileUpload = url
        });
      } else {
        this.alertPage.presentAlert("No tienes archivo para el id de reporte de créditos afianzados #" + element.idgarantia)
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
    element.estado = 'CARGADO';
    this.facturaservice.updateEstadoCargueGarantia(element, this.user)
    this.alertPage.presentAlert('Cargue de garantías devuelto.')
    this.modalController.dismiss()
  }
  /**
  * Controlador opción cerrar ver esquema unico intermediario
  * Metodo principal:close();  
  * @return optionsearch;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  close() {
    this.documento = '';
    this.optionsearch = 'search';
  }
  /**
  *  Cierra garantiasmodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return creacionusuarios.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.modalController.dismiss()
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
          element.nombrefilefactura = user.nombrefilefactura
          element.estado = 'FACTURADO'; 
          this.correoinfo.ema = this.garantias.intermediario.email;
          this.correoinfo.des = "Se ha cargado la factura. " + 'id:' + element.idgarantia + '. Estado: ' + element.estado
          this.correoinfo.ent = element.intermediario;
          this.correoinfo.nom = this.garantias.intermediario.nombre;
          this.correoinfo.ciu = this.garantias.intermediario.ciudad; 
          this.facturaservice.updateEstadoCargueGarantia(element, this.user);
          this.facturaservice.updateTotalCargueGarantiaFactura(element, this.user);
          this.contactSend()
          this.alertPage.presentAlert("Éxito cargue de garantías facturado.").then(() => {   
            this.modalController.dismiss()
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
}




