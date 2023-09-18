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
import * as fileSaver from 'file-saver';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/components/model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from 'src/app/components/alert/alert.page';
import { AuthService } from 'src/app/components/services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { Seguimiento } from '../../model/seguimiento.model';
import { CarteraService } from '../../services/cartera.service';
import { AplicarPagos } from '../../model/aplicarpago.model';
import { Intermediario } from '../../model/intermediario.model';
import { Rol } from '../../model/rol.model';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
const EntityRole: Rol[] = [
  { rol: 'Todo' }, { rol: 'Ultimo Registro' }
]
@Component({
  selector: 'app-reportecobranza',
  templateUrl: 'reportecobranza.page.html',
  styleUrls: ['reportecobranza.page.scss']
})
export class ReporteCobranzaPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  seguimientos: Seguimiento[] = [];
  pagos: AplicarPagos[] = [];
  fechareportepago: Date;
  fechareporteseguimiento: Date;
  role = EntityRole;
  rolef;
  intermediarios: Intermediario[] = [];
  dataSourceSeguimiento: MatTableDataSource<any> = new MatTableDataSource();
  dataSourcePagos: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsSeguimientoExcel: string[] = ['intermediario', 'documento', 'nombredeudor', 'celular', 'direccion', 'mail', 'seguimiento', 'fechacompromiso', 'fechaproxima', 'caracterizacion', 'finllamada', 'valorapagar', 'diasmora', 'valorcapital', 'valorpago', 'creadopor', 'creadoen', 'modificadopor', 'modificadoen', 'modificacioncausa'];
  displayedColumnsPagosExcel: string[] = ['intermediario', 'documento', 'nombredeudor', 'valorpago', 'valorcapital', 'saldocapital', 'nropagare', 'rc', 'rcid', 'gac', 'intereses', 'valorgac', 'valorintereses', 'diasmora', 'valorapagar', 'cobrador', 'creadopor', 'creadoen', 'modificadopor', 'modificadoen', 'modificacioncausa', 'observacion'];
  @ViewChild('paginatorSeguimiento', { read: MatPaginator }) paginatorSeguimiento: MatPaginator;
  @ViewChild('paginatorPagos', { read: MatPaginator }) paginatorPagos: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private carteraService: CarteraService,
    private auth: AuthService) {
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() {
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getIntemediarios();
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
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getIntemediarios() {
    this.intermediarios = new Array<Intermediario>();
    this.carteraService.getAfsFirestore().collection("intermediarios").get().then((event) => {
      event.forEach(element => {
        this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  } 
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  consultarSeguimientos() { 
    if (this.fechareporteseguimiento) {
      if (this.rolef) {
        if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
          var paso = false;
          if (this.rolef === "Todo") {
            this.cargador.getCargador(10000000);
            this.seguimientos = new Array<Seguimiento>();
            const start = performance.now();
            return new Promise((resolve, reject) => {
              this.carteraService.getAfsFirestore().collection('seguimiento').orderBy('index').orderBy('documento').get().then((result) => {
                result.forEach(element => {
                  var valida = true;
                  var garantia: Seguimiento = JSON.parse(JSON.stringify(element.data())); 
                  (garantia.marcatiempo == undefined || garantia.marcatiempo == null) ? valida = false : null;
                  if (valida) {
                    var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                    if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareporteseguimiento.toString().substring(0, 4)) {
                      this.seguimientos.push(JSON.parse(JSON.stringify(element.data())))
                    }
                  } else {
                    this.seguimientos.push(JSON.parse(JSON.stringify(element.data())))
                  }
                });
              }).then(() => {
                const end = performance.now();
                const duration = end - start;
                resolve({ duration }); 
              }).catch((error) => {
                reject(error);
              })
            }).then(() => {
              if (this.seguimientos.length == 0) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else {
                const Heading = [
                  ['INSTITUCIÓN', 'DOCUMENTO', 'NOMBRE DEUDOR', 'CELULAR', 'DIRECCIÓN', 'MAIL', 'SEGUIMIENTO','FECHA COMPROMISO','FECHA PROXIMA LLAMADA',	'CARACTERIZACION','FINAL LLAMADA','VALOR A PAGAR','DIAS MORA','VALOR CAPITAL', 'VALOR PAGO','CREADO POR','CREADO EN','IDCOLECCION']
                ];
                const rows = this.seguimientos.map(row => ({
                  intermediario: row.intermediario,
                  documento: row.documento,
                  nombredeudor: row.nombredeudor,
                  celular:row.celular,
                  direccion: row.direccion,
                  mail: row.mail,
                  seguimiento: row.seguimiento,
                  fechacompromiso: row.fechacompromiso,
                  fechaproxima: row.fechaproxima,
                  caracterizacion: row.caracterizacion,
                  finllamada:row.finllamada,
                  valorapagar:row.valorapagar,
                  diasmora: row.diasmora,
                  valorcapital: row.valorcapital,
                  valorpago: row.valorpago,
                  creadopor: row.creadopor,
                  creadoen: row.creadoen,
                  idcoleccion:row.idcoleccion
                }));
                const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
                const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
                const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "reporteseguimiento");
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.cargador.getFinish();
              }
            });
          }
          if (this.rolef === "Ultimo Registro") {
            var unique = [];
            this.cargador.getCargador(10000000);
            this.seguimientos = new Array<Seguimiento>();
            const start = performance.now();
            return new Promise((resolve, reject) => {
              this.carteraService.getAfsFirestore().collection('seguimiento').orderBy('index', 'desc').get().then((result) => {
                result.forEach(element => {
                  var valida = true;
                  var garantia: Seguimiento = JSON.parse(JSON.stringify(element.data()));
                  if (!unique.includes(garantia.documento)) {
                    var valida = true;
                    (garantia.marcatiempo == undefined || garantia.marcatiempo == null) ? valida = false : null;
                    if (valida) {
                      var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                      if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareporteseguimiento.toString().substring(0, 4)) {
                        paso = true;
                        this.seguimientos.push(garantia)
                      }
                    } else {
                      paso = true;
                      this.seguimientos.push(garantia)
                    }
                    unique.push(garantia.documento);
                  }
                });
              }).then(() => {
                const end = performance.now();
                const duration = end - start;
                resolve({ duration });
              }).catch((error) => {
                reject(error);
              })
            }).then(() => {
              if (this.seguimientos.length == 0) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else { 
                const Heading = [
                  ['INSTITUCIÓN', 'DOCUMENTO', 'NOMBRE DEUDOR', 'CELULAR', 'DIRECCIÓN', 'MAIL', 'SEGUIMIENTO','FECHA COMPROMISO','FECHA PROXIMA LLAMADA',	'CARACTERIZACION','FINAL LLAMADA','VALOR A PAGAR','DIAS MORA','VALOR CAPITAL', 'VALOR PAGO','CREADO POR','CREADO EN','IDCOLECCION']
                ];
                const rows = this.seguimientos.map(row => ({
                  intermediario: row.intermediario,
                  documento: row.documento,
                  nombredeudor: row.nombredeudor,
                  celular:row.celular,
                  direccion: row.direccion,
                  mail: row.mail,
                  seguimiento: row.seguimiento,
                  fechacompromiso: row.fechacompromiso,
                  fechaproxima: row.fechaproxima,
                  caracterizacion: row.caracterizacion,
                  finllamada:row.finllamada,
                  valorapagar:row.valorapagar,
                  diasmora: row.diasmora,
                  valorcapital: row.valorcapital,
                  valorpago: row.valorpago,
                  creadopor: row.creadopor,
                  creadoen: row.creadoen,
                  idcoleccion:row.idcoleccion
                }));
                const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
                const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
                const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "reporteseguimiento");
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.cargador.getFinish(); 
              }
            });
          }
        }
        if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
          var paso = false;
          if (this.rolef === "Todo") {
            this.cargador.getCargador(10000000);
            this.seguimientos = new Array<Seguimiento>();
            const start = performance.now();
            return new Promise((resolve, reject) => {
              this.carteraService.getAfsFirestore().collection('seguimiento').where("intermediario", "==", this.user.maestro).orderBy('index').orderBy('documento').get().then((result) => {
                result.forEach(element => {
                  var valida = true;
                  var garantia: Seguimiento = JSON.parse(JSON.stringify(element.data()));
                  (garantia.marcatiempo == undefined || garantia.marcatiempo == null) ? valida = false : null;
                  if (valida) {
                    var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                    if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareporteseguimiento.toString().substring(0, 4)) {
                      this.seguimientos.push(JSON.parse(JSON.stringify(element.data())))
                    }
                  } else {
                    this.seguimientos.push(JSON.parse(JSON.stringify(element.data())))
                  }
                });
              }).then(() => {
                const end = performance.now();
                const duration = end - start;
                resolve({ duration });
                console.log(this.seguimientos)
              }).catch((error) => {
                reject(error);
              })
            }).then(() => {
              if (this.seguimientos.length == 0) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else { 
                const Heading = [
                  ['INSTITUCIÓN', 'DOCUMENTO', 'NOMBRE DEUDOR', 'CELULAR', 'DIRECCIÓN', 'MAIL', 'SEGUIMIENTO','FECHA COMPROMISO','FECHA PROXIMA LLAMADA',	'CARACTERIZACION','FINAL LLAMADA','VALOR A PAGAR','DIAS MORA','VALOR CAPITAL', 'VALOR PAGO','CREADO POR','CREADO EN','IDCOLECCION']
                ];
                const rows = this.seguimientos.map(row => ({
                  intermediario: row.intermediario,
                  documento: row.documento,
                  nombredeudor: row.nombredeudor,
                  celular:row.celular,
                  direccion: row.direccion,
                  mail: row.mail,
                  seguimiento: row.seguimiento,
                  fechacompromiso: row.fechacompromiso,
                  fechaproxima: row.fechaproxima,
                  caracterizacion: row.caracterizacion,
                  finllamada:row.finllamada,
                  valorapagar:row.valorapagar,
                  diasmora: row.diasmora,
                  valorcapital: row.valorcapital,
                  valorpago: row.valorpago,
                  creadopor: row.creadopor,
                  creadoen: row.creadoen,
                  idcoleccion:row.idcoleccion
                }));
                const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
                const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
                const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "reporteseguimiento");
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.cargador.getFinish();
              
              }
            });
          }
          if (this.rolef === "Ultimo Registro") {
            var unique = [];
            this.cargador.getCargador(10000000);
            this.seguimientos = new Array<Seguimiento>();
            const start = performance.now();
            return new Promise((resolve, reject) => {
              this.carteraService.getAfsFirestore().collection('seguimiento').where("intermediario", "==", this.user.maestro).orderBy('index', 'desc').get().then((result) => {
                result.forEach(element => {
                  var valida = true;
                  var garantia: Seguimiento = JSON.parse(JSON.stringify(element.data()));
                  if (!unique.includes(garantia.documento)) {
                    var valida = true;
                    (garantia.marcatiempo == undefined || garantia.marcatiempo == null) ? valida = false : null;
                    if (valida) {
                      var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                      if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareporteseguimiento.toString().substring(0, 4)) {
                        paso = true;
                        this.seguimientos.push(garantia)
                      }
                    } else {
                      paso = true;
                      this.seguimientos.push(garantia)
                    }
                    unique.push(garantia.documento);
                  }
                });
              }).then(() => {
                const end = performance.now();
                const duration = end - start;
                resolve({ duration });
              }).catch((error) => {
                reject(error);
              })
            }).then(() => {
              if (this.seguimientos.length == 0) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else {
                const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.seguimientos);
                const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "reporteseguimiento");
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.cargador.getFinish();
              }
            });
          }
        }
      } else {
        this.alertPage.presentAlert("Error! seleccionar filtro reporte de gestión consolidado.")
      }
    } else {
      this.alertPage.presentAlert("Error! seleccionar fecha reporte de gestión consolidado.")
    }

  }

  /**
    * Consulta Estado metodo unico software. 
     * Metodo principal:getEstado();  
     * @return Estado[];
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  /**
    * Consulta Estado metodo unico software. 
     * Metodo principal:getEstado();  
     * @return Estado[];
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  consultarPagos() {
    this.pagos = new Array<AplicarPagos>();
    if (this.fechareportepago) {
      this.cargador.getCargador(2000);
      if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
        var paso = false;
        this.carteraService.getAfsFirestore().collection("aplicarpago").orderBy('rcid').get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: AplicarPagos = JSON.parse(JSON.stringify(doc.data()))
              this.carteraService.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                    garantia.intermediariodes = intermediario.sigla;
                    var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                    if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareportepago.toString().substring(0, 4)) {
                      paso = true;
                      this.pagos.push(garantia)
                    }
                  });
                });
            });
            let mypromise = function functionOne() {
              //Empieza la promesa
              return new Promise((resolve, reject) => {
                return setTimeout(
                  () => {
                    if (paso == true) {
                      resolve(paso);
                    } else {
                      resolve(paso);
                    }
                  }, 2000
                );
              });
            };
            mypromise().then(() => {
              if (!paso) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else {
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.dataSourcePagos = new MatTableDataSource<any>(this.pagos);
                setTimeout(() => {
                  var elem = document.getElementById("pagosexcel");
                  elem.click();
                  this.dataSourcePagos.paginator = this.paginatorPagos;
                }
                );
              }
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        var paso = false;
        this.carteraService.getAfsFirestore().collection("aplicarpago").where("intermediario", "==", this.user.maestro).orderBy('rcid').get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: AplicarPagos = JSON.parse(JSON.stringify(doc.data()))
              this.carteraService.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                    garantia.intermediariodes = intermediario.sigla;
                    var datevalide = new Date(garantia.marcatiempo.seconds * 1000)
                    if (datevalide.getFullYear().toString().substring(0, 4) == this.fechareportepago.toString().substring(0, 4)) {
                      paso = true;
                      this.pagos.push(garantia)
                    }
                  });
                });
            });
            let mypromise = function functionOne() {
              //Empieza la promesa
              return new Promise((resolve, reject) => {
                return setTimeout(
                  () => {
                    if (paso == true) {
                      resolve(paso);
                    } else {
                      resolve(paso);
                    }
                  }, 2000
                );
              });
            };
            mypromise().then(() => {
              if (!paso) {
                this.alertPage.presentAlert("Error! sin consolidado para este año.")
              } else {
                this.alertPage.presentAlert("Exito! Reporte generado.")
                this.dataSourcePagos = new MatTableDataSource<any>(this.pagos);
                setTimeout(() => {
                  var elem = document.getElementById("pagosexcel");
                  elem.click();
                  this.dataSourcePagos.paginator = this.paginatorPagos;
                }
                );
              }
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    } else {
      this.alertPage.presentAlert("Error! seleccionar fecha reporte de pagos consolidado.")
    }

  }


}




