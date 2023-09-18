/**
 * GARANTIAS PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
* Copyright 2020-2021 Start HASTECNOLOGIA S.A.S 
* @author HASTECNOLOGIA S.A.S Copyright 2020-2021 The FUNDACION SAN JOSE Authors
* pathweb=(HASTECNOLOGIA SAS/menu/garantias)
* pathAplicationConfig=garantias.page.html
* SecurityContext: @angular/fire/auth, APPLICATION_XML,'Access-Control-Allow-Origin' (solo por peticion Get se accede a este metodo)
* garantias v0.0.1 (HASTECNOLOGIA SAS/menu/garantias) 
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
import { GarantiasService } from '../../services/garantias.service';
import { Comisiones } from '../../model/comisiones.model';
import { Garantias } from '../../model/garantias.model';
import { EsquemaUnicoAnticipado } from '../../model/esquemaunicoanticipado.model';
import * as XLSX from 'xlsx';
import { Count, CountFiles } from '../../model/count.model';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { ModalController } from '@ionic/angular';
import { ExcelGarantias } from '../../model/excelgarantias.model';
import { GarantiasModal } from '../../model/garantiasmodal.model';
import { GarantiasTotal } from '../../model/garantiastotal.model';
import { AuthService } from '../../services/auth.service';
import { ComisionLinealizada } from '../../model/comisionlinealizada.model';
import { CargadorService } from '../../services/cargador.services';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { Correo } from '../../model/correo.model';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodalaprobar.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalPage {

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
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodalmensual.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalLinealizadaMensualPage {

  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  garantiasmodal: GarantiasModal = new GarantiasModal();
  excelgarantias: ExcelGarantias[] = [];
  count: Count[] = [];
  counts: Count = new Count();
  countfiles: CountFiles[] = [];
  confirmacion: string = 'cancelar';
  comisiones: Comisiones[] = [];
  comision: Comisiones = new Comisiones();
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsGarantiasTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'aprobar'];
  selectintermediario: Intermediario = JSON.parse(sessionStorage.getItem('intermediario'))
  comisionlinealizada: ComisionLinealizada[] = [];
  fechareporte: Date;
  @ViewChild('paginatorGarantiasTotal', { read: MatPaginator }) paginatorGarantiasTotal: MatPaginator;
  constructor(private auth:AuthService,private alertPage: AlertPage, private modalController: ModalController, private garantiasservice: GarantiasService) { }

  ngOnInit() { 
    
    
    
    this.garantiasmodal.garantiatotales = JSON.parse(sessionStorage.getItem('garantiatotalmensual'))
    this.getComisionesIntermediario()
    this.getCount()
  }
  /**
   * Consulta contadores garantias metodo unico software. 
    * Metodo principal:getCount();  
    * @return Count[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  getCount() {
    this.count = new Array<Count>();
    this.garantiasservice.getCount().doc('countgarantias').get().subscribe((event) => {
      var count: any = event.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      this.count.push(countadd)
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
* Consulta comisiones intermediario metodo unico software. 
* Metodo principal:getComisionesIntermediario();  
* @return Comisiones[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesIntermediario() {
    this.comisiones = new Array<Comisiones>();
    this.garantiasservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).get().then((events) => {
        events.forEach(element => {
          this.comisiones.push(JSON.parse(JSON.stringify(element.data())))
          return this.comisiones;
        })
      });
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
    this.garantiasservice.getCount().doc('countfiles').get().subscribe((events) => {
      this.countfiles.push(JSON.parse(JSON.stringify(events.data())))
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
    if ($event) {
      this.readThis($event.target, string);
    } else {
      this.readThis($event, string);
    }
  }
  /**
* Controlador opción crear garantias tipo comisión
* Metodo principal:crearGarantiasComisiones();  
* @return crearGarantias();
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantiasComisiones() {
    let comisiones: Comisiones[] = this.comisiones
    var paso = false;
    this.comision.idcomision = this.garantiasmodal.garantiatotales.idcomision
    if (this.comision.idcomision) {
      if (this.excelgarantias.length > 0) {
        comisiones.forEach(element => {
          if (element.idcomision.toString() === this.comision.idcomision.toString()) {
            this.comision = element;
            paso = true;
          }
        });
      } else {
        this.alertPage.presentAlert("Ingrese reporte de créditos afianzados.")
      }
    } else {
      this.alertPage.presentAlert("Selecciona un tipo de comisión.")
    }
    if (paso) {
      if (this.comision.idlinea === '4') {
        var pase = false;
        if (this.comisionlinealizada.length > 0) {
          this.crearGarantias();
        } else {
          this.comisionlinealizada = new Array<ComisionLinealizada>();
          this.garantiasservice.getComisionesLinealizadasMensual().get().subscribe((event) => {
            event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.comision.idcomision).get().then((events) => {
              events.forEach(element => {
                this.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
                pase = true;
                return this.comisionlinealizada;
              })
              if (pase) {
                this.crearGarantias();
              }
            })
          })
        }

      }
    }
  }

  /**
 * Controlador opción crear garantias
 * Metodo principal:crearGarantias();  
 * @return garantias;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  crearGarantias() {
    this.garantiasmodal.garantias = new Array<Garantias>();
    var validacion = false;
    var message = "";
    var countcoberturatotal = 0;
    var countadministraciontotal = 0;
    var countivaadministraciontotal = 0;
    var countcomisiontotaltotal = 0;
    var countsaldototal = 0;
    this.excelgarantias.forEach(element => {
      let garantia: Garantias = new Garantias();
      garantia.idlinea = this.comision.idlinea
      if (element[0] !== 'CÓDIGO LINEA DE CRÉDITO') {
        garantia.codigolineacrediticio = element[0]
      }
      if (element[1] !== 'TIPO DE IDENTIFICACIÓN') {
        garantia.tipoidentificacion = element[1]
      }
      if (element[2] !== 'NO. IDENTIFICACIÓN') {
        garantia.identificacion = element[2]
      }
      if (element[3] !== 'CÓDIGO CIIU') {
        garantia.codigociiu = element[3]
      }
      if (element[4] !== 'APELLIDOS') {
        garantia.apellidos = element[4]
      }
      if (element[5] !== 'NOMBRES') {
        garantia.nombres = element[5]
      }
      if (element[6] !== 'MUNICIPIO CLIENTE') {
        garantia.municipiocliente = element[6]
      }
      if (element[7] !== 'DIRECCIÓN CLIENTE1') {
        garantia.direccionclienteuno = element[7]
      }
      if (element[8] !== 'DIRECCIÓN CLIENTE2') {
        garantia.direccionclientedos = element[8]
      }
      if (element[9] !== 'TELÉFONO 1') {
        garantia.telefonouno = element[9]
      }
      if (element[10] !== 'TELÉFONO 2') {
        garantia.telefonodos = element[10]
      }
      if (element[11] !== 'NO. CELULAR') {
        garantia.celular = element[11]
      }
      if (element[12] !== 'CORREO ELECTRÓNICO') {
        garantia.correoelectronico = element[12]
      }
      if (element[13] !== 'NOMBRE CODEUDOR') {
        garantia.nombrecodeudor = element[13]
      }
      if (element[14] !== 'NO. IDENTIFICACIÓN CODEUDOR') {
        garantia.identificacioncodeudor = element[14]
      }
      if (element[15] !== 'DIRECCIÓN CODEUDOR') {
        garantia.direccioncodeudor = element[15]
      }
      if (element[16] !== 'TELÉFONO CODEUDOR') {
        garantia.telefonocodeudor = element[16]
      }
      if (element[17] !== 'NO. CELULAR CODEUDOR') {
        garantia.celularcodeudor = element[17]
      }
      if (element[18] !== 'NO. DE CRÉDITO') {
        garantia.credito = element[18]
      }
      if (element[19] !== 'NO. PAGARÉ') {
        garantia.pagare = element[19]
      }

      if (element[20] !== 'PLAZO OBLIGACIÓN') {
        garantia.plazo = element[20]
      }

      if (element[21] !== 'PERIODO DE COBERTURA') {
        garantia.periodo = element[21]
      }

      if (element[22] !== 'TASA E.A. APLICADA') {
        garantia.tasa = element[22]
      }

      if (element[23] !== 'FECHA DESEMBOLSO (DD/MM/AAAA)') {
        garantia.fechadesembolso = this.ExcelDateToJSDate(element[23]).toString()
      }

      if (element[24] !== 'FECHA DE VENCIMIENTO (DD/MM/AAAA)') {
        garantia.fechavencimiento = this.ExcelDateToJSDate(element[24]).toString()
      }

      if (element[25] !== 'AMORTIZACIÓN') {
        garantia.amortizacion = element[25]
      }

      if (element[26] !== 'PERIODO DE GRACIA') {
        garantia.periodogracia = element[26]
      }

      if (element[27] !== 'VALOR DEL MONTO DESEMBOLSADO') {
        garantia.valormontodesembolsado = element[27]
      }

      if (element[28] !== 'SALDO') {
        try {
          garantia.saldo = element[28].replace(/\./g, '')
        } catch (error) {
          garantia.saldo = element[28]
        }
        garantia.idcomision = this.comision.idcomision
        garantia.idcomisionregistro = this.comision.idcomisionregistro

        if (garantia.idlinea === '4') {
          this.comisionlinealizada.forEach(element => {
            if (parseFloat(element.mesescredito) === parseFloat(garantia.plazo)) {
              garantia.cobertura = (parseFloat(garantia.saldo) * (parseFloat(element.cobertura)) / 100).toString()
              garantia.administracion = (parseFloat(garantia.saldo) * (parseFloat(element.administracion)) / 100).toString()
              garantia.ivaadministracion = (parseFloat(garantia.saldo) * (parseFloat(element.ivaadministracion)) / 100).toString()
              garantia.comisiontotal = (parseFloat(garantia.cobertura) + parseFloat(garantia.administracion) + parseFloat(garantia.ivaadministracion)).toString()
              countcoberturatotal = countcoberturatotal + parseFloat(garantia.cobertura);
              countadministraciontotal = countadministraciontotal + parseFloat(garantia.administracion);
              countivaadministraciontotal = countivaadministraciontotal + parseFloat(garantia.ivaadministracion);
              countcomisiontotaltotal = countcomisiontotaltotal + parseFloat(garantia.comisiontotal);
              countsaldototal = countsaldototal + parseFloat(garantia.saldo);
            }
          });
        }
        garantia.estado = 'CARGADO';
      }
      var valida = true;
      var validaident = true;
      var validaplazo = true;
      var validasaldo = true;
      var validacobertura = true;
      var validanrocredito = true;
      var validanropagare = true;
      (garantia.identificacion == '' || garantia.identificacion == null) ? valida = false : null;
      (garantia.tipoidentificacion == '' || garantia.tipoidentificacion == null) ? validaident = false : null;
      (garantia.plazo == '' || garantia.plazo == null) ? validaplazo = false : null;
      (garantia.saldo == '' || garantia.saldo == null) ? validasaldo = false : null;
      (garantia.cobertura == '' || garantia.cobertura == null) ? validacobertura = false : null;
      (garantia.credito == '' || garantia.credito == null) ? validanrocredito = false : null;
      (garantia.pagare == '' || garantia.pagare == null) ? validanropagare = false : null;
      if (!validanrocredito) {
        message = message + " Error por nro credito nulo."
      }
      if (!validanropagare) {
        message = message + " Error por nro pagare nulo."
      }
      if (valida && validaident && validasaldo && validaplazo && validacobertura && validanrocredito && validanropagare) {
        this.garantiasmodal.garantias.push(garantia)
        return validacion = true;
      }
    });
    if (!validacion) {
      this.alertPage.presentAlert("Error!. " + "Cargue de reporte de créditos afianzados de formato nulo. " + message).then(() => {
        this.ngOnInit();
        this.updateIntermediario()
      })
    }
    if (validacion) {

      var garantiastotales: GarantiasTotal[] = new Array<GarantiasTotal>()
      var garantiatotal: GarantiasTotal = new GarantiasTotal()
      garantiatotal.cobertura = countcoberturatotal.toString()
      garantiatotal.administracion = countadministraciontotal.toString()
      garantiatotal.ivaadministracion = countivaadministraciontotal.toString()
      garantiatotal.comisiontotal = countcomisiontotaltotal.toString()
      garantiatotal.estado = 'CARGADO'
      garantiatotal.idgarantia = this.garantiasmodal.garantiatotales.idgarantia
      garantiatotal.fechareporte = this.garantiasmodal.garantiatotales.fechareporte
      garantiastotales.push(garantiatotal)
      this.dataSourceTotal = new MatTableDataSource<any>(garantiastotales);
      setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);

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
  openAprobar(doc: GarantiasTotal) {
    this.openHistoricoModal(doc)
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
        if (user === 'confirmar') {
          let garantiasTotalColocada: GarantiasTotal = JSON.parse(sessionStorage.getItem('garantiatotalcolocada'));
          let garantiasTotal: GarantiasTotal = element;
          garantiasTotal.idgarantia = garantiasTotalColocada.idgarantia
          garantiasTotal.idcoleccionfile = garantiasTotalColocada.idcoleccionfile
          this.count.forEach(element => {
            var index = element.count + 1
            this.garantiasservice.crearGarantiasRecaudado(this.garantiasmodal.garantias, this.selectintermediario, this.user, element, garantiasTotalColocada.nombrefile, this.garantiasmodal.garantiatotales.fechareporte.toString().substring(0, 7))
          });
          if (garantiasTotalColocada.estado === "CARGADO") {
            garantiasTotalColocada.estado = 'COLOCADO'
            this.garantiasservice.updateEstadoCargueGarantiaRecaudo(garantiasTotalColocada, this.user);
            this.alertPage.presentAlert("Éxito.").then(() => {
              this.cerrarConsultar();
            })
          } else {
            this.cerrarConsultar();
            this.alertPage.presentAlert("Error reporte de créditos afianzados no aprobado.").then(() => {
              this.cerrarConsultar();
            })
          }
        }
      });
    return await modal.present();

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
   * Controlador opción selección intermediario
   * Metodo principal:selectIntermediario();  
   * @return optionselectintermediario;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  updateIntermediario() {
    this.garantiasservice.getIntermediarios().get().subscribe((event) => {
      event.query.where("email", "==", this.selectintermediario.email).get().then((events) => {
        events.forEach(element => {
          return sessionStorage.setItem('intermediario', JSON.stringify(element.data()));
        })
      });
    })

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

    return day;
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
    this.excelgarantias = new Array<ExcelGarantias>();
    this.selectintermediario.uploadfiles = new Array<UploadFilesIntermediario>();
    try {
      var file: File = inputValue.files[0];
    } catch (error) {
      var file: File = inputValue
    }
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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
            this.excelgarantias.push(parseexcel)
          });
          this.countfiles.forEach(element => {
            this.garantiasservice.updateCountFiles(element.countfiles + 1);
            let uploadfile = new UploadFilesIntermediario();
            uploadfile.nit = this.selectintermediario.nit
            uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
            uploadfile.fileToUpload = file;
            uploadfile.tipfile = string;
            this.selectintermediario.uploadfiles.push(uploadfile);
            this.getCountFiles();
          });
        };
        reader.readAsBinaryString(target.files[0]);
      } else {
        this.alertPage.presentAlert("Ingresar formato excel.")
      }
    }
  } /**
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
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodalsumarcargue.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalSumarCarguePage {
  datafecha: GarantiasTotal[] = JSON.parse(sessionStorage.getItem('datafecha'));
  displayedColumnsGarantiasTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'seleccionar'];
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  confirmacion: string = 'cancelar';
  selection
  alert = false;
  sumacargue: GarantiasTotal[] = new Array<GarantiasTotal>()
  arraygarantias: Garantias[] = [];
  garantiasmodal: GarantiasModal = new GarantiasModal();
  garantias: Garantias;
  count: Count[] = [];
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @ViewChild('paginatorGarantiasTotal', { read: MatPaginator }) paginatorGarantiasTotal: MatPaginator;
  constructor(private auth: AuthService,private cargador: CargadorService, private modalController: ModalController, private alertPage: AlertPage, private garantiasservice: GarantiasService) {
    this.alertPage.presentAlert('Suma de cargues por fecha de reporte.')
    this.dataSourceTotal = new MatTableDataSource<any>(this.datafecha);
    setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
    const allowMultiSelect = true;
    this.selection = new SelectionModel<GarantiasTotal>(allowMultiSelect, this.datafecha);
    this.sumacargue = new Array<GarantiasTotal>()
    this.arraygarantias = new Array<Garantias>() 
    
    
    
  }

  /**
  * Opción confirmación APROBAR CARGUE. 
  * Metodo principal:confirmarEliminacion();  
  * @return dismiss(confirmación);
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(element: GarantiasTotal) {
    var garantiatotal: GarantiasTotal = new GarantiasTotal()
    garantiatotal = element;
    if (this.sumacargue.length === 0) {
      this.garantias = new Garantias()
      this.sumacargue = new Array<GarantiasTotal>();
      this.arraygarantias = new Array<Garantias>();
      this.alert = false;
      sessionStorage.setItem('fechacargue', garantiatotal.fechareporte.toString())
      this.sumacargue.push(garantiatotal)
    } else {
      sessionStorage.setItem('fechacargue', garantiatotal.fechareporte.toString())
      const index: number = this.sumacargue.indexOf(garantiatotal);
      this.sumacargue.forEach((elements, indexs) => {
        if (index === indexs) {
          sessionStorage.removeItem('fechacargue')
          this.alert = false;
          return this.sumacargue.splice(indexs, 1);
        } else {
          if (elements.fechareporte.toString() === sessionStorage.getItem('fechacargue')) {
            return this.sumacargue.push(garantiatotal)
          } else {
            this.alert = true;
          }
        }
      });
      if (this.alert) {
        this.alertPage.presentAlert('Primer cargue seleccionado es diferente su fecha.')
      }
    }
  }
  /**
 * Opción confirmación APROBAR CARGUE. 
 * Metodo principal:confirmarEliminacion();  
 * @return dismiss(confirmación);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  sumarCargue() {
    if (this.sumacargue.length === 0) {
      this.alertPage.presentAlert('Error! Selecciona un reporte de créditos afianzados.')
    }
    if (this.sumacargue.length === 1) {
      this.alertPage.presentAlert('Error! Selecciona almenos dos reporte de créditos afianzados.')
    } else {
      if (!this.alert) {
        if (this.sumacargue.length > 0) {
          this.getCount()
        }
      } else {
        this.alertPage.presentAlert('Error! No se puede procesar suma selección incorrecta')
      }

    }
  }

  /**
* Controlador opción crear garantias
* Metodo principal:crearGarantias();  
* @return garantias;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantias() {
    this.garantiasmodal.garantias = new Array<Garantias>();
    var validacion = false;
    var saldototal;
    this.arraygarantias.forEach(element => {
      let garantia: Garantias = new Garantias();
      garantia.idcomision = element.idcomision
      garantia.idcomisionregistro = element.idcomisionregistro
      garantia.idlinea = element.idlinea
      garantia.estado = element.estado
      garantia.fechadesembolso = element.fechadesembolso,
        garantia.fechavencimiento = element.fechavencimiento,
        garantia.codigolineacrediticio = element.codigolineacrediticio
      garantia.tipoidentificacion = element.tipoidentificacion
      garantia.identificacion = element.identificacion
      garantia.codigociiu = element.codigociiu
      garantia.apellidos = element.apellidos
      garantia.nombres = element.nombres
      garantia.municipiocliente = element.municipiocliente
      garantia.direccionclienteuno = element.direccionclienteuno
      garantia.direccionclientedos = element.direccionclientedos
      garantia.telefonouno = element.telefonouno
      garantia.telefonodos = element.telefonodos
      garantia.celular = element.celular
      garantia.correoelectronico = element.correoelectronico
      garantia.nombrecodeudor = element.nombrecodeudor
      garantia.identificacioncodeudor = element.identificacioncodeudor
      garantia.direccioncodeudor = element.direccioncodeudor
      garantia.telefonocodeudor = element.telefonocodeudor
      garantia.celularcodeudor = element.celularcodeudor
      garantia.credito = element.credito
      garantia.pagare = element.pagare
      garantia.plazo = element.plazo
      garantia.periodo = element.periodo
      garantia.tasa = element.tasa
      garantia.amortizacion = element.amortizacion
      garantia.periodogracia = element.periodogracia
      garantia.valormontodesembolsado = element.valormontodesembolsado
      garantia.saldo = element.saldo
      garantia.cobertura = element.cobertura
      garantia.administracion = element.administracion
      garantia.ivaadministracion = element.ivaadministracion
      garantia.comisiontotal = element.comisiontotal
      var valida = true;
      var validaident = true;
      var validaplazo = true;
      var validasaldo = true;
      var validacobertura = true;
      (garantia.identificacion == '' || garantia.identificacion == null) ? valida = false : null;
      (garantia.tipoidentificacion == '' || garantia.tipoidentificacion == null) ? validaident = false : null;
      (garantia.plazo == '' || garantia.plazo == null) ? validaplazo = false : null;
      (garantia.saldo == '' || garantia.saldo == null) ? validasaldo = false : null;
      (garantia.cobertura == '' || garantia.cobertura == null) ? validacobertura = false : null;
      if (valida && validaident && validasaldo && validaplazo && validacobertura) {
        this.garantiasmodal.garantias.push(garantia)
        return validacion = true;
      }
    });
    if (!validacion) {
      this.alertPage.presentAlert("Error!. " + "Cargue de reporte de créditos afianzados de formato nulo.").then(() => {
        this.confirmarEliminacion()
      })
    }
    if (validacion) {
      this.count = new Array<Count>();
      var paso = false;
      try {
        this.garantiasservice.getCount().doc('countgarantias').get().subscribe((event) => {
          var count: any = event.data()
          var countadd: Count = new Count();
          countadd.count = count.count
          countadd.indexcount = count.indexcount
          this.count.push(countadd)
          paso = true;
          if (paso) {
            this.count.forEach(elements => {
              var index = elements.count + 1
              this.garantiasservice.crearGarantias(this.garantiasmodal.garantias, JSON.parse(sessionStorage.getItem('intermediario')), this.user, elements, '', this.sumacargue[0].fechareporte.toString().substring(0, 7))
              this.alertPage.presentAlert('Éxito! Cargues sumados correctamente' + ". Identificador: " + index + " Creado.").then(() => {
                this.confirmarEliminacion()
              })
            });
            this.sumacargue.forEach(element => {
              this.garantiasservice.deleteCargueGarantiaSum(element, this.arraygarantias)
            });
          }
        });
      } catch (error) {

      }
    }
  }
  /**
 * Metodo de suma final garantias metodo unico software. 
  * Metodo principal:getCount();  
  * @return Count[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCount() {
    this.cargador.getCargador(2000 * 5)

    var resolvedFlag = false;
    this.sumacargue.forEach(element => {
      this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", element.intermediario).where("idgarantia", "==", parseInt(element.idgarantia)).orderBy("idgarantiaregistro").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            resolvedFlag = true;
            this.arraygarantias.push(garantia)
            return this.arraygarantias;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    });
    let mypromise = function functionOne() {
      //Empieza la promesa
      return new Promise((resolve, reject) => {
        return setTimeout(
          () => {
            if (resolvedFlag == true) {
              resolve(resolvedFlag);
            } else {
              reject("Rejected")
            }
          }, 2000 * 5
        );
      });
    };
    mypromise().then(() => {
      if (resolvedFlag) {
        this.crearGarantias()
      }
    })
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
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodaleditar.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalEditarPage implements OnInit {
  displayedColumnsGarantias: string[] = ['idgarantia', 'identificacion', 'nombres', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'editar'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  confirmacion: string = 'cancelar';
  garantias: GarantiasModal = new GarantiasModal();
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  garantiasTotal: GarantiasTotal = JSON.parse(sessionStorage.getItem('garantiatotal'));
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  constructor(private garantiasservice: GarantiasService, private modalController: ModalController) { }
  ngOnInit() {
    this.garantias.garantiatotales = this.garantiasTotal
    var pase = false;
    this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.garantiasTotal.intermediario).where("idgarantia", "==", parseInt(this.garantiasTotal.idgarantia)).orderBy("idgarantiaregistro")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
          pase = true;
          this.garantias.garantias.push(garantia)
        });
        if (pase) {
          this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
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
  openEditar(doc: Garantias) {
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
  async openEditarModal(doc: Garantias) {
    const modal = await this.modalController.create({
      component: ModalEditarConfirmPage,
      cssClass: 'my-custom-class-parametriza-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user: Garantias = data['data'];
        if (user.confirmacion === 'confirmar') {
          this.garantiasTotal.cobertura = (parseFloat(this.garantiasTotal.cobertura) - parseFloat(doc.cobertura)).toString()
          this.garantiasTotal.administracion = (parseFloat(this.garantiasTotal.administracion) - parseFloat(doc.administracion)).toString()
          this.garantiasTotal.ivaadministracion = (parseFloat(this.garantiasTotal.ivaadministracion) - parseFloat(doc.ivaadministracion)).toString()
          this.garantiasTotal.comisiontotal = (parseFloat(this.garantiasTotal.comisiontotal) - parseFloat(doc.comisiontotal)).toString()
          this.garantiasTotal.cobertura = (parseFloat(this.garantiasTotal.cobertura) + parseFloat(user.cobertura)).toString()
          this.garantiasTotal.administracion = (parseFloat(this.garantiasTotal.administracion) + parseFloat(user.administracion)).toString()
          this.garantiasTotal.ivaadministracion = (parseFloat(this.garantiasTotal.ivaadministracion) + parseFloat(user.ivaadministracion)).toString()
          this.garantiasTotal.comisiontotal = (parseFloat(this.garantiasTotal.comisiontotal) + parseFloat(user.comisiontotal)).toString()
          this.garantiasservice.updateGarantiaCargueTotal(this.garantiasTotal, user, this.user).then(() => {
            const index: number = this.garantias.garantias.indexOf(doc);
            this.garantias.garantias.splice(index, 1)
            this.garantias.garantias.push(user)
            this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
            setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
          })
        }
      });
    return await modal.present();

  }

  consultGarantia() {
    var pass = false;
    this.garantias.garantiatotales = this.garantiasTotal
    this.garantias.garantias = new Array<Garantias>();
    this.garantiasservice.getGarantiasTotal().get().subscribe((event) => {
      event.query.where("estado", "==", 'CARGADO').where("intermediario", "==", this.garantiasTotal.intermediario).where("idcomision", "==", parseInt(this.garantiasTotal.idcomision)).orderBy("idgarantia").orderBy("fechareporte").get().then((events) => {
        events.forEach(element => {
          this.garantias.garantiastotal.push(JSON.parse(JSON.stringify(element.data())))
          pass = true;
          return this.garantias.garantiastotal;
        })
        if (pass) {
          this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.garantiasTotal.intermediario).where("idgarantia", "==", parseInt(this.garantiasTotal.idgarantia)).orderBy("idgarantiaregistro")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
                this.garantias.garantias.push(garantia)
              });
              this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);

            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      })
    })
  }

}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodaleliminar.page.html',
  styleUrls: ['garantias.page.scss']
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
@Component({
  selector: 'modal-page',
  templateUrl: 'garantiasmodaleditarconfirm.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalEditarConfirmPage implements OnInit {
  garantiahist: Garantias = JSON.parse(sessionStorage.getItem('histgarantia'))
  option: string = "consult"
  comisiontotal = 0;
  constructor(private modalController: ModalController, private alert: AlertPage) { }

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
    this.garantiahist.comisiontotal = this.comisiontotal.toString()
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
  dismiss(confirmacion: Garantias) {
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
    this.comisiontotal = 0;
  }
  /**
* Opción cerrar historico comisiones.  
 * Metodo principal:dismiss(confirmacion);  
 * @return dismiss(confirmacion);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  calcular() {
    if (this.garantiahist.cobertura) {
      if (this.garantiahist.administracion) {
        if (this.garantiahist.ivaadministracion) {
          this.comisiontotal = parseFloat(this.garantiahist.cobertura) + parseFloat(this.garantiahist.administracion) + parseFloat(this.garantiahist.ivaadministracion)
          this.option = 'calcular'
        } else {
          this.alert.presentAlert('Error! Ingrese valor iva administración.')
        }
      } else {
        this.alert.presentAlert('Error! Ingrese valor administración.')
      }
    } else {
      this.alert.presentAlert('Error! Ingrese valor cobertura.')
    }
  }

}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'app-garantias',
  templateUrl: 'garantias.page.html',
  styleUrls: ['garantias.page.scss']
})
export class GarantiasPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario = new Intermediario();
  comision: Comisiones = new Comisiones();
  garantia: Garantias = new Garantias();
  garantiasmodal: GarantiasModal = new GarantiasModal();
  comisiones: Comisiones[] = [];
  esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
  comisionlinealizada: ComisionLinealizada[] = [];
  optionselectintermediario: string = 'close';
  excelgarantias: ExcelGarantias[] = [];
  count: Count[] = [];
  counts: Count = new Count();
  countfiles: CountFiles[] = [];
  fechareporte: Date;
  validateOpen = 0;
  validaLoad = JSON.parse(sessionStorage.getItem('validaLoad'));
  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private garantiasservice: GarantiasService,
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
      this.comision = new Comisiones();
      if (this.validaLoad == "LOAD") {
        this.alertPage.presentAlert("Clave incorrecta.");
      }
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
  * Consulta contadores garantias metodo unico software. 
   * Metodo principal:getCount();  
   * @return Count[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getCount() {
    this.count = new Array<Count>();
    this.garantiasservice.getCount().doc('countgarantias').get().subscribe((event) => {
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
    this.garantiasservice.getCount().doc('countfiles').get().subscribe((events) => {
      this.countfiles.push(JSON.parse(JSON.stringify(events.data())))
    })
  }
  /**
* Controlador opción consultar garantias
* Metodo principal:consultarGarantias();  
* @return openModalConsultar(GarantiasModal);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  consultarGarantias() {

    var idcomision = true;
    this.garantiasmodal = new GarantiasModal();
    (this.comision.idcomision == null || this.comision.idcomision === "") ? idcomision = false : null;
    if (this.validateOpen === 0) {
      if (idcomision) {
        this.validateOpen = 1
        sessionStorage.setItem('comision', JSON.stringify(this.comision))
        this.garantiasmodal.garantiastotal = new Array<GarantiasTotal>();
        var pass = false;
        this.garantiasservice.getGarantiasTotal().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", parseInt(this.comision.idcomision)).orderBy("idgarantia").orderBy("fechareporte").get().then((events) => {
            events.forEach(element => {
              let garantiaestado: GarantiasTotal = JSON.parse(JSON.stringify(element.data()))
              if (garantiaestado.estado === 'CARGADO' || garantiaestado.estado === 'DEVUELTO') {
                this.garantiasmodal.garantiastotal.push(garantiaestado)
                pass = true;
              }
              return this.garantiasmodal.garantiastotal;
            })
            if (pass) {
              this.garantiasmodal.intermediario = this.selectintermediario
              this.openModalConsultar(this.garantiasmodal);
            } else {
              this.alertPage.presentAlert("Ingrese reporte de créditos afianzados.")
            }
          })
        })
      } else {
        this.alertPage.presentAlert("Selecciona un tipo de comisión.")
      }
    }

  }
  /**
* Controlador opción crear garantias tipo comisión
* Metodo principal:crearGarantiasComisiones();  
* @return crearGarantias();
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantiasComisiones() {
    let comisiones: Comisiones[] = this.comisiones
    var paso = false;
    if (this.comision.idcomision) {
      if (this.excelgarantias.length > 0) {
        if (this.fechareporte) {
          comisiones.forEach(element => {
            if (element.idcomision.toString() === this.comision.idcomision.toString()) {
              this.comision = element;
              paso = true;
            }
          });
        } else {
          this.alertPage.presentAlert("Ingrese fecha garantias.")
        }
      } else {
        this.alertPage.presentAlert("Ingrese reporte de créditos afianzados.")
      }
    } else {
      this.alertPage.presentAlert("Selecciona un tipo de comisión.")
    }
    if (paso) {
      this.alertPage.presentAlert("Por Favor!. " + " Espere.");
      if (this.comision.idlinea === '1') {
        var pase = false;
        this.esquemaunico = new EsquemaUnicoAnticipado();
        this.garantiasservice.getComisionesEsquemaUnico().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.comision.idcomision).get().then((events) => {
            events.forEach(element => {
              this.esquemaunico = JSON.parse(JSON.stringify(element.data()))
              pase = true;
              return this.esquemaunico;
            })
            if (pase) {
              this.crearGarantias();
            }
          })
        })
      }
      if (this.comision.idlinea === '2') {
        var pase = false;
        if (this.comisionlinealizada.length > 0) {
          this.crearGarantias();
        } else {
          this.comisionlinealizada = new Array<ComisionLinealizada>();
          this.garantiasservice.getComisionesLinealizadas().get().subscribe((event) => {
            event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.comision.idcomision).get().then((events) => {
              events.forEach(element => {
                this.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
                pase = true;
                return this.comisionlinealizada;
              })
              if (pase) {
                this.crearGarantias();
              }
            })
          })
        }

      }
      if (this.comision.idlinea === '3') {
        var pase = false;
        this.esquemaunico = new EsquemaUnicoAnticipado();
        this.garantiasservice.getComisionesEsquemaMensual().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.comision.idcomision).get().then((events) => {
            events.forEach(element => {
              this.esquemaunico = JSON.parse(JSON.stringify(element.data()))
              pase = true;
              return this.esquemaunico;
            })
            if (pase) {
              this.crearGarantias();
            }
          })
        })
      }
      if (this.comision.idlinea === '4') {
        var pase = false;
        if (this.comisionlinealizada.length > 0) {
          this.crearGarantias();
        } else {
          this.comisionlinealizada = new Array<ComisionLinealizada>();
          this.garantiasservice.getComisionesLinealizadasMensual().get().subscribe((event) => {
            event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.comision.idcomision).get().then((events) => {
              events.forEach(element => {
                this.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
                pase = true;
                return this.comisionlinealizada;
              })
              if (pase) {
                this.crearGarantias();
              }
            })
          })
        }

      }
    }
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
    var userToLogin = this.garantiasservice.getIntermediarios().get().subscribe((event) => {
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
  updateIntermediario() {
    this.garantiasservice.getIntermediarios().get().subscribe((event) => {
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
    this.optionselectintermediario = 'open'
    sessionStorage.setItem('intermediario', JSON.stringify(user))
    this.getComisionesIntermediario();
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
    this.comisiones = new Array<Comisiones>();
    this.comision = new Comisiones();
    this.optionselectintermediario = 'close'
  }

  /**
* Consulta comisiones intermediario metodo unico software. 
 * Metodo principal:getComisionesIntermediario();  
 * @return Comisiones[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getComisionesIntermediario() {
    this.comisiones = new Array<Comisiones>();
    this.garantiasservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).get().then((events) => {
        events.forEach(element => {
          this.comisiones.push(JSON.parse(JSON.stringify(element.data())))
          return this.comisiones;
        })
      });
    });
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
    this.excelgarantias = new Array<ExcelGarantias>();
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
            this.excelgarantias.push(parseexcel)
          });
          this.countfiles.forEach(element => {
            this.garantiasservice.updateCountFiles(element.countfiles + 1);
            let uploadfile = new UploadFilesIntermediario();
            uploadfile.nit = this.selectintermediario.nit
            uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
            uploadfile.fileToUpload = file;
            uploadfile.tipfile = string;
            this.selectintermediario.uploadfiles.push(uploadfile);
            this.getCountFiles();
          });
        };
        reader.readAsBinaryString(target.files[0]);
      } else {
        this.alertPage.presentAlert("Ingresar formato excel.")
      }
    }
  }

  /**
* Controlador opción crear garantias
* Metodo principal:
* @return garantias;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  sumarCargueGarantiasFechaSinComision() {
    if (this.fechareporte) {
      this.garantiasmodal.garantiastotal = new Array<GarantiasTotal>();
      var pass = false;
      this.garantiasservice.getGarantiasTotal().get().subscribe((event) => {
        event.query.where("estado", "==", 'CARGADO').where("intermediario", "==", this.selectintermediario.nit).where("fechareporte", "==", this.fechareporte.toString().substring(0, 7)).get().then((events) => {
          events.forEach(element => {
            this.garantiasmodal.garantiastotal.push(JSON.parse(JSON.stringify(element.data())))
            pass = true;
            return this.garantiasmodal.garantiastotal;
          })
          if (pass) {

            if (this.garantiasmodal.garantiastotal.length > 1) {
              sessionStorage.setItem('datafecha', JSON.stringify(this.garantiasmodal.garantiastotal))
              this.openSumarCargue()
            } else {
              this.alertPage.presentAlert("Ingrese reporte de créditos afianzados.")
            }
          } else {
            this.alertPage.presentAlert("Ingrese reporte de créditos afianzados.")
          }
        })
      })
    } else {
      this.alertPage.presentAlert('Seleccione fecha de reportes.')
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
  openSumarCargue() {
    sessionStorage.setItem('intermediario', JSON.stringify(this.selectintermediario))
    this.openSumarCargueModal()
  }
  /**
* Abre garantiasmodalaprobar.page.html 
* Metodo principal:openHistoricoModal(GarantiasTotal);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openSumarCargueModal() {
    const modal = await this.modalController.create({
      component: ModalSumarCarguePage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        sessionStorage.removeItem('datafecha')
        this.ngOnInit()
      });
    return await modal.present();

  }

  /**
* Controlador opción crear garantias
* Metodo principal:crearGarantias();  
* @return garantias;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantias() {
    this.garantiasmodal.garantias = new Array<Garantias>();
    var validacion = false;
    var message = "";
    var validamen = false;
    var messageval = "";
    this.excelgarantias.forEach(element => {
      let garantia: Garantias = new Garantias();
      garantia.idlinea = this.comision.idlinea
      if (element[0] !== 'CÓDIGO LINEA DE CRÉDITO') {
        garantia.codigolineacrediticio = element[0]
      }
      if (element[1] !== 'TIPO DE IDENTIFICACIÓN') {
        garantia.tipoidentificacion = element[1]
      }
      if (element[2] !== 'NO. IDENTIFICACIÓN') {
        garantia.identificacion = parseInt(element[2])
      }
      if (element[3] !== 'CÓDIGO CIIU') {
        garantia.codigociiu = element[3]
      }
      if (element[4] !== 'APELLIDOS') {
        garantia.apellidos = element[4]
      }
      if (element[5] !== 'NOMBRES') {
        garantia.nombres = element[5]
      }
      if (element[6] !== 'MUNICIPIO CLIENTE') {
        garantia.municipiocliente = element[6]
      }
      if (element[7] !== 'DIRECCIÓN CLIENTE1') {
        garantia.direccionclienteuno = element[7]
      }
      if (element[8] !== 'DIRECCIÓN CLIENTE2') {
        garantia.direccionclientedos = element[8]
      }
      if (element[9] !== 'TELÉFONO 1') {
        garantia.telefonouno = element[9]
      }
      if (element[10] !== 'TELÉFONO 2') {
        garantia.telefonodos = element[10]
      }
      if (element[11] !== 'NO. CELULAR') {
        garantia.celular = element[11]
      }
      if (element[12] !== 'CORREO ELECTRÓNICO') {
        garantia.correoelectronico = element[12]
      }
      if (element[13] !== 'NOMBRE CODEUDOR') {
        garantia.nombrecodeudor = element[13]
      }
      if (element[14] !== 'NO. IDENTIFICACIÓN CODEUDOR') {
        garantia.identificacioncodeudor = element[14]
      }
      if (element[15] !== 'DIRECCIÓN CODEUDOR') {
        garantia.direccioncodeudor = element[15]
      }
      if (element[16] !== 'TELÉFONO CODEUDOR') {
        garantia.telefonocodeudor = element[16]
      }
      if (element[17] !== 'NO. CELULAR CODEUDOR') {
        garantia.celularcodeudor = element[17]
      }
      if (element[18] !== 'NO. DE CRÉDITO') {
        garantia.credito = element[18]
      }
      if (element[19] !== 'NO. PAGARÉ') {
        garantia.pagare = element[19]
      }

      if (element[20] !== 'PLAZO OBLIGACIÓN') {
        garantia.plazo = element[20]
      }

      if (element[21] !== 'PERIODO DE COBERTURA') {
        garantia.periodo = element[21]
      }

      if (element[22] !== 'TASA E.A. APLICADA') {
        garantia.tasa = element[22]
      }

      if (element[23] !== 'FECHA DESEMBOLSO (DD/MM/AAAA)') {
        garantia.fechadesembolso = this.ExcelDateToJSDate(element[23])
      }

      if (element[24] !== 'FECHA DE VENCIMIENTO (DD/MM/AAAA)') {
        garantia.fechavencimiento = this.ExcelDateToJSDate(element[24])
      }

      if (element[25] !== 'AMORTIZACIÓN') {
        garantia.amortizacion = element[25]
      }

      if (element[26] !== 'PERIODO DE GRACIA') {
        garantia.periodogracia = element[26]
      }

      if (element[27] !== 'VALOR DEL MONTO DESEMBOLSADO') {
        garantia.valormontodesembolsado = element[27]
      }

      if (element[28] !== 'SALDO') {
        try {
          garantia.saldo = element[28].replace(/\./g, '')
        } catch (error) {
          garantia.saldo = element[28]
        }
        garantia.idcomision = this.comision.idcomision
        garantia.idcomisionregistro = this.comision.idcomisionregistro
        if (garantia.idlinea === '1') {
          garantia.cobertura = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.cobertura)) / 100).toFixed(4).toString()
          garantia.administracion = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.administracion)) / 100).toFixed(4).toString()
          garantia.ivaadministracion = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.ivaadministracion)) / 100).toFixed(4).toString()
          garantia.comisiontotal = (parseFloat(garantia.cobertura) + parseFloat(garantia.administracion) + parseFloat(garantia.ivaadministracion)).toString()
        }
        if (garantia.idlinea === '2') {
          this.comisionlinealizada.forEach(element => {
            if (parseFloat(element.mesescredito) === parseFloat(garantia.plazo)) {
              garantia.cobertura = (parseFloat(garantia.saldo) * (parseFloat(element.cobertura)) / 100).toString()
              garantia.administracion = (parseFloat(garantia.saldo) * (parseFloat(element.administracion)) / 100).toString()
              garantia.ivaadministracion = (parseFloat(garantia.saldo) * (parseFloat(element.ivaadministracion)) / 100).toString()
              garantia.comisiontotal = (parseFloat(garantia.cobertura) + parseFloat(garantia.administracion) + parseFloat(garantia.ivaadministracion)).toString()
            }
          });
        }
        if (garantia.idlinea === '3') {
          garantia.cobertura = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.cobertura)) / 100).toFixed(4).toString()
          garantia.administracion = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.administracion)) / 100).toFixed(4).toString()
          garantia.ivaadministracion = (parseFloat(garantia.saldo) * (parseFloat(this.esquemaunico.ivaadministracion)) / 100).toFixed(4).toString()
          garantia.comisiontotal = (parseFloat(garantia.cobertura) + parseFloat(garantia.administracion) + parseFloat(garantia.ivaadministracion)).toString()
        }
        if (garantia.idlinea === '4') {
          this.comisionlinealizada.forEach(element => {
            if (parseFloat(element.mesescredito) === parseFloat(garantia.plazo)) {
              garantia.cobertura = (parseFloat(garantia.saldo) * (parseFloat(element.cobertura)) / 100).toString()
              garantia.administracion = (parseFloat(garantia.saldo) * (parseFloat(element.administracion)) / 100).toString()
              garantia.ivaadministracion = (parseFloat(garantia.saldo) * (parseFloat(element.ivaadministracion)) / 100).toString()
              garantia.comisiontotal = (parseFloat(garantia.cobertura) + parseFloat(garantia.administracion) + parseFloat(garantia.ivaadministracion)).toString()
            }
          });
        }
        garantia.estado = 'CARGADO';
      }
      var valida = true;
      var validaident = true;
      var validaplazo = true;
      var validasaldo = true;
      var validacobertura = true;
      var validanrocredito = true;
      var validanropagare = true;
      (garantia.identificacion == '' || garantia.identificacion == null) ? valida = false : null;
      (garantia.tipoidentificacion == '' || garantia.tipoidentificacion == null) ? validaident = false : null;
      (garantia.plazo == '' || garantia.plazo == null) ? validaplazo = false : null;
      (garantia.saldo == '' || garantia.saldo == null) ? validasaldo = false : null;
      (garantia.cobertura == '' || garantia.cobertura == null) ? validacobertura = false : null;
      (garantia.credito == '' || garantia.credito == null) ? validanrocredito = false : null;
      (garantia.pagare == '' || garantia.pagare == null) ? validanropagare = false : null;
      if (!validanrocredito && validaident) {
        message = message + " Error por nro credito nulo Nro Identificación." + garantia.identificacion
      }
      if (!validanropagare && validaident) {
        message = message + " Error por nro pagare nulo Nro Identificación." + garantia.identificacion
      }
      if (valida && validaident && validasaldo && validaplazo && validacobertura && validanrocredito && validanropagare) {
        this.garantiasmodal.garantias.push(garantia)
        return validacion = true;
      }
    });
    if (!validacion) {
      this.alertPage.presentAlert("Error!. " + "Cargue de reporte de créditos afianzados de formato nulo. " + message).then(() => {
        this.ngOnInit();
        this.updateIntermediario()
      })
    }
    if (validacion) {
      this.alertPage.closeAlert();
      if (this.comision.idlinea != '3') {
        this.count.forEach(element => {
          var index = element.count + 1
          this.garantiasservice.crearGarantias(this.garantiasmodal.garantias, this.selectintermediario, this.user, element, this.selectintermediario.uploadfiles[0].nombrefile, this.fechareporte.toString().substring(0, 7)).then(() => {
            this.cargador.getCargador(50 * this.garantiasmodal.garantias.length);
            this.alertPage.presentAlert("Éxito!. " + "Cargue de reporte de créditos afianzados" + ". Identificador: " + index + " creado.").then(() => {
              this.excelgarantias = new Array<ExcelGarantias>();
              this.ngOnInit();
              this.updateIntermediario()
            })
          })
        });
      }
      if (this.comision.idlinea == '3') {
        var resolvedFlag = false;
        var resolvedFlagPaga = false;
        var validate = true;
        this.garantiasmodal.garantias.forEach(element => {
          this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.selectintermediario.nit).where("identificacion", "==", parseInt(element.identificacion)).where("credito", "==", element.credito).get()
            .then((querySnapshot) => {
              resolvedFlag = true;
              querySnapshot.forEach(() => {
                element.validatemen = true;
              });
              (element.validatemen == '' || element.validatemen == null || element.validatemen == undefined) ? validate = false : null;
              if (!validate) {
                element.validatemen = false;
              }
            })
          this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.selectintermediario.nit).where("identificacion", "==", parseInt(element.identificacion)).where("pagare", "==", element.pagare).get()
            .then((querySnapshot) => {
              resolvedFlagPaga = true;
              querySnapshot.forEach(() => {
                element.validatemenpag = true;
              });
              (element.validatemenpag == '' || element.validatemenpag == null || element.validatemenpag == undefined) ? validate = false : null;
              if (!validate) {
                element.validatemenpag = false;
              }
            })

          if (!element.validatemen) {
            if (element.validatemenpag) {
              element.validatemen = true;
            }
          }
          if (!element.validatemenpag) {
            if (element.validatemen) {
              element.validatemenpag = true;
            }
          }
        });
        let mypromise = function functionOne() {
          //Empieza la promesa
          return new Promise((resolve, reject) => {
            return setTimeout(
              () => {
                if (resolvedFlag == true || resolvedFlagPaga == true) {
                  resolve(resolvedFlag);
                } else {
                  reject("Rejected")
                }
              }, 2000
            );
          });
        };
        mypromise().then(() => {
          if (resolvedFlag || resolvedFlagPaga) { 
            this.count.forEach(element => {
              var index = element.count + 1
              this.garantiasservice.crearGarantiasMen(this.garantiasmodal.garantias, this.selectintermediario, this.user, element, this.selectintermediario.uploadfiles[0].nombrefile, this.fechareporte.toString().substring(0, 7)).then(() => {
                this.cargador.getCargador(50 * this.garantiasmodal.garantias.length);
                this.alertPage.presentAlert("Éxito!. " + "Cargue de reporte de créditos afianzados" + ". Identificador: " + index + " creado.").then(() => {
                  this.excelgarantias = new Array<ExcelGarantias>();
                  this.ngOnInit();
                  this.updateIntermediario()
                })
              })
            });
          }
        })
      }
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

    return day;
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
      .then(() => {
        this.ngOnInit();
        this.getComisionesIntermediario()
        this.validateOpen = 0;
        sessionStorage.removeItem('intermediario')
        sessionStorage.removeItem('comision')
      });
    return await modal.present();
  }


}
/**
 * CONTROLADOR DE LA PAGINA VER GARANTIAS Y CALCULOS TOTALES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'garantiasver-page',
  templateUrl: 'garantiasmodalver.page.html',
  styleUrls: ['garantias.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() garantias: GarantiasModal;
  optionsearch: string;
  documento: string;
  garantia: Garantias = new Garantias();
  correoinfo: Correo = new Correo();
  displayedColumnsGarantiasExcel: string[] = ['intermediario', 'tipoidentificacion', 'identificacion', 'codigociiu', 'apellidos', 'nombres', 'municipiocliente', 'direccionclienteuno', 'direccionclientedos', 'telefonouno', 'telefonodos', 'celular', 'correoelectronico', 'nombrecodeudor', 'identificacioncodeudor', 'direccioncodeudor', 'telefonocodeudor', 'celularcodeudor', 'credito', 'pagare', 'plazo', 'periodo', 'tasa', 'fechadesembolso', 'fechavencimiento', 'amortizacion', 'periodogracia', 'valormontodesembolsado', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal'];
  displayedColumnsGarantias: string[] = ['idgarantia', 'identificacion', 'nombres', 'apellidos', 'saldo', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver'];
  displayedColumnsGarantiasTotal: string[] = ['idgarantia', 'estado', 'idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'nombrefile', 'aprobar', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceTotal: MatTableDataSource<any> = new MatTableDataSource();
  count = [] = Array<Count>();
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  @ViewChild('paginatorGarantiasTotal', { read: MatPaginator }) paginatorGarantiasTotal: MatPaginator;
  constructor(private modalController: ModalController,
    private garantiasservice: GarantiasService,
    private alertPage: AlertPage,
    private correo: ServidorCorreoService,
    private cargador: CargadorService,
    private auth: AuthService) { }
  ngOnInit() { 
    
    
    
    this.optionsearch = 'search';
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
  }/**
  *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
   * Metodo principal:verModalCreacionEdit();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  /**
 * Controlador opción ver garantias unica intermediario
 * Metodo principal:openVer(Garantias);  
 * @param Garantias
 * @return optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  sumarCargues() {
    let arreglo;
    var datafecha: GarantiasTotal[] = new Array<GarantiasTotal>();
    this.garantias.garantiastotal.forEach((elements, indexs) => {
      this.garantias.garantiastotal.forEach((element, index) => {
        if (indexs != index) {
          if (element.fechareporte === elements.fechareporte) {
            datafecha.push(element)
          }
        }
      });
    });
    if (datafecha.length === 1) {
      this.alertPage.presentAlert('Error! No tienes reporte de créditos afianzados para sumar.')
    } else {
      arreglo = new Set(datafecha)
      let array = Array.from(arreglo);
      if (array.length > 0) {
        sessionStorage.setItem('datafecha', JSON.stringify(array))
        this.openSumarCargue()
      } else {
        this.alertPage.presentAlert('Error! No tienes reporte de créditos afianzados para sumar.')
      }
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
    this.garantiasservice.getAfsFirestore().collection("garantias").where("fechareporte", "==", garantiatotal.fechareporte).where("idgarantia", "==", garantiatotal.idgarantia).where("intermediario", "==", garantiatotal.intermediario).orderBy("idgarantiaregistro").get()
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
      this.garantiasservice.getAfsFirestore().collection("garantias").where("estado", "==", 'CARGADO').where("intermediario", "==", this.garantias.garantiastotal[0].intermediario).where("idcomision", "==", parseInt(this.garantias.garantiastotal[0].idcomision)).where("identificacion", "==", parseInt(this.documento)).orderBy("idgarantia").orderBy("idgarantiaregistro").get()
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
  close() {
    this.documento = '';
    this.optionsearch = 'search';
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
  openSumarCargue() {
    this.openSumarCargueModal()
  }

  /**
*  Abre garantiasmodalaprobar.page.html  
* Metodo principal:openAprobar(GarantiasTotal);  
* @param GarantiasTotal
* @return openHistoricoModal(GarantiasTotal)
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openAprobar(doc: GarantiasTotal) {
    if (doc.idlinea === "4") {
      sessionStorage.setItem('garantiatotalmensual', JSON.stringify(doc))
      this.cargador.getCargador(0)
      var pase = false;
      this.garantias.garantias = new Array<Garantias>();
      this.garantiasservice.getAfsFirestore().collection("garantias").where("fechareporte", "==", doc.fechareporte).where("idgarantia", "==", doc.idgarantia).where("intermediario", "==", doc.intermediario).orderBy("idgarantiaregistro").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            pase = true;
            this.garantias.garantias.push(garantia)
          });
          if (pase) {
            sessionStorage.setItem('garantiastotalescolocada', JSON.stringify(this.garantias.garantias))
            sessionStorage.setItem('garantiatotalcolocada', JSON.stringify(doc))
            this.openModalLinealizadaMensual(doc)
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      this.openHistoricoModal(doc)
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
  openEditar(doc: GarantiasTotal) {
    sessionStorage.setItem('garantiatotal', JSON.stringify(doc))
    this.openEditarModal(doc)
  }

  /**
  * Consulta contadores garantias metodo unico software. 
   * Metodo principal:getCount();  
   * @return Count[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getCount() {
    this.count = new Array<Count>();
    this.garantiasservice.getCount().doc('countgarantias').get().subscribe((event) => {
      var count: any = event.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      countadd.index = count.index;
      this.count.push(countadd)
    });
  }
  /**
* Abre garantiasmodalaprobar.page.html 
* Metodo principal:openHistoricoModal(GarantiasTotal);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openHistoricoModal(element: GarantiasTotal) {
    this.getCount();
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class-parametriza'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          let garantiasTotal: GarantiasTotal = element;
          if (garantiasTotal.estado === "CARGADO") {
            if (this.garantias.intermediario.checknormal) {
              this.count.forEach(element => {
                this.correo.getCertNormal(this.garantias.intermediario, garantiasTotal, element).subscribe(response => {
                  var res: any = response
                  const byteCharacters = atob(res.response);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const file = new Blob([byteArray], { type: 'application/pdf' });
                  garantiasTotal.nombrefilefactura = "Documento Informativo-" + element.index;
                  garantiasTotal.fileToUpload = this.blobToFile(file, garantiasTotal.nombrefilefactura);
                  garantiasTotal.estado = 'FACTURADO';
                  this.garantiasservice.updateCountGarantiasCuenta(parseInt(element.index)+1);
                  this.garantiasservice.updateEstadoCargueGarantia(garantiasTotal, this.user);
                  this.garantiasservice.updateTotalCargueGarantiaFactura(garantiasTotal, this.user);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados facturado.").then(() => {
                    this.garantiasservice.getContactSendCont().get().subscribe((event) => {
                      event.forEach(element => {
                        var any: any = element.data()
                        this.correoinfo.ema = any.email;
                        this.correoinfo.des = any.contact + 'id:' + garantiasTotal.idgarantia + '. Estado: ' + garantiasTotal.estado
                        this.correoinfo.ent = garantiasTotal.intermediario;
                        this.correoinfo.nom = any.nom;
                        this.correoinfo.ciu = any.ciu;
                        this.contactSend()
                      });
                    })
                    this.garantiasservice.RegisterNotificacionEstadoCargueGarantia(garantiasTotal, this.user);
                    this.cerrarConsultar();
                  })
                  const fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                }, error => console.log(error),);
              });

            }
            if (this.garantias.intermediario.checkdoble) {
              this.count.forEach(element => {
                this.correo.getCertDoble(this.garantias.intermediario, garantiasTotal, element).subscribe(response => {
                  var res: any = response
                  const byteCharacters = atob(res.response);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const file = new Blob([byteArray], { type: 'application/pdf' });
                  const fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                  garantiasTotal.nombrefilefactura = "Documento Informativo-" + element.index;
                  garantiasTotal.fileToUpload = this.blobToFile(file, garantiasTotal.nombrefilefactura);
                  garantiasTotal.estado = 'FACTURADO';
                  this.garantiasservice.updateCountGarantiasCuenta(parseInt(element.index) + 1); 
                  this.garantiasservice.updateEstadoCargueGarantia(garantiasTotal, this.user);
                  this.garantiasservice.updateTotalCargueGarantiaFactura(garantiasTotal, this.user);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados facturado.").then(() => {
                    this.garantiasservice.getContactSendCont().get().subscribe((event) => {
                      event.forEach(element => {
                        var any: any = element.data()
                        this.correoinfo.ema = any.email;
                        this.correoinfo.des = any.contact + 'id:' + garantiasTotal.idgarantia + '. Estado: ' + garantiasTotal.estado
                        this.correoinfo.ent = garantiasTotal.intermediario;
                        this.correoinfo.nom = any.nom;
                        this.correoinfo.ciu = any.ciu;
                        this.contactSend()
                      });
                    })
                    this.garantiasservice.RegisterNotificacionEstadoCargueGarantia(garantiasTotal, this.user);
                    this.cerrarConsultar();
                  })
                }, error => console.log(error),);
              });
            }
            if (!this.garantias.intermediario.checknormal && !this.garantias.intermediario.checkdoble) {
              garantiasTotal.estado = 'APROBADO'
              this.garantiasservice.updateEstadoCargueGarantia(garantiasTotal, this.user);
              this.alertPage.presentAlert("Éxito reporte de créditos afianzados aprobado.").then(() => {
                this.garantiasservice.getContactSendCont().get().subscribe((event) => {
                  event.forEach(element => {
                    var any: any = element.data()
                    this.correoinfo.ema = any.email;
                    this.correoinfo.des = any.contact + 'id:' + garantiasTotal.idgarantia + '. Estado: ' + garantiasTotal.estado
                    this.correoinfo.ent = garantiasTotal.intermediario;
                    this.correoinfo.nom = any.nom;
                    this.correoinfo.ciu = any.ciu;
                    this.contactSend()
                  });
                })
                this.garantiasservice.RegisterNotificacionEstadoCargueGarantia(garantiasTotal, this.user);
                this.cerrarConsultar();
              })
            }
          } else {
            this.alertPage.presentAlert("Error reporte de créditos afianzados no aprobado.").then(() => {
              this.cerrarConsultar();
            })
          }
        }
      });
    return await modal.present();

  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
  /**
 * Abre garantiasmodalaprobar.page.html 
 * Metodo principal:openHistoricoModal(GarantiasTotal);  
 * @param EsquemaUnicoAnticipado
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openModalLinealizadaMensual(element: GarantiasTotal) {
    const modal = await this.modalController.create({
      component: ModalLinealizadaMensualPage,
      cssClass: 'my-custom-class-parametriza-80'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user != 'cancelar') {
          this.alertPage.presentAlert("Éxito reporte de créditos afianzados aprobado.").then(() => {
            this.cerrarConsultar();
          })
        }
      });
    return await modal.present();

  }
  /**
* Abre garantiasmodalaprobar.page.html 
* Metodo principal:openHistoricoModal(GarantiasTotal);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openSumarCargueModal() {
    const modal = await this.modalController.create({
      component: ModalSumarCarguePage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        sessionStorage.removeItem('datafecha')
        const user = data['data'];
        if (user === 'confirmar') {
          var pass = false;
          this.garantias.garantiastotal = new Array<GarantiasTotal>();
          var intermediario: Intermediario = JSON.parse(sessionStorage.getItem('intermediario'))
          var comision: Comisiones = JSON.parse(sessionStorage.getItem('comision'))
          this.garantiasservice.getGarantiasTotal().get().subscribe((event) => {
            event.query.where("estado", "==", 'CARGADO').where("intermediario", "==", intermediario.nit).where("idcomision", "==", parseInt(comision.idcomision)).orderBy("idgarantia").orderBy("fechareporte").get().then((events) => {
              events.forEach(element => {
                this.garantias.garantiastotal.push(JSON.parse(JSON.stringify(element.data())))
                pass = true;
                return this.garantias.garantiastotal;
              })
              if (pass) {
                this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
                setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
              }
            })
          })

          this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
          setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
        }
      });
    return await modal.present();

  }

  /**
* Abre garantiasmodalaprobar.page.html 
* Metodo principal:openHistoricoModal(GarantiasTotal);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openEditarModal(element: GarantiasTotal) {

    const modal = await this.modalController.create({
      component: ModalEditarPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        this.consultGarantia(element);
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
  consultGarantia(garantiasTotal: GarantiasTotal) {
    var pass = false;
    this.garantias.garantiatotales = garantiasTotal
    this.garantias.garantiastotal = new Array<GarantiasTotal>();
    this.garantiasservice.getGarantiasTotal().get().subscribe((event) => {
      event.query.where("estado", "==", 'CARGADO').where("intermediario", "==", garantiasTotal.intermediario).where("idcomision", "==", parseInt(garantiasTotal.idcomision)).orderBy("idgarantia").orderBy("fechareporte").get().then((events) => {
        events.forEach(element => {
          this.garantias.garantiastotal.push(JSON.parse(JSON.stringify(element.data())))
          pass = true;
          return this.garantias.garantiastotal;
        })
        if (pass) {
          this.dataSourceTotal = new MatTableDataSource<any>(this.garantias.garantiastotal);
          setTimeout(() => this.dataSourceTotal.paginator = this.paginatorGarantiasTotal);
        }
      })
    })
  }


  /**
*  Abre garantiasmodalaprobar.page.html  
* Metodo principal:openEliminar(GarantiasTotal);  
* @param GarantiasTotal
* @return openEliminarModal(GarantiasTotal)
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/

  contactSend() {
    this.correo.getCorreo(this.correoinfo).subscribe(
      res => {
      }, error => error,
    )
  }
  /**
*  Abre garantiasmodalaprobar.page.html  
* Metodo principal:openEliminar(GarantiasTotal);  
* @param GarantiasTotal
* @return openEliminarModal(GarantiasTotal)
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openEliminar(doc: GarantiasTotal) {
    this.openEliminarModal(doc)
  }
  /**
* Abre garantiasmodaleliminar.page.html 
* Metodo principal:openEliminarModal(GarantiasTotal);  
* @param GarantiasTotal
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openEliminarModal(element: GarantiasTotal) {
    const modal = await this.modalController.create({
      component: ModalEliminarPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          let garantiasTotal: GarantiasTotal = element;
          var pase = false;
          this.garantiasservice.getAfsFirestore().collection("garantias").where("intermediario", "==", garantiasTotal.intermediario).where("idgarantia", "==", parseInt(garantiasTotal.idgarantia))
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
                this.garantias.garantias.push(garantia)
                pase = true;
              });
              if (this.garantias.garantias.length == 0) {
                if (garantiasTotal.estado === "CARGADO") {
                  this.garantiasservice.deleteCargueGarantia(garantiasTotal, this.garantias.garantias);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados eliminado.").then(() => {
                    this.cerrarConsultar();
                  })
                }
                if (garantiasTotal.estado === "DEVUELTO") {
                  this.garantiasservice.deleteCargueGarantiaDevuelto(garantiasTotal, this.garantias.garantias, this.garantias.intermediario);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados eliminado.").then(() => {
                    this.cerrarConsultar();
                  })
                }
              }
              if (pase) {
                this.cargador.getCargador(50 * this.garantias.garantias.length);
                if (garantiasTotal.estado === "CARGADO") {
                  this.garantiasservice.deleteCargueGarantia(garantiasTotal, this.garantias.garantias);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados eliminado.").then(() => {
                    this.cerrarConsultar();
                  })
                }
                if (garantiasTotal.estado === "DEVUELTO") {
                  this.garantiasservice.deleteCargueGarantiaDevuelto(garantiasTotal, this.garantias.garantias, this.garantias.intermediario);
                  this.alertPage.presentAlert("Éxito reporte de créditos afianzados eliminado.").then(() => {
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




