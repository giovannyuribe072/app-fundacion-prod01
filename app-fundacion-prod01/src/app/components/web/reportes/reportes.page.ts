import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AlertPage } from '../../alert/alert.page';
import { DatePage } from '../../util/date.page';
import { CargadorService } from '../../services/cargador.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReportesService } from '../../services/reportes.service';
import { Intermediario } from '../../model/intermediario.model';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { AplicarPagos } from '../../model/aplicarpago.model';
import { RecaudoAnalista } from '../../model/recaudoanalista.model';
import { Presupuesto } from '../creacionusuarios/creacionusuarios.page';

export class ModelMeses {
  id;
  mes;
}

export class ModelDia {
  id;
  dia;
}
export class ModelRecaudoMes {
  id;
  origen;
  recaudo;
  mes;
  ano;
}
var constructorvalor: any[];
var constructornombre: string[];
var constructorvalor1meses: ModelRecaudoMes[];
var constructorvalor1: ModelMeses[];
var constructorvalorpresupuesto: any[];
var constructorvalor1p: any[];
var constructornombre1: any[];
var constructornombre1presupuesto: any[];
var constructornombre1r: any[];
declare var Highcharts


var constructorvalor1dia: any[];
var constructorvalor2dia: any[];
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

function chartFuncion() {

  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    colors: ['#005B9E'],
    title: {
      text: 'RECAUDO POR ANALISTA'
    },
    xAxis: {
      categories: constructornombre,
      name: 'Gestor de Cobranza',
      crosshair: true
    },
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Recaudo:'
      },
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return '$' + formatearNumero(this.value)
          } else {
            return '-$' + (formatearNumero(-this.value))
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
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
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: ' Recaudo Gestor',
      data: constructorvalor


    }]
  });
}
function chartFuncion1() {

  Highcharts.chart('container1', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'RECAUDO POR MES Y AÑO'
    },
    colors: ['#005B9E', '#005B1E'],
    xAxis: {
      categories: constructorvalor1,
      crosshair: true
    },
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Recaudo:'
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
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Crédito',
      data: constructornombre1

    }, {
      name: 'Recaudo: ',
      data: constructornombre1r

    }]
  });
}
function chartFuncion2(fecha) {
  Highcharts.chart('container2', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Recaudo:'
      },
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return '$' + formatearNumero(this.value)
          } else {
            return '-$' + (formatearNumero(-this.value))
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'RECAUDO POR DÍA'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    colors: ['#005B9E'],
    tooltip: {
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
    series: [{
      name: fecha,
      data: constructorvalor1dia
    }],
    xAxis: {
      categories: constructorvalor2dia,
      name: 'Dia',
      crosshair: true
    }
  });
}
function chartFuncion3() {
  Highcharts.chart('container3', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'RECAUDO Y PRESUPUESTO POR MES Y AÑO'
    },
    colors: ['#005B9E', '#005B1E'],
    xAxis: {
      categories: constructorvalor1,
      crosshair: true
    },
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Recaudo:'
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
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Presupuesto',
      data: constructornombre1presupuesto

    }, {
      name: 'Recaudo: ',
      data: constructornombre1r

    }]
  });
}

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.page.html',
  styleUrls: ['reportes.page.scss']
})
export class HomePage implements OnInit {
  // estructura formato grafica
  dataSourceMes: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes: string[] = ['nombre', 'select'];
  dataSourceAno: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno: string[] = ['nombre', 'select'];
  dataSourceInt: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt: string[] = ['nombre', 'select'];
  checkntc = false;
  checkano = false;
  checkint = false;
  checknotc = false;
  checkfigurecontainer = false;
  filtromes: Date;
  listames: any[] = [];
  filtroano: Date;
  listaano: any[] = [];
  filtrointermediario: string;
  listaintermediario: any[] = [];
  // estructura formato grafica
  dataSourceMes1: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes1: string[] = ['nombre', 'select'];
  dataSourceAno1: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno1: string[] = ['nombre', 'select'];
  dataSourceInt1: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt1: string[] = ['nombre', 'select'];
  checkntc1 = false;
  checkano1 = false;
  checkint1 = false;
  checkfigurecontainer1 = false;
  filtromes1: Date;
  listames1: any[] = [];
  filtroano1: Date;
  listaano1: any[] = [];
  filtrointermediario1: string;
  listaintermediario1: any[] = [];
  //
  // estructura formato grafica
  dataSourceMes2: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes2: string[] = ['nombre', 'select'];
  dataSourceAno2: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno2: string[] = ['nombre', 'select'];
  dataSourceInt2: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt2: string[] = ['nombre', 'select'];
  checkntc2 = false;
  checkano2 = false;
  checkint2 = false;
  checkfigurecontainer2 = false;
  filtromes2: Date;
  listames2: any[] = [];
  filtroano2: Date;
  listaano2: any[] = [];
  filtrointermediario2: string;
  listaintermediario2: any[] = [];
  //
  // estructura formato grafica
  dataSourceMes3: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes3: string[] = ['nombre', 'select'];
  dataSourceAno3: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno3: string[] = ['nombre', 'select'];
  dataSourceInt3: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt3: string[] = ['nombre', 'select'];
  displayedColumnsRecaudoMes: string[] = ['origen', 'recaudo', 'mes'];
  grafica4 = false;
  dataSourceRecaudoMes: MatTableDataSource<any> = new MatTableDataSource();
  checkntc3 = false;
  checkano3 = false;
  checkint3 = false;
  checkfigurecontainer3 = false;
  filtromes3: Date;
  listames3: any[] = [];
  filtroano3: Date;
  listaano3: any[] = [];
  filtrointermediario3: string;
  listaintermediario3: any[] = [];
  valortotal = 0;
  //
  // estructura formato grafica
  dataSourceMes4: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes4: string[] = ['nombre', 'select'];
  dataSourceAno4: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno4: string[] = ['nombre', 'select'];
  dataSourceInt4: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt4: string[] = ['nombre', 'select'];
  checkntc4 = false;
  checkano4 = false;
  checkint4 = false;
  checkfigurecontainer4 = false;
  filtromes4: Date;
  listames4: any[] = [];
  filtroano4: Date;
  listaano4: any[] = [];
  filtrointermediario4: string;
  listaintermediario4: any[] = [];
  //
  checkdatames = false;
  grafica = false;
  grafica1 = false;
  intermediarios: Intermediario[] = [];
  users: User[] = [];
  aplicarpagos: AplicarPagos[] = [];
  recaudoAnalista: RecaudoAnalista[] = [];
  presupuestos: Presupuesto[] = [];
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  menuopcionT = sessionStorage.getItem('menuopcionT');

  @ViewChild('paginatorMes', { read: MatPaginator }) paginatorMes: MatPaginator;
  @ViewChild('paginatorAno', { read: MatPaginator }) paginatorAno: MatPaginator;
  @ViewChild('paginatorInt', { read: MatPaginator }) paginatorInt: MatPaginator;
  @ViewChild('paginatorRecaudoMes', { read: MatPaginator }) paginatorRecaudoMes: MatPaginator;
  constructor(private auth: AuthService, private reporteService: ReportesService, private alertPage: AlertPage, private date: DatePage, private cargador: CargadorService) {



    this.cargador.getCargador(10000000);
    this.auth.loginUser(this.user).then(res => {
      this.getIntemediarios();
      this.getCobradores();
      this.getRecaudoAnalista();
      this.getPresupuesto();
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
  ngOnInit() {
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  closeFirst(menuopcion: string) {

    if (menuopcion === 'analista') {
      this.checkntc = false;
      this.checkano = false;
      this.checkint = false;
      this.checknotc = false;
      this.menuopcionT = menuopcion;
      this.listames = [] = [];
      this.listaano = [] = [];
      this.listaintermediario = [] = [];

    }
    if (menuopcion === 'anodia') {
      this.checkntc1 = false;
      this.checkano1 = false;
      this.checkint1 = false;
      this.checknotc = false;
      this.menuopcionT = menuopcion;
      this.listames1 = [] = [];
      this.listaano1 = [] = [];
      this.listaintermediario1 = [] = [];
    }
    if (menuopcion === 'dia') {
      this.checkntc2 = false;
      this.checkano2 = false;
      this.checkint2 = false;
      this.checknotc = false;
      this.menuopcionT = menuopcion;
      this.listames2 = [] = [];
      this.listaano2 = [] = [];
      this.listaintermediario2 = [] = [];
    }
    if (menuopcion === 'mes') {
      this.checkntc3 = false;
      this.checkano3 = false;
      this.checkint3 = false;
      this.checknotc = false;
      this.menuopcionT = menuopcion;
      this.listames3 = [] = [];
      this.listaano3 = [] = [];
      this.listaintermediario3 = [] = [];
    }
    if (menuopcion === 'presupuestorecaudo') {
      this.checkntc4 = false;
      this.checkano4 = false;
      this.checkint4 = false;
      this.checknotc = false;
      this.menuopcionT = menuopcion;
      this.listames4 = [] = [];
      this.listaano4 = [] = [];
      this.listaintermediario4 = [] = [];
    }
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
    this.reporteService.getAfs().collection("intermediarios").get().then((event) => {
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
  getCobradores() {
    this.users = new Array<User>();
    this.reporteService.getAfs().collection("users").get().then((event) => {
      event.forEach(element => {
        var user: User = JSON.parse(JSON.stringify(element.data()));
        if (user.role == 'Cobrador' || user.role == 'Coordinador') {
          this.users.push(JSON.parse(JSON.stringify(element.data())))
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
  getRecaudoAnalista() {
    const start = performance.now();
    this.aplicarpagos = new Array<AplicarPagos>();
    return new Promise((resolve, reject) => {
      this.reporteService.getAfs().collection("aplicarpago").get().then((event) => {
        event.forEach(element => {
          var user: AplicarPagos = JSON.parse(JSON.stringify(element.data()));
          this.aplicarpagos.push(user);
        });
      }).then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      }).catch((error) => {
        reject(error);
      })
    }).then((duration) => {
      this.cargador.getFinish();
    });
  }
  /**
* Consulta Estado metodo unico software. 
 * Metodo principal:getEstado();  
 * @return Estado[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getPresupuesto() {
    this.presupuestos = new Array<Presupuesto>();
    this.reporteService.getAfs().collection("presupuesto").orderBy('fecha').get().then((event) => {
      event.forEach(element => {
        var user: Presupuesto = JSON.parse(JSON.stringify(element.data()));
        this.presupuestos.push(user);
      });
    });
  }
  /**
    * Consulta Recaudo metodo unico software. 
     * Metodo principal:consultarRecaudoAnalista();  
     * @return Recaudo[];
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  consultarRecaudoAnalista() {
    this.recaudoAnalista = new Array<RecaudoAnalista>();
    constructornombre = new Array
    constructorvalor = new Array
    if (!this.checkano) {
      if (!this.checkint) {
        this.users.forEach(element1 => {
          var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
          var recaudo = 0;
          recaudoanalistaobj.nombre = element1.nombre;
          constructornombre.push(recaudoanalistaobj.nombre + " a la fecha: " + this.date.getDate());
          this.aplicarpagos.forEach(element2 => {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                if (element2.cobrador == element1.email) {
                  recaudo = recaudo + element2.valorpago;
                }
              }
            }
            if (!this.checknotc) {
              if (element2.cobrador == element1.email) {
                recaudo = recaudo + element2.valorpago;
              }
            }
          });
          constructorvalor.push(recaudo)
          recaudoanalistaobj.recaudo = recaudo;
          this.recaudoAnalista.push(recaudoanalistaobj);
        });
        if (constructorvalor.length != 0 && constructornombre.length != 0) {
          this.grafica = true;
          $(function () {
            chartFuncion();
          });
        } else {
          this.grafica = false;
          this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
        }
      } else {
        if (this.listaintermediario.length != 0) {
          var paso = false;
          this.users.forEach(element1 => {
            var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
            var recaudo = 0;
            recaudoanalistaobj.nombre = element1.nombre;
            constructornombre.push(recaudoanalistaobj.nombre + " Intermediario: " + this.listaintermediario.toString());
            this.aplicarpagos.forEach(element2 => {
              if (element2.cobrador == element1.email) {
                this.listaintermediario.forEach(element => {
                  if (element2.intermediario == element) {
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        if (element2.cobrador == element1.email) {
                          recaudo = recaudo + element2.valorpago;
                          paso = true;
                        }
                      }
                    }
                    if (!this.checknotc) {
                      if (element2.cobrador == element1.email) {
                        recaudo = recaudo + element2.valorpago;
                        paso = true;
                      }
                    }
                  }
                });
              }
            });
            if (recaudo > 0) {
              constructorvalor.push(recaudo)
              recaudoanalistaobj.recaudo = recaudo;
              this.recaudoAnalista.push(recaudoanalistaobj);
            }

          });
          if (constructorvalor.length != 0 && constructornombre.length != 0) {
            this.grafica = true;
            $(function () {
              chartFuncion();
            });
          } else {
            this.grafica = false;
            this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
          }
        } else {
          this.alertPage.presentAlert("Error! Seleccione Intermediario.")
        }
      }
    } else {
      if (this.listaano.length != 0) {
        if (this.checkntc) {
          if (this.listames.length != 0) {
            if (this.checkint) {
              if (this.listaintermediario.length != 0) {
                var paso = false;
                this.users.forEach(element1 => {
                  var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
                  var recaudo = 0;
                  recaudoanalistaobj.nombre = element1.nombre;
                  constructornombre.push(recaudoanalistaobj.nombre + " Año: " + this.listaano.toString() + " Mes: " + this.listames.toString() + " Intermediario: " + this.listaintermediario.toString());
                  this.aplicarpagos.forEach(element2 => {
                    this.listaintermediario.forEach(element3 => {
                      if (element3 == element2.intermediario) {
                        if (element2.cobrador == element1.email) {
                          this.listaano.forEach(element => {
                            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                            var yearvalide = datevalide.getFullYear();
                            if (yearvalide == element) {
                              this.listames.forEach(element => {
                                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                if (mesvalide == element) {
                                  if (this.checknotc) {
                                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                                      if (element2.cobrador == element1.email) {
                                        recaudo = recaudo + element2.valorpago;
                                        paso = true;
                                      }
                                    }
                                  }
                                  if (!this.checknotc) {
                                    if (element2.cobrador == element1.email) {
                                      recaudo = recaudo + element2.valorpago;
                                      paso = true;
                                    }
                                  }
                                }
                              });
                            }
                          });
                        }
                      }
                    });
                  });
                  if (paso) {
                    constructorvalor.push(recaudo)
                    recaudoanalistaobj.recaudo = recaudo;
                    this.recaudoAnalista.push(recaudoanalistaobj);
                  }
                });
                if (constructorvalor.length != 0 && constructornombre.length != 0) {
                  this.grafica = true;
                  $(function () {
                    chartFuncion();
                  });
                } else {
                  this.grafica = false;
                  this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
                }
              } else {
                this.alertPage.presentAlert("Seleccione Intermediario")
              }
            } else {
              var paso = false;
              this.users.forEach(element1 => {
                var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
                var recaudo = 0;
                recaudoanalistaobj.nombre = element1.nombre;
                constructornombre.push(recaudoanalistaobj.nombre + " Año: " + this.listaano.toString() + " Mes: " + this.listames.toString());
                this.aplicarpagos.forEach(element2 => {
                  if (element2.cobrador == element1.email) {
                    this.listaano.forEach(element => {
                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                      var yearvalide = datevalide.getFullYear();
                      if (yearvalide == element) {
                        this.listames.forEach(element => {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                          if (mesvalide == element) {
                            if (this.checknotc) {
                              if (element2.rc.toString().substring(0, 3) != "NTC") {
                                if (element2.cobrador == element1.email) {
                                  recaudo = recaudo + element2.valorpago;
                                  paso = true;
                                }
                              }
                            }
                            if (!this.checknotc) {
                              if (element2.cobrador == element1.email) {
                                recaudo = recaudo + element2.valorpago;
                                paso = true;
                              }
                            }
                          }
                        });
                      }
                    });
                  }
                });
                if (paso) {
                  constructorvalor.push(recaudo)
                  recaudoanalistaobj.recaudo = recaudo;
                  this.recaudoAnalista.push(recaudoanalistaobj);
                }
              });
              if (constructorvalor.length != 0 && constructornombre.length != 0) {
                this.grafica = true;
                $(function () {
                  chartFuncion();
                });
              } else {
                this.grafica = false;
                this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
              }
            }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint) {
            if (this.listaintermediario.length != 0) {
              var paso = false;
              this.users.forEach(element1 => {
                var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
                var recaudo = 0;
                recaudoanalistaobj.nombre = element1.nombre;
                constructornombre.push(recaudoanalistaobj.nombre + " Año: " + this.listaano + " Intermediario: " + this.listaintermediario);
                this.aplicarpagos.forEach(element2 => {
                  this.listaintermediario.forEach(element3 => {
                    if (element3 == element2.intermediario) {
                      if (element2.cobrador == element1.email) {
                        this.listaano.forEach(element => {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          var yearvalide = datevalide.getFullYear();
                          if (yearvalide == element) {
                            if (this.checknotc) {
                              if (element2.rc.toString().substring(0, 3) != "NTC") {
                                if (element2.cobrador == element1.email) {
                                  recaudo = recaudo + element2.valorpago;
                                  paso = true;
                                }
                              }
                            }
                            if (!this.checknotc) {
                              if (element2.cobrador == element1.email) {
                                recaudo = recaudo + element2.valorpago;
                                paso = true;
                              }
                            }
                          }
                        });
                      }
                    }
                  });
                });
                if (recaudo > 0) {
                  constructorvalor.push(recaudo)
                  recaudoanalistaobj.recaudo = recaudo;
                  this.recaudoAnalista.push(recaudoanalistaobj);
                }
              });
              if (constructorvalor.length != 0 && constructornombre.length != 0) {
                this.grafica = true;
                $(function () {
                  chartFuncion();
                });
              } else {
                this.grafica = false;
                this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
              }
            } else {
              this.alertPage.presentAlert("Seleccione Intermediario.");
            }
          } else {
            var paso = false;
            this.users.forEach(element1 => {
              var recaudoanalistaobj: RecaudoAnalista = new RecaudoAnalista();
              var recaudo = 0;
              recaudoanalistaobj.nombre = element1.nombre;
              constructornombre.push(recaudoanalistaobj.nombre + " Año: " + this.listaano);
              this.aplicarpagos.forEach(element2 => {
                if (element2.cobrador == element1.email) {
                  this.listaano.forEach(element => {
                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                    var yearvalide = datevalide.getFullYear();
                    if (yearvalide == element) {
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          if (element2.cobrador == element1.email) {
                            recaudo = recaudo + element2.valorpago;
                            paso = true;
                          }
                        }
                      }
                      if (!this.checknotc) {
                        if (element2.cobrador == element1.email) {
                          recaudo = recaudo + element2.valorpago;
                          paso = true;
                        }
                      }
                    }
                  });
                }
              });
              if (recaudo > 0) {
                constructorvalor.push(recaudo)
                recaudoanalistaobj.recaudo = recaudo;
                this.recaudoAnalista.push(recaudoanalistaobj);
              }
            });
            if (constructorvalor.length != 0 && constructornombre.length != 0) {
              this.grafica = true;
              $(function () {
                chartFuncion();
              });
            } else {
              this.grafica = false;
              this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
            }
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }
  }

  /**
    * Consulta Recaudo metodo unico software. 
     * Metodo principal:consultarRecaudoAnalista();  
     * @return Recaudo[];
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  consultarMesAno() {
    this.recaudoAnalista = new Array<RecaudoAnalista>();
    constructornombre1r = new Array
    constructornombre1 = new Array
    constructorvalor1 = new Array
    constructorvalor1p = new Array
    if (!this.checkano1) {
      if (!this.checkint1) {
        var recaudoEne = 0;
        var carteraEne = 0;
        var fechaEne;
        var recaudoFeb = 0;
        var carteraFeb = 0;
        var fechaFeb;
        var recaudoMar = 0;
        var carteraMar = 0;
        var fechaMar;
        var recaudoAbr = 0;
        var carteraAbr = 0;
        var fechaAbr;
        var recaudoMay = 0;
        var carteraMay = 0;
        var fechaMay;
        var recaudoJun = 0;
        var carteraJun = 0;
        var fechaJun;
        var recaudoJul = 0;
        var carteraJul = 0;
        var fechaJul;
        var recaudoAgo = 0;
        var carteraAgo = 0;
        var fechaAgo;
        var recaudoSep = 0;
        var carteraSep = 0;
        var fechaSep;
        var recaudoOct = 0;
        var carteraOct = 0;
        var fechaOct;
        var recaudoNov = 0;
        var carteraNov = 0;
        var fechaNov;
        var recaudoDic = 0;
        var carteraDic = 0;
        var fechaDic;

        this.aplicarpagos.forEach(element2 => {
          var modelmeses = new ModelMeses();
          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);

          if (mesvalide == "01") {
            modelmeses.id = 1;
            modelmeses.mes = "Ene";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraEne = carteraEne + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoEne = recaudoEne + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoEne = recaudoEne + element2.valorpago;
            }
            fechaEne = datevalide.getFullYear();
          }
          if (mesvalide == "02") {
            modelmeses.id = 2;
            modelmeses.mes = "Feb";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraFeb = carteraFeb + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoFeb = recaudoFeb + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoFeb = recaudoFeb + element2.valorpago;
            }
            recaudoFeb = recaudoFeb + element2.valorpago;
            fechaFeb = datevalide.getFullYear();
          }
          if (mesvalide == "03") {
            modelmeses.id = 3;
            modelmeses.mes = "Mar";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraMar = carteraMar + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoMar = recaudoMar + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoMar = recaudoMar + element2.valorpago;
            }
            fechaMar = datevalide.getFullYear();
          }
          if (mesvalide == "04") {
            modelmeses.id = 4;
            modelmeses.mes = "Abr";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraAbr = carteraAbr + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoAbr = recaudoAbr + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoAbr = recaudoAbr + element2.valorpago;
            }
            fechaAbr = datevalide.getFullYear();
          }
          if (mesvalide == "05") {
            modelmeses.id = 5;
            modelmeses.mes = "May";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraMay = carteraMay + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoMay = recaudoMay + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoMay = recaudoMay + element2.valorpago;
            }
            fechaMay = datevalide.getFullYear();
          }
          if (mesvalide == "06") {
            modelmeses.id = 6;
            modelmeses.mes = "Jun";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraJun = carteraJun + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoJun = recaudoJun + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoJun = recaudoJun + element2.valorpago;
            }
            fechaJun = datevalide.getFullYear();
          }
          if (mesvalide == "07") {
            modelmeses.id = 7;
            modelmeses.mes = "Jul";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraJul = carteraJul + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoJul = recaudoJul + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoJul = recaudoJul + element2.valorpago;
            }
            fechaJul = datevalide.getFullYear();
          }
          if (mesvalide == "08") {
            modelmeses.id = 8;
            modelmeses.mes = "Ago";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraAgo = carteraAgo + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoAgo = recaudoAgo + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoAgo = recaudoAgo + element2.valorpago;
            }
            fechaAgo = datevalide.getFullYear();
          }
          if (mesvalide == "09") {
            modelmeses.id = 9;
            modelmeses.mes = "Sep";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraSep = carteraSep + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoSep = recaudoSep + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoSep = recaudoSep + element2.valorpago;
            }
            fechaSep = datevalide.getFullYear();
          }
          if (mesvalide == "10") {
            modelmeses.id = 10;
            modelmeses.mes = "Oct";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraOct = carteraOct + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoOct = recaudoOct + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoOct = recaudoOct + element2.valorpago;
            }
            fechaOct = datevalide.getFullYear();
          }
          if (mesvalide == "11") {
            modelmeses.id = 11;
            modelmeses.mes = "Nov";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraNov = carteraNov + element2.valorcapital
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoNov = recaudoNov + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoNov = recaudoNov + element2.valorpago;
            }
            fechaNov = datevalide.getFullYear();
          }
          if (mesvalide == "12") {
            modelmeses.id = 12;
            modelmeses.mes = "Dic";
            constructorvalor1.push(modelmeses)
            constructorvalor1p.push(element2.documento)
            carteraDic = carteraDic + element2.valorcapital;
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoDic = recaudoDic + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoDic = recaudoDic + element2.valorpago;
            }
            fechaDic = datevalide.getFullYear();
          }

        });

        constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

        const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
          [item.mes, item.mes])).values()];
        arrayUniqueByKey.forEach(element => {
          if (element == 'Ene') {
            constructornombre1.push(carteraEne)
            constructornombre1r.push(recaudoEne)
          }
          if (element == 'Feb') {
            constructornombre1.push(carteraFeb)
            constructornombre1r.push(recaudoFeb)
          }
          if (element == 'Mar') {
            constructornombre1.push(carteraMar)
            constructornombre1r.push(recaudoMar)
          }
          if (element == 'Abr') {
            constructornombre1.push(carteraAbr)
            constructornombre1r.push(recaudoAbr)
          }
          if (element == 'May') {
            constructornombre1.push(carteraMay)
            constructornombre1r.push(recaudoMay)
          }
          if (element == 'Jun') {
            constructornombre1.push(carteraJun)
            constructornombre1r.push(recaudoJun)
          }
          if (element == 'Jul') {
            constructornombre1.push(carteraJul)
            constructornombre1r.push(recaudoJul)
          }
          if (element == 'Ago') {
            constructornombre1.push(carteraAgo)
            constructornombre1r.push(recaudoAgo)
          }
          if (element == 'Sep') {
            constructornombre1.push(carteraSep)
            constructornombre1r.push(recaudoSep)
          }
          if (element == 'Oct') {
            constructornombre1.push(carteraOct)
            constructornombre1r.push(recaudoOct)
          }
          if (element == 'Nov') {
            constructornombre1.push(carteraNov)
            constructornombre1r.push(recaudoNov)
          }
          if (element == 'Dic') {
            constructornombre1.push(carteraDic)
            constructornombre1r.push(recaudoDic)
          }
        });

        constructorvalor1 = new Array
        const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
          [item, item])).values()];


        if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
          constructorvalor1 = new Array
          arrayUniqueByKey.forEach(element => {
            if (element == 'Ene') {
              element = element + " " + fechaEne + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Feb') {
              element = element + " " + fechaFeb + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Mar') {
              element = element + " " + fechaMar + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Abr') {
              element = element + " " + fechaAbr + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'May') {
              element = element + " " + fechaMay + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Jun') {
              element = element + " " + fechaJun + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Jul') {
              element = element + " " + fechaJul + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Ago') {
              element = element + " " + fechaAgo + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Sep') {
              element = element + " " + fechaSep + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Oct') {
              element = element + " " + fechaOct + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Nov') {
              element = element + " " + fechaNov + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Dic') {
              element = element + " " + fechaDic + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }

          });
          this.grafica1 = true;
          $(function () {
            chartFuncion1();
          });
        } else {
          this.grafica1 = false;
          this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
        }
      } else {
        if (this.listaintermediario1.length != 0) {
          var recaudoEne = 0;
          var carteraEne = 0;
          var fechaEne;
          var recaudoFeb = 0;
          var carteraFeb = 0;
          var fechaFeb;
          var recaudoMar = 0;
          var carteraMar = 0;
          var fechaMar;
          var recaudoAbr = 0;
          var carteraAbr = 0;
          var fechaAbr;
          var recaudoMay = 0;
          var carteraMay = 0;
          var fechaMay;
          var recaudoJun = 0;
          var carteraJun = 0;
          var fechaJun;
          var recaudoJul = 0;
          var carteraJul = 0;
          var fechaJul;
          var recaudoAgo = 0;
          var carteraAgo = 0;
          var fechaAgo;
          var recaudoSep = 0;
          var carteraSep = 0;
          var fechaSep;
          var recaudoOct = 0;
          var carteraOct = 0;
          var fechaOct;
          var recaudoNov = 0;
          var carteraNov = 0;
          var fechaNov;
          var recaudoDic = 0;
          var carteraDic = 0;
          var fechaDic;
          this.aplicarpagos.forEach(element2 => {
            var modelmeses = new ModelMeses();
            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            this.listaintermediario1.forEach(element => {
              if (element2.intermediario == element) {
                if (mesvalide == "01") {
                  modelmeses.id = 1;
                  modelmeses.mes = "Ene";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraEne = carteraEne + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoEne = recaudoEne + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoEne = recaudoEne + element2.valorpago;
                  }
                  fechaEne = datevalide.getFullYear();
                }
                if (mesvalide == "02") {
                  modelmeses.id = 2;
                  modelmeses.mes = "Feb";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraFeb = carteraFeb + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoFeb = recaudoFeb + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoFeb = recaudoFeb + element2.valorpago;
                  }
                  recaudoFeb = recaudoFeb + element2.valorpago;
                  fechaFeb = datevalide.getFullYear();
                }
                if (mesvalide == "03") {
                  modelmeses.id = 3;
                  modelmeses.mes = "Mar";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraMar = carteraMar + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMar = recaudoMar + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMar = recaudoMar + element2.valorpago;
                  }
                  fechaMar = datevalide.getFullYear();
                }
                if (mesvalide == "04") {
                  modelmeses.id = 4;
                  modelmeses.mes = "Abr";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraAbr = carteraAbr + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAbr = recaudoAbr + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAbr = recaudoAbr + element2.valorpago;
                  }
                  fechaAbr = datevalide.getFullYear();
                }
                if (mesvalide == "05") {
                  modelmeses.id = 5;
                  modelmeses.mes = "May";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraMay = carteraMay + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMay = recaudoMay + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMay = recaudoMay + element2.valorpago;
                  }
                  fechaMay = datevalide.getFullYear();
                }
                if (mesvalide == "06") {
                  modelmeses.id = 6;
                  modelmeses.mes = "Jun";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraJun = carteraJun + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJun = recaudoJun + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJun = recaudoJun + element2.valorpago;
                  }
                  fechaJun = datevalide.getFullYear();
                }
                if (mesvalide == "07") {
                  modelmeses.id = 7;
                  modelmeses.mes = "Jul";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraJul = carteraJul + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJul = recaudoJul + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJul = recaudoJul + element2.valorpago;
                  }
                  fechaJul = datevalide.getFullYear();
                }
                if (mesvalide == "08") {
                  modelmeses.id = 8;
                  modelmeses.mes = "Ago";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraAgo = carteraAgo + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAgo = recaudoAgo + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAgo = recaudoAgo + element2.valorpago;
                  }
                  fechaAgo = datevalide.getFullYear();
                }
                if (mesvalide == "09") {
                  modelmeses.id = 9;
                  modelmeses.mes = "Sep";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraSep = carteraSep + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoSep = recaudoSep + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoSep = recaudoSep + element2.valorpago;
                  }
                  fechaSep = datevalide.getFullYear();
                }
                if (mesvalide == "10") {
                  modelmeses.id = 10;
                  modelmeses.mes = "Oct";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraOct = carteraOct + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoOct = recaudoOct + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoOct = recaudoOct + element2.valorpago;
                  }
                  fechaOct = datevalide.getFullYear();
                }
                if (mesvalide == "11") {
                  modelmeses.id = 11;
                  modelmeses.mes = "Nov";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraNov = carteraNov + element2.valorcapital
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoNov = recaudoNov + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoNov = recaudoNov + element2.valorpago;
                  }
                  fechaNov = datevalide.getFullYear();
                }
                if (mesvalide == "12") {
                  modelmeses.id = 12;
                  modelmeses.mes = "Dic";
                  constructorvalor1.push(modelmeses)
                  constructorvalor1p.push(element2.documento)
                  carteraDic = carteraDic + element2.valorcapital;
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoDic = recaudoDic + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoDic = recaudoDic + element2.valorpago;
                  }
                  fechaDic = datevalide.getFullYear();
                }
                paso = true;
              }
            });
          });

          constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

          const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
            [item.mes, item.mes])).values()];
          arrayUniqueByKey.forEach(element => {
            if (element == 'Ene') {
              constructornombre1.push(carteraEne)
              constructornombre1r.push(recaudoEne)
            }
            if (element == 'Feb') {
              constructornombre1.push(carteraFeb)
              constructornombre1r.push(recaudoFeb)
            }
            if (element == 'Mar') {
              constructornombre1.push(carteraMar)
              constructornombre1r.push(recaudoMar)
            }
            if (element == 'Abr') {
              constructornombre1.push(carteraAbr)
              constructornombre1r.push(recaudoAbr)
            }
            if (element == 'May') {
              constructornombre1.push(carteraMay)
              constructornombre1r.push(recaudoMay)
            }
            if (element == 'Jun') {
              constructornombre1.push(carteraJun)
              constructornombre1r.push(recaudoJun)
            }
            if (element == 'Jul') {
              constructornombre1.push(carteraJul)
              constructornombre1r.push(recaudoJul)
            }
            if (element == 'Ago') {
              constructornombre1.push(carteraAgo)
              constructornombre1r.push(recaudoAgo)
            }
            if (element == 'Sep') {
              constructornombre1.push(carteraSep)
              constructornombre1r.push(recaudoSep)
            }
            if (element == 'Oct') {
              constructornombre1.push(carteraOct)
              constructornombre1r.push(recaudoOct)
            }
            if (element == 'Nov') {
              constructornombre1.push(carteraNov)
              constructornombre1r.push(recaudoNov)
            }
            if (element == 'Dic') {
              constructornombre1.push(carteraDic)
              constructornombre1r.push(recaudoDic)
            }
          });

          constructorvalor1 = new Array
          const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
            [item, item])).values()];


          if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
            constructorvalor1 = new Array
            arrayUniqueByKey.forEach(element => {
              if (element == 'Ene') {
                element = element + " " + fechaEne + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Feb') {
                element = element + " " + fechaFeb + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Mar') {
                element = element + " " + fechaMar + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Abr') {
                element = element + " " + fechaAbr + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'May') {
                element = element + " " + fechaMay + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Jun') {
                element = element + " " + fechaJun + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Jul') {
                element = element + " " + fechaJul + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Ago') {
                element = element + " " + fechaAgo + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Sep') {
                element = element + " " + fechaSep + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Oct') {
                element = element + " " + fechaOct + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Nov') {
                element = element + " " + fechaNov + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Dic') {
                element = element + " " + fechaDic + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }

            });
            this.grafica1 = true;
            $(function () {
              chartFuncion1();
            });
          } else {
            this.grafica1 = false;
            this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
          }
        } else {
          this.alertPage.presentAlert("Error! Seleccione Intermediario.")
        }
      }
    } else {
      if (this.listaano1.length != 0) {
        if (this.checkntc1) {
          if (this.listames1.length != 0) {
            if (this.checkint1) {
              if (this.listaintermediario1.length != 0) {
                var paso = false;
                var recaudoEne = 0;
                var carteraEne = 0;
                var fechaEne;
                var recaudoFeb = 0;
                var carteraFeb = 0;
                var fechaFeb;
                var recaudoMar = 0;
                var carteraMar = 0;
                var fechaMar;
                var recaudoAbr = 0;
                var carteraAbr = 0;
                var fechaAbr;
                var recaudoMay = 0;
                var carteraMay = 0;
                var fechaMay;
                var recaudoJun = 0;
                var carteraJun = 0;
                var fechaJun;
                var recaudoJul = 0;
                var carteraJul = 0;
                var fechaJul;
                var recaudoAgo = 0;
                var carteraAgo = 0;
                var fechaAgo;
                var recaudoSep = 0;
                var carteraSep = 0;
                var fechaSep;
                var recaudoOct = 0;
                var carteraOct = 0;
                var fechaOct;
                var recaudoNov = 0;
                var carteraNov = 0;
                var fechaNov;
                var recaudoDic = 0;
                var carteraDic = 0;
                var fechaDic;
                this.aplicarpagos.forEach(element2 => {
                  this.listaintermediario1.forEach(element4 => {
                    if (element4 == element2.intermediario) {
                      var modelmeses = new ModelMeses();
                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                      var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                      this.listaano1.forEach(element => {
                        var yearvalide = datevalide.getFullYear();
                        if (yearvalide == element) {
                          this.listames1.forEach(elementmes => {
                            if (mesvalide == elementmes) {
                              if (mesvalide == "01") {
                                modelmeses.id = 1;
                                modelmeses.mes = "Ene";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraEne = carteraEne + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoEne = recaudoEne + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoEne = recaudoEne + element2.valorpago;
                                }
                                fechaEne = datevalide.getFullYear();
                              }
                              if (mesvalide == "02") {
                                modelmeses.id = 2;
                                modelmeses.mes = "Feb";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraFeb = carteraFeb + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoFeb = recaudoFeb + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoFeb = recaudoFeb + element2.valorpago;
                                }
                                recaudoFeb = recaudoFeb + element2.valorpago;
                                fechaFeb = datevalide.getFullYear();
                              }
                              if (mesvalide == "03") {
                                modelmeses.id = 3;
                                modelmeses.mes = "Mar";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraMar = carteraMar + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoMar = recaudoMar + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoMar = recaudoMar + element2.valorpago;
                                }
                                fechaMar = datevalide.getFullYear();
                              }
                              if (mesvalide == "04") {
                                modelmeses.id = 4;
                                modelmeses.mes = "Abr";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraAbr = carteraAbr + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoAbr = recaudoAbr + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoAbr = recaudoAbr + element2.valorpago;
                                }
                                fechaAbr = datevalide.getFullYear();
                              }
                              if (mesvalide == "05") {
                                modelmeses.id = 5;
                                modelmeses.mes = "May";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraMay = carteraMay + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoMay = recaudoMay + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoMay = recaudoMay + element2.valorpago;
                                }
                                fechaMay = datevalide.getFullYear();
                              }
                              if (mesvalide == "06") {
                                modelmeses.id = 6;
                                modelmeses.mes = "Jun";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraJun = carteraJun + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoJun = recaudoJun + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoJun = recaudoJun + element2.valorpago;
                                }
                                fechaJun = datevalide.getFullYear();
                              }
                              if (mesvalide == "07") {
                                modelmeses.id = 7;
                                modelmeses.mes = "Jul";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraJul = carteraJul + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoJul = recaudoJul + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoJul = recaudoJul + element2.valorpago;
                                }
                                fechaJul = datevalide.getFullYear();
                              }
                              if (mesvalide == "08") {
                                modelmeses.id = 8;
                                modelmeses.mes = "Ago";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraAgo = carteraAgo + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoAgo = recaudoAgo + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoAgo = recaudoAgo + element2.valorpago;
                                }
                                fechaAgo = datevalide.getFullYear();
                              }
                              if (mesvalide == "09") {
                                modelmeses.id = 9;
                                modelmeses.mes = "Sep";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraSep = carteraSep + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoSep = recaudoSep + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoSep = recaudoSep + element2.valorpago;
                                }
                                fechaSep = datevalide.getFullYear();
                              }
                              if (mesvalide == "10") {
                                modelmeses.id = 10;
                                modelmeses.mes = "Oct";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraOct = carteraOct + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoOct = recaudoOct + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoOct = recaudoOct + element2.valorpago;
                                }
                                fechaOct = datevalide.getFullYear();
                              }
                              if (mesvalide == "11") {
                                modelmeses.id = 11;
                                modelmeses.mes = "Nov";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraNov = carteraNov + element2.valorcapital
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoNov = recaudoNov + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoNov = recaudoNov + element2.valorpago;
                                }
                                fechaNov = datevalide.getFullYear();
                              }
                              if (mesvalide == "12") {
                                modelmeses.id = 12;
                                modelmeses.mes = "Dic";
                                constructorvalor1.push(modelmeses)
                                constructorvalor1p.push(element2.documento)
                                carteraDic = carteraDic + element2.valorcapital;
                                if (this.checknotc) {
                                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                                    recaudoDic = recaudoDic + element2.valorpago;
                                  }
                                }
                                if (!this.checknotc) {
                                  recaudoDic = recaudoDic + element2.valorpago;
                                }
                                fechaDic = datevalide.getFullYear();
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                });
                constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

                const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
                  [item.mes, item.mes])).values()];
                arrayUniqueByKey.forEach(element => {
                  if (element == 'Ene') {
                    constructornombre1.push(carteraEne)
                    constructornombre1r.push(recaudoEne)
                  }
                  if (element == 'Feb') {
                    constructornombre1.push(carteraFeb)
                    constructornombre1r.push(recaudoFeb)
                  }
                  if (element == 'Mar') {
                    constructornombre1.push(carteraMar)
                    constructornombre1r.push(recaudoMar)
                  }
                  if (element == 'Abr') {
                    constructornombre1.push(carteraAbr)
                    constructornombre1r.push(recaudoAbr)
                  }
                  if (element == 'May') {
                    constructornombre1.push(carteraMay)
                    constructornombre1r.push(recaudoMay)
                  }
                  if (element == 'Jun') {
                    constructornombre1.push(carteraJun)
                    constructornombre1r.push(recaudoJun)
                  }
                  if (element == 'Jul') {
                    constructornombre1.push(carteraJul)
                    constructornombre1r.push(recaudoJul)
                  }
                  if (element == 'Ago') {
                    constructornombre1.push(carteraAgo)
                    constructornombre1r.push(recaudoAgo)
                  }
                  if (element == 'Sep') {
                    constructornombre1.push(carteraSep)
                    constructornombre1r.push(recaudoSep)
                  }
                  if (element == 'Oct') {
                    constructornombre1.push(carteraOct)
                    constructornombre1r.push(recaudoOct)
                  }
                  if (element == 'Nov') {
                    constructornombre1.push(carteraNov)
                    constructornombre1r.push(recaudoNov)
                  }
                  if (element == 'Dic') {
                    constructornombre1.push(carteraDic)
                    constructornombre1r.push(recaudoDic)
                  }
                });

                constructorvalor1 = new Array
                const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
                  [item, item])).values()];


                if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
                  constructorvalor1 = new Array
                  arrayUniqueByKey.forEach(element => {
                    if (element == 'Ene') {
                      element = element + " " + fechaEne + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Feb') {
                      element = element + " " + fechaFeb + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Mar') {
                      element = element + " " + fechaMar + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Abr') {
                      element = element + " " + fechaAbr + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'May') {
                      element = element + " " + fechaMay + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Jun') {
                      element = element + " " + fechaJun + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Jul') {
                      element = element + " " + fechaJul + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Ago') {
                      element = element + " " + fechaAgo + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Sep') {
                      element = element + " " + fechaSep + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Oct') {
                      element = element + " " + fechaOct + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Nov') {
                      element = element + " " + fechaNov + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }
                    if (element == 'Dic') {
                      element = element + " " + fechaDic + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + " Intermediario: " + this.listaintermediario1;
                      constructorvalor1.push(element)
                    }

                  });
                  this.grafica1 = true;
                  $(function () {
                    chartFuncion1();
                  });
                } else {
                  this.grafica1 = false;
                  this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
                }
              } else {
                this.alertPage.presentAlert("Seleccione Intermediario")
              }
            } else {
              var paso = false;
              var recaudoEne = 0;
              var carteraEne = 0;
              var fechaEne;
              var recaudoFeb = 0;
              var carteraFeb = 0;
              var fechaFeb;
              var recaudoMar = 0;
              var carteraMar = 0;
              var fechaMar;
              var recaudoAbr = 0;
              var carteraAbr = 0;
              var fechaAbr;
              var recaudoMay = 0;
              var carteraMay = 0;
              var fechaMay;
              var recaudoJun = 0;
              var carteraJun = 0;
              var fechaJun;
              var recaudoJul = 0;
              var carteraJul = 0;
              var fechaJul;
              var recaudoAgo = 0;
              var carteraAgo = 0;
              var fechaAgo;
              var recaudoSep = 0;
              var carteraSep = 0;
              var fechaSep;
              var recaudoOct = 0;
              var carteraOct = 0;
              var fechaOct;
              var recaudoNov = 0;
              var carteraNov = 0;
              var fechaNov;
              var recaudoDic = 0;
              var carteraDic = 0;
              var fechaDic;
              this.aplicarpagos.forEach(element2 => {
                var modelmeses = new ModelMeses();
                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                this.listaano1.forEach(element => {
                  var yearvalide = datevalide.getFullYear();
                  if (yearvalide == element) {
                    this.listames1.forEach(elementmes => {
                      if (mesvalide == elementmes) {
                        if (mesvalide == "01") {
                          modelmeses.id = 1;
                          modelmeses.mes = "Ene";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraEne = carteraEne + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoEne = recaudoEne + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoEne = recaudoEne + element2.valorpago;
                          }
                          fechaEne = datevalide.getFullYear();
                        }
                        if (mesvalide == "02") {
                          modelmeses.id = 2;
                          modelmeses.mes = "Feb";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraFeb = carteraFeb + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoFeb = recaudoFeb + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoFeb = recaudoFeb + element2.valorpago;
                          }
                          recaudoFeb = recaudoFeb + element2.valorpago;
                          fechaFeb = datevalide.getFullYear();
                        }
                        if (mesvalide == "03") {
                          modelmeses.id = 3;
                          modelmeses.mes = "Mar";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraMar = carteraMar + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoMar = recaudoMar + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoMar = recaudoMar + element2.valorpago;
                          }
                          fechaMar = datevalide.getFullYear();
                        }
                        if (mesvalide == "04") {
                          modelmeses.id = 4;
                          modelmeses.mes = "Abr";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraAbr = carteraAbr + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoAbr = recaudoAbr + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoAbr = recaudoAbr + element2.valorpago;
                          }
                          fechaAbr = datevalide.getFullYear();
                        }
                        if (mesvalide == "05") {
                          modelmeses.id = 5;
                          modelmeses.mes = "May";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraMay = carteraMay + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoMay = recaudoMay + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoMay = recaudoMay + element2.valorpago;
                          }
                          fechaMay = datevalide.getFullYear();
                        }
                        if (mesvalide == "06") {
                          modelmeses.id = 6;
                          modelmeses.mes = "Jun";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraJun = carteraJun + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoJun = recaudoJun + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoJun = recaudoJun + element2.valorpago;
                          }
                          fechaJun = datevalide.getFullYear();
                        }
                        if (mesvalide == "07") {
                          modelmeses.id = 7;
                          modelmeses.mes = "Jul";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraJul = carteraJul + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoJul = recaudoJul + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoJul = recaudoJul + element2.valorpago;
                          }
                          fechaJul = datevalide.getFullYear();
                        }
                        if (mesvalide == "08") {
                          modelmeses.id = 8;
                          modelmeses.mes = "Ago";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraAgo = carteraAgo + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoAgo = recaudoAgo + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoAgo = recaudoAgo + element2.valorpago;
                          }
                          fechaAgo = datevalide.getFullYear();
                        }
                        if (mesvalide == "09") {
                          modelmeses.id = 9;
                          modelmeses.mes = "Sep";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraSep = carteraSep + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoSep = recaudoSep + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoSep = recaudoSep + element2.valorpago;
                          }
                          fechaSep = datevalide.getFullYear();
                        }
                        if (mesvalide == "10") {
                          modelmeses.id = 10;
                          modelmeses.mes = "Oct";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraOct = carteraOct + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoOct = recaudoOct + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoOct = recaudoOct + element2.valorpago;
                          }
                          fechaOct = datevalide.getFullYear();
                        }
                        if (mesvalide == "11") {
                          modelmeses.id = 11;
                          modelmeses.mes = "Nov";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraNov = carteraNov + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoNov = recaudoNov + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoNov = recaudoNov + element2.valorpago;
                          }
                          fechaNov = datevalide.getFullYear();
                        }
                        if (mesvalide == "12") {
                          modelmeses.id = 12;
                          modelmeses.mes = "Dic";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraDic = carteraDic + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoDic = recaudoDic + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoDic = recaudoDic + element2.valorpago;
                          }
                          fechaDic = datevalide.getFullYear();
                        }
                      }
                    });
                  }
                });
              });

              constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

              const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
                [item.mes, item.mes])).values()];
              arrayUniqueByKey.forEach(element => {
                if (element == 'Ene') {
                  constructornombre1.push(carteraEne)
                  constructornombre1r.push(recaudoEne)
                }
                if (element == 'Feb') {
                  constructornombre1.push(carteraFeb)
                  constructornombre1r.push(recaudoFeb)
                }
                if (element == 'Mar') {
                  constructornombre1.push(carteraMar)
                  constructornombre1r.push(recaudoMar)
                }
                if (element == 'Abr') {
                  constructornombre1.push(carteraAbr)
                  constructornombre1r.push(recaudoAbr)
                }
                if (element == 'May') {
                  constructornombre1.push(carteraMay)
                  constructornombre1r.push(recaudoMay)
                }
                if (element == 'Jun') {
                  constructornombre1.push(carteraJun)
                  constructornombre1r.push(recaudoJun)
                }
                if (element == 'Jul') {
                  constructornombre1.push(carteraJul)
                  constructornombre1r.push(recaudoJul)
                }
                if (element == 'Ago') {
                  constructornombre1.push(carteraAgo)
                  constructornombre1r.push(recaudoAgo)
                }
                if (element == 'Sep') {
                  constructornombre1.push(carteraSep)
                  constructornombre1r.push(recaudoSep)
                }
                if (element == 'Oct') {
                  constructornombre1.push(carteraOct)
                  constructornombre1r.push(recaudoOct)
                }
                if (element == 'Nov') {
                  constructornombre1.push(carteraNov)
                  constructornombre1r.push(recaudoNov)
                }
                if (element == 'Dic') {
                  constructornombre1.push(carteraDic)
                  constructornombre1r.push(recaudoDic)
                }
              });

              constructorvalor1 = new Array
              const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
                [item, item])).values()];


              if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
                constructorvalor1 = new Array
                arrayUniqueByKey.forEach(element => {
                  if (element == 'Ene') {
                    element = element + " " + fechaEne + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Feb') {
                    element = element + " " + fechaFeb + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Mar') {
                    element = element + " " + fechaMar + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Abr') {
                    element = element + " " + fechaAbr + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'May') {
                    element = element + " " + fechaMay + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Jun') {
                    element = element + " " + fechaJun + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Jul') {
                    element = element + " " + fechaJul + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Ago') {
                    element = element + " " + fechaAgo + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Sep') {
                    element = element + " " + fechaSep + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Oct') {
                    element = element + " " + fechaOct + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Nov') {
                    element = element + " " + fechaNov + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }
                  if (element == 'Dic') {
                    element = element + " " + fechaDic + " al año: " + this.listaano1.toString() + " Mes: " + this.listames1.toString() + "  ";
                    constructorvalor1.push(element)
                  }

                });
                this.grafica1 = true;
                $(function () {
                  chartFuncion1();
                });
              } else {
                this.grafica1 = false;
                this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
              }
            }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint1) {
            if (this.listaintermediario1.length != 0) {
              var recaudoEne = 0;
              var carteraEne = 0;
              var fechaEne;
              var recaudoFeb = 0;
              var carteraFeb = 0;
              var fechaFeb;
              var recaudoMar = 0;
              var carteraMar = 0;
              var fechaMar;
              var recaudoAbr = 0;
              var carteraAbr = 0;
              var fechaAbr;
              var recaudoMay = 0;
              var carteraMay = 0;
              var fechaMay;
              var recaudoJun = 0;
              var carteraJun = 0;
              var fechaJun;
              var recaudoJul = 0;
              var carteraJul = 0;
              var fechaJul;
              var recaudoAgo = 0;
              var carteraAgo = 0;
              var fechaAgo;
              var recaudoSep = 0;
              var carteraSep = 0;
              var fechaSep;
              var recaudoOct = 0;
              var carteraOct = 0;
              var fechaOct;
              var recaudoNov = 0;
              var carteraNov = 0;
              var fechaNov;
              var recaudoDic = 0;
              var carteraDic = 0;
              var fechaDic;

              this.aplicarpagos.forEach(element2 => {
                this.listaintermediario1.forEach(element4 => {
                  if (element4 == element2.intermediario) {
                    var modelmeses = new ModelMeses();
                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                    this.listaano1.forEach(element => {
                      var yearvalide = datevalide.getFullYear();
                      if (yearvalide == element) {
                        if (mesvalide == "01") {
                          modelmeses.id = 1;
                          modelmeses.mes = "Ene";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraEne = carteraEne + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoEne = recaudoEne + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoEne = recaudoEne + element2.valorpago;
                          }
                          fechaEne = datevalide.getFullYear();
                        }
                        if (mesvalide == "02") {
                          modelmeses.id = 2;
                          modelmeses.mes = "Feb";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraFeb = carteraFeb + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoFeb = recaudoFeb + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoFeb = recaudoFeb + element2.valorpago;
                          }
                          recaudoFeb = recaudoFeb + element2.valorpago;
                          fechaFeb = datevalide.getFullYear();
                        }
                        if (mesvalide == "03") {
                          modelmeses.id = 3;
                          modelmeses.mes = "Mar";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraMar = carteraMar + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoMar = recaudoMar + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoMar = recaudoMar + element2.valorpago;
                          }
                          fechaMar = datevalide.getFullYear();
                        }
                        if (mesvalide == "04") {
                          modelmeses.id = 4;
                          modelmeses.mes = "Abr";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraAbr = carteraAbr + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoAbr = recaudoAbr + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoAbr = recaudoAbr + element2.valorpago;
                          }
                          fechaAbr = datevalide.getFullYear();
                        }
                        if (mesvalide == "05") {
                          modelmeses.id = 5;
                          modelmeses.mes = "May";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraMay = carteraMay + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoMay = recaudoMay + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoMay = recaudoMay + element2.valorpago;
                          }
                          fechaMay = datevalide.getFullYear();
                        }
                        if (mesvalide == "06") {
                          modelmeses.id = 6;
                          modelmeses.mes = "Jun";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraJun = carteraJun + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoJun = recaudoJun + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoJun = recaudoJun + element2.valorpago;
                          }
                          fechaJun = datevalide.getFullYear();
                        }
                        if (mesvalide == "07") {
                          modelmeses.id = 7;
                          modelmeses.mes = "Jul";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraJul = carteraJul + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoJul = recaudoJul + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoJul = recaudoJul + element2.valorpago;
                          }
                          fechaJul = datevalide.getFullYear();
                        }
                        if (mesvalide == "08") {
                          modelmeses.id = 8;
                          modelmeses.mes = "Ago";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraAgo = carteraAgo + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoAgo = recaudoAgo + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoAgo = recaudoAgo + element2.valorpago;
                          }
                          fechaAgo = datevalide.getFullYear();
                        }
                        if (mesvalide == "09") {
                          modelmeses.id = 9;
                          modelmeses.mes = "Sep";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraSep = carteraSep + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoSep = recaudoSep + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoSep = recaudoSep + element2.valorpago;
                          }
                          fechaSep = datevalide.getFullYear();
                        }
                        if (mesvalide == "10") {
                          modelmeses.id = 10;
                          modelmeses.mes = "Oct";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraOct = carteraOct + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoOct = recaudoOct + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoOct = recaudoOct + element2.valorpago;
                          }
                          fechaOct = datevalide.getFullYear();
                        }
                        if (mesvalide == "11") {
                          modelmeses.id = 11;
                          modelmeses.mes = "Nov";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraNov = carteraNov + element2.valorcapital
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoNov = recaudoNov + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoNov = recaudoNov + element2.valorpago;
                          }
                          fechaNov = datevalide.getFullYear();
                        }
                        if (mesvalide == "12") {
                          modelmeses.id = 12;
                          modelmeses.mes = "Dic";
                          constructorvalor1.push(modelmeses)
                          constructorvalor1p.push(element2.documento)
                          carteraDic = carteraDic + element2.valorcapital;
                          if (this.checknotc) {
                            if (element2.rc.toString().substring(0, 3) != "NTC") {
                              recaudoDic = recaudoDic + element2.valorpago;
                            }
                          }
                          if (!this.checknotc) {
                            recaudoDic = recaudoDic + element2.valorpago;
                          }
                          fechaDic = datevalide.getFullYear();
                        }
                      }
                    });
                  }
                });

              });

              constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

              const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
                [item.mes, item.mes])).values()];
              arrayUniqueByKey.forEach(element => {
                if (element == 'Ene') {
                  constructornombre1.push(carteraEne)
                  constructornombre1r.push(recaudoEne)
                }
                if (element == 'Feb') {
                  constructornombre1.push(carteraFeb)
                  constructornombre1r.push(recaudoFeb)
                }
                if (element == 'Mar') {
                  constructornombre1.push(carteraMar)
                  constructornombre1r.push(recaudoMar)
                }
                if (element == 'Abr') {
                  constructornombre1.push(carteraAbr)
                  constructornombre1r.push(recaudoAbr)
                }
                if (element == 'May') {
                  constructornombre1.push(carteraMay)
                  constructornombre1r.push(recaudoMay)
                }
                if (element == 'Jun') {
                  constructornombre1.push(carteraJun)
                  constructornombre1r.push(recaudoJun)
                }
                if (element == 'Jul') {
                  constructornombre1.push(carteraJul)
                  constructornombre1r.push(recaudoJul)
                }
                if (element == 'Ago') {
                  constructornombre1.push(carteraAgo)
                  constructornombre1r.push(recaudoAgo)
                }
                if (element == 'Sep') {
                  constructornombre1.push(carteraSep)
                  constructornombre1r.push(recaudoSep)
                }
                if (element == 'Oct') {
                  constructornombre1.push(carteraOct)
                  constructornombre1r.push(recaudoOct)
                }
                if (element == 'Nov') {
                  constructornombre1.push(carteraNov)
                  constructornombre1r.push(recaudoNov)
                }
                if (element == 'Dic') {
                  constructornombre1.push(carteraDic)
                  constructornombre1r.push(recaudoDic)
                }
              });

              constructorvalor1 = new Array
              const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
                [item, item])).values()];


              if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
                constructorvalor1 = new Array
                arrayUniqueByKey.forEach(element => {
                  if (element == 'Ene') {
                    element = element + " " + fechaEne + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Feb') {
                    element = element + " " + fechaFeb + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Mar') {
                    element = element + " " + fechaMar + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Abr') {
                    element = element + " " + fechaAbr + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'May') {
                    element = element + " " + fechaMay + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Jun') {
                    element = element + " " + fechaJun + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Jul') {
                    element = element + " " + fechaJul + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Ago') {
                    element = element + " " + fechaAgo + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Sep') {
                    element = element + " " + fechaSep + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Oct') {
                    element = element + " " + fechaOct + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Nov') {
                    element = element + " " + fechaNov + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }
                  if (element == 'Dic') {
                    element = element + " " + fechaDic + " al año: " + this.listaano1.toString() + " Intermediario: " + this.listaintermediario1;
                    constructorvalor1.push(element)
                  }

                });
                this.grafica1 = true;
                $(function () {
                  chartFuncion1();
                });
              } else {
                this.grafica1 = false;
                this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
              }
            } else {
              this.alertPage.presentAlert("Seleccione Intermediario.")
            }
          } else {
            var recaudoEne = 0;
            var carteraEne = 0;
            var fechaEne;
            var recaudoFeb = 0;
            var carteraFeb = 0;
            var fechaFeb;
            var recaudoMar = 0;
            var carteraMar = 0;
            var fechaMar;
            var recaudoAbr = 0;
            var carteraAbr = 0;
            var fechaAbr;
            var recaudoMay = 0;
            var carteraMay = 0;
            var fechaMay;
            var recaudoJun = 0;
            var carteraJun = 0;
            var fechaJun;
            var recaudoJul = 0;
            var carteraJul = 0;
            var fechaJul;
            var recaudoAgo = 0;
            var carteraAgo = 0;
            var fechaAgo;
            var recaudoSep = 0;
            var carteraSep = 0;
            var fechaSep;
            var recaudoOct = 0;
            var carteraOct = 0;
            var fechaOct;
            var recaudoNov = 0;
            var carteraNov = 0;
            var fechaNov;
            var recaudoDic = 0;
            var carteraDic = 0;
            var fechaDic;

            this.aplicarpagos.forEach(element2 => {
              var modelmeses = new ModelMeses();
              var datevalide = new Date(element2.marcatiempo.seconds * 1000)
              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              this.listaano1.forEach(element => {
                var yearvalide = datevalide.getFullYear();
                if (yearvalide == element) {
                  if (mesvalide == "01") {
                    modelmeses.id = 1;
                    modelmeses.mes = "Ene";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraEne = carteraEne + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoEne = recaudoEne + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoEne = recaudoEne + element2.valorpago;
                    }
                    fechaEne = datevalide.getFullYear();
                  }
                  if (mesvalide == "02") {
                    modelmeses.id = 2;
                    modelmeses.mes = "Feb";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraFeb = carteraFeb + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoFeb = recaudoFeb + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoFeb = recaudoFeb + element2.valorpago;
                    }
                    recaudoFeb = recaudoFeb + element2.valorpago;
                    fechaFeb = datevalide.getFullYear();
                  }
                  if (mesvalide == "03") {
                    modelmeses.id = 3;
                    modelmeses.mes = "Mar";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraMar = carteraMar + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoMar = recaudoMar + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoMar = recaudoMar + element2.valorpago;
                    }
                    fechaMar = datevalide.getFullYear();
                  }
                  if (mesvalide == "04") {
                    modelmeses.id = 4;
                    modelmeses.mes = "Abr";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraAbr = carteraAbr + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoAbr = recaudoAbr + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoAbr = recaudoAbr + element2.valorpago;
                    }
                    fechaAbr = datevalide.getFullYear();
                  }
                  if (mesvalide == "05") {
                    modelmeses.id = 5;
                    modelmeses.mes = "May";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraMay = carteraMay + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoMay = recaudoMay + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoMay = recaudoMay + element2.valorpago;
                    }
                    fechaMay = datevalide.getFullYear();
                  }
                  if (mesvalide == "06") {
                    modelmeses.id = 6;
                    modelmeses.mes = "Jun";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraJun = carteraJun + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoJun = recaudoJun + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoJun = recaudoJun + element2.valorpago;
                    }
                    fechaJun = datevalide.getFullYear();
                  }
                  if (mesvalide == "07") {
                    modelmeses.id = 7;
                    modelmeses.mes = "Jul";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraJul = carteraJul + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoJul = recaudoJul + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoJul = recaudoJul + element2.valorpago;
                    }
                    fechaJul = datevalide.getFullYear();
                  }
                  if (mesvalide == "08") {
                    modelmeses.id = 8;
                    modelmeses.mes = "Ago";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraAgo = carteraAgo + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoAgo = recaudoAgo + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoAgo = recaudoAgo + element2.valorpago;
                    }
                    fechaAgo = datevalide.getFullYear();
                  }
                  if (mesvalide == "09") {
                    modelmeses.id = 9;
                    modelmeses.mes = "Sep";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraSep = carteraSep + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoSep = recaudoSep + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoSep = recaudoSep + element2.valorpago;
                    }
                    fechaSep = datevalide.getFullYear();
                  }
                  if (mesvalide == "10") {
                    modelmeses.id = 10;
                    modelmeses.mes = "Oct";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraOct = carteraOct + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoOct = recaudoOct + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoOct = recaudoOct + element2.valorpago;
                    }
                    fechaOct = datevalide.getFullYear();
                  }
                  if (mesvalide == "11") {
                    modelmeses.id = 11;
                    modelmeses.mes = "Nov";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraNov = carteraNov + element2.valorcapital
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoNov = recaudoNov + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoNov = recaudoNov + element2.valorpago;
                    }
                    fechaNov = datevalide.getFullYear();
                  }
                  if (mesvalide == "12") {
                    modelmeses.id = 12;
                    modelmeses.mes = "Dic";
                    constructorvalor1.push(modelmeses)
                    constructorvalor1p.push(element2.documento)
                    carteraDic = carteraDic + element2.valorcapital;
                    if (this.checknotc) {
                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                        recaudoDic = recaudoDic + element2.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      recaudoDic = recaudoDic + element2.valorpago;
                    }
                    fechaDic = datevalide.getFullYear();
                  }
                }
              });
            });

            constructorvalor1.sort((a, b) => a.id - b.id).map((exemple, index, array) => array)

            const arrayUniqueByKey = [...new Map(constructorvalor1.map(item =>
              [item.mes, item.mes])).values()];
            arrayUniqueByKey.forEach(element => {
              if (element == 'Ene') {
                constructornombre1.push(carteraEne)
                constructornombre1r.push(recaudoEne)
              }
              if (element == 'Feb') {
                constructornombre1.push(carteraFeb)
                constructornombre1r.push(recaudoFeb)
              }
              if (element == 'Mar') {
                constructornombre1.push(carteraMar)
                constructornombre1r.push(recaudoMar)
              }
              if (element == 'Abr') {
                constructornombre1.push(carteraAbr)
                constructornombre1r.push(recaudoAbr)
              }
              if (element == 'May') {
                constructornombre1.push(carteraMay)
                constructornombre1r.push(recaudoMay)
              }
              if (element == 'Jun') {
                constructornombre1.push(carteraJun)
                constructornombre1r.push(recaudoJun)
              }
              if (element == 'Jul') {
                constructornombre1.push(carteraJul)
                constructornombre1r.push(recaudoJul)
              }
              if (element == 'Ago') {
                constructornombre1.push(carteraAgo)
                constructornombre1r.push(recaudoAgo)
              }
              if (element == 'Sep') {
                constructornombre1.push(carteraSep)
                constructornombre1r.push(recaudoSep)
              }
              if (element == 'Oct') {
                constructornombre1.push(carteraOct)
                constructornombre1r.push(recaudoOct)
              }
              if (element == 'Nov') {
                constructornombre1.push(carteraNov)
                constructornombre1r.push(recaudoNov)
              }
              if (element == 'Dic') {
                constructornombre1.push(carteraDic)
                constructornombre1r.push(recaudoDic)
              }
            });

            constructorvalor1 = new Array
            const arrayUniqueByKeyP = [...new Map(constructorvalor1p.map(item =>
              [item, item])).values()];


            if (constructornombre1.length != 0 && constructornombre1r.length != 0 && arrayUniqueByKey.length != 0 && arrayUniqueByKeyP.length != 0) {
              constructorvalor1 = new Array
              arrayUniqueByKey.forEach(element => {
                if (element == 'Ene') {
                  element = element + " " + fechaEne + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Feb') {
                  element = element + " " + fechaFeb + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Mar') {
                  element = element + " " + fechaMar + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Abr') {
                  element = element + " " + fechaAbr + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'May') {
                  element = element + " " + fechaMay + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Jun') {
                  element = element + " " + fechaJun + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Jul') {
                  element = element + " " + fechaJul + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Ago') {
                  element = element + " " + fechaAgo + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Sep') {
                  element = element + " " + fechaSep + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Oct') {
                  element = element + " " + fechaOct + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Nov') {
                  element = element + " " + fechaNov + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Dic') {
                  element = element + " " + fechaDic + " al año: " + this.listaano1.toString() + "  ";
                  constructorvalor1.push(element)
                }

              });
              this.grafica1 = true;
              $(function () {
                chartFuncion1();
              });
            } else {
              this.grafica1 = false;
              this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
            }
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }

  }

  /**
   * Consulta Recaudo metodo unico software. 
    * Metodo principal:consultarRecaudoAnalista();  
    * @return Recaudo[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  consultarPorDia() {
    constructorvalor1dia = new Array 
    constructorvalor2dia = new Array 
    var var1 = 0;
    var var2 = 0;
    var var3 = 0;
    var var4 = 0;
    var var5 = 0;
    var var6 = 0;
    var var7 = 0;
    var var8 = 0;
    var var9 = 0;
    var var10 = 0;
    var var11 = 0;
    var var12 = 0;
    var var13 = 0;
    var var14 = 0;
    var var15 = 0;
    var var16 = 0;
    var var17 = 0;
    var var18 = 0;
    var var19 = 0;
    var var20 = 0;
    var var21 = 0;
    var var22 = 0;
    var var23 = 0;
    var var24 = 0;
    var var25 = 0;
    var var26 = 0;
    var var27 = 0;
    var var28 = 0;
    var var29 = 0;
    var var30 = 0;
    var var31 = 0;
    if (!this.checkano2) {
      if (!this.checkint2) {
        this.aplicarpagos.forEach(element2 => {
          var modelmeses = new ModelDia();
          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
          var mesvalide = datevalide.getDate();

          for (var i = 1; i <= 31; i++) {

            if (mesvalide == i) {
              if (mesvalide == 1) {
                modelmeses.id = 1;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var1 = var1 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var1 = var1 + element2.valorpago;
                }

              }
              if (mesvalide == 2) {
                modelmeses.id = 2;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var2 = var2 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var2 = var2 + element2.valorpago;
                }
              }
              if (mesvalide == 3) {
                modelmeses.id = 3;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var3 = var3 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var3 = var3 + element2.valorpago;
                }
              }
              if (mesvalide == 4) {
                modelmeses.id = 4;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var4 = var4 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var4 = var4 + element2.valorpago;
                }
              }
              if (mesvalide == 5) {
                modelmeses.id = 5;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var5 = var5 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var5 = var5 + element2.valorpago;
                }
              }
              if (mesvalide == 6) {
                modelmeses.id = 6;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var6 = var6 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var6 = var6 + element2.valorpago;
                }
              }
              if (mesvalide == 7) {
                modelmeses.id = 7;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var7 = var7 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var7 = var7 + element2.valorpago;
                }
              }
              if (mesvalide == 8) {
                modelmeses.id = 8;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var8 = var8 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var8 = var8 + element2.valorpago;
                }
              }
              if (mesvalide == 9) {
                modelmeses.id = 9;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var9 = var9 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var9 = var9 + element2.valorpago;
                }
              }
              if (mesvalide == 10) {
                modelmeses.id = 10;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var10 = var10 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var10 = var10 + element2.valorpago;
                }
              }
              if (mesvalide == 11) {
                modelmeses.id = 11;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var11 = var11 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var11 = var11 + element2.valorpago;
                }
              }
              if (mesvalide == 12) {
                modelmeses.id = 12;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var11 = var11 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var12 = var12 + element2.valorpago;
                }
              }
              if (mesvalide == 13) {
                modelmeses.id = 13;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var13 = var13 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var13 = var13 + element2.valorpago;
                }
              }
              if (mesvalide == 14) {
                modelmeses.id = 14;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var14 = var14 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var14 = var14 + element2.valorpago;
                }
              }
              if (mesvalide == 15) {
                modelmeses.id = 15;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var15 = var15 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var15 = var15 + element2.valorpago;
                }
              }
              if (mesvalide == 16) {
                modelmeses.id = 16;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var16 = var16 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var16 = var16 + element2.valorpago;
                }
              }
              if (mesvalide == 17) {
                modelmeses.id = 17;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var17 = var17 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var17 = var17 + element2.valorpago;
                }
              }
              if (mesvalide == 18) {
                modelmeses.id = 18;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var18 = var18 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var18 = var18 + element2.valorpago;
                }
              }
              if (mesvalide == 19) {
                modelmeses.id = 19;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var19 = var19 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var19 = var19 + element2.valorpago;
                }
              }
              if (mesvalide == 20) {
                modelmeses.id = 20;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var20 = var20 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var20 = var20 + element2.valorpago;
                }
              }
              if (mesvalide == 21) {
                modelmeses.id = 21;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var21 = var21 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var21 = var21 + element2.valorpago;
                }
              }
              if (mesvalide == 22) {
                modelmeses.id = 22;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var22 = var22 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var22 = var22 + element2.valorpago;
                }
              }
              if (mesvalide == 23) {
                modelmeses.id = 23;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var23 = var23 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var23 = var23 + element2.valorpago;
                }
              }
              if (mesvalide == 24) {
                modelmeses.id = 24;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var24 = var24 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var24 = var24 + element2.valorpago;
                }
              }
              if (mesvalide == 25) {
                modelmeses.id = 25;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var25 = var25 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var25 = var25 + element2.valorpago;
                }
              }
              if (mesvalide == 26) {
                modelmeses.id = 26;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var26 = var26 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var26 = var26 + element2.valorpago;
                }
              }
              if (mesvalide == 27) {
                modelmeses.id = 27;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var27 = var27 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var27 = var27 + element2.valorpago;
                }
              }
              if (mesvalide == 28) {
                modelmeses.id = 28;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var28 = var28 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var28 = var28 + element2.valorpago;
                }
              }
              if (mesvalide == 29) {
                modelmeses.id = 29;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var29 = var29 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var29 = var29 + element2.valorpago;
                }
              }
              if (mesvalide == 30) {
                modelmeses.id = 30;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var30 = var30 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var30 = var30 + element2.valorpago;
                }
              }
              if (mesvalide == 31) {
                modelmeses.id = 31;
                if (this.checknotc) {
                  if (element2.rc.toString().substring(0, 3) != "NTC") {
                    var31 = var31 + element2.valorpago;
                  }
                }
                if (!this.checknotc) {
                  var31 = var31 + element2.valorpago;
                }
              }
            }
          }

        });
        if (var1 > 0) {
          constructorvalor2dia.push(1)
          constructorvalor1dia.push(var1);
        }
        if (var2 > 0) {
          constructorvalor2dia.push(2)
          constructorvalor1dia.push(var2);
        }
        if (var3 > 0) {
          constructorvalor2dia.push(3)
          constructorvalor1dia.push(var3);
        }
        if (var4 > 0) {
          constructorvalor2dia.push(4)
          constructorvalor1dia.push(var4);
        }
        if (var5 > 0) {
          constructorvalor2dia.push(5)
          constructorvalor1dia.push(var5);
        }
        if (var6 > 0) {
          constructorvalor2dia.push(6)
          constructorvalor1dia.push(var6);
        }
        if (var7 > 0) {
          constructorvalor2dia.push(7)
          constructorvalor1dia.push(var7);
        }
        if (var8 > 0) {
          constructorvalor2dia.push(8)
          constructorvalor1dia.push(var8);
        }
        if (var9 > 0) {
          constructorvalor2dia.push(9)
          constructorvalor1dia.push(var9);
        }
        if (var10 > 0) {
          constructorvalor2dia.push(10)
          constructorvalor1dia.push(var10);
        }
        if (var11 > 0) {
          constructorvalor2dia.push(11)
          constructorvalor1dia.push(var11);
        }
        if (var12 > 0) {
          constructorvalor2dia.push(12)
          constructorvalor1dia.push(var12);
        }
        if (var13 > 0) {
          constructorvalor2dia.push(13)
          constructorvalor1dia.push(var13);
        }
        if (var14 > 0) {
          constructorvalor2dia.push(14)
          constructorvalor1dia.push(var14);
        }
        if (var15 > 0) {
          constructorvalor2dia.push(15)
          constructorvalor1dia.push(var15);
        }
        if (var16 > 0) {
          constructorvalor2dia.push(16)
          constructorvalor1dia.push(var16);
        }
        if (var17 > 0) {
          constructorvalor2dia.push(17)
          constructorvalor1dia.push(var17);
        }
        if (var18 > 0) {
          constructorvalor2dia.push(18)
          constructorvalor1dia.push(var18);
        }
        if (var19 > 0) {
          constructorvalor2dia.push(19)
          constructorvalor1dia.push(var19);
        }
        if (var20 > 0) {
          constructorvalor2dia.push(20)
          constructorvalor1dia.push(var20);
        }
        if (var21 > 0) {
          constructorvalor2dia.push(21)
          constructorvalor1dia.push(var21);
        }
        if (var22 > 0) {
          constructorvalor2dia.push(22)
          constructorvalor1dia.push(var22);
        }
        if (var23 > 0) {
          constructorvalor2dia.push(23)
          constructorvalor1dia.push(var23);
        }
        if (var24 > 0) {
          constructorvalor2dia.push(24)
          constructorvalor1dia.push(var24);
        }
        if (var25 > 0) {
          constructorvalor2dia.push(25)
          constructorvalor1dia.push(var25);
        }
        if (var26 > 0) {
          constructorvalor2dia.push(26)
          constructorvalor1dia.push(var26);
        }
        if (var27 > 0) {
          constructorvalor2dia.push(27)
          constructorvalor1dia.push(var27);
        }
        if (var28 > 0) {
          constructorvalor2dia.push(28)
          constructorvalor1dia.push(var28);
        }
        if (var29 > 0) {
          constructorvalor2dia.push(29)
          constructorvalor1dia.push(var29);
        }
        if (var30 > 0) {
          constructorvalor2dia.push(30)
          constructorvalor1dia.push(var30);
        }
        if (var31 > 0) {
          constructorvalor2dia.push(31)
          constructorvalor1dia.push(var31);
        }
        if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
          $(function () {
            var fecha = " Día de recaudo a la fecha " + new Date().getFullYear();
            chartFuncion2(fecha);
          });
        } else {
          this.alertPage.presentAlert("No hay resultados para los filtros.")
        }
      } else {
        if (this.listaintermediario2.length != 0) {
          this.aplicarpagos.forEach(element2 => {
            this.listaintermediario2.forEach(element => {
              if (element == element2.intermediario) {
                var modelmeses = new ModelDia();
                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                var mesvalide = datevalide.getDate();

                for (var i = 1; i <= 31; i++) {

                  if (mesvalide == i) {
                    if (mesvalide == 1) {
                      modelmeses.id = 1;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var1 = var1 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var1 = var1 + element2.valorpago;
                      }

                    }
                    if (mesvalide == 2) {
                      modelmeses.id = 2;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var2 = var2 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var2 = var2 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 3) {
                      modelmeses.id = 3;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var3 = var3 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var3 = var3 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 4) {
                      modelmeses.id = 4;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var4 = var4 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var4 = var4 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 5) {
                      modelmeses.id = 5;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var5 = var5 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var5 = var5 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 6) {
                      modelmeses.id = 6;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var6 = var6 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var6 = var6 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 7) {
                      modelmeses.id = 7;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var7 = var7 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var7 = var7 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 8) {
                      modelmeses.id = 8;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var8 = var8 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var8 = var8 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 9) {
                      modelmeses.id = 9;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var9 = var9 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var9 = var9 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 10) {
                      modelmeses.id = 10;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var10 = var10 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var10 = var10 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 11) {
                      modelmeses.id = 11;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var11 = var11 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var11 = var11 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 12) {
                      modelmeses.id = 12;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var11 = var11 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var12 = var12 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 13) {
                      modelmeses.id = 13;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var13 = var13 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var13 = var13 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 14) {
                      modelmeses.id = 14;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var14 = var14 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var14 = var14 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 15) {
                      modelmeses.id = 15;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var15 = var15 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var15 = var15 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 16) {
                      modelmeses.id = 16;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var16 = var16 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var16 = var16 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 17) {
                      modelmeses.id = 17;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var17 = var17 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var17 = var17 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 18) {
                      modelmeses.id = 18;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var18 = var18 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var18 = var18 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 19) {
                      modelmeses.id = 19;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var19 = var19 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var19 = var19 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 20) {
                      modelmeses.id = 20;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var20 = var20 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var20 = var20 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 21) {
                      modelmeses.id = 21;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var21 = var21 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var21 = var21 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 22) {
                      modelmeses.id = 22;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var22 = var22 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var22 = var22 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 23) {
                      modelmeses.id = 23;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var23 = var23 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var23 = var23 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 24) {
                      modelmeses.id = 24;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var24 = var24 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var24 = var24 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 25) {
                      modelmeses.id = 25;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var25 = var25 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var25 = var25 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 26) {
                      modelmeses.id = 26;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var26 = var26 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var26 = var26 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 27) {
                      modelmeses.id = 27;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var27 = var27 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var27 = var27 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 28) {
                      modelmeses.id = 28;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var28 = var28 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var28 = var28 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 29) {
                      modelmeses.id = 29;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var29 = var29 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var29 = var29 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 30) {
                      modelmeses.id = 30;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var30 = var30 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var30 = var30 + element2.valorpago;
                      }
                    }
                    if (mesvalide == 31) {
                      modelmeses.id = 31;
                      if (this.checknotc) {
                        if (element2.rc.toString().substring(0, 3) != "NTC") {
                          var31 = var31 + element2.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        var31 = var31 + element2.valorpago;
                      }
                    }
                  }
                }

              }
            });

          });
          if (var1 > 0) {
            constructorvalor2dia.push(1)
            constructorvalor1dia.push(var1);
          }
          if (var2 > 0) {
            constructorvalor2dia.push(2)
            constructorvalor1dia.push(var2);
          }
          if (var3 > 0) {
            constructorvalor2dia.push(3)
            constructorvalor1dia.push(var3);
          }
          if (var4 > 0) {
            constructorvalor2dia.push(4)
            constructorvalor1dia.push(var4);
          }
          if (var5 > 0) {
            constructorvalor2dia.push(5)
            constructorvalor1dia.push(var5);
          }
          if (var6 > 0) {
            constructorvalor2dia.push(6)
            constructorvalor1dia.push(var6);
          }
          if (var7 > 0) {
            constructorvalor2dia.push(7)
            constructorvalor1dia.push(var7);
          }
          if (var8 > 0) {
            constructorvalor2dia.push(8)
            constructorvalor1dia.push(var8);
          }
          if (var9 > 0) {
            constructorvalor2dia.push(9)
            constructorvalor1dia.push(var9);
          }
          if (var10 > 0) {
            constructorvalor2dia.push(10)
            constructorvalor1dia.push(var10);
          }
          if (var11 > 0) {
            constructorvalor2dia.push(11)
            constructorvalor1dia.push(var11);
          }
          if (var12 > 0) {
            constructorvalor2dia.push(12)
            constructorvalor1dia.push(var12);
          }
          if (var13 > 0) {
            constructorvalor2dia.push(13)
            constructorvalor1dia.push(var13);
          }
          if (var14 > 0) {
            constructorvalor2dia.push(14)
            constructorvalor1dia.push(var14);
          }
          if (var15 > 0) {
            constructorvalor2dia.push(15)
            constructorvalor1dia.push(var15);
          }
          if (var16 > 0) {
            constructorvalor2dia.push(16)
            constructorvalor1dia.push(var16);
          }
          if (var17 > 0) {
            constructorvalor2dia.push(17)
            constructorvalor1dia.push(var17);
          }
          if (var18 > 0) {
            constructorvalor2dia.push(18)
            constructorvalor1dia.push(var18);
          }
          if (var19 > 0) {
            constructorvalor2dia.push(19)
            constructorvalor1dia.push(var19);
          }
          if (var20 > 0) {
            constructorvalor2dia.push(20)
            constructorvalor1dia.push(var20);
          }
          if (var21 > 0) {
            constructorvalor2dia.push(21)
            constructorvalor1dia.push(var21);
          }
          if (var22 > 0) {
            constructorvalor2dia.push(22)
            constructorvalor1dia.push(var22);
          }
          if (var23 > 0) {
            constructorvalor2dia.push(23)
            constructorvalor1dia.push(var23);
          }
          if (var24 > 0) {
            constructorvalor2dia.push(24)
            constructorvalor1dia.push(var24);
          }
          if (var25 > 0) {
            constructorvalor2dia.push(25)
            constructorvalor1dia.push(var25);
          }
          if (var26 > 0) {
            constructorvalor2dia.push(26)
            constructorvalor1dia.push(var26);
          }
          if (var27 > 0) {
            constructorvalor2dia.push(27)
            constructorvalor1dia.push(var27);
          }
          if (var28 > 0) {
            constructorvalor2dia.push(28)
            constructorvalor1dia.push(var28);
          }
          if (var29 > 0) {
            constructorvalor2dia.push(29)
            constructorvalor1dia.push(var29);
          }
          if (var30 > 0) {
            constructorvalor2dia.push(30)
            constructorvalor1dia.push(var30);
          }
          if (var31 > 0) {
            constructorvalor2dia.push(31)
            constructorvalor1dia.push(var31);
          }
          if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
            var fecha = " Día de recaudo a la fecha, intermediario: " + this.listaintermediario2.toString();
            $(function () {
              chartFuncion2(fecha);
            });
          } else {
            this.alertPage.presentAlert("No hay resultados para los filtros.")
          }
        } else {
          this.alertPage.presentAlert("Error! Seleccione Intermediario.")
        }
      }
    } else {
      if (this.listaano2.length != 0) {
        if (this.checkntc2) {
          if (this.listames2.length != 0) {
          if (this.checkint2) {
            if (this.listaintermediario2.length != 0) {
              this.aplicarpagos.forEach(element2 => {
                this.listaintermediario2.forEach(element5 => {
                  if (element5 == element2.intermediario) {
                    var modelmeses = new ModelDia();
                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                    var mesvalide = datevalide.getDate();
                    var yearvalide = datevalide.getFullYear();
                    var mesrealvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                    this.listaano2.forEach(element => {
                      if (yearvalide == element) {
                        this.listames2.forEach(elementmes => {
                          if (mesrealvalide == elementmes) {
                            if (mesrealvalide == "01") {
                              for (var i = 1; i <= 31; i++) {
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "02") {
      
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
      
                            }
                            if (mesrealvalide == "03") {
      
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
      
                            }
                            if (mesrealvalide == "04") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "05") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "06") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "07") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "08") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "09") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "10") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "11") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                            if (mesrealvalide == "12") {
                              for (var i = 1; i <= 31; i++) {
      
                                if (mesvalide == i) {
                                  if (mesvalide == 1) {
                                    modelmeses.id = 1;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var1 = var1 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var1 = var1 + element2.valorpago;
                                    }
      
                                  }
                                  if (mesvalide == 2) {
                                    modelmeses.id = 2;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var2 = var2 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var2 = var2 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 3) {
                                    modelmeses.id = 3;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var3 = var3 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var3 = var3 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 4) {
                                    modelmeses.id = 4;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var4 = var4 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var4 = var4 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 5) {
                                    modelmeses.id = 5;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var5 = var5 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var5 = var5 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 6) {
                                    modelmeses.id = 6;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var6 = var6 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var6 = var6 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 7) {
                                    modelmeses.id = 7;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var7 = var7 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var7 = var7 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 8) {
                                    modelmeses.id = 8;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var8 = var8 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var8 = var8 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 9) {
                                    modelmeses.id = 9;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var9 = var9 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var9 = var9 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 10) {
                                    modelmeses.id = 10;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var10 = var10 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var10 = var10 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 11) {
                                    modelmeses.id = 11;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var11 = var11 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 12) {
                                    modelmeses.id = 12;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var11 = var11 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var12 = var12 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 13) {
                                    modelmeses.id = 13;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var13 = var13 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var13 = var13 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 14) {
                                    modelmeses.id = 14;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var14 = var14 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var14 = var14 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 15) {
                                    modelmeses.id = 15;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var15 = var15 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var15 = var15 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 16) {
                                    modelmeses.id = 16;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var16 = var16 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var16 = var16 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 17) {
                                    modelmeses.id = 17;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var17 = var17 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var17 = var17 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 18) {
                                    modelmeses.id = 18;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var18 = var18 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var18 = var18 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 19) {
                                    modelmeses.id = 19;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var19 = var19 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var19 = var19 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 20) {
                                    modelmeses.id = 20;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var20 = var20 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var20 = var20 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 21) {
                                    modelmeses.id = 21;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var21 = var21 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var21 = var21 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 22) {
                                    modelmeses.id = 22;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var22 = var22 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var22 = var22 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 23) {
                                    modelmeses.id = 23;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var23 = var23 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var23 = var23 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 24) {
                                    modelmeses.id = 24;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var24 = var24 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var24 = var24 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 25) {
                                    modelmeses.id = 25;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var25 = var25 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var25 = var25 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 26) {
                                    modelmeses.id = 26;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var26 = var26 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var26 = var26 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 27) {
                                    modelmeses.id = 27;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var27 = var27 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var27 = var27 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 28) {
                                    modelmeses.id = 28;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var28 = var28 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var28 = var28 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 29) {
                                    modelmeses.id = 29;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var29 = var29 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var29 = var29 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 30) {
                                    modelmeses.id = 30;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var30 = var30 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var30 = var30 + element2.valorpago;
                                    }
                                  }
                                  if (mesvalide == 31) {
                                    modelmeses.id = 31;
                                    if (this.checknotc) {
                                      if (element2.rc.toString().substring(0, 3) != "NTC") {
                                        var31 = var31 + element2.valorpago;
                                      }
                                    }
                                    if (!this.checknotc) {
                                      var31 = var31 + element2.valorpago;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        });
                      }
                    });   
                  }
                }); 
              });
              if (var1 > 0) {
                constructorvalor2dia.push(1)
                constructorvalor1dia.push(var1);
              }
              if (var2 > 0) {
                constructorvalor2dia.push(2)
                constructorvalor1dia.push(var2);
              }
              if (var3 > 0) {
                constructorvalor2dia.push(3)
                constructorvalor1dia.push(var3);
              }
              if (var4 > 0) {
                constructorvalor2dia.push(4)
                constructorvalor1dia.push(var4);
              }
              if (var5 > 0) {
                constructorvalor2dia.push(5)
                constructorvalor1dia.push(var5);
              }
              if (var6 > 0) {
                constructorvalor2dia.push(6)
                constructorvalor1dia.push(var6);
              }
              if (var7 > 0) {
                constructorvalor2dia.push(7)
                constructorvalor1dia.push(var7);
              }
              if (var8 > 0) {
                constructorvalor2dia.push(8)
                constructorvalor1dia.push(var8);
              }
              if (var9 > 0) {
                constructorvalor2dia.push(9)
                constructorvalor1dia.push(var9);
              }
              if (var10 > 0) {
                constructorvalor2dia.push(10)
                constructorvalor1dia.push(var10);
              }
              if (var11 > 0) {
                constructorvalor2dia.push(11)
                constructorvalor1dia.push(var11);
              }
              if (var12 > 0) {
                constructorvalor2dia.push(12)
                constructorvalor1dia.push(var12);
              }
              if (var13 > 0) {
                constructorvalor2dia.push(13)
                constructorvalor1dia.push(var13);
              }
              if (var14 > 0) {
                constructorvalor2dia.push(14)
                constructorvalor1dia.push(var14);
              }
              if (var15 > 0) {
                constructorvalor2dia.push(15)
                constructorvalor1dia.push(var15);
              }
              if (var16 > 0) {
                constructorvalor2dia.push(16)
                constructorvalor1dia.push(var16);
              }
              if (var17 > 0) {
                constructorvalor2dia.push(17)
                constructorvalor1dia.push(var17);
              }
              if (var18 > 0) {
                constructorvalor2dia.push(18)
                constructorvalor1dia.push(var18);
              }
              if (var19 > 0) {
                constructorvalor2dia.push(19)
                constructorvalor1dia.push(var19);
              }
              if (var20 > 0) {
                constructorvalor2dia.push(20)
                constructorvalor1dia.push(var20);
              }
              if (var21 > 0) {
                constructorvalor2dia.push(21)
                constructorvalor1dia.push(var21);
              }
              if (var22 > 0) {
                constructorvalor2dia.push(22)
                constructorvalor1dia.push(var22);
              }
              if (var23 > 0) {
                constructorvalor2dia.push(23)
                constructorvalor1dia.push(var23);
              }
              if (var24 > 0) {
                constructorvalor2dia.push(24)
                constructorvalor1dia.push(var24);
              }
              if (var25 > 0) {
                constructorvalor2dia.push(25)
                constructorvalor1dia.push(var25);
              }
              if (var26 > 0) {
                constructorvalor2dia.push(26)
                constructorvalor1dia.push(var26);
              }
              if (var27 > 0) {
                constructorvalor2dia.push(27)
                constructorvalor1dia.push(var27);
              }
              if (var28 > 0) {
                constructorvalor2dia.push(28)
                constructorvalor1dia.push(var28);
              }
              if (var29 > 0) {
                constructorvalor2dia.push(29)
                constructorvalor1dia.push(var29);
              }
              if (var30 > 0) {
                constructorvalor2dia.push(30)
                constructorvalor1dia.push(var30);
              }
              if (var31 > 0) {
                constructorvalor2dia.push(31)
                constructorvalor1dia.push(var31);
              }
              if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
                var fecha = " Día de recaudo al año: " + this.listaano2.toString() + " Mes: " + this.listames2.toString()+ " Intermediario: "+ this.listaintermediario2;
                $(function () {
                  chartFuncion2(fecha);
                });
              } else {
                this.alertPage.presentAlert("No hay resultados para los filtros.")
              }
            }else{
              this.alertPage.presentAlert("Seleccione Intermediario.")
            }
          }else{
            this.aplicarpagos.forEach(element2 => {
              var modelmeses = new ModelDia();
              var datevalide = new Date(element2.marcatiempo.seconds * 1000)
              var mesvalide = datevalide.getDate();
              var yearvalide = datevalide.getFullYear();
              var mesrealvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              this.listaano2.forEach(element => {
                if (yearvalide == element) {
                  this.listames2.forEach(elementmes => {
                    if (mesrealvalide == elementmes) {
                      if (mesrealvalide == "01") {
                        for (var i = 1; i <= 31; i++) {
                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "02") {

                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }

                      }
                      if (mesrealvalide == "03") {

                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }

                      }
                      if (mesrealvalide == "04") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "05") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "06") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "07") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "08") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "09") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "10") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "11") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                      if (mesrealvalide == "12") {
                        for (var i = 1; i <= 31; i++) {

                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }

                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                    }
                  });
                }
              });
            });
            if (var1 > 0) {
              constructorvalor2dia.push(1)
              constructorvalor1dia.push(var1);
            }
            if (var2 > 0) {
              constructorvalor2dia.push(2)
              constructorvalor1dia.push(var2);
            }
            if (var3 > 0) {
              constructorvalor2dia.push(3)
              constructorvalor1dia.push(var3);
            }
            if (var4 > 0) {
              constructorvalor2dia.push(4)
              constructorvalor1dia.push(var4);
            }
            if (var5 > 0) {
              constructorvalor2dia.push(5)
              constructorvalor1dia.push(var5);
            }
            if (var6 > 0) {
              constructorvalor2dia.push(6)
              constructorvalor1dia.push(var6);
            }
            if (var7 > 0) {
              constructorvalor2dia.push(7)
              constructorvalor1dia.push(var7);
            }
            if (var8 > 0) {
              constructorvalor2dia.push(8)
              constructorvalor1dia.push(var8);
            }
            if (var9 > 0) {
              constructorvalor2dia.push(9)
              constructorvalor1dia.push(var9);
            }
            if (var10 > 0) {
              constructorvalor2dia.push(10)
              constructorvalor1dia.push(var10);
            }
            if (var11 > 0) {
              constructorvalor2dia.push(11)
              constructorvalor1dia.push(var11);
            }
            if (var12 > 0) {
              constructorvalor2dia.push(12)
              constructorvalor1dia.push(var12);
            }
            if (var13 > 0) {
              constructorvalor2dia.push(13)
              constructorvalor1dia.push(var13);
            }
            if (var14 > 0) {
              constructorvalor2dia.push(14)
              constructorvalor1dia.push(var14);
            }
            if (var15 > 0) {
              constructorvalor2dia.push(15)
              constructorvalor1dia.push(var15);
            }
            if (var16 > 0) {
              constructorvalor2dia.push(16)
              constructorvalor1dia.push(var16);
            }
            if (var17 > 0) {
              constructorvalor2dia.push(17)
              constructorvalor1dia.push(var17);
            }
            if (var18 > 0) {
              constructorvalor2dia.push(18)
              constructorvalor1dia.push(var18);
            }
            if (var19 > 0) {
              constructorvalor2dia.push(19)
              constructorvalor1dia.push(var19);
            }
            if (var20 > 0) {
              constructorvalor2dia.push(20)
              constructorvalor1dia.push(var20);
            }
            if (var21 > 0) {
              constructorvalor2dia.push(21)
              constructorvalor1dia.push(var21);
            }
            if (var22 > 0) {
              constructorvalor2dia.push(22)
              constructorvalor1dia.push(var22);
            }
            if (var23 > 0) {
              constructorvalor2dia.push(23)
              constructorvalor1dia.push(var23);
            }
            if (var24 > 0) {
              constructorvalor2dia.push(24)
              constructorvalor1dia.push(var24);
            }
            if (var25 > 0) {
              constructorvalor2dia.push(25)
              constructorvalor1dia.push(var25);
            }
            if (var26 > 0) {
              constructorvalor2dia.push(26)
              constructorvalor1dia.push(var26);
            }
            if (var27 > 0) {
              constructorvalor2dia.push(27)
              constructorvalor1dia.push(var27);
            }
            if (var28 > 0) {
              constructorvalor2dia.push(28)
              constructorvalor1dia.push(var28);
            }
            if (var29 > 0) {
              constructorvalor2dia.push(29)
              constructorvalor1dia.push(var29);
            }
            if (var30 > 0) {
              constructorvalor2dia.push(30)
              constructorvalor1dia.push(var30);
            }
            if (var31 > 0) {
              constructorvalor2dia.push(31)
              constructorvalor1dia.push(var31);
            }
            if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
              var fecha = " Día de recaudo a la fecha " + this.listaano2.toString() + " mes " + this.listames2.toString();
              $(function () {
                chartFuncion2(fecha);
              });
            } else {
              this.alertPage.presentAlert("No hay resultados para los filtros.")
            }
          }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint2) {
            if (this.listaintermediario2.length != 0) { 
              this.aplicarpagos.forEach(element2 => {
                this.listaintermediario2.forEach(element5 => {
                  if (element5 == element2.intermediario) {
                    var modelmeses = new ModelDia();
                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                    var mesvalide = datevalide.getDate();
                    var yearvalide = datevalide.getFullYear();
                    this.listaano2.forEach(element => {
                      if (yearvalide == element) {
                        for (var i = 1; i <= 31; i++) {
    
                          if (mesvalide == i) {
                            if (mesvalide == 1) {
                              modelmeses.id = 1;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var1 = var1 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var1 = var1 + element2.valorpago;
                              }
    
                            }
                            if (mesvalide == 2) {
                              modelmeses.id = 2;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var2 = var2 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var2 = var2 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 3) {
                              modelmeses.id = 3;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var3 = var3 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var3 = var3 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 4) {
                              modelmeses.id = 4;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var4 = var4 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var4 = var4 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 5) {
                              modelmeses.id = 5;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var5 = var5 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var5 = var5 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 6) {
                              modelmeses.id = 6;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var6 = var6 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var6 = var6 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 7) {
                              modelmeses.id = 7;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var7 = var7 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var7 = var7 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 8) {
                              modelmeses.id = 8;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var8 = var8 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var8 = var8 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 9) {
                              modelmeses.id = 9;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var9 = var9 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var9 = var9 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 10) {
                              modelmeses.id = 10;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var10 = var10 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var10 = var10 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 11) {
                              modelmeses.id = 11;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var11 = var11 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 12) {
                              modelmeses.id = 12;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var11 = var11 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var12 = var12 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 13) {
                              modelmeses.id = 13;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var13 = var13 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var13 = var13 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 14) {
                              modelmeses.id = 14;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var14 = var14 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var14 = var14 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 15) {
                              modelmeses.id = 15;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var15 = var15 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var15 = var15 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 16) {
                              modelmeses.id = 16;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var16 = var16 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var16 = var16 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 17) {
                              modelmeses.id = 17;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var17 = var17 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var17 = var17 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 18) {
                              modelmeses.id = 18;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var18 = var18 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var18 = var18 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 19) {
                              modelmeses.id = 19;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var19 = var19 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var19 = var19 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 20) {
                              modelmeses.id = 20;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var20 = var20 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var20 = var20 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 21) {
                              modelmeses.id = 21;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var21 = var21 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var21 = var21 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 22) {
                              modelmeses.id = 22;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var22 = var22 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var22 = var22 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 23) {
                              modelmeses.id = 23;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var23 = var23 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var23 = var23 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 24) {
                              modelmeses.id = 24;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var24 = var24 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var24 = var24 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 25) {
                              modelmeses.id = 25;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var25 = var25 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var25 = var25 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 26) {
                              modelmeses.id = 26;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var26 = var26 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var26 = var26 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 27) {
                              modelmeses.id = 27;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var27 = var27 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var27 = var27 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 28) {
                              modelmeses.id = 28;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var28 = var28 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var28 = var28 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 29) {
                              modelmeses.id = 29;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var29 = var29 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var29 = var29 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 30) {
                              modelmeses.id = 30;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var30 = var30 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var30 = var30 + element2.valorpago;
                              }
                            }
                            if (mesvalide == 31) {
                              modelmeses.id = 31;
                              if (this.checknotc) {
                                if (element2.rc.toString().substring(0, 3) != "NTC") {
                                  var31 = var31 + element2.valorpago;
                                }
                              }
                              if (!this.checknotc) {
                                var31 = var31 + element2.valorpago;
                              }
                            }
                          }
                        }
                      }
                    });
                  }
                });
              });
              if (var1 > 0) {
                constructorvalor2dia.push(1)
                constructorvalor1dia.push(var1);
              }
              if (var2 > 0) {
                constructorvalor2dia.push(2)
                constructorvalor1dia.push(var2);
              }
              if (var3 > 0) {
                constructorvalor2dia.push(3)
                constructorvalor1dia.push(var3);
              }
              if (var4 > 0) {
                constructorvalor2dia.push(4)
                constructorvalor1dia.push(var4);
              }
              if (var5 > 0) {
                constructorvalor2dia.push(5)
                constructorvalor1dia.push(var5);
              }
              if (var6 > 0) {
                constructorvalor2dia.push(6)
                constructorvalor1dia.push(var6);
              }
              if (var7 > 0) {
                constructorvalor2dia.push(7)
                constructorvalor1dia.push(var7);
              }
              if (var8 > 0) {
                constructorvalor2dia.push(8)
                constructorvalor1dia.push(var8);
              }
              if (var9 > 0) {
                constructorvalor2dia.push(9)
                constructorvalor1dia.push(var9);
              }
              if (var10 > 0) {
                constructorvalor2dia.push(10)
                constructorvalor1dia.push(var10);
              }
              if (var11 > 0) {
                constructorvalor2dia.push(11)
                constructorvalor1dia.push(var11);
              }
              if (var12 > 0) {
                constructorvalor2dia.push(12)
                constructorvalor1dia.push(var12);
              }
              if (var13 > 0) {
                constructorvalor2dia.push(13)
                constructorvalor1dia.push(var13);
              }
              if (var14 > 0) {
                constructorvalor2dia.push(14)
                constructorvalor1dia.push(var14);
              }
              if (var15 > 0) {
                constructorvalor2dia.push(15)
                constructorvalor1dia.push(var15);
              }
              if (var16 > 0) {
                constructorvalor2dia.push(16)
                constructorvalor1dia.push(var16);
              }
              if (var17 > 0) {
                constructorvalor2dia.push(17)
                constructorvalor1dia.push(var17);
              }
              if (var18 > 0) {
                constructorvalor2dia.push(18)
                constructorvalor1dia.push(var18);
              }
              if (var19 > 0) {
                constructorvalor2dia.push(19)
                constructorvalor1dia.push(var19);
              }
              if (var20 > 0) {
                constructorvalor2dia.push(20)
                constructorvalor1dia.push(var20);
              }
              if (var21 > 0) {
                constructorvalor2dia.push(21)
                constructorvalor1dia.push(var21);
              }
              if (var22 > 0) {
                constructorvalor2dia.push(22)
                constructorvalor1dia.push(var22);
              }
              if (var23 > 0) {
                constructorvalor2dia.push(23)
                constructorvalor1dia.push(var23);
              }
              if (var24 > 0) {
                constructorvalor2dia.push(24)
                constructorvalor1dia.push(var24);
              }
              if (var25 > 0) {
                constructorvalor2dia.push(25)
                constructorvalor1dia.push(var25);
              }
              if (var26 > 0) {
                constructorvalor2dia.push(26)
                constructorvalor1dia.push(var26);
              }
              if (var27 > 0) {
                constructorvalor2dia.push(27)
                constructorvalor1dia.push(var27);
              }
              if (var28 > 0) {
                constructorvalor2dia.push(28)
                constructorvalor1dia.push(var28);
              }
              if (var29 > 0) {
                constructorvalor2dia.push(29)
                constructorvalor1dia.push(var29);
              }
              if (var30 > 0) {
                constructorvalor2dia.push(30)
                constructorvalor1dia.push(var30);
              }
              if (var31 > 0) {
                constructorvalor2dia.push(31)
                constructorvalor1dia.push(var31);
              }
              if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
                var fecha = " Día de recaudo a la fecha " + this.listaano2.toString() + " Intermediario: " + this.listaintermediario2;
                $(
                  chartFuncion2(fecha)
                );
              } else {
                this.alertPage.presentAlert("No hay resultados para los filtros.")
              }

            } else {
              this.alertPage.presentAlert("Seleccione Intermediario")
            }
          } else {

            this.aplicarpagos.forEach(element2 => {
              var modelmeses = new ModelDia();
              var datevalide = new Date(element2.marcatiempo.seconds * 1000)
              var mesvalide = datevalide.getDate();
              var yearvalide = datevalide.getFullYear();
              this.listaano2.forEach(element => {
                if (yearvalide == element) {
                  for (var i = 1; i <= 31; i++) {

                    if (mesvalide == i) {
                      if (mesvalide == 1) {
                        modelmeses.id = 1;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var1 = var1 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var1 = var1 + element2.valorpago;
                        }

                      }
                      if (mesvalide == 2) {
                        modelmeses.id = 2;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var2 = var2 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var2 = var2 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 3) {
                        modelmeses.id = 3;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var3 = var3 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var3 = var3 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 4) {
                        modelmeses.id = 4;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var4 = var4 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var4 = var4 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 5) {
                        modelmeses.id = 5;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var5 = var5 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var5 = var5 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 6) {
                        modelmeses.id = 6;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var6 = var6 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var6 = var6 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 7) {
                        modelmeses.id = 7;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var7 = var7 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var7 = var7 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 8) {
                        modelmeses.id = 8;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var8 = var8 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var8 = var8 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 9) {
                        modelmeses.id = 9;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var9 = var9 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var9 = var9 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 10) {
                        modelmeses.id = 10;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var10 = var10 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var10 = var10 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 11) {
                        modelmeses.id = 11;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var11 = var11 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var11 = var11 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 12) {
                        modelmeses.id = 12;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var11 = var11 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var12 = var12 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 13) {
                        modelmeses.id = 13;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var13 = var13 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var13 = var13 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 14) {
                        modelmeses.id = 14;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var14 = var14 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var14 = var14 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 15) {
                        modelmeses.id = 15;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var15 = var15 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var15 = var15 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 16) {
                        modelmeses.id = 16;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var16 = var16 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var16 = var16 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 17) {
                        modelmeses.id = 17;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var17 = var17 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var17 = var17 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 18) {
                        modelmeses.id = 18;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var18 = var18 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var18 = var18 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 19) {
                        modelmeses.id = 19;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var19 = var19 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var19 = var19 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 20) {
                        modelmeses.id = 20;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var20 = var20 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var20 = var20 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 21) {
                        modelmeses.id = 21;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var21 = var21 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var21 = var21 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 22) {
                        modelmeses.id = 22;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var22 = var22 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var22 = var22 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 23) {
                        modelmeses.id = 23;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var23 = var23 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var23 = var23 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 24) {
                        modelmeses.id = 24;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var24 = var24 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var24 = var24 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 25) {
                        modelmeses.id = 25;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var25 = var25 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var25 = var25 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 26) {
                        modelmeses.id = 26;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var26 = var26 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var26 = var26 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 27) {
                        modelmeses.id = 27;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var27 = var27 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var27 = var27 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 28) {
                        modelmeses.id = 28;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var28 = var28 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var28 = var28 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 29) {
                        modelmeses.id = 29;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var29 = var29 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var29 = var29 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 30) {
                        modelmeses.id = 30;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var30 = var30 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var30 = var30 + element2.valorpago;
                        }
                      }
                      if (mesvalide == 31) {
                        modelmeses.id = 31;
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            var31 = var31 + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          var31 = var31 + element2.valorpago;
                        }
                      }
                    }
                  }
                }
              });
            });
            if (var1 > 0) {
              constructorvalor2dia.push(1)
              constructorvalor1dia.push(var1);
            }
            if (var2 > 0) {
              constructorvalor2dia.push(2)
              constructorvalor1dia.push(var2);
            }
            if (var3 > 0) {
              constructorvalor2dia.push(3)
              constructorvalor1dia.push(var3);
            }
            if (var4 > 0) {
              constructorvalor2dia.push(4)
              constructorvalor1dia.push(var4);
            }
            if (var5 > 0) {
              constructorvalor2dia.push(5)
              constructorvalor1dia.push(var5);
            }
            if (var6 > 0) {
              constructorvalor2dia.push(6)
              constructorvalor1dia.push(var6);
            }
            if (var7 > 0) {
              constructorvalor2dia.push(7)
              constructorvalor1dia.push(var7);
            }
            if (var8 > 0) {
              constructorvalor2dia.push(8)
              constructorvalor1dia.push(var8);
            }
            if (var9 > 0) {
              constructorvalor2dia.push(9)
              constructorvalor1dia.push(var9);
            }
            if (var10 > 0) {
              constructorvalor2dia.push(10)
              constructorvalor1dia.push(var10);
            }
            if (var11 > 0) {
              constructorvalor2dia.push(11)
              constructorvalor1dia.push(var11);
            }
            if (var12 > 0) {
              constructorvalor2dia.push(12)
              constructorvalor1dia.push(var12);
            }
            if (var13 > 0) {
              constructorvalor2dia.push(13)
              constructorvalor1dia.push(var13);
            }
            if (var14 > 0) {
              constructorvalor2dia.push(14)
              constructorvalor1dia.push(var14);
            }
            if (var15 > 0) {
              constructorvalor2dia.push(15)
              constructorvalor1dia.push(var15);
            }
            if (var16 > 0) {
              constructorvalor2dia.push(16)
              constructorvalor1dia.push(var16);
            }
            if (var17 > 0) {
              constructorvalor2dia.push(17)
              constructorvalor1dia.push(var17);
            }
            if (var18 > 0) {
              constructorvalor2dia.push(18)
              constructorvalor1dia.push(var18);
            }
            if (var19 > 0) {
              constructorvalor2dia.push(19)
              constructorvalor1dia.push(var19);
            }
            if (var20 > 0) {
              constructorvalor2dia.push(20)
              constructorvalor1dia.push(var20);
            }
            if (var21 > 0) {
              constructorvalor2dia.push(21)
              constructorvalor1dia.push(var21);
            }
            if (var22 > 0) {
              constructorvalor2dia.push(22)
              constructorvalor1dia.push(var22);
            }
            if (var23 > 0) {
              constructorvalor2dia.push(23)
              constructorvalor1dia.push(var23);
            }
            if (var24 > 0) {
              constructorvalor2dia.push(24)
              constructorvalor1dia.push(var24);
            }
            if (var25 > 0) {
              constructorvalor2dia.push(25)
              constructorvalor1dia.push(var25);
            }
            if (var26 > 0) {
              constructorvalor2dia.push(26)
              constructorvalor1dia.push(var26);
            }
            if (var27 > 0) {
              constructorvalor2dia.push(27)
              constructorvalor1dia.push(var27);
            }
            if (var28 > 0) {
              constructorvalor2dia.push(28)
              constructorvalor1dia.push(var28);
            }
            if (var29 > 0) {
              constructorvalor2dia.push(29)
              constructorvalor1dia.push(var29);
            }
            if (var30 > 0) {
              constructorvalor2dia.push(30)
              constructorvalor1dia.push(var30);
            }
            if (var31 > 0) {
              constructorvalor2dia.push(31)
              constructorvalor1dia.push(var31);
            }
            if (constructorvalor1dia.length > 0 && constructorvalor2dia.length > 0) {
              var fecha = " Día de recaudo a la fecha " + this.listaano2.toString();
              $(
                chartFuncion2(fecha)
              );
            } else {
              this.alertPage.presentAlert("No hay resultados para los filtros.")
            } 
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }
  }
  /**
 * FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
 * Metodo principal:applyFilterEsquemaUnico(string); 
 * @param string 
 * @return dataSourceIntermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarPorMes() {
    this.checkdatames = true;
    this.recaudoAnalista = new Array<RecaudoAnalista>();
    constructornombre1r = new Array
    constructornombre1 = new Array
    constructorvalor1meses = new Array
    constructorvalor1p = new Array
    this.valortotal = 0;
    if (!this.checkano3) {
      if (!this.checkint3) {
        var listadepagosEne: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosFeb: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosMar: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosAbr: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosMay: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosJun: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosJul: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosAgo: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosSep: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosOct: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosNov: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        var listadepagosDic: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
        this.aplicarpagos.forEach(element => {
          var modelmeses = new ModelRecaudoMes();
          var datevalide = new Date(element.marcatiempo.seconds * 1000)
          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
          this.intermediarios.forEach(element2 => {
            if (element.intermediario == element2.nit) {
              modelmeses.origen = element2.sigla;
              if (mesvalide == "01") {
                modelmeses.id = 1;
                modelmeses.mes = "Ene";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosEne.push(modelmeses);
              }
              if (mesvalide == "02") {
                modelmeses.id = 2;
                modelmeses.mes = "Feb";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses)
                listadepagosFeb.push(modelmeses)
              }
              if (mesvalide == "03") {
                modelmeses.id = 3;
                modelmeses.mes = "Mar";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses)
                listadepagosMar.push(modelmeses)
              }
              if (mesvalide == "04") {
                modelmeses.id = 4;
                modelmeses.mes = "Abr";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosAbr.push(modelmeses)
              }
              if (mesvalide == "05") {
                modelmeses.id = 5;
                modelmeses.mes = "May";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosMay.push(modelmeses);
              }
              if (mesvalide == "06") {
                modelmeses.id = 6;
                modelmeses.mes = "Jun";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses)
                listadepagosJun.push(modelmeses)
              }
              if (mesvalide == "07") {
                modelmeses.id = 7;
                modelmeses.mes = "Jul";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosJul.push(modelmeses);
              }
              if (mesvalide == "08") {
                modelmeses.id = 8;
                modelmeses.mes = "Ago";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosAgo.push(modelmeses);
              }
              if (mesvalide == "09") {
                modelmeses.id = 9;
                modelmeses.mes = "Sep";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosSep.push(modelmeses);
              }
              if (mesvalide == "10") {
                modelmeses.id = 10;
                modelmeses.mes = "Oct";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosOct.push(modelmeses);
              }
              if (mesvalide == "11") {
                modelmeses.id = 11;
                modelmeses.mes = "Nov";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosNov.push(modelmeses);
              }
              if (mesvalide == "12") {
                modelmeses.id = 12;
                modelmeses.mes = "Dic";
                modelmeses.origen = element2.sigla;
                if (this.checknotc) {
                  if (element.rc.toString().substring(0, 3) != "NTC") {
                    modelmeses.recaudo = element.valorpago;
                  }
                }
                if (!this.checknotc) {
                  modelmeses.recaudo = element.valorpago;
                }
                modelmeses.ano = datevalide.getFullYear();
                constructorvalor1meses.push(modelmeses);
                listadepagosDic.push(modelmeses);
              }

            }
          });
        });

        const arrayUniqueByKeyEneInt = [...new Map(constructorvalor1meses.map(item =>
          [item.origen, item.origen])).values()];
        const arrayUniqueByKeyEneMes = [...new Map(constructorvalor1meses.map(item =>
          [item.mes, item.mes])).values()];
        var constructorvalor1mesesfin: ModelRecaudoMes[] = new Array<ModelRecaudoMes>();
        arrayUniqueByKeyEneInt.forEach(element2 => {
          arrayUniqueByKeyEneMes.forEach(element => {
            if (element == 'Ene') {
              var recaudoEne = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Ene';
              listadepagosEne.forEach(element => {
                if (element.origen == element2) {
                  recaudoEne = recaudoEne + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoEne;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Feb') {
              var recaudoFeb = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Feb';
              listadepagosFeb.forEach(element => {
                if (element.origen == element2) {
                  recaudoFeb = recaudoFeb + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoFeb;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Mar') {
              var recaudoMar = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Mar';
              listadepagosMar.forEach(element => {
                if (element.origen == element2) {
                  recaudoMar = recaudoMar + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoMar;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Abr') {
              var recaudoAbr = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Abr';
              listadepagosAbr.forEach(element => {
                if (element.origen == element2) {
                  recaudoAbr = recaudoAbr + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoAbr;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'May') {
              var recaudoMay = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'May';
              listadepagosMay.forEach(element => {
                if (element.origen == element2) {
                  recaudoMay = recaudoMay + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoMay;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Jun') {
              var recaudoJun = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Jun';
              listadepagosJun.forEach(element => {
                if (element.origen == element2) {
                  recaudoJun = recaudoJun + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoJun;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Jul') {
              var recaudoJul = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Jul';
              listadepagosJul.forEach(element => {
                if (element.origen == element2) {
                  recaudoJul = recaudoJul + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoJul;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Ago') {
              var recaudoAgo = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Ago';
              listadepagosAgo.forEach(element => {
                if (element.origen == element2) {
                  recaudoAgo = recaudoAgo + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoAgo;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Sep') {
              var recaudoSep = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Sep';
              listadepagosSep.forEach(element => {
                if (element.origen == element2) {
                  recaudoSep = recaudoSep + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoSep;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Oct') {
              var recaudoOct = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Oct';
              listadepagosOct.forEach(element => {
                if (element.origen == element2) {
                  recaudoOct = recaudoOct + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoOct;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Nov') {
              var recaudoNov = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Nov';
              listadepagosNov.forEach(element => {
                if (element.origen == element2) {
                  recaudoNov = recaudoNov + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoNov;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
            if (element == 'Dic') {
              var recaudoDic = 0;
              var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
              modelmesesfinal.origen = element2;
              modelmesesfinal.mes = 'Dic';
              listadepagosDic.forEach(element => {
                if (element.origen == element2) {
                  recaudoDic = recaudoDic + element.recaudo
                  modelmesesfinal.id = element.id;
                  modelmesesfinal.ano = element.ano;
                }
              });
              modelmesesfinal.recaudo = recaudoDic;
              if (modelmesesfinal.recaudo > 0) {
                constructorvalor1mesesfin.push(modelmesesfinal);
              }
            }
          });
          ///
          ///
        });


        constructorvalor1mesesfin.sort((a, b) => a.id - b.id).map((exemple, index, array) => array);
        constructorvalor1mesesfin.forEach(element => {
          this.valortotal = this.valortotal + element.recaudo;
        });
        this.dataSourceRecaudoMes = new MatTableDataSource<any>(constructorvalor1mesesfin);
        setTimeout(() => this.dataSourceRecaudoMes.paginator = this.paginatorRecaudoMes);

      } else {
        if (this.listaintermediario3.length != 0) {
          var listadepagosEne: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosFeb: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosMar: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosAbr: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosMay: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosJun: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosJul: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosAgo: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosSep: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosOct: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosNov: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosDic: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          this.aplicarpagos.forEach(element => {
            var modelmeses = new ModelRecaudoMes();
            var datevalide = new Date(element.marcatiempo.seconds * 1000)
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            this.intermediarios.forEach(element2 => {
              if (element.intermediario == element2.nit) {
                this.listaintermediario3.forEach(element3 => {
                  if (element3 == element.intermediario) {

                    modelmeses.origen = element2.sigla;
                    if (mesvalide == "01") {
                      modelmeses.id = 1;
                      modelmeses.mes = "Ene";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosEne.push(modelmeses);
                    }
                    if (mesvalide == "02") {
                      modelmeses.id = 2;
                      modelmeses.mes = "Feb";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosFeb.push(modelmeses)
                    }
                    if (mesvalide == "03") {
                      modelmeses.id = 3;
                      modelmeses.mes = "Mar";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosMar.push(modelmeses)
                    }
                    if (mesvalide == "04") {
                      modelmeses.id = 4;
                      modelmeses.mes = "Abr";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosAbr.push(modelmeses)
                    }
                    if (mesvalide == "05") {
                      modelmeses.id = 5;
                      modelmeses.mes = "May";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosMay.push(modelmeses);
                    }
                    if (mesvalide == "06") {
                      modelmeses.id = 6;
                      modelmeses.mes = "Jun";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosJun.push(modelmeses)
                    }
                    if (mesvalide == "07") {
                      modelmeses.id = 7;
                      modelmeses.mes = "Jul";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosJul.push(modelmeses);
                    }
                    if (mesvalide == "08") {
                      modelmeses.id = 8;
                      modelmeses.mes = "Ago";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosAgo.push(modelmeses);
                    }
                    if (mesvalide == "09") {
                      modelmeses.id = 9;
                      modelmeses.mes = "Sep";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosSep.push(modelmeses);
                    }
                    if (mesvalide == "10") {
                      modelmeses.id = 10;
                      modelmeses.mes = "Oct";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosOct.push(modelmeses);
                    }
                    if (mesvalide == "11") {
                      modelmeses.id = 11;
                      modelmeses.mes = "Nov";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosNov.push(modelmeses);
                    }
                    if (mesvalide == "12") {
                      modelmeses.id = 12;
                      modelmeses.mes = "Dic";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosDic.push(modelmeses);
                    }
                  }
                });

              }
            });
          });

          const arrayUniqueByKeyEneInt = [...new Map(constructorvalor1meses.map(item =>
            [item.origen, item.origen])).values()];
          const arrayUniqueByKeyEneMes = [...new Map(constructorvalor1meses.map(item =>
            [item.mes, item.mes])).values()];
          var constructorvalor1mesesfin: ModelRecaudoMes[] = new Array<ModelRecaudoMes>();
          arrayUniqueByKeyEneInt.forEach(element2 => {
            arrayUniqueByKeyEneMes.forEach(element => {
              if (element == 'Ene') {
                var recaudoEne = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Ene';
                listadepagosEne.forEach(element => {
                  if (element.origen == element2) {
                    recaudoEne = recaudoEne + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoEne;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Feb') {
                var recaudoFeb = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Feb';
                listadepagosFeb.forEach(element => {
                  if (element.origen == element2) {
                    recaudoFeb = recaudoFeb + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoFeb;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Mar') {
                var recaudoMar = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Mar';
                listadepagosMar.forEach(element => {
                  if (element.origen == element2) {
                    recaudoMar = recaudoMar + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoMar;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Abr') {
                var recaudoAbr = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Abr';
                listadepagosAbr.forEach(element => {
                  if (element.origen == element2) {
                    recaudoAbr = recaudoAbr + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoAbr;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'May') {
                var recaudoMay = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'May';
                listadepagosMay.forEach(element => {
                  if (element.origen == element2) {
                    recaudoMay = recaudoMay + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoMay;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Jun') {
                var recaudoJun = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Jun';
                listadepagosJun.forEach(element => {
                  if (element.origen == element2) {
                    recaudoJun = recaudoJun + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoJun;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Jul') {
                var recaudoJul = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Jul';
                listadepagosJul.forEach(element => {
                  if (element.origen == element2) {
                    recaudoJul = recaudoJul + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoJul;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Ago') {
                var recaudoAgo = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Ago';
                listadepagosAgo.forEach(element => {
                  if (element.origen == element2) {
                    recaudoAgo = recaudoAgo + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoAgo;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Sep') {
                var recaudoSep = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Sep';
                listadepagosSep.forEach(element => {
                  if (element.origen == element2) {
                    recaudoSep = recaudoSep + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoSep;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Oct') {
                var recaudoOct = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Oct';
                listadepagosOct.forEach(element => {
                  if (element.origen == element2) {
                    recaudoOct = recaudoOct + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoOct;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Nov') {
                var recaudoNov = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Nov';
                listadepagosNov.forEach(element => {
                  if (element.origen == element2) {
                    recaudoNov = recaudoNov + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoNov;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Dic') {
                var recaudoDic = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Dic';
                listadepagosDic.forEach(element => {
                  if (element.origen == element2) {
                    recaudoDic = recaudoDic + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoDic;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
            });
            ///
            ///
          });


          constructorvalor1mesesfin.sort((a, b) => a.id - b.id).map((exemple, index, array) => array);
          constructorvalor1mesesfin.forEach(element => {
            this.valortotal = this.valortotal + element.recaudo;
          });
          this.dataSourceRecaudoMes = new MatTableDataSource<any>(constructorvalor1mesesfin);
          setTimeout(() => this.dataSourceRecaudoMes.paginator = this.paginatorRecaudoMes);
        } else {
          this.alertPage.presentAlert("Error! Seleccione Intermediario.")
        }
      }
    } else {
      if (this.listaano3.length != 0) {
        if (this.checkntc3) {
          if (this.listames3.length != 0) {

            var listadepagosEne: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosFeb: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosMar: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosAbr: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosMay: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosJun: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosJul: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosAgo: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosSep: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosOct: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosNov: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            var listadepagosDic: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
            this.aplicarpagos.forEach(element => {
              var modelmeses = new ModelRecaudoMes();
              var datevalide = new Date(element.marcatiempo.seconds * 1000)
              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              this.intermediarios.forEach(element2 => {
                if (element.intermediario == element2.nit) {

                  modelmeses.origen = element2.sigla;
                  if (mesvalide == "01") {
                    modelmeses.id = 1;
                    modelmeses.mes = "Ene";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosEne.push(modelmeses);
                  }
                  if (mesvalide == "02") {
                    modelmeses.id = 2;
                    modelmeses.mes = "Feb";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses)
                    listadepagosFeb.push(modelmeses)
                  }
                  if (mesvalide == "03") {
                    modelmeses.id = 3;
                    modelmeses.mes = "Mar";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses)
                    listadepagosMar.push(modelmeses)
                  }
                  if (mesvalide == "04") {
                    modelmeses.id = 4;
                    modelmeses.mes = "Abr";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosAbr.push(modelmeses)
                  }
                  if (mesvalide == "05") {
                    modelmeses.id = 5;
                    modelmeses.mes = "May";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosMay.push(modelmeses);
                  }
                  if (mesvalide == "06") {
                    modelmeses.id = 6;
                    modelmeses.mes = "Jun";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses)
                    listadepagosJun.push(modelmeses)
                  }
                  if (mesvalide == "07") {
                    modelmeses.id = 7;
                    modelmeses.mes = "Jul";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosJul.push(modelmeses);
                  }
                  if (mesvalide == "08") {
                    modelmeses.id = 8;
                    modelmeses.mes = "Ago";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosAgo.push(modelmeses);
                  }
                  if (mesvalide == "09") {
                    modelmeses.id = 9;
                    modelmeses.mes = "Sep";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosSep.push(modelmeses);
                  }
                  if (mesvalide == "10") {
                    modelmeses.id = 10;
                    modelmeses.mes = "Oct";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosOct.push(modelmeses);
                  }
                  if (mesvalide == "11") {
                    modelmeses.id = 11;
                    modelmeses.mes = "Nov";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosNov.push(modelmeses);
                  }
                  if (mesvalide == "12") {
                    modelmeses.id = 12;
                    modelmeses.mes = "Dic";
                    modelmeses.origen = element2.sigla;
                    if (this.checknotc) {
                      if (element.rc.toString().substring(0, 3) != "NTC") {
                        modelmeses.recaudo = element.valorpago;
                      }
                    }
                    if (!this.checknotc) {
                      modelmeses.recaudo = element.valorpago;
                    }
                    modelmeses.ano = datevalide.getFullYear();
                    constructorvalor1meses.push(modelmeses);
                    listadepagosDic.push(modelmeses);
                  }

                }
              });
            });

            const arrayUniqueByKeyEneInt = [...new Map(constructorvalor1meses.map(item =>
              [item.origen, item.origen])).values()];
            const arrayUniqueByKeyEneMes = [...new Map(constructorvalor1meses.map(item =>
              [item.mes, item.mes])).values()];
            var constructorvalor1mesesfin: ModelRecaudoMes[] = new Array<ModelRecaudoMes>();
            arrayUniqueByKeyEneInt.forEach(element2 => {
              arrayUniqueByKeyEneMes.forEach(element => {
                if (element == 'Ene') {
                  var recaudoEne = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Ene';
                  listadepagosEne.forEach(element => {
                    if (element.origen == element2) {
                      recaudoEne = recaudoEne + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoEne;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Feb') {
                  var recaudoFeb = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Feb';
                  listadepagosFeb.forEach(element => {
                    if (element.origen == element2) {
                      recaudoFeb = recaudoFeb + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoFeb;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Mar') {
                  var recaudoMar = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Mar';
                  listadepagosMar.forEach(element => {
                    if (element.origen == element2) {
                      recaudoMar = recaudoMar + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoMar;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Abr') {
                  var recaudoAbr = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Abr';
                  listadepagosAbr.forEach(element => {
                    if (element.origen == element2) {
                      recaudoAbr = recaudoAbr + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoAbr;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'May') {
                  var recaudoMay = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'May';
                  listadepagosMay.forEach(element => {
                    if (element.origen == element2) {
                      recaudoMay = recaudoMay + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoMay;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Jun') {
                  var recaudoJun = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Jun';
                  listadepagosJun.forEach(element => {
                    if (element.origen == element2) {
                      recaudoJun = recaudoJun + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoJun;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Jul') {
                  var recaudoJul = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Jul';
                  listadepagosJul.forEach(element => {
                    if (element.origen == element2) {
                      recaudoJul = recaudoJul + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoJul;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Ago') {
                  var recaudoAgo = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Ago';
                  listadepagosAgo.forEach(element => {
                    if (element.origen == element2) {
                      recaudoAgo = recaudoAgo + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoAgo;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Sep') {
                  var recaudoSep = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Sep';
                  listadepagosSep.forEach(element => {
                    if (element.origen == element2) {
                      recaudoSep = recaudoSep + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoSep;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Oct') {
                  var recaudoOct = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Oct';
                  listadepagosOct.forEach(element => {
                    if (element.origen == element2) {
                      recaudoOct = recaudoOct + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoOct;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Nov') {
                  var recaudoNov = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Nov';
                  listadepagosNov.forEach(element => {
                    if (element.origen == element2) {
                      recaudoNov = recaudoNov + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoNov;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
                if (element == 'Dic') {
                  var recaudoDic = 0;
                  var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                  modelmesesfinal.origen = element2;
                  modelmesesfinal.mes = 'Dic';
                  listadepagosDic.forEach(element => {
                    if (element.origen == element2) {
                      recaudoDic = recaudoDic + element.recaudo
                      modelmesesfinal.id = element.id;
                      modelmesesfinal.ano = element.ano;
                    }
                  });
                  modelmesesfinal.recaudo = recaudoDic;
                  if (modelmesesfinal.recaudo > 0) {
                    constructorvalor1mesesfin.push(modelmesesfinal);
                  }
                }
              });
              ///
              ///
            });


            constructorvalor1mesesfin.sort((a, b) => a.id - b.id).map((exemple, index, array) => array);
            constructorvalor1mesesfin.forEach(element => {
              this.valortotal = this.valortotal + element.recaudo;
            });
            this.dataSourceRecaudoMes = new MatTableDataSource<any>(constructorvalor1mesesfin);
            setTimeout(() => this.dataSourceRecaudoMes.paginator = this.paginatorRecaudoMes);
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {

          var listadepagosEne: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosFeb: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosMar: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosAbr: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosMay: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosJun: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosJul: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosAgo: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosSep: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosOct: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosNov: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          var listadepagosDic: ModelRecaudoMes[] = [] = new Array<ModelRecaudoMes>();
          this.aplicarpagos.forEach(element => {
            var modelmeses = new ModelRecaudoMes();
            var datevalide = new Date(element.marcatiempo.seconds * 1000)
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            var yearvalide = datevalide.getFullYear();
            this.listaano3.forEach(element3 => {
              if (yearvalide == element3) {
                this.intermediarios.forEach(element2 => {
                  if (element.intermediario == element2.nit) {

                    modelmeses.origen = element2.sigla;
                    if (mesvalide == "01") {
                      modelmeses.id = 1;
                      modelmeses.mes = "Ene";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosEne.push(modelmeses);
                    }
                    if (mesvalide == "02") {
                      modelmeses.id = 2;
                      modelmeses.mes = "Feb";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosFeb.push(modelmeses)
                    }
                    if (mesvalide == "03") {
                      modelmeses.id = 3;
                      modelmeses.mes = "Mar";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosMar.push(modelmeses)
                    }
                    if (mesvalide == "04") {
                      modelmeses.id = 4;
                      modelmeses.mes = "Abr";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosAbr.push(modelmeses)
                    }
                    if (mesvalide == "05") {
                      modelmeses.id = 5;
                      modelmeses.mes = "May";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosMay.push(modelmeses);
                    }
                    if (mesvalide == "06") {
                      modelmeses.id = 6;
                      modelmeses.mes = "Jun";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses)
                      listadepagosJun.push(modelmeses)
                    }
                    if (mesvalide == "07") {
                      modelmeses.id = 7;
                      modelmeses.mes = "Jul";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosJul.push(modelmeses);
                    }
                    if (mesvalide == "08") {
                      modelmeses.id = 8;
                      modelmeses.mes = "Ago";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosAgo.push(modelmeses);
                    }
                    if (mesvalide == "09") {
                      modelmeses.id = 9;
                      modelmeses.mes = "Sep";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosSep.push(modelmeses);
                    }
                    if (mesvalide == "10") {
                      modelmeses.id = 10;
                      modelmeses.mes = "Oct";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosOct.push(modelmeses);
                    }
                    if (mesvalide == "11") {
                      modelmeses.id = 11;
                      modelmeses.mes = "Nov";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosNov.push(modelmeses);
                    }
                    if (mesvalide == "12") {
                      modelmeses.id = 12;
                      modelmeses.mes = "Dic";
                      modelmeses.origen = element2.sigla;
                      if (this.checknotc) {
                        if (element.rc.toString().substring(0, 3) != "NTC") {
                          modelmeses.recaudo = element.valorpago;
                        }
                      }
                      if (!this.checknotc) {
                        modelmeses.recaudo = element.valorpago;
                      }
                      modelmeses.ano = datevalide.getFullYear();
                      constructorvalor1meses.push(modelmeses);
                      listadepagosDic.push(modelmeses);
                    }

                  }
                });
              }
            });

          });

          const arrayUniqueByKeyEneInt = [...new Map(constructorvalor1meses.map(item =>
            [item.origen, item.origen])).values()];
          const arrayUniqueByKeyEneMes = [...new Map(constructorvalor1meses.map(item =>
            [item.mes, item.mes])).values()];
          var constructorvalor1mesesfin: ModelRecaudoMes[] = new Array<ModelRecaudoMes>();
          arrayUniqueByKeyEneInt.forEach(element2 => {
            arrayUniqueByKeyEneMes.forEach(element => {
              if (element == 'Ene') {
                var recaudoEne = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Ene';
                listadepagosEne.forEach(element => {
                  if (element.origen == element2) {
                    recaudoEne = recaudoEne + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoEne;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Feb') {
                var recaudoFeb = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Feb';
                listadepagosFeb.forEach(element => {
                  if (element.origen == element2) {
                    recaudoFeb = recaudoFeb + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoFeb;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Mar') {
                var recaudoMar = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Mar';
                listadepagosMar.forEach(element => {
                  if (element.origen == element2) {
                    recaudoMar = recaudoMar + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoMar;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Abr') {
                var recaudoAbr = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Abr';
                listadepagosAbr.forEach(element => {
                  if (element.origen == element2) {
                    recaudoAbr = recaudoAbr + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoAbr;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'May') {
                var recaudoMay = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'May';
                listadepagosMay.forEach(element => {
                  if (element.origen == element2) {
                    recaudoMay = recaudoMay + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoMay;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Jun') {
                var recaudoJun = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Jun';
                listadepagosJun.forEach(element => {
                  if (element.origen == element2) {
                    recaudoJun = recaudoJun + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoJun;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Jul') {
                var recaudoJul = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Jul';
                listadepagosJul.forEach(element => {
                  if (element.origen == element2) {
                    recaudoJul = recaudoJul + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoJul;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Ago') {
                var recaudoAgo = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Ago';
                listadepagosAgo.forEach(element => {
                  if (element.origen == element2) {
                    recaudoAgo = recaudoAgo + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoAgo;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Sep') {
                var recaudoSep = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Sep';
                listadepagosSep.forEach(element => {
                  if (element.origen == element2) {
                    recaudoSep = recaudoSep + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoSep;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Oct') {
                var recaudoOct = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Oct';
                listadepagosOct.forEach(element => {
                  if (element.origen == element2) {
                    recaudoOct = recaudoOct + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoOct;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Nov') {
                var recaudoNov = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Nov';
                listadepagosNov.forEach(element => {
                  if (element.origen == element2) {
                    recaudoNov = recaudoNov + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoNov;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
              if (element == 'Dic') {
                var recaudoDic = 0;
                var modelmesesfinal: ModelRecaudoMes = new ModelRecaudoMes();
                modelmesesfinal.origen = element2;
                modelmesesfinal.mes = 'Dic';
                listadepagosDic.forEach(element => {
                  if (element.origen == element2) {
                    recaudoDic = recaudoDic + element.recaudo
                    modelmesesfinal.id = element.id;
                    modelmesesfinal.ano = element.ano;
                  }
                });
                modelmesesfinal.recaudo = recaudoDic;
                if (modelmesesfinal.recaudo > 0) {
                  constructorvalor1mesesfin.push(modelmesesfinal);
                }
              }
            });
            ///
            ///
          });


          constructorvalor1mesesfin.sort((a, b) => a.id - b.id).map((exemple, index, array) => array);
          constructorvalor1mesesfin.forEach(element => {
            this.valortotal = this.valortotal + element.recaudo;
          });
          this.dataSourceRecaudoMes = new MatTableDataSource<any>(constructorvalor1mesesfin);
          setTimeout(() => this.dataSourceRecaudoMes.paginator = this.paginatorRecaudoMes);
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }

  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSourceIntermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/

  consultarPorPresupuesto() {

    constructornombre1r = new Array
    constructornombre1 = new Array
    constructorvalor1 = new Array
    constructorvalor1p = new Array
    constructorvalorpresupuesto = new Array
    console.log(this.checkano4)
    if (!this.checkano4) {
      if (!this.checkint4) {
        var recaudoEne = 0;
        var fechaEne;
        var recaudoFeb = 0;
        var fechaFeb;
        var recaudoMar = 0;
        var fechaMar;
        var recaudoAbr = 0;
        var fechaAbr;
        var recaudoMay = 0;
        var fechaMay;
        var recaudoJun = 0;
        var fechaJun;
        var recaudoJul = 0;
        var fechaJul;
        var recaudoAgo = 0;
        var fechaAgo;
        var recaudoSep = 0;
        var fechaSep;
        var recaudoOct = 0;
        var fechaOct;
        var recaudoNov = 0;
        var fechaNov;
        var recaudoDic = 0;
        var fechaDic;
        constructornombre1presupuesto = new Array
        constructornombre1r = new Array
        this.aplicarpagos.forEach(element2 => {
          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);

          if (mesvalide == "01") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoEne = recaudoEne + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoEne = recaudoEne + element2.valorpago;
            }
          }
          if (mesvalide == "02") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoFeb = recaudoFeb + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoFeb = recaudoFeb + element2.valorpago;
            }
          }
          if (mesvalide == "03") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoMar = recaudoMar + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoMar = recaudoMar + element2.valorpago;
            }
          }
          if (mesvalide == "04") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoAbr = recaudoAbr + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoAbr = recaudoAbr + element2.valorpago;
            }
          }
          if (mesvalide == "05") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoMay = recaudoMay + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoMay = recaudoMay + element2.valorpago;
            }
          }
          if (mesvalide == "06") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoJun = recaudoJun + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoJun = recaudoJun + element2.valorpago;
            }
          }
          if (mesvalide == "07") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoJul = recaudoJul + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoJul = recaudoJul + element2.valorpago;
            }
          }
          if (mesvalide == "08") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoAgo = recaudoAgo + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoAgo = recaudoAgo + element2.valorpago;
            }
          }
          if (mesvalide == "09") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoSep = recaudoSep + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoSep = recaudoSep + element2.valorpago;
            }
          }
          if (mesvalide == "10") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoOct = recaudoOct + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoOct = recaudoOct + element2.valorpago;
            }
          }
          if (mesvalide == "11") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoNov = recaudoNov + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoNov = recaudoNov + element2.valorpago;
            }
          }
          if (mesvalide == "12") {
            if (this.checknotc) {
              if (element2.rc.toString().substring(0, 3) != "NTC") {
                recaudoDic = recaudoDic + element2.valorpago;
              }
            }
            if (!this.checknotc) {
              recaudoDic = recaudoDic + element2.valorpago;
            }
          }

        });
        this.presupuestos.forEach(element2 => {
          var datevalide = new Date(element2.fecha)
          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
          if (mesvalide == "01") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoEne)
            constructorvalorpresupuesto.push('Ene');
          }
          if (mesvalide == "02") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoFeb)
            constructorvalorpresupuesto.push('Feb');

          }
          if (mesvalide == "03") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoMar)
            constructorvalorpresupuesto.push('Mar');

          }
          if (mesvalide == "04") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoAbr)
            constructorvalorpresupuesto.push('Abr');
          }
          if (mesvalide == "05") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoMay)
            constructorvalorpresupuesto.push('May');
          }
          if (mesvalide == "06") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoJun)
            constructorvalorpresupuesto.push('Jun');
          }
          if (mesvalide == "07") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoJul)
            constructorvalorpresupuesto.push('Jul');
          }
          if (mesvalide == "08") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoAgo)
            constructorvalorpresupuesto.push('Ago');
          }
          if (mesvalide == "09") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoSep)
            constructorvalorpresupuesto.push('Sep');
          }
          if (mesvalide == "10") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoOct)
            constructorvalorpresupuesto.push('Oct');
          }
          if (mesvalide == "11") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoNov)
            constructorvalorpresupuesto.push('Nov');
          }
          if (mesvalide == "12") {
            constructornombre1presupuesto.push(element2.presupuesto)
            constructornombre1r.push(recaudoDic)
            constructorvalorpresupuesto.push('Dic');
          }
        });
        constructorvalor1 = new Array
        if (constructornombre1presupuesto.length != 0 && constructornombre1r.length != 0 && constructorvalorpresupuesto.length) {

          constructorvalorpresupuesto.forEach(element => {
            if (element == 'Ene') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Feb') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Mar') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Abr') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'May') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Jun') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Jul') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Ago') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Sep') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Oct') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Nov') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }
            if (element == 'Dic') {
              element = element + " a la fecha " + this.date.getDate() + "  ";
              constructorvalor1.push(element)
            }

          });
          this.grafica4 = true;
          $(function () {
            chartFuncion3();
          });
        } else {
          this.grafica4 = false;
          this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
        }
      } else {
        if (this.listaintermediario4.length > 0) {

          var recaudoEne = 0;
          var fechaEne;
          var recaudoFeb = 0;
          var fechaFeb;
          var recaudoMar = 0;
          var fechaMar;
          var recaudoAbr = 0;
          var fechaAbr;
          var recaudoMay = 0;
          var fechaMay;
          var recaudoJun = 0;
          var fechaJun;
          var recaudoJul = 0;
          var fechaJul;
          var recaudoAgo = 0;
          var fechaAgo;
          var recaudoSep = 0;
          var fechaSep;
          var recaudoOct = 0;
          var fechaOct;
          var recaudoNov = 0;
          var fechaNov;
          var recaudoDic = 0;
          var fechaDic;
          constructornombre1presupuesto = new Array
          constructornombre1r = new Array
          this.aplicarpagos.forEach(element2 => {
            this.listaintermediario4.forEach(element => {
              if (element == element2.intermediario) {

                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);

                if (mesvalide == "01") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoEne = recaudoEne + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoEne = recaudoEne + element2.valorpago;
                  }
                }
                if (mesvalide == "02") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoFeb = recaudoFeb + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoFeb = recaudoFeb + element2.valorpago;
                  }
                }
                if (mesvalide == "03") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMar = recaudoMar + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMar = recaudoMar + element2.valorpago;
                  }
                }
                if (mesvalide == "04") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAbr = recaudoAbr + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAbr = recaudoAbr + element2.valorpago;
                  }
                }
                if (mesvalide == "05") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMay = recaudoMay + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMay = recaudoMay + element2.valorpago;
                  }
                }
                if (mesvalide == "06") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJun = recaudoJun + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJun = recaudoJun + element2.valorpago;
                  }
                }
                if (mesvalide == "07") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJul = recaudoJul + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJul = recaudoJul + element2.valorpago;
                  }
                }
                if (mesvalide == "08") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAgo = recaudoAgo + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAgo = recaudoAgo + element2.valorpago;
                  }
                }
                if (mesvalide == "09") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoSep = recaudoSep + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoSep = recaudoSep + element2.valorpago;
                  }
                }
                if (mesvalide == "10") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoOct = recaudoOct + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoOct = recaudoOct + element2.valorpago;
                  }
                }
                if (mesvalide == "11") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoNov = recaudoNov + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoNov = recaudoNov + element2.valorpago;
                  }
                }
                if (mesvalide == "12") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoDic = recaudoDic + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoDic = recaudoDic + element2.valorpago;
                  }
                }

              }
            });
          });
          this.presupuestos.forEach(element2 => {
            var datevalide = new Date(element2.fecha)
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            if (mesvalide == "01") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoEne)
              constructorvalorpresupuesto.push('Ene');
            }
            if (mesvalide == "02") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoFeb)
              constructorvalorpresupuesto.push('Feb');

            }
            if (mesvalide == "03") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoMar)
              constructorvalorpresupuesto.push('Mar');

            }
            if (mesvalide == "04") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoAbr)
              constructorvalorpresupuesto.push('Abr');
            }
            if (mesvalide == "05") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoMay)
              constructorvalorpresupuesto.push('May');
            }
            if (mesvalide == "06") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoJun)
              constructorvalorpresupuesto.push('Jun');
            }
            if (mesvalide == "07") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoJul)
              constructorvalorpresupuesto.push('Jul');
            }
            if (mesvalide == "08") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoAgo)
              constructorvalorpresupuesto.push('Ago');
            }
            if (mesvalide == "09") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoSep)
              constructorvalorpresupuesto.push('Sep');
            }
            if (mesvalide == "10") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoOct)
              constructorvalorpresupuesto.push('Oct');
            }
            if (mesvalide == "11") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoNov)
              constructorvalorpresupuesto.push('Nov');
            }
            if (mesvalide == "12") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoDic)
              constructorvalorpresupuesto.push('Dic');
            }
          });
          constructorvalor1 = new Array
          if (constructornombre1presupuesto.length != 0 && constructornombre1r.length != 0 && constructorvalorpresupuesto.length) {

            constructorvalorpresupuesto.forEach(element => {
              if (element == 'Ene') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Feb') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Mar') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Abr') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'May') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Jun') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Jul') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Ago') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Sep') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Oct') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Nov') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }
              if (element == 'Dic') {
                element = element + " a la fecha " + this.date.getDate() + " Intermediario: " + this.listaintermediario4.toString();
                constructorvalor1.push(element)
              }

            });
            this.grafica4 = true;
            $(function () {
              chartFuncion3();
            });
          } else {
            this.grafica4 = false;
            this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
          }

        } else {
          this.alertPage.presentAlert("Por favor ingrese intermediario.")
        }
      }
    } else {
      console.log("entro", this.listaano4, this.checkntc4)
      if (this.listaano4.length != 0) {
        if (this.checkntc4) {
          if (this.listames4.length > 0) {

            var recaudoEne = 0;
            var fechaEne;
            var recaudoFeb = 0;
            var fechaFeb;
            var recaudoMar = 0;
            var fechaMar;
            var recaudoAbr = 0;
            var fechaAbr;
            var recaudoMay = 0;
            var fechaMay;
            var recaudoJun = 0;
            var fechaJun;
            var recaudoJul = 0;
            var fechaJul;
            var recaudoAgo = 0;
            var fechaAgo;
            var recaudoSep = 0;
            var fechaSep;
            var recaudoOct = 0;
            var fechaOct;
            var recaudoNov = 0;
            var fechaNov;
            var recaudoDic = 0;
            var fechaDic;
            constructornombre1presupuesto = new Array
            constructornombre1r = new Array
            this.aplicarpagos.forEach(element2 => {
              var datevalide = new Date(element2.marcatiempo.seconds * 1000);
              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              var yearvalide = datevalide.getFullYear();
              this.listaano4.forEach(element => {
                if (element == yearvalide) {
                  this.listames4.forEach(elements => {
                    if (elements == mesvalide) {

                      if (mesvalide == "01") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoEne = recaudoEne + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoEne = recaudoEne + element2.valorpago;
                        }
                      }
                      if (mesvalide == "02") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoFeb = recaudoFeb + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoFeb = recaudoFeb + element2.valorpago;
                        }
                      }
                      if (mesvalide == "03") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoMar = recaudoMar + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoMar = recaudoMar + element2.valorpago;
                        }
                      }
                      if (mesvalide == "04") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoAbr = recaudoAbr + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoAbr = recaudoAbr + element2.valorpago;
                        }
                      }
                      if (mesvalide == "05") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoMay = recaudoMay + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoMay = recaudoMay + element2.valorpago;
                        }
                      }
                      if (mesvalide == "06") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoJun = recaudoJun + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoJun = recaudoJun + element2.valorpago;
                        }
                      }
                      if (mesvalide == "07") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoJul = recaudoJul + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoJul = recaudoJul + element2.valorpago;
                        }
                      }
                      if (mesvalide == "08") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoAgo = recaudoAgo + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoAgo = recaudoAgo + element2.valorpago;
                        }
                      }
                      if (mesvalide == "09") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoSep = recaudoSep + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoSep = recaudoSep + element2.valorpago;
                        }
                      }
                      if (mesvalide == "10") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoOct = recaudoOct + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoOct = recaudoOct + element2.valorpago;
                        }
                      }
                      if (mesvalide == "11") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoNov = recaudoNov + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoNov = recaudoNov + element2.valorpago;
                        }
                      }
                      if (mesvalide == "12") {
                        if (this.checknotc) {
                          if (element2.rc.toString().substring(0, 3) != "NTC") {
                            recaudoDic = recaudoDic + element2.valorpago;
                          }
                        }
                        if (!this.checknotc) {
                          recaudoDic = recaudoDic + element2.valorpago;
                        }
                      }
                    }
                  });

                }
              });
            });
            this.presupuestos.forEach(element2 => {
              var datevalide = new Date(element2.fecha)
              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              if (mesvalide == "01") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoEne)
                constructorvalorpresupuesto.push('Ene');
              }
              if (mesvalide == "02") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoFeb)
                constructorvalorpresupuesto.push('Feb');

              }
              if (mesvalide == "03") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoMar)
                constructorvalorpresupuesto.push('Mar');

              }
              if (mesvalide == "04") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoAbr)
                constructorvalorpresupuesto.push('Abr');
              }
              if (mesvalide == "05") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoMay)
                constructorvalorpresupuesto.push('May');
              }
              if (mesvalide == "06") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoJun)
                constructorvalorpresupuesto.push('Jun');
              }
              if (mesvalide == "07") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoJul)
                constructorvalorpresupuesto.push('Jul');
              }
              if (mesvalide == "08") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoAgo)
                constructorvalorpresupuesto.push('Ago');
              }
              if (mesvalide == "09") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoSep)
                constructorvalorpresupuesto.push('Sep');
              }
              if (mesvalide == "10") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoOct)
                constructorvalorpresupuesto.push('Oct');
              }
              if (mesvalide == "11") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoNov)
                constructorvalorpresupuesto.push('Nov');
              }
              if (mesvalide == "12") {
                constructornombre1presupuesto.push(element2.presupuesto)
                constructornombre1r.push(recaudoDic)
                constructorvalorpresupuesto.push('Dic');
              }
            });
            constructorvalor1 = new Array
            if (constructornombre1presupuesto.length != 0 && constructornombre1r.length != 0 && constructorvalorpresupuesto.length) {

              constructorvalorpresupuesto.forEach(element => {
                if (element == 'Ene') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Feb') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Mar') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Abr') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'May') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Jun') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Jul') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Ago') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Sep') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Oct') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Nov') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }
                if (element == 'Dic') {
                  element = element + " a la fecha " + this.date.getDate() + "  ";
                  constructorvalor1.push(element)
                }

              });
              this.grafica4 = true;
              $(function () {
                chartFuncion3();
              });
            } else {
              this.grafica4 = false;
              this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
            }


          } else {
            this.alertPage.presentAlert("Seleccione fecha.")
          }
        } else {
          var recaudoEne = 0;
          var fechaEne;
          var recaudoFeb = 0;
          var fechaFeb;
          var recaudoMar = 0;
          var fechaMar;
          var recaudoAbr = 0;
          var fechaAbr;
          var recaudoMay = 0;
          var fechaMay;
          var recaudoJun = 0;
          var fechaJun;
          var recaudoJul = 0;
          var fechaJul;
          var recaudoAgo = 0;
          var fechaAgo;
          var recaudoSep = 0;
          var fechaSep;
          var recaudoOct = 0;
          var fechaOct;
          var recaudoNov = 0;
          var fechaNov;
          var recaudoDic = 0;
          var fechaDic;
          constructornombre1presupuesto = new Array
          constructornombre1r = new Array
          this.aplicarpagos.forEach(element2 => {
            var datevalide = new Date(element2.marcatiempo.seconds * 1000);
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            var yearvalide = datevalide.getFullYear();
            this.listaano4.forEach(element => {
              if (element == yearvalide) {
                if (mesvalide == "01") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoEne = recaudoEne + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoEne = recaudoEne + element2.valorpago;
                  }
                }
                if (mesvalide == "02") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoFeb = recaudoFeb + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoFeb = recaudoFeb + element2.valorpago;
                  }
                }
                if (mesvalide == "03") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMar = recaudoMar + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMar = recaudoMar + element2.valorpago;
                  }
                }
                if (mesvalide == "04") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAbr = recaudoAbr + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAbr = recaudoAbr + element2.valorpago;
                  }
                }
                if (mesvalide == "05") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoMay = recaudoMay + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoMay = recaudoMay + element2.valorpago;
                  }
                }
                if (mesvalide == "06") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJun = recaudoJun + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJun = recaudoJun + element2.valorpago;
                  }
                }
                if (mesvalide == "07") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoJul = recaudoJul + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoJul = recaudoJul + element2.valorpago;
                  }
                }
                if (mesvalide == "08") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoAgo = recaudoAgo + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoAgo = recaudoAgo + element2.valorpago;
                  }
                }
                if (mesvalide == "09") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoSep = recaudoSep + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoSep = recaudoSep + element2.valorpago;
                  }
                }
                if (mesvalide == "10") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoOct = recaudoOct + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoOct = recaudoOct + element2.valorpago;
                  }
                }
                if (mesvalide == "11") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoNov = recaudoNov + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoNov = recaudoNov + element2.valorpago;
                  }
                }
                if (mesvalide == "12") {
                  if (this.checknotc) {
                    if (element2.rc.toString().substring(0, 3) != "NTC") {
                      recaudoDic = recaudoDic + element2.valorpago;
                    }
                  }
                  if (!this.checknotc) {
                    recaudoDic = recaudoDic + element2.valorpago;
                  }
                }

              }
            });
          });
          this.presupuestos.forEach(element2 => {
            var datevalide = new Date(element2.fecha)
            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
            if (mesvalide == "01") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoEne)
              constructorvalorpresupuesto.push('Ene');
            }
            if (mesvalide == "02") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoFeb)
              constructorvalorpresupuesto.push('Feb');

            }
            if (mesvalide == "03") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoMar)
              constructorvalorpresupuesto.push('Mar');

            }
            if (mesvalide == "04") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoAbr)
              constructorvalorpresupuesto.push('Abr');
            }
            if (mesvalide == "05") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoMay)
              constructorvalorpresupuesto.push('May');
            }
            if (mesvalide == "06") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoJun)
              constructorvalorpresupuesto.push('Jun');
            }
            if (mesvalide == "07") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoJul)
              constructorvalorpresupuesto.push('Jul');
            }
            if (mesvalide == "08") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoAgo)
              constructorvalorpresupuesto.push('Ago');
            }
            if (mesvalide == "09") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoSep)
              constructorvalorpresupuesto.push('Sep');
            }
            if (mesvalide == "10") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoOct)
              constructorvalorpresupuesto.push('Oct');
            }
            if (mesvalide == "11") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoNov)
              constructorvalorpresupuesto.push('Nov');
            }
            if (mesvalide == "12") {
              constructornombre1presupuesto.push(element2.presupuesto)
              constructornombre1r.push(recaudoDic)
              constructorvalorpresupuesto.push('Dic');
            }
          });
          constructorvalor1 = new Array
          if (constructornombre1presupuesto.length != 0 && constructornombre1r.length != 0 && constructorvalorpresupuesto.length) {

            constructorvalorpresupuesto.forEach(element => {
              if (element == 'Ene') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Feb') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Mar') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Abr') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'May') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Jun') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Jul') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Ago') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Sep') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Oct') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Nov') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }
              if (element == 'Dic') {
                element = element + " a la fecha " + this.date.getDate() + "  ";
                constructorvalor1.push(element)
              }

            });
            this.grafica4 = true;
            $(function () {
              chartFuncion3();
            });
          } else {
            this.grafica4 = false;
            this.alertPage.presentAlert("No hay registros para los filtros seleccionados.");
          }

        }
      } else {
        this.alertPage.presentAlert("Seleccione fecha.");
      }
    }
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
    this.dataSourceRecaudoMes.data.forEach(element => {

    });
    this.dataSourceRecaudoMes.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceRecaudoMes.paginator) {
      this.dataSourceRecaudoMes.paginator.firstPage();
    }
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  addMes() {
    var valida = true;
    (this.filtromes == undefined || this.filtromes == null) ? valida = false : null;
    if (valida) {
      this.listames.push(this.filtromes.toString().substring(5, 7));
      this.dataSourceMes = new MatTableDataSource<any>(this.listames);
      setTimeout(() => this.dataSourceMes.paginator = this.paginatorMes);
    } else {
      this.alertPage.presentAlert("Seleccione Mes.")
    }
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteMes(element) {
    const index: number = this.listames.indexOf(element);
    this.listames.splice(index, 1);
    this.dataSourceMes = new MatTableDataSource<any>(this.listames);
    setTimeout(() => this.dataSourceMes.paginator = this.paginatorMes);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addAno() {
    var valida = true;
    (this.filtroano == undefined || this.filtroano == null) ? valida = false : null;
    if (valida) {
      this.listaano.push(this.filtroano.toString().substring(0, 4));
      this.dataSourceAno = new MatTableDataSource<any>(this.listaano);
      setTimeout(() => this.dataSourceAno.paginator = this.paginatorAno);
    } else {
      this.alertPage.presentAlert("Seleccione Año.")
    }
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  deleteAno(element) {
    const index: number = this.listaano.indexOf(element);
    this.listaano.splice(index, 1);
    this.dataSourceAno = new MatTableDataSource<any>(this.listaano);
    setTimeout(() => this.dataSourceAno.paginator = this.paginatorAno);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addInt() {
    var valida = true;
    (this.filtrointermediario == undefined || this.filtrointermediario == null) ? valida = false : null;
    if (valida) {
      this.listaintermediario.push(this.filtrointermediario);
      this.dataSourceInt = new MatTableDataSource<any>(this.listaintermediario);
      setTimeout(() => this.dataSourceInt.paginator = this.paginatorInt);
    } else {
      this.alertPage.presentAlert("Seleccione Intermediario.")
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteInt(element) {
    const index: number = this.listaintermediario.indexOf(element);
    this.listaintermediario.splice(index, 1);
    this.dataSourceInt = new MatTableDataSource<any>(this.listaintermediario);
    setTimeout(() => this.dataSourceInt.paginator = this.paginatorInt);
  }


  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  addMes1() {
    this.listames1.push(this.filtromes1.toString().substring(5, 7));
    this.dataSourceMes1 = new MatTableDataSource<any>(this.listames1);
    setTimeout(() => this.dataSourceMes1.paginator = this.paginatorMes);
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteMes1(element) {
    const index: number = this.listames1.indexOf(element);
    this.listames1.splice(index, 1);
    this.dataSourceMes1 = new MatTableDataSource<any>(this.listames1);
    setTimeout(() => this.dataSourceMes1.paginator = this.paginatorMes);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addAno1() {
    this.listaano1.push(this.filtroano1.toString().substring(0, 4));
    this.dataSourceAno1 = new MatTableDataSource<any>(this.listaano1);
    setTimeout(() => this.dataSourceAno1.paginator = this.paginatorAno);
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  deleteAno1(element) {
    const index: number = this.listaano1.indexOf(element);
    this.listaano1.splice(index, 1);
    this.dataSourceAno1 = new MatTableDataSource<any>(this.listaano1);
    setTimeout(() => this.dataSourceAno1.paginator = this.paginatorAno);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addInt1() {
    this.listaintermediario1.push(this.filtrointermediario1);
    this.dataSourceInt1 = new MatTableDataSource<any>(this.listaintermediario1);
    setTimeout(() => this.dataSourceInt1.paginator = this.paginatorInt);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteInt1(element) {
    const index: number = this.listaintermediario1.indexOf(element);
    this.listaintermediario1.splice(index, 1);
    this.dataSourceInt1 = new MatTableDataSource<any>(this.listaintermediario1);
    setTimeout(() => this.dataSourceInt1.paginator = this.paginatorInt);
  }



  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  addMes2() {
    this.listames2.push(this.filtromes2.toString().substring(5, 7));
    this.dataSourceMes2 = new MatTableDataSource<any>(this.listames2);
    setTimeout(() => this.dataSourceMes2.paginator = this.paginatorMes);
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteMes2(element) {
    const index: number = this.listames2.indexOf(element);
    this.listames2.splice(index, 1);
    this.dataSourceMes2 = new MatTableDataSource<any>(this.listames2);
    setTimeout(() => this.dataSourceMes2.paginator = this.paginatorMes);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addAno2() {
    this.listaano2.push(this.filtroano2.toString().substring(0, 4));
    this.dataSourceAno2 = new MatTableDataSource<any>(this.listaano2);
    setTimeout(() => this.dataSourceAno2.paginator = this.paginatorAno);
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  deleteAno2(element) {
    const index: number = this.listaano2.indexOf(element);
    this.listaano2.splice(index, 1);
    this.dataSourceAno2 = new MatTableDataSource<any>(this.listaano2);
    setTimeout(() => this.dataSourceAno1.paginator = this.paginatorAno);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addInt2() {
    this.listaintermediario2.push(this.filtrointermediario2);
    this.dataSourceInt2 = new MatTableDataSource<any>(this.listaintermediario2);
    setTimeout(() => this.dataSourceInt2.paginator = this.paginatorInt);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteInt2(element) {
    const index: number = this.listaintermediario2.indexOf(element);
    this.listaintermediario2.splice(index, 1);
    this.dataSourceInt2 = new MatTableDataSource<any>(this.listaintermediario2);
    setTimeout(() => this.dataSourceInt2.paginator = this.paginatorInt);
  }

  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  addMes3() {
    var valida = true;
    (this.filtromes3 == undefined || this.filtromes3 == null) ? valida = false : null;
    if (valida) {
      this.listames3.push(this.filtromes3.toString().substring(5, 7));
      this.dataSourceMes3 = new MatTableDataSource<any>(this.listames3);
      setTimeout(() => this.dataSourceMes3.paginator = this.paginatorMes);
    } else {
      this.alertPage.presentAlert("Seleccione Mes.")
    }
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteMes3(element) {
    const index: number = this.listames3.indexOf(element);
    this.listames3.splice(index, 1);
    this.dataSourceMes3 = new MatTableDataSource<any>(this.listames3);
    setTimeout(() => this.dataSourceMes3.paginator = this.paginatorMes);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addAno3() {
    var valida = true;
    (this.filtroano3 == undefined || this.filtroano3 == null) ? valida = false : null;
    if (valida) {
      this.listaano3.push(this.filtroano3.toString().substring(0, 4));
      this.dataSourceAno3 = new MatTableDataSource<any>(this.listaano3);
      setTimeout(() => this.dataSourceAno3.paginator = this.paginatorAno);
    } else {
      this.alertPage.presentAlert("Seleccione Año.")
    }
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  deleteAno3(element) {
    const index: number = this.listaano3.indexOf(element);
    this.listaano3.splice(index, 1);
    this.dataSourceAno3 = new MatTableDataSource<any>(this.listaano3);
    setTimeout(() => this.dataSourceAno3.paginator = this.paginatorAno);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addInt3() {
    var valida = true;
    (this.filtrointermediario3 == undefined || this.filtrointermediario3 == null) ? valida = false : null;
    if (valida) {
      this.listaintermediario3.push(this.filtrointermediario3);
      this.dataSourceInt3 = new MatTableDataSource<any>(this.listaintermediario3);
      setTimeout(() => this.dataSourceInt3.paginator = this.paginatorInt);
    } else {
      this.alertPage.presentAlert("Seleccione Intermediario.")
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteInt3(element) {
    const index: number = this.listaintermediario3.indexOf(element);
    this.listaintermediario3.splice(index, 1);
    this.dataSourceInt3 = new MatTableDataSource<any>(this.listaintermediario3);
    setTimeout(() => this.dataSourceInt3.paginator = this.paginatorInt);
  }



  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  addMes4() {
    var valida = true;
    (this.filtromes4 == undefined || this.filtromes4 == null) ? valida = false : null;
    if (valida) {
      this.listames4.push(this.filtromes4.toString().substring(5, 7));
      this.dataSourceMes4 = new MatTableDataSource<any>(this.listames4);
      setTimeout(() => this.dataSourceMes4.paginator = this.paginatorMes);
    } else {
      this.alertPage.presentAlert("Seleccione Mes.")
    }
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteMes4(element) {
    const index: number = this.listames4.indexOf(element);
    this.listames4.splice(index, 1);
    this.dataSourceMes4 = new MatTableDataSource<any>(this.listames4);
    setTimeout(() => this.dataSourceMes4.paginator = this.paginatorMes);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addAno4() {
    var valida = true;
    (this.filtroano4 == undefined || this.filtroano4 == null) ? valida = false : null;
    if (valida) {
      this.listaano4.push(this.filtroano4.toString().substring(0, 4));
      this.dataSourceAno4 = new MatTableDataSource<any>(this.listaano4);
      setTimeout(() => this.dataSourceAno4.paginator = this.paginatorAno);
    } else {
      this.alertPage.presentAlert("Seleccione Año.")
    }
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  deleteAno4(element) {
    const index: number = this.listaano4.indexOf(element);
    this.listaano4.splice(index, 1);
    this.dataSourceAno4 = new MatTableDataSource<any>(this.listaano4);
    setTimeout(() => this.dataSourceAno4.paginator = this.paginatorAno);
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  addInt4() {
    var valida = true;
    (this.filtrointermediario4 == undefined || this.filtrointermediario4 == null) ? valida = false : null;
    if (valida) {
      this.listaintermediario4.push(this.filtrointermediario4);
      this.dataSourceInt4 = new MatTableDataSource<any>(this.listaintermediario4);
      setTimeout(() => this.dataSourceInt4.paginator = this.paginatorInt);
    } else {
      this.alertPage.presentAlert("Seleccione Intermediario.")
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteInt4(element) {
    const index: number = this.listaintermediario4.indexOf(element);
    this.listaintermediario4.splice(index, 1);
    this.dataSourceInt4 = new MatTableDataSource<any>(this.listaintermediario4);
    setTimeout(() => this.dataSourceInt4.paginator = this.paginatorInt);
  }
  /**
     * Consulta Estado metodo unico software. 
      * Metodo principal:getEstado();  
      * @return Estado[];
      * AUTH GOOGLE CLOUD FIREBASE SERVICE
      * @author Giovanny Uribe Acevedo
      */
  isAllSelectedNotc() {
    if (!this.checknotc) {
      this.checknotc = true;
    } else {
      this.checknotc = false;
    }
  }

  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedNtc() {
    if (!this.checkntc) {
      this.checkntc = true;
    } else {
      this.checkntc = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedAno() {
    if (!this.checkano) {
      this.checkano = true;
    } else {
      this.checkano = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedInt() {
    if (!this.checkint) {
      this.checkint = true;
    } else {
      this.checkint = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedNtc1() {
    if (!this.checkntc1) {
      this.checkntc1 = true;
    } else {
      this.checkntc1 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedAno1() {
    if (!this.checkano1) {
      this.checkano1 = true;
    } else {
      this.checkano1 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedInt1() {
    if (!this.checkint1) {
      this.checkint1 = true;
    } else {
      this.checkint1 = false;
    }
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  isAllSelectedNtc2() {
    if (!this.checkntc2) {
      this.checkntc2 = true;
    } else {
      this.checkntc2 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedAno2() {
    if (!this.checkano2) {
      this.checkano2 = true;
    } else {
      this.checkano2 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedInt2() {
    if (!this.checkint2) {
      this.checkint2 = true;
    } else {
      this.checkint2 = false;
    }
  }

  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  isAllSelectedNtc3() {
    if (!this.checkntc3) {
      this.checkntc3 = true;
    } else {
      this.checkntc3 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedAno3() {
    if (!this.checkano3) {
      this.checkano3 = true;
    } else {
      this.checkano3 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedInt3() {
    if (!this.checkint3) {
      this.checkint3 = true;
    } else {
      this.checkint3 = false;
    }
  }


  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  isAllSelectedNtc4() {
    if (!this.checkntc4) {
      this.checkntc4 = true;
    } else {
      this.checkntc4 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedAno4() {
    if (!this.checkano4) {
      this.checkano4 = true;
    } else {
      this.checkano4 = false;
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedInt4() {
    if (!this.checkint4) {
      this.checkint4 = true;
    } else {
      this.checkint4 = false;
    }
  }
}
