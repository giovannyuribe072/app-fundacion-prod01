/**
 * GARANTIAS PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (https://ficartera.com)
* Copyright 2020-2021 Start HASTECNOLOGIA S.A.S 
* @author HASTECNOLOGIA S.A.S Copyright 2020-2021 The FUNDACION SAN JOSE Authors
* pathweb=(https://ficartera.com/menu/cartera)
* pathAplicationConfig=cartera.page.html
* SecurityContext: @angular/fire/auth, APPLICATION_XML,'Access-Control-Allow-Origin' (solo por peticion Get se accede a este metodo)
* cartera v0.0.1 (https://ficartera.com/menu/cartera) 
* Copyright 2020-2021 FUNDACION SAN JOSE, Inc. 
* Licensed under MIT (https://ficartera.com)
 * @author HASTECNOLOGIA S.A.S
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from '../../alert/alert.page';
import { Intermediario } from '../../model/intermediario.model';
import { CarteraService } from '../../services/cartera.service';
import { Cartera } from '../../model/cartera.model';
import * as XLSX from 'xlsx';
import { Count, CountFiles } from '../../model/count.model';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { ModalController } from '@ionic/angular';
import { ExcelGarantias } from '../../model/excelcartera.model';
import { CarteraModal } from '../../model/carteramodal.model';
import { CarteraTotal } from '../../model/carteratotal.model';
import { AuthService } from '../../services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { Correo } from '../../model/correo.model';

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'carteramodaleliminar.page.html',
  styleUrls: ['cartera.page.scss']
})
export class ModalEliminarPage {

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
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'app-cartera',
  templateUrl: 'cartera.page.html',
  styleUrls: ['cartera.page.scss']
})
export class CarteraPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario = new Intermediario();
  garantia: Cartera = new Cartera();
  carteramodal: CarteraModal = new CarteraModal();
  optionselectintermediario: string = 'close';
  excelcartera: ExcelGarantias[] = [];
  count: Count[] = [];
  counts: Count = new Count();
  countfiles: CountFiles[] = [];
  fechareporte: Date;
  validateOpen = 0;

  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private carteraservice: CarteraService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
    this.validateOpen = 0;
  }

  ngOnInit() {
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getIntermediarios();
      this.getCount();
      this.getCountFiles();
    }, error => {
      if (error.status == 304) {

      } else if (error.status == 400) {
        this.alertPage.presentAlert("Clave incorrecta.");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o correo incorrectos. /" + error.message);
      }
    });
  }
  /**
  * Consulta contadores cartera metodo unico software. 
   * Metodo principal:getCount();  
   * @return Count[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getCount() {
    this.count = new Array<Count>();
    this.carteraservice.getCount().doc('countgarantias').get().subscribe((event) => {
      var count: any = event.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      this.count.push(countadd)
    });
  }

  /**
 * Consulta contadores ARCHIVOS metodo unico software. 
  * Metodo principal:getCountFiles();  
  * @return CountFiles[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCountFiles() {
    this.countfiles = new Array<CountFiles>();
    this.carteraservice.getCount().doc('countfiles').get().subscribe((events) => {
      this.countfiles.push(JSON.parse(JSON.stringify(events.data())))
    })
  }
  /**
* Controlador opción consultar cartera
* Metodo principal:consultarGarantias();  
* @return openModalConsultar(GarantiasModal);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  consultarGarantias() {

    var idcomision = true;
    this.carteramodal = new CarteraModal();
    if (this.validateOpen === 0) {
      this.validateOpen = 1
      this.carteramodal.carteratotal = new Array<CarteraTotal>();
      var pass = false;
      this.carteraservice.getCarteraTotal().get().subscribe((event) => {
        event.query.where("intermediario", "==", this.selectintermediario.nit).get().then((events) => {
          events.forEach(element => {
            let garantiaestado: CarteraTotal = JSON.parse(JSON.stringify(element.data()))
            if (garantiaestado.estado === 'CARGADO') {
              this.carteramodal.carteratotal.push(garantiaestado)
              pass = true;
            }
            return this.carteramodal.carteratotal;
          })
          if (pass) {
            this.carteramodal.intermediario = this.selectintermediario
            this.openModalConsultar(this.carteramodal);
          } else {
            this.alertPage.presentAlert("Ingrese reporte de cartera.")
          }
        })
      })
    }

  }
  /**
* Controlador opción crear cartera tipo comisión
* Metodo principal:crearGarantiasComisiones();  
* @return crearGarantias();
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearCartera() {
    this.crearCarteraCobranza();
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
    var userToLogin = this.carteraservice.getIntermediarios().get().subscribe((event) => {
      if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
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
  updateIntermediario() {
    this.carteraservice.getIntermediarios().get().subscribe((event) => {
      event.query.where("email", "==", this.selectintermediario.email).get().then((events) => {
        events.forEach(element => {
          return sessionStorage.setItem('intermediario', JSON.stringify(element.data()));
        })
      });
    })

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
    this.optionselectintermediario = 'open';
    sessionStorage.setItem('intermediario', JSON.stringify(user))
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
    this.getCount();
    sessionStorage.removeItem('intermediario')
    this.selectintermediario = new Intermediario();
    this.optionselectintermediario = 'close'
  }

  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:changeListener();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  changeListener($event, string: string): void {
    if ($event) {
      this.readThis($event.target, string);
    } else {
      this.readThis($event, string);
    }
  }
  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string): void {
    /* wire up file reader */
    this.excelcartera = new Array<ExcelGarantias>();
    this.selectintermediario.uploadfiles = new Array<UploadFilesIntermediario>();
    try {
      var file: File = inputValue.files[0];
    } catch (error) {
      var file: File = inputValue
    }
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
        const target: DataTransfer = <DataTransfer>(inputValue);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */

          (XLSX.utils.sheet_to_json(ws, { header: 1, dateNF: "dd.mm.yy" })).forEach(element => {
            let parseexcel: ExcelGarantias = JSON.parse(JSON.stringify(element))
            this.excelcartera.push(parseexcel)
          });
          this.countfiles.forEach(element => {
            this.carteraservice.updateCountFiles(element.countfiles + 1);
            let uploadfile = new UploadFilesIntermediario();
            uploadfile.nit = this.selectintermediario.nit
            uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
            uploadfile.fileToUpload = file;
            uploadfile.tipfile = string;
            this.selectintermediario.uploadfiles.push(uploadfile);
            this.getCountFiles();
          });

          var validacion = false;
          this.excelcartera.forEach(element => {
            let garantia: Cartera = new Cartera();
            if (element[0] !== 'CEDULA DEUDOR') {
              garantia.ceduladeudor = element[0]
            }
            if (element[1] !== 'NOMBRE DEUDOR') {
              garantia.nombredeudor = element[1]
            }
            if (element[2] !== 'CELULAR') {
              garantia.celular = parseInt(element[2])
            }
            if (element[3] !== 'MAIL') {
              garantia.mail = element[3]
            }
            if (element[4] !== 'DIRECCION') {
              garantia.direccion = element[4]
            }
            if (element[5] !== 'CIUDAD') {
              garantia.ciudad = element[5]
            }
            if (element[6] !== 'DEPARTAMENTO') {
              garantia.departamento = element[6]
            }
            if (element[7] !== 'NUMERO DE PAGARÉ') {
              garantia.nropagare = element[7]
            }
            if (element[8] !== 'VALOR CAPITAL') {
              garantia.valorcapital = element[8]
            }
            if (element[9] !== 'FECHA PRESTAMO') {
              garantia.fechaprestamo = this.ExcelDateToJSDate(element[9])
              garantia.fechaprestamoserial = element[9]
            }
            if (element[10] !== 'FECHA DE VENCIMIENTO') {
              garantia.fechavencimiento = this.ExcelDateToJSDate(element[10])
              garantia.fechavencimientoserial = element[10]
            }
            if (element[11] !== 'VALOR CUOTA') {
              garantia.valorcuota = element[11]
            }
            if (element[12] !== 'CUOTAS') {
              garantia.coutas = element[12]
            }
            garantia.estado = "CARGADO"
            var valida = true;
            var validaident = true;
            var validaplazo = true;
            var validasaldo = true;
            var validacobertura = true;
            var validanrocredito = true;
            var validanropagare = true;
            (garantia.ceduladeudor == '' || garantia.ceduladeudor == null) ? valida = false : null;
            (garantia.nombredeudor == '' || garantia.nombredeudor == null) ? validaident = false : null;
            (garantia.celular == '' || garantia.celular == null) ? validaplazo = false : null;
            (garantia.nropagare == '' || garantia.nropagare == null) ? validasaldo = false : null;
            (garantia.valorcapital == '' || garantia.valorcapital == null) ? validacobertura = false : null;
            (garantia.fechaprestamo == '' || garantia.fechaprestamo == null) ? validanrocredito = false : null;
            (garantia.fechavencimiento == '' || garantia.fechavencimiento == null) ? validanropagare = false : null;
            if (valida && validaident && validasaldo && validaplazo && validacobertura && validanrocredito && validanropagare) {
              this.carteramodal.cartera.push(garantia)
              return validacion = true;
            }
          }
          );
          var message = "";
          var validamen = false;
          var messageval = "";
          if (!validacion) {
            this.alertPage.presentAlert("Error!. " + "Cargue de cartera de formato nulo. " + message).then(() => {
              this.ngOnInit();
              this.updateIntermediario()
            })
          }
          if (validacion) {
            this.cargador.getCargador(50 * this.carteramodal.cartera.length)
            this.carteramodal.cartera.forEach(element => {
              this.carteraservice.getAfsFirestore().collection("cartera").where("intermediario", "==", this.selectintermediario.nit)
                .where("nropagare", "==", element.nropagare).get().then((result) => {
                  if (result.docs.length > 0) {
                    const index: number = this.carteramodal.cartera.indexOf(element);
                    this.carteramodal.cartera.splice(index, 1);
                  }
                })
            });

            this.alertPage.presentAlert("Exito!. " + "Cargue de cartera.")

          }
        };
        reader.readAsBinaryString(target.files[0]);
      } else {
        this.alertPage.presentAlert("Ingresar formato excel.")
      }
    }
  }

  /**
* Controlador opción crear cartera
* Metodo principal:crearGarantias();  
* @return cartera;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearCarteraCobranza() {
    if (this.carteramodal.cartera.length > 0) {
      this.cargador.getCargador(50 * this.carteramodal.cartera.length)
      this.count.forEach(element => {
        var index = element.count + 1
        this.carteraservice.crearCartera(this.carteramodal.cartera, this.selectintermediario, this.user, element, this.selectintermediario.uploadfiles[0].nombrefile)
        this.alertPage.presentAlert("Éxito!. " + "Cargue de cartera" + ". Identificador: " + index + " creado.").then(() => {
          this.excelcartera = new Array<ExcelGarantias>();
          this.ngOnInit();
          this.updateIntermediario()
        })
      });
    } else {
      this.alertPage.presentAlert("Error!. " + "Cargue de cartera" + ". con: " + this.carteramodal.cartera.length + " registros exitosos.")
    }


  }
  /**
* Controlador opción crear tipo comisión
* Metodo principal:ExcelDateToJSDate();  
* @return Date;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    var date: Date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    var day = date.getDate().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getFullYear().toString();
    var hour = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
    var day = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();

    return day + "/ " + hour;
  }

  /**
  * Abre carteramodalver.page.html usuario seleccionado 
  * Metodo principal:ModalVerPage();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openModalConsultar(cartera: CarteraModal) {
    const modal = await this.modalController.create({
      component: ModalVerPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { cartera }
    });
    modal.onDidDismiss()
      .then(() => {
        this.ngOnInit();
        this.validateOpen = 0;
        sessionStorage.removeItem('intermediario')
        sessionStorage.removeItem('comision')
      });
    return await modal.present();
  }


}


@Component({
  selector: 'modal-page',
  templateUrl: 'carteramodaleditar.page.html',
  styleUrls: ['cartera.page.scss']
})
export class ModalEditarPage implements OnInit {
  displayedColumnsGarantias: string[] = ['idgarantia', 'identificacion', 'nombres', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'editar'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  confirmacion: string = 'cancelar';
  garantias: CarteraModal = new CarteraModal();
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  garantiasTotal: CarteraTotal = JSON.parse(sessionStorage.getItem('garantiatotal'));
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  constructor(private auth: AuthService, private carteraservice: CarteraService, private modalController: ModalController) { }
  ngOnInit() {
    
    
    this.garantias.carteratotales = this.garantiasTotal
    var pase = false;
    this.carteraservice.getAfsFirestore().collection("cartera").where("intermediario", "==", this.garantiasTotal.intermediario).where("idgarantia", "==", parseInt(this.garantiasTotal.idgarantia)).orderBy("idgarantiaregistro")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
          pase = true;
          this.garantias.cartera.push(garantia)
        });
        if (pase) {
          this.dataSource = new MatTableDataSource<any>(this.garantias.cartera);
          setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
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
 *  Abre garantiasmodalaprobar.page.html  
 * Metodo principal:openEliminar(GarantiasTotal);  
 * @param GarantiasTotal
 * @return openEliminarModal(GarantiasTotal)
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  openEditar(doc: Cartera) {
    sessionStorage.setItem('histgarantia', JSON.stringify(doc))
    this.openEditarModal(doc)
  }
  /**
  * Abre garantiasmodaleliminar.page.html 
  * Metodo principal:openEliminarModal(GarantiasTotal);  
  * @param GarantiasTotal
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openEditarModal(doc: Cartera) {
    const modal = await this.modalController.create({
      component: ModalEditarConfirmPage,
      cssClass: 'my-custom-class-parametriza-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user: Cartera = data['data'];
        if (user.confirmacion === 'confirmar') {

          this.carteraservice.updateCarteraCargueTotal(user, this.user).then(() => {
            const index: number = this.garantias.cartera.indexOf(doc);
            this.garantias.cartera.splice(index, 1)
            this.garantias.cartera.push(user)
            this.dataSource = new MatTableDataSource<any>(this.garantias.cartera);
            setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
          })
        }
      });
    return await modal.present();

  }
  /**
 *  Abre garantiasmodalaprobar.page.html  
 * Metodo principal:openEliminar(GarantiasTotal);  
 * @param GarantiasTotal
 * @return openEliminarModal(GarantiasTotal)
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */

}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'carteramodaleditarconfirm.page.html',
  styleUrls: ['cartera.page.scss']
})
export class ModalEditarConfirmPage implements OnInit {
  garantiahist: Cartera = JSON.parse(sessionStorage.getItem('histgarantia'))
  option: string = "consult"
  comisiontotal = "EDITADO";
  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }
  /**
 * Opción confirmación APROBAR CARGUE. 
 * Metodo principal:confirmarEliminacion();  
 * @return dismiss(confirmación);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  confirmar() {
    this.garantiahist.confirmacion = 'confirmar'
    this.dismiss(this.garantiahist)
  }
  /**
  * Opción cancelar historico comisiones. 
   * Metodo principal:cancelarEliminacion();  
   * @return dismiss(cancelar);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cancelarEdicion() {
    this.garantiahist.confirmacion = 'cancelar'
    this.dismiss(this.garantiahist)
  }
  /**
  * Opción cerrar historico comisiones.  
   * Metodo principal:dismiss(confirmacion);  
   * @return dismiss(confirmacion);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  dismiss(confirmacion: Cartera) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
  /**
* Opción cerrar historico comisiones.  
 * Metodo principal:dismiss(confirmacion);  
 * @return dismiss(confirmacion);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  recalcular() {
    this.option = 'consult'
    this.comisiontotal = "NO EDITADO";
  }
  /**
* Opción cerrar historico comisiones.  
 * Metodo principal:dismiss(confirmacion);  
 * @return dismiss(confirmacion);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  calcular() {
    this.option = 'calcular'
  }

}
/**
 * CONTROLADOR DE LA PAGINA VER GARANTIAS Y CALCULOS TOTALES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'carteraver-page',
  templateUrl: 'carteramodalver.page.html',
  styleUrls: ['cartera.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() cartera: CarteraModal;
  optionsearch: string;
  documento: string;
  garantia: Cartera = new Cartera();
  correoinfo: Correo = new Correo();
  displayedColumnsCarteraTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'descargar', 'cartera', 'editar', 'eliminar'];
  displayedColumnsCarteraExcel: string[] = ['intermediario', 'ceduladeudor', 'nombredeudor', 'celular', 'mail', 'direccion', 'ciudad', 'departamento', 'nropagare', 'valorcapital', 'fechaprestamo', 'fechavencimiento', 'valorcuota', 'coutas'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  @ViewChild('paginatorCarteraTotal', { read: MatPaginator }) paginatorCarteraTotal: MatPaginator;
  constructor(private modalController: ModalController,
    private carteraservice: CarteraService,
    private alertPage: AlertPage,
    private cargador: CargadorService,
    private auth: AuthService) { }
  ngOnInit() {
    
    
    this.cartera.carteratotal.forEach(element => {
      this.carteraservice.TareaLeerCloudStorage(element.intermediario + element.nombrefile).subscribe(function (url) {
        element.nombrefiledownload = url
      });
    });
    this.optionsearch = 'search';
    this.dataSourceTotal = new MatTableDataSource<any>(this.cartera.carteratotal);
    setTimeout(() => this.dataSourceTotal.paginator = this.paginatorCarteraTotal);
  }

  /**
* Abre garantiasmodalaprobar.page.html 
* Metodo principal:openHistoricoModal(GarantiasTotal);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openEditarModal(element: CarteraTotal) {
    sessionStorage.setItem('garantiatotal', JSON.stringify(element));
    const modal = await this.modalController.create({
      component: ModalEditarPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
      });
    return await modal.present();

  }
  /**
* Controlador opción ver garantias unica intermediario
* Metodo principal:openVer(Garantias);  
* @param Garantias
* @return optionsearch;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  exportGarantias(garantiatotal: CarteraTotal) {
    var pase = false;
    this.cartera.cartera = new Array<Cartera>();
    this.carteraservice.getAfsFirestore().collection("cartera").where("idgarantia", "==", garantiatotal.idgarantia).where("intermediario", "==", garantiatotal.intermediario).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
          pase = true;
          this.cartera.cartera.push(garantia)
        });
        if (pase) {
          this.dataSource = new MatTableDataSource<any>(this.cartera.cartera);
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
  *  Cierra carteramodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return creacionusuarios.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.modalController.dismiss()
  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE GARANTIAS TOTAL. 
* Metodo principal:applyFilterCarteraTotal(string); 
* @param string 
* @return dataSourceTotal[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterCarteraTotal(filterValue: string) {
    this.dataSourceTotal.data.forEach(element => {

    });
    this.dataSourceTotal.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTotal.paginator) {
      this.dataSourceTotal.paginator.firstPage();
    }
  }


  /**
*  Abre carteramodalaprobar.page.html  
* Metodo principal:openEliminar(CarteraTotal);  
* @param CarteraTotal
* @return openEliminarModal(CarteraTotal)
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openEliminar(doc: CarteraTotal) {
    this.openEliminarModal(doc)
  }
  /**
* Abre carteramodaleliminar.page.html 
* Metodo principal:openEliminarModal(CarteraTotal);  
* @param CarteraTotal
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openEliminarModal(element: CarteraTotal) {
    const modal = await this.modalController.create({
      component: ModalEliminarPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.alertPage.presentAlert("Espere por favor.")
          let carteraTotal: CarteraTotal = element;
          var pase = false;
          this.carteraservice.getAfsFirestore().collection("cartera").where("intermediario", "==", carteraTotal.intermediario).where("idcoleccionfile", "==", carteraTotal.idcoleccionfile)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
                this.cartera.cartera.push(garantia)
                pase = true;
              });
              if (this.cartera.cartera.length == 0) {
                this.alertPage.closeAlert()
                if (carteraTotal.estado === "CARGADO") {
                  this.carteraservice.deleteCargueCartera(carteraTotal, this.cartera.cartera);
                  this.alertPage.presentAlert("Éxito reporte de cartera eliminado.").then(() => {
                    this.cerrarConsultar();
                  })
                }
              }
              if (pase) {
                this.alertPage.closeAlert()
                this.cargador.getCargador(50 * this.cartera.cartera.length);
                if (carteraTotal.estado === "CARGADO") {
                  this.carteraservice.deleteCargueCartera(carteraTotal, this.cartera.cartera);
                  this.alertPage.presentAlert("Éxito reporte de cartera eliminado.").then(() => {
                    this.cerrarConsultar();
                  })
                }
              }

            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      });
    return await modal.present();

  }

}




