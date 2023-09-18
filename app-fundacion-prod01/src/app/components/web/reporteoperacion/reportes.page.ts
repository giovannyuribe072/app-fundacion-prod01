import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { CargadorService } from '../../services/cargador.services';
import { Intermediario } from '../../model/intermediario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertPage } from '../../alert/alert.page';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
import { ReporteOperacion } from '../../model/reporteoperacion.model';
import * as $ from 'jquery';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { GarantiasTotal } from '../../model/garantiastotal.model';
import { Garantias } from '../../model/garantias.model';
import { CORREO } from '../../services/urlServices';

declare var Highcharts;
function formatearNumero(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

var fechadesde;
var fechahasta;
var constructorvalor1: any[] = [] = new Array();
var constructornombre1: any[] = [] = new Array();
var constructornombre1r: any[] = [] = new Array();
function chart() {
  const canvas = Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'CIFRAS DE OPERACIÓN, ULTIMOS 5 AÑOS '
    },
    colors: ['#0088CC', '#005B9E'],
    xAxis: {
      categories: constructorvalor1,
      crosshair: true
    },
    shadow: false,
    exporting: {
      enabled: true,
      showTable: false,
      fileName: "line-chart"
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Operación:'
      },
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return '$' + formatearNumero(this.value)
          } else {
            return '-$' + (-formatearNumero(this.value))
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      crosshairs: true,
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
      pointFormatter: function () {
        var value;
        if (this.y >= 0) {
          value = '$ ' + this.y
        } else {
          value = '-$ ' + (-this.y)
        }
        return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' +
          formatearNumero(value) + '</b><br />'
      }
    },
    plotOptions: {
      series: {
      	dataLabels: { 
        	enabled: true, 
          inside: false, 
          crop: true, 
          backgroundColor:'#ffffff',
          borderColor: 'rgba(0,0,0,0.9)',
          color: '#000000', 
          borderRadius: 5,
          y: -10,
          style: {
          	fontFamily: 'Helvetica, sans-serif',
          	fontSize: '10px',
            fontWeight: 'normal',
            textShadow: 'none'
          }, 
          formatter:  function() { 
            return  '<strong>'+this.series.name+'</strong>'
            +'<br/> Fecha : <strong>'+ this.x+'</strong>'
            +'<br/> Valor : $ <strong style="color:#0088CC;padding:0">'+ Highcharts.numberFormat(this.y,0)+'</strong>'; 
          }
        }
      }
    },
    series: [{
      name: 'Saldo Cobertura',
      data: constructornombre1

    }, {
      name: 'Valor créditos afianzados',
      data: constructornombre1r

    }]
  });
  canvas.addSeries();
  let svg = canvas.getSVG();
  var parser = new DOMParser();
  var svgDoc = parser.parseFromString(svg, "image/svg+xml"); 
  svgDoc.querySelector("feDropShadow").remove();  
  // Remove the feDropShadow element from the SVG XML 
  var serializer = new XMLSerializer();
  var svgString = serializer.serializeToString(svgDoc);
  return svgString;
}

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.page.html',
  styleUrls: ['reportes.page.scss'],
  providers: [ServidorCorreoService]
})
export class HomePage implements OnInit {
  highcharts = Highcharts;
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  intermediario: Intermediario = new Intermediario();
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario = new Intermediario();
  optionselectintermediario: string = 'close';
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  chart = 'img';
  movilizado: GarantiasTotal[] = [] = new Array<GarantiasTotal>();
  cobrado: Garantias[] = [] = new Array<Garantias>();
  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  @ViewChild("lineChart", { static: false }) lineChart: any;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private auth: AuthService) {
    this.cargador.getCargador(1500);

  }

  ngOnInit() {
    this.chart = 'img';
    this.auth.loginUser(this.user).then(res => {
      this.getIntermediarios()
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
    this.optionselectintermediario = 'close';
    this.chart = 'img';
  }
  /**
  * FILTRO PARA PERMITIR LA BUSQUEDA DE INSTITUCIÓNS. 
  * Metodo principal:applyFilterIntermediarios(); 
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
* Consulta Intermediario metodo unico software. 
* Metodo principal:getIntermediarios(); 
* @param user 
* @return Intermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getIntermediarios() {
    this.intermediarios = new Array<Intermediario>();
    var userToLogin = this.auth.getIntermediarios().get().subscribe((event) => {
      if (this.user.role === 'Super Maestro') {
        event.forEach(element => {
          this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
          return this.intermediarios;
        });
      } if (this.user.role === 'Intermediario') {
        event.forEach(element => {
          let intermediario: Intermediario = new Intermediario()
          intermediario = JSON.parse(JSON.stringify(element.data()))
          if (intermediario.email === this.user.email) {
            this.intermediarios.push(intermediario)
          }
          return this.intermediarios;
        });
        if (this.intermediarios) {
          this.intermediarios.forEach(element => {
            if (element.email === this.user.email) {
              this.selectIntermediario(element)
            }
          });
        }
      } if (this.user.role === 'Maestro') {
        event.forEach(element => {
          let intermediario: Intermediario = new Intermediario()
          intermediario = JSON.parse(JSON.stringify(element.data()))
          if (intermediario.nit === this.user.maestro) {
            this.intermediarios.push(intermediario)
          }
          return this.intermediarios;
        });
      }
      this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
      setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
      return userToLogin;
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
  getDatesBetween(startDate, endDate) {
    const currentDate = new Date(startDate.getTime());
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  /**
  * Consulta Intermediario metodo unico software. 
  * Metodo principal:getIntermediarios(); 
  * @param user 
  * @return Intermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getDatesBetweenYear(startDate, endDate) {
    const currentDate = new Date(startDate.getTime());
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(currentDate.getFullYear());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  /**
* Consulta Intermediario metodo unico software. 
* Metodo principal:getIntermediarios(); 
* @param user 
* @return Intermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  parseDate(dateStr, format) {
    const regex = format.toLocaleLowerCase()
      .replace(/\bd+\b/, '(?<day>\\d+)')
      .replace(/\bm+\b/, '(?<month>\\d+)')
      .replace(/\by+\b/, '(?<year>\\d+)')

    const parts: any = new RegExp(regex).exec(dateStr) || {};
    const { year, month, day } = parts.groups || {};
    return new Date(year, month - 1, day);
  }
  /**
  * Consulta Intermediario metodo unico software. 
  * Metodo principal:getIntermediarios(); 
  * @param user 
  * @return Intermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getOperacion() {
    this.cargador.getCargador(1000000000);
    var operaciones: ReporteOperacion = new ReporteOperacion();
    constructornombre1 = new Array;
    constructornombre1r = new Array;
    constructorvalor1 = new Array;
    var date = new Date();
    var reclamado = 0;
    var reclamos = 0;
    var recuperado = 0;
    var recuperaciones = 0;
    operaciones.nit = this.selectintermediario.nit;
    operaciones.sigla = this.selectintermediario.sigla;
    operaciones.cobertura = this.selectintermediario.coberturacreditomora;
    operaciones.fechareporte = ("0" + (date.getDate())).slice(-2).toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2).toString() + '-' + date.getFullYear().toString()
    operaciones.movilizado = this.selectintermediario.saldototal;
    operaciones.movilizaciones = this.selectintermediario.cantidadgarantias;
    operaciones.disponible = 0;
    const start = performance.now();
    var unique = new Array();
    var date3: Date = new Date();
    var date2: Date = new Date(date.getFullYear() - 4, date.getMonth() + 1, date.getDay());
    var dates: any[] = this.getDatesBetweenYear(date2, date3);
    var uniqueArray = Array.from(new Set(dates));
    return new Promise((resolve, reject) => {
      let garantiastotal: GarantiasTotal[] = new Array<GarantiasTotal>();
      var cobertura = 0;
      this.auth.getAfsFire().collection("garantiastotal").where("intermediario", "==", this.selectintermediario.nit).where("comprobado", "==", true).orderBy('idgarantia').get().then((result) => {
        uniqueArray.forEach(elementdate => {
          var saldototal = 0;
          var fechareport = "";
          result.forEach(element => {
            let garantias: GarantiasTotal = JSON.parse(JSON.stringify(element.data()));
            if (garantias.fechareporte.toString().substring(0, 4) == elementdate) {
              cobertura = cobertura + parseFloat(element.data().cobertura);
              saldototal = saldototal + parseFloat(element.data().saldototal);
              fechareport = elementdate;
              garantiastotal.push(garantias)
            }
          });
          if (saldototal > 0) {
            if (cobertura > operaciones.cobertura) {
              cobertura = operaciones.cobertura;
            }
            constructornombre1r.push(saldototal);
            constructornombre1.push(cobertura);
            constructorvalor1.push(fechareport);
          }
        });
      })
      this.auth.getAfsFire().collection("garantias").where("intermediario", "==", this.selectintermediario.nit).where("estado", "==", "PAGADA").get().then((result) => {
        result.forEach(element => {
          reclamado = reclamado + parseFloat(element.data().saldocobrado);
          reclamos++;
        });
      }).then(() => {
        operaciones.reclamado = reclamado;
        operaciones.reclamos = reclamos;
        if (this.selectintermediario.saldocreditocobrado == 0) {
          this.alertPage.presentAlert("El Saldo de Crédito Con Cobertura del intermediario esta en 0");
          operaciones.riesgo = (0) + "%"; 
          operaciones.histcobertura = 0;
        } else {
          let valida = true;
          (this.selectintermediario.saldocreditocobrado == undefined) ? valida = false : null;
          if (valida) { 
            operaciones.histcobertura = this.selectintermediario.saldocreditocobrado;
            operaciones.riesgo = (this.selectintermediario.coberturacreditomora / this.selectintermediario.saldocreditocobrado * 100).toFixed(1) + "%"; 
          }else{
            this.alertPage.presentAlert("El Saldo de Crédito Con Cobertura del intermediario esta en 0");
            operaciones.riesgo = (0) + "%"; 
            operaciones.histcobertura = 0;
          }
         }
        const end = performance.now();
        const duration = end - start;
        this.auth.getAfsFire().collection("aplicarpago").where("intermediario", "==", this.selectintermediario.nit).get().then((result) => {
          result.forEach(element => {
            if (element.data().rc.toString().substring(0, 2) == "RC") {
              recuperado = recuperado + parseFloat(element.data().valorpago);
              if(!unique.includes(element.data().documento)){ 
                recuperaciones++;
                unique.push(element.data().documento);
              }
            }
          });
        }).then(() => {
          resolve({ duration });
        })
      }).catch((error) => {
        reject(error);
      })
    }).then((duration) => {
      var valida = true;
      (this.selectintermediario.recuperacion == undefined || this.selectintermediario.recuperacion == '' || this.selectintermediario.recuperacion == null|| this.selectintermediario.recuperacion == 0) ? valida = false : null;
      if (valida) {
        var recup = (this.selectintermediario.recuperacion / 100);
        var admcobranza = recuperado * recup;
        operaciones.recuperado = recuperado - admcobranza;
        
        console.log(recup,admcobranza,recuperado)
      } else {
        operaciones.recuperado = recuperado;
      }
      operaciones.recuperaciones = recuperaciones;
      if (operaciones.reclamado > 0) {
        operaciones.recuperacion = (operaciones.recuperado / operaciones.reclamado * 100).toFixed(1);
      } else {
        operaciones.recuperacion = 0;
      }
      fechadesde = operaciones.desde;
      fechahasta = operaciones.hasta;
      operaciones.histopera = 0;
      operaciones.histreclamado = 0;
      operaciones.histrecuperado = 0;
      this.chart = 'chart';
      this.cargador.getFinish();
      $(() => {
        operaciones.b64 = chart();
        var settings = {
          "url": CORREO.prod + CORREO.apiopera,
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify(operaciones),
        };

        return $.ajax(settings).done(function (response) {
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
        });
      });

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
  getMolizado() {
    this.cargador.getCargador(1000000000);
    var unique = new Array();
    this.movilizado = new Array<GarantiasTotal>();
    let pr = 0;
    new Promise((resolve, reject) => {
      this.auth.getAfsFire().collection("garantiastotal").where("intermediario", "==", this.selectintermediario.nit).where("comprobado", "==", true).orderBy('idgarantia').get().then((result) => {
        result.forEach(element => { 
          this.movilizado.push(JSON.parse(JSON.stringify(element.data())))
          if (pr == result.docs.length) {
            resolve(true);
          }
        });
      }).then(() => { 
        var currentDate = new Date();
        var estado = '';
        let pr1 = 0;
        new Promise((resolve, reject) => {
          this.auth.getAfsFire().collection("garantiastotal").where("intermediario", "==", this.selectintermediario.nit).where("comprobado", "in", [true, false]).orderBy('idgarantia', 'desc').limit(1).get().then((result) => {
            result.forEach(element => {
              console.log(element.data())
              pr1++;
              var date1: Date = this.parseDate(element.data().creadoen.toString().substring(0, 10), 'dd/mm/YYYY');
              var dates: Date[] = this.getDatesBetween(date1, currentDate);
              console.log(date1, dates) 
              if (dates.length < 30) {
                estado = "NO REPORTE MES";
                if (dates.length < 15) {
                  estado = "REPORTE ACTUALIZADO";
                }
              }
              if (dates.length > 30 && dates.length <= 60) {
                estado = "ALERTA DE NO REPORTE";
              }
              if (dates.length > 60) {
                estado = "REPORTE CRÍTICO";
              }
              if (pr1 == result.docs.length) {
                resolve(true);
              }
            });
          })
        }).then(() => {
          const Heading = [
            ['INSTITUCIÓN', 'ID REPORTE', 'FECHA REPORTE', 'VALOR COMISIÓN', 'VALOR GARANTIAS', 'NUMERO CEDULAS REPORTADAS', 'PROCESO', 'COBERTURA DISPONIBLE', 'ESTADO INSTITUCIÓN']
          ];
          const rows = this.movilizado.map(row => ({
            intermediario: this.selectintermediario.sigla,
            idgarantia: row.idgarantia,
            fechareporte: row.creadoen.toString().substring(0, 10),
            comision: row.comisiontotal,
            valorgarantias: row.saldototal,
            garantias: row.cantidadgarantias,
            proceso: row.estado,
            cobertura: row.cobertura,
            estado: estado
          }));
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
          XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Garantias");
          this.alertPage.presentAlert("Exito! Reporte generado.")
          this.cargador.getFinish();
        })
      })
    })
  }
  /**
  * Consulta Intermediario metodo unico software. 
  * Metodo principal:getIntermediarios(); 
  * @param user 
  * @return Intermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getRecuperado() {
    this.cargador.getCargador(1000000000);
    var unique = new Array();
    this.cobrado = new Array<Garantias>();
    let pr = 0;
    let counttramit = 0;
    let valtramit = 0;
    let countpagad = 0;
    let valpagad = 0;
    let fechatramit = "";
    let fechapagad = "";
    new Promise((resolve, reject) => {
      this.auth.getAfsFire().collection("garantias").where("intermediario", "==", this.selectintermediario.nit).where("estado", "in", ['EN TRAMITE', 'PAGADA']).orderBy('idgarantia').get().then((result) => {
        result.forEach(element => {
          if (element.data().estado == 'EN TRAMITE') {
            valtramit = valtramit + parseFloat(element.data().saldocobrado);
            fechatramit = element.data().creadoen;
            counttramit++;
          }
          if (element.data().estado == 'PAGADA') {
            valpagad = valpagad + parseFloat(element.data().saldocobrado);
            fechapagad = element.data().creadoen;
            countpagad++;
          }
          if (pr == result.docs.length) {
            resolve(true);
          }
        });
        if (valtramit > 0) {
          let objcob: Garantias = new Garantias();
          objcob.saldocobrado = valtramit;
          objcob.registros = counttramit;
          objcob.creadoen = fechatramit;
          objcob.estado = 'EN TRAMITE';
          this.cobrado.push(objcob)
        }
        if (valpagad > 0) {
          let objcob: Garantias = new Garantias();
          objcob.saldocobrado = valpagad;
          objcob.registros = countpagad;
          objcob.creadoen = fechapagad;
          objcob.estado = 'PAGADA';
          this.cobrado.push(objcob)
        }
      }).then(() => {
        const Heading = [
          ['INSTITUCIÓN', 'VALOR COBRADO', 'REGISTROS COBRADOS', 'FECHA COBRO', 'ESTADO', 'COBERTURA DISPONIBLE']
        ];
        const rows = this.cobrado.map(row => ({
          intermediario: this.selectintermediario.sigla,
          valorcobrado: row.saldocobrado,
          registros: row.registros,
          fechacobro: row.creadoen.toString().substring(0, 10),
          estado: row.estado,
          cobertura: this.selectintermediario.coberturacreditomora
        }));
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
        XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Cobro_De_Creditos");
        this.alertPage.presentAlert("Exito! Reporte generado.")
        this.cargador.getFinish();
      })
    })
  }



  /**
  * Consulta Intermediario metodo unico software. 
  * Metodo principal:getIntermediarios(); 
  * @param user 
  * @return Intermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getRecuperados() {
    this.cargador.getCargador(10000000);
    this.cobrado = new Array<Garantias>();
    const start = performance.now();
    return new Promise((resolve, reject) => {
      this.auth.getAfsFire().collection('garantias').where("estado", "in", ['EN TRAMITE', 'PAGADA']).get().then((result) => {
        result.forEach(element => {
          this.cobrado.push(JSON.parse(JSON.stringify(element.data())))
        });
      }).then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      }).catch((error) => {
        reject(error);
      })
    }).then((duration) => {
      let listobj: Cobrado[] = new Array<Cobrado>();
      this.intermediarios.forEach((element1, index1, array1) => {
        let counttramit = 0;
        let valtramit = 0;
        let countpagad = 0;
        let valpagad = 0;
        let fechatramit = "";
        let fechapagad = "";
        this.cobrado.forEach((element2, index2, array2) => {
          if (element1.nit == element2.intermediario) {
            if (element2.estado == 'EN TRAMITE') {
              valtramit = valtramit + parseFloat(element2.saldocobrado);
              fechatramit = element2.creadoen.toString().substring(0, 10);
              counttramit++;
            }
            if (element2.estado == 'PAGADA') {
              valpagad = valpagad + parseFloat(element2.saldocobrado);
              fechapagad = element2.creadoen.toString().substring(0, 10);
              countpagad++;
            }
          }
        });
        if (valtramit > 0) {
          let objcob: Cobrado = new Cobrado();
          objcob.intermediario = element1.sigla;
          objcob.valorcobrado = valtramit;
          objcob.registros = counttramit;
          objcob.fechacobro = fechatramit;
          objcob.estado = 'EN TRAMITE';
          objcob.cobertura = element1.coberturacreditomora;
          listobj.push(objcob)
        }
        if (valpagad > 0) {
          let objcob: Cobrado = new Cobrado();
          objcob.intermediario = element1.sigla;
          objcob.valorcobrado = valpagad;
          objcob.registros = countpagad;
          objcob.fechacobro = fechapagad;
          objcob.estado = 'PAGADA';
          objcob.cobertura = element1.coberturacreditomora;
          listobj.push(objcob)
        }
        // Check if it's the last iteration
        if (index1 === array1.length - 1) {

          const Heading = [
            ['INSTITUCIÓN', 'VALOR COBRADO', 'REGISTROS COBRADOS', 'FECHA COBRO', 'ESTADO', 'COBERTURA DISPONIBLE']
          ];
          const rows = listobj.map(row => ({
            intermediario: row.intermediario,
            valorcobrado: row.valorcobrado,
            registros: row.registros,
            fechacobro: row.fechacobro,
            estado: row.estado,
            cobertura: row.cobertura
          }));
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
          XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Cobro_De_Creditos");
          this.alertPage.presentAlert("Exito! Reporte generado.")
          this.cargador.getFinish();
        }
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
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  /**
 * Consulta Intermediario metodo unico software. 
 * Metodo principal:getIntermediarios(); 
 * @param user 
 * @return Intermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getMolizados() {
    var currentDate = new Date();
    this.cargador.getCargador(10000000);
    this.movilizado = new Array<GarantiasTotal>();
    const start = performance.now();
    return new Promise((resolve, reject) => {
      this.auth.getAfsFire().collection('garantiastotal').get().then((result) => {
        result.forEach(element => {
          this.movilizado.push(JSON.parse(JSON.stringify(element.data())))
        });
      }).then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      }).catch((error) => {
        reject(error);
      })
    }).then((duration) => {
      let listobj: Movilizado[] = new Array<Movilizado>();
      this.movilizado.sort((a, b) => (a.idgarantia > b.idgarantia) ? 1 : -1); 
      this.intermediarios.forEach((element1, index1, array1) => {
        var cobertura = 0;
        let obj: Movilizado = new Movilizado();
        obj.intermediario = element1.sigla;
        this.movilizado.forEach((element2, index2, array2) => {
          if (element1.nit == element2.intermediario) {
            obj.idgarantia = element2.idgarantia;
            obj.fechareporte = element2.fechareporte;
            obj.comision = obj.comision + parseFloat( parseFloat((element2.comisiontotal)).toFixed(0));
            obj.valorgarantias = obj.valorgarantias + parseFloat( parseFloat((element2.saldototal)).toFixed(0));
            obj.garantias = obj.garantias + parseFloat(element2.cantidadgarantias);
            obj.proceso = element2.estado;
            cobertura = cobertura + parseFloat(parseFloat((element2.cobertura)).toFixed(0));
            var date1: Date = this.parseDate(element2.creadoen.toString().substring(0, 10), 'dd/mm/YYYY');
            var dates: Date[] = this.getDatesBetween(date1, currentDate); 
            if (dates.length < 30) {
              obj.estado = "NO REPORTE MES";
              if (dates.length < 15) {
                obj.estado = "REPORTE ACTUALIZADO";
              }
            }
            if (dates.length > 30 && dates.length <= 60) {
              obj.estado = "ALERTA DE NO REPORTE";
            }
            if (dates.length > 60) {
              obj.estado = "REPORTE CRÍTICO";
            }
          }
        });
        obj.cobertura = cobertura;
        listobj.push(obj);
        // Check if it's the last iteration
        if (index1 === array1.length - 1) {
          const Heading = [
            ['INSTITUCIÓN', 'ID REPORTE', 'FECHA REPORTE', 'VALOR COMISIÓN', 'VALOR GARANTIAS', 'NUMERO CEDULAS REPORTADAS', 'PROCESO', 'COBERTURA DISPONIBLE', 'ESTADO INSTITUCIÓN']
          ];
          const rows = listobj.map(row => ({
            intermediario: row.intermediario,
            idgarantia: row.idgarantia,
            fechareporte: row.fechareporte,
            comision: row.comision,
            valorgarantias: row.valorgarantias,
            garantias: row.garantias,
            proceso: row.proceso,
            cobertura: row.cobertura,
            estado: row.estado
          }));
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
          XLSX.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Garantias");
          this.alertPage.presentAlert("Exito! Reporte generado.")
          this.cargador.getFinish();
        }
      });
    });
  }

}

export class Movilizado {
  intermediario;
  idgarantia;
  fechareporte;
  comision = 0;
  valorgarantias = 0;
  garantias = 0;
  proceso;
  cobertura;
  estado;
}


export class Cobrado {
  intermediario;
  valorcobrado = 0;
  registros = 0;
  fechacobro;
  estado;
  cobertura;
}
