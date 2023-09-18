import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as $ from 'jquery';
import { AlertPage } from '../../alert/alert.page';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { DatePage } from '../../util/date.page';
import { CargadorService } from '../../services/cargador.services';
import { User } from '../../model/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { ReportesService } from '../../services/reportes.service';
import { AuthService } from '../../services/auth.service';
import { Intermediario } from '../../model/intermediario.model';
import { MatPaginator } from '@angular/material/paginator';
import { Seguimiento } from '../../model/seguimiento.model';
import { Manager } from '../../model/manager.model';

export class Finllamada {
  finllamada;
  countseg;
}
declare var Highcharts
var findellamada: any[]
var findellamadadata: any[]
var llamadames: any[]
var llamadadatames: any[]
var finllamadafecha;
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
function chartPrint() {
  Highcharts.chart('container', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    colors: ['#005B9E'],
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Gestión:'
      },
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return formatearNumero(this.value)
          } else {
            return (-formatearNumero(this.value))
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'SEGUIMIENTO POR FIN DE LLAMADA'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
      name: 'Fin de Llamada ' + finllamadafecha,
      data: findellamadadata
    }],
    xAxis: {
      categories: findellamada,
      crosshair: true
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
          value = + this.y
        } else {
          value = + (-this.y)
        }
        return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' +
          formatearNumero(value) + '</b><br />'
      }
    }
  });
}

function chartPrintLlamada() {

  Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'SEGUIMIENTO LLAMADAS POR MES Y AÑO'
    },
    colors: ['#005B9E'],
    xAxis: {
      categories: llamadames,
      crosshair: true
    },
    exporting: { enabled: true },
    yAxis: {
      min: 0,
      title: {
        text: 'Gestión:'
      },
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return formatearNumero(this.value)
          } else {
            return (-formatearNumero(this.value))
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
          value = this.y
        } else {
          value = (-this.y)
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
      name: ' Seguimientos ' + finllamadafecha,
      data: llamadadatames

    }]
  });
}

@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.page.html',
  styleUrls: ['reportes.page.scss'],
  providers: [ServidorCorreoService]
})
export class HomePage implements OnInit {
  dataSourceMes: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsMes: string[] = ['nombre', 'select'];
  dataSourceAno: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsAno: string[] = ['nombre', 'select'];
  dataSourceInt: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsInt: string[] = ['nombre', 'select'];
  dataSourceGestor: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsGestor: string[] = ['nombre', 'select'];
  checkntc = false;
  checkano = false;
  checkint = false;
  checkges = false;
  checkfigurecontainer = false;
  filtromes: Date;
  listames: any[] = [];
  filtroano: Date;
  listaano: any[] = [];
  filtrointermediario: string;
  filtrogestor: string;
  listaintermediario: any[] = [];
  listagestor: any[] = [];
  intermediarios: Intermediario[] = [];
  seguimientos: Seguimiento[] = [];
  users: any[] = [];
  tipofinal: Manager[] = [];
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  menuopcionT = sessionStorage.getItem('menuopcionTg');
  @ViewChild('paginatorMes', { read: MatPaginator }) paginatorMes: MatPaginator;
  @ViewChild('paginatorAno', { read: MatPaginator }) paginatorAno: MatPaginator;
  @ViewChild('paginatorInt', { read: MatPaginator }) paginatorInt: MatPaginator;
  @ViewChild('paginatorGestor', { read: MatPaginator }) paginatorGestor: MatPaginator;
  constructor(private reporteService: ReportesService, public modalController: ModalController, private alertPage: AlertPage, private date: DatePage, private cargador: CargadorService, private auth: AuthService) {
  }
  ngOnInit() {



    this.auth.loginUser(this.user).then(res => {
      this.getIntemediarios();
      this.getSeguimientos();
      this.getTipoFinal();
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
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  closeFirst(menuopcion: string) {

    if (menuopcion === 'finllamada') {
      this.checkntc = false;
      this.checkano = false;
      this.checkint = false;
      this.checkges = false;
      this.menuopcionT = menuopcion;
      this.listagestor = [] = [];
      this.listames = [] = [];
      this.listaano = [] = [];
      this.listaintermediario = [] = [];
      this.dataSourceAno = new MatTableDataSource<any>(this.listaano);
      setTimeout(() => this.dataSourceAno.paginator = this.paginatorAno);
      this.dataSourceMes = new MatTableDataSource<any>(this.listames);
      setTimeout(() => this.dataSourceMes.paginator = this.paginatorMes);
      this.dataSourceInt = new MatTableDataSource<any>(this.listaintermediario);
      setTimeout(() => this.dataSourceInt.paginator = this.paginatorInt);
      this.dataSourceGestor = new MatTableDataSource<any>(this.listagestor);
      setTimeout(() => this.dataSourceGestor.paginator = this.paginatorGestor);
    }
    if (menuopcion === 'llamadaanomes') {
      this.checkntc = false;
      this.checkano = false;
      this.checkint = false;
      this.checkges = false;
      this.menuopcionT = menuopcion;
      this.listagestor = [] = [];
      this.listames = [] = [];
      this.listaano = [] = [];
      this.listaintermediario = [] = [];
      this.dataSourceAno = new MatTableDataSource<any>(this.listaano);
      setTimeout(() => this.dataSourceAno.paginator = this.paginatorAno);
      this.dataSourceMes = new MatTableDataSource<any>(this.listames);
      setTimeout(() => this.dataSourceMes.paginator = this.paginatorMes);
      this.dataSourceInt = new MatTableDataSource<any>(this.listaintermediario);
      setTimeout(() => this.dataSourceInt.paginator = this.paginatorInt);
      this.dataSourceGestor = new MatTableDataSource<any>(this.listagestor);
      setTimeout(() => this.dataSourceGestor.paginator = this.paginatorGestor);
    }
    if (menuopcion === 'seguimientoanalista') {
      this.checkntc = false;
      this.checkano = false;
      this.checkint = false;
      this.checkges = false;
      this.menuopcionT = menuopcion;
      this.listagestor = [] = [];
      this.listames = [] = [];
      this.listaano = [] = [];
      this.listaintermediario = [] = [];
      this.dataSourceAno = new MatTableDataSource<any>(this.listaano);
      setTimeout(() => this.dataSourceAno.paginator = this.paginatorAno);
      this.dataSourceMes = new MatTableDataSource<any>(this.listames);
      setTimeout(() => this.dataSourceMes.paginator = this.paginatorMes);
      this.dataSourceInt = new MatTableDataSource<any>(this.listaintermediario);
      setTimeout(() => this.dataSourceInt.paginator = this.paginatorInt);
      this.dataSourceGestor = new MatTableDataSource<any>(this.listagestor);
      setTimeout(() => this.dataSourceGestor.paginator = this.paginatorGestor);
    }
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getSeguimientos() {
    this.cargador.getCargador(10000000);
    this.seguimientos = new Array<Seguimiento>();
    const start = performance.now();
    return new Promise((resolve, reject) => {
      this.reporteService.getAfs().collection('seguimiento').get().then((result) => {
        result.forEach(element => {
          this.seguimientos.push(JSON.parse(JSON.stringify(element.data())))
        });
      }).then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      }).catch((error) => {
        reject(error);
      })
    }).then((duration) => {
      this.users = [...new Map(this.seguimientos.map(item =>
        [item.creadopor, item.creadopor])).values()]; 
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
  getTipoFinal() {
    this.tipofinal = new Array<Manager>();
    this.reporteService.getAfs().collection("tipofinal").get().then((event) => {
      event.forEach(element => {
        this.tipofinal.push(JSON.parse(JSON.stringify(element.data())))
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
  consultarRecaudoAnalista() {
    if (!this.checkano) {
      if (!this.checkint) {
        if (!this.checkges) {
          findellamada = new Array;
          this.tipofinal.forEach(element => {
            findellamada.push(element.descripcion)
          });
          let balanceseguimientos: any[] = [] = new Array
          findellamadadata = [] = new Array
          findellamada.forEach(element => {
            var seg: Finllamada = new Finllamada();
            seg.finllamada = element;
            var countseg = 0;
            this.seguimientos.forEach(element2 => {
              if (element == element2.finllamada) {
                countseg++;
              }
            });
            seg.countseg = countseg;
            findellamadadata.push(seg.countseg);
            balanceseguimientos.push(seg);
          });
          if (findellamadadata.length > 0 && findellamada.length > 0) {
            finllamadafecha = this.date.getDate();
            chartPrint()
          } else {
            this.alertPage.presentAlert("No existe registros para la busqueda.")
          }
        } else {
          if (this.listagestor.length > 0) {
            findellamada = new Array;
            this.tipofinal.forEach(element => {
              findellamada.push(element.descripcion)
            });
            let balanceseguimientos: any[] = [] = new Array
            findellamadadata = [] = new Array
            findellamada.forEach(element => {
              var seg: Finllamada = new Finllamada();
              seg.finllamada = element;
              var countseg = 0;
              this.seguimientos.forEach(element2 => {
                if (element == element2.finllamada) {
                  this.listagestor.forEach(element3 => {
                    if (element3 == element2.creadopor) {
                      countseg++;
                    }
                  });
                }
              });
              seg.countseg = countseg;
              findellamadadata.push(seg.countseg);
              balanceseguimientos.push(seg);
            });
            if (findellamadadata.length > 0 && findellamada.length > 0) {
              finllamadafecha = this.date.getDate() + " Gestor: " + this.listagestor.toString();
              chartPrint()
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
          } else {
            this.alertPage.presentAlert("Seleccione Gestor.")
          }
        }
      } else {
        if (this.listaintermediario.length != 0) {
          if (this.checkges) {
            if (this.listagestor.length != 0) {
              findellamada = new Array;
              this.tipofinal.forEach(element => {
                findellamada.push(element.descripcion)
              });
              let balanceseguimientos: any[] = [] = new Array
              findellamadadata = [] = new Array
              findellamada.forEach(element => {
                var seg: Finllamada = new Finllamada();
                seg.finllamada = element;
                var countseg = 0;
                this.seguimientos.forEach(element2 => {
                  if (element == element2.finllamada) {
                    this.listaintermediario.forEach(element3 => {
                      if (element2.intermediario == element3) {
                        this.listagestor.forEach(element4 => {
                          if (element4 == element2.creadopor) {
                            countseg++;
                          }
                        });
                      }
                    });
                  }
                });
                seg.countseg = countseg;
                findellamadadata.push(seg.countseg);
                balanceseguimientos.push(seg);
              });
              if (findellamadadata.length > 0 && findellamada.length > 0) {
                finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario.toString() + " Gestor: " + this.listagestor.toString();
                chartPrint()
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            } else {
              this.alertPage.presentAlert("Seleccione Gestor.")
            }
          } else {
            findellamada = new Array;
            this.tipofinal.forEach(element => {
              findellamada.push(element.descripcion)
            });
            let balanceseguimientos: any[] = [] = new Array
            findellamadadata = [] = new Array
            findellamada.forEach(element => {
              var seg: Finllamada = new Finllamada();
              seg.finllamada = element;
              var countseg = 0;
              this.seguimientos.forEach(element2 => {
                if (element == element2.finllamada) {
                  this.listaintermediario.forEach(element3 => {
                    if (element2.intermediario == element3) {
                      countseg++;
                    }
                  });
                }
              });
              seg.countseg = countseg;
              findellamadadata.push(seg.countseg);
              balanceseguimientos.push(seg);
            });
            if (findellamadadata.length > 0 && findellamada.length > 0) {
              finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario.toString();
              chartPrint()
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
          }
        } else {
          this.alertPage.presentAlert("Error! Seleccione Intermediario.")
        }
      }
    } else {
      if (this.listaano.length != 0) {
        if (this.checkntc) {
          if (this.listames.length != 0) {
            if (this.checkges) {
              if (this.listagestor.length != 0) {
                if (this.checkint) {
                  if (this.listaintermediario.length != 0) {
                    findellamada = new Array;
                    this.tipofinal.forEach(element => {
                      findellamada.push(element.descripcion)
                    });
                    let balanceseguimientos: any[] = [] = new Array
                    findellamadadata = [] = new Array
                    findellamada.forEach(element => {
                      var seg: Finllamada = new Finllamada();
                      seg.finllamada = element;
                      var countseg = 0;
                      this.seguimientos.forEach(element2 => {
                        this.listaintermediario.forEach(element6 => {
                          if (element6 == element2.intermediario) {
                            if (element == element2.finllamada) {
                              this.listaano.forEach(element3 => {
                                var valida = true;
                                (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                                if (valida) {
                                  var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                  if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                    this.listames.forEach(element4 => {
                                      var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                      if (element4 == mesvalide) {
                                        this.listagestor.forEach(element5 => {
                                          if (element5 == element2.creadopor) {
                                            countseg++;
                                          }
                                        });
                                      }
                                    });
                                  }
                                } else {
                                  countseg++;
                                }
                              });
                            }
                          }
                        });
                      });
                      seg.countseg = countseg;
                      findellamadadata.push(seg.countseg);
                      balanceseguimientos.push(seg);
                    });
                    if (findellamadadata.length > 0 && findellamada.length > 0) {
                      finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Gestor: " + this.listagestor + " Intermediario: " + this.listaintermediario;
                      chartPrint()
                    } else {
                      this.alertPage.presentAlert("No existe registros para la busqueda.")
                    }
                  } else {
                    this.alertPage.presentAlert("Seleccione intermediario")
                  }
                } else {
                  findellamada = new Array;
                  this.tipofinal.forEach(element => {
                    findellamada.push(element.descripcion)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      if (element == element2.finllamada) {
                        this.listaano.forEach(element3 => {
                          var valida = true;
                          (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                          if (valida) {
                            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                            if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                              this.listames.forEach(element4 => {
                                var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                if (element4 == mesvalide) {
                                  this.listagestor.forEach(element5 => {
                                    if (element5 == element2.creadopor) {
                                      countseg++;
                                    }
                                  });
                                }
                              });
                            }
                          } else {
                            countseg++;
                          }
                        });
                      }
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Gestor: " + this.listagestor;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                }
              } else {
                this.alertPage.presentAlert("Seleccione Gestor");
              }
            } else {
              if (this.checkint) {
                if (this.listaintermediario.length != 0) {
                  findellamada = new Array;
                  this.tipofinal.forEach(element => {
                    findellamada.push(element.descripcion)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      this.listaintermediario.forEach(element6 => {
                        if (element6 == element2.intermediario) {
                          if (element == element2.finllamada) {
                            this.listaano.forEach(element3 => {
                              var valida = true;
                              (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                              if (valida) {
                                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                  this.listames.forEach(element4 => {
                                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                    if (element4 == mesvalide) {
                                      countseg++;
                                    }
                                  });
                                }
                              } else {
                                countseg++;
                              }
                            });
                          }
                        }
                      });
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Intermediario: " + this.listaintermediario;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Seleccione intermediario")
                }
              } else {
                findellamada = new Array;
                this.tipofinal.forEach(element => {
                  findellamada.push(element.descripcion)
                });
                let balanceseguimientos: any[] = [] = new Array
                findellamadadata = [] = new Array
                findellamada.forEach(element => {
                  var seg: Finllamada = new Finllamada();
                  seg.finllamada = element;
                  var countseg = 0;
                  this.seguimientos.forEach(element2 => {
                    if (element == element2.finllamada) {
                      this.listaano.forEach(element3 => {
                        var valida = true;
                        (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                        if (valida) {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                            this.listames.forEach(element4 => {
                              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                              if (element4 == mesvalide) {
                                countseg++;
                              }
                            });
                          }
                        } else {
                          countseg++;
                        }
                      });
                    }
                  });
                  seg.countseg = countseg;
                  findellamadadata.push(seg.countseg);
                  balanceseguimientos.push(seg);
                });
                if (findellamadadata.length > 0 && findellamada.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames;
                  chartPrint()
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              }
            }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint) {
            if (this.listaintermediario.length != 0) {
              if (this.checkges) {
                if (this.listagestor.length != 0) {
                  findellamada = new Array;
                  this.tipofinal.forEach(element => {
                    findellamada.push(element.descripcion)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      if (element == element2.finllamada) {
                        this.listaano.forEach(element3 => {
                          var valida = true;
                          (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                          if (valida) {
                            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                            if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                              this.listaintermediario.forEach(element4 => {
                                if (element4 == element2.intermediario) {
                                  this.listagestor.forEach(element5 => {
                                    if (element5 == element2.creadopor) {
                                      countseg++;
                                    }
                                  });
                                }
                              });
                            }
                          } else {
                            countseg++;
                          }
                        });
                      }
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Intermediario: " + this.listaintermediario + " Gestor: " + this.listagestor;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Seleccione Gestor.")
                }
              } else {
                findellamada = new Array;
                this.tipofinal.forEach(element => {
                  findellamada.push(element.descripcion)
                });
                let balanceseguimientos: any[] = [] = new Array
                findellamadadata = [] = new Array
                findellamada.forEach(element => {
                  var seg: Finllamada = new Finllamada();
                  seg.finllamada = element;
                  var countseg = 0;
                  this.seguimientos.forEach(element2 => {
                    if (element == element2.finllamada) {
                      this.listaano.forEach(element3 => {
                        var valida = true;
                        (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                        if (valida) {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                            this.listaintermediario.forEach(element4 => {
                              if (element4 == element2.intermediario) {
                                countseg++;
                              }
                            });
                          }
                        } else {
                          countseg++;
                        }
                      });
                    }
                  });
                  seg.countseg = countseg;
                  findellamadadata.push(seg.countseg);
                  balanceseguimientos.push(seg);
                });
                if (findellamadadata.length > 0 && findellamada.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Intermediario: " + this.listaintermediario;
                  chartPrint()
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              }
            } else {
              this.alertPage.presentAlert("Seleccione Intermediario.")
            }
          } else {
            if (this.checkges) {
              if (this.listagestor.length != 0) {
                findellamada = new Array;
                this.tipofinal.forEach(element => {
                  findellamada.push(element.descripcion)
                });
                let balanceseguimientos: any[] = [] = new Array
                findellamadadata = [] = new Array
                findellamada.forEach(element => {
                  var seg: Finllamada = new Finllamada();
                  seg.finllamada = element;
                  var countseg = 0;
                  this.seguimientos.forEach(element2 => {
                    if (element == element2.finllamada) {
                      this.listaano.forEach(element3 => {
                        var valida = true;
                        (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                        if (valida) {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                            this.listagestor.forEach(element4 => {
                              if (element4 == element2.creadopor) {
                                countseg++;
                              }
                            });
                          }
                        } else {
                          countseg++;
                        }
                      });
                    }
                  });
                  seg.countseg = countseg;
                  findellamadadata.push(seg.countseg);
                  balanceseguimientos.push(seg);
                });
                if (findellamadadata.length > 0 && findellamada.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Gestor: " + this.listagestor;
                  chartPrint()
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              } else {
                this.alertPage.presentAlert("Seleccione Gestor.")
              }
            } else {
              findellamada = new Array;
              this.tipofinal.forEach(element => {
                findellamada.push(element.descripcion)
              });
              let balanceseguimientos: any[] = [] = new Array
              findellamadadata = [] = new Array
              findellamada.forEach(element => {
                var seg: Finllamada = new Finllamada();
                seg.finllamada = element;
                var countseg = 0;
                this.seguimientos.forEach(element2 => {
                  if (element == element2.finllamada) {
                    this.listaano.forEach(element3 => {
                      var valida = true;
                      (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                      if (valida) {
                        var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                        if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                          countseg++;
                        }
                      } else {
                        countseg++;
                      }
                    });
                  }
                });
                seg.countseg = countseg;
                findellamadadata.push(seg.countseg);
                balanceseguimientos.push(seg);
              });
              if (findellamadadata.length > 0 && findellamada.length > 0) {
                finllamadafecha = this.date.getDate() + " Año: " + this.listaano;
                chartPrint()
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            }
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }
  }
  /**
    * Consulta Estado metodo unico software. 
     * Metodo principal:getEstado();  
     * @return Estado[];
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  consultarLlamadaAnoMes() {
    llamadadatames = new Array
    llamadames = new Array
    if (!this.checkano) {
      if (!this.checkint) {
        if (!this.checkges) {
          var recaudoEne = 0;
          var recaudoFeb = 0;
          var recaudoMar = 0;
          var recaudoAbr = 0;
          var recaudoMay = 0;
          var recaudoJun = 0;
          var recaudoJul = 0;
          var recaudoAgo = 0;
          var recaudoSep = 0;
          var recaudoOct = 0;
          var recaudoNov = 0;
          var recaudoDic = 0;
          this.seguimientos.forEach(element => {
            var valida = true;
            (element.marcatiempo == undefined || element.marcatiempo == null) ? valida = false : null;
            if (valida) {
              var datevalide = new Date(element.marcatiempo.seconds * 1000)
              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
              if (mesvalide == "01") {
                recaudoEne++;
              }
              if (mesvalide == "02") {
                recaudoFeb++;
              }
              if (mesvalide == "03") {
                recaudoMar++;
              }
              if (mesvalide == "04") {
                recaudoAbr++;
              }
              if (mesvalide == "05") {
                recaudoMay++;
              }
              if (mesvalide == "06") {
                recaudoJun++;
              }
              if (mesvalide == "07") {
                recaudoJul++;
              }
              if (mesvalide == "08") {
                recaudoAgo++;
              }
              if (mesvalide == "09") {
                recaudoSep++;
              }
              if (mesvalide == "10") {
                recaudoOct++;
              }
              if (mesvalide == "11") {
                recaudoNov++;
              }
              if (mesvalide == "12") {
                recaudoDic++;
              }
            } else {
              recaudoEne++;
            }
          });
          for (var i = 1; i <= 12; i++) {
            if (i == 1) {
              if (recaudoEne > 0) {
                llamadames.push("Ene");
                llamadadatames.push(recaudoEne);
              }
            }
            if (i == 2) {
              if (recaudoFeb > 0) {
                llamadames.push("Feb");
                llamadadatames.push(recaudoFeb);
              }
            }
            if (i == 3) {
              if (recaudoMar > 0) {
                llamadames.push("Mar");
                llamadadatames.push(recaudoMar);
              }
            }
            if (i == 4) {
              if (recaudoAbr > 0) {
                llamadames.push("Abr");
                llamadadatames.push(recaudoAbr);
              }
            }
            if (i == 5) {
              if (recaudoMay > 0) {
                llamadames.push("May");
                llamadadatames.push(recaudoMay);
              }
            }
            if (i == 6) {
              if (recaudoJun > 0) {
                llamadames.push("Jun");
                llamadadatames.push(recaudoJun);
              }
            }
            if (i == 7) {
              if (recaudoJul > 0) {
                llamadames.push("Jul");
                llamadadatames.push(recaudoJul);
              }
            }
            if (i == 8) {
              if (recaudoAgo > 0) {
                llamadames.push("Ago");
                llamadadatames.push(recaudoAgo);
              }
            }
            if (i == 9) {
              if (recaudoSep > 0) {
                llamadames.push("Sep");
                llamadadatames.push(recaudoSep);
              }
            }
            if (i == 10) {
              if (recaudoOct > 0) {
                llamadames.push("Oct");
                llamadadatames.push(recaudoOct);
              }
            }
            if (i == 11) {
              if (recaudoNov > 0) {
                llamadames.push("Nov");
                llamadadatames.push(recaudoNov);
              }
            }
            if (i == 12) {
              if (recaudoDic > 0) {
                llamadames.push("Dic");
                llamadadatames.push(recaudoDic);
              }
            }
          }
          if (llamadames.length > 0 && llamadadatames.length > 0) {
            finllamadafecha = this.date.getDate();
            chartPrintLlamada();
          } else {
            this.alertPage.presentAlert("No existe registros para la busqueda.")
          }
        } else {
          if (this.listagestor.length > 0) {
            var recaudoEne = 0;
            var recaudoFeb = 0;
            var recaudoMar = 0;
            var recaudoAbr = 0;
            var recaudoMay = 0;
            var recaudoJun = 0;
            var recaudoJul = 0;
            var recaudoAgo = 0;
            var recaudoSep = 0;
            var recaudoOct = 0;
            var recaudoNov = 0;
            var recaudoDic = 0;
            this.seguimientos.forEach(element => {
              this.listagestor.forEach(element2 => {
                if (element.creadopor == element2) {
                  var valida = true;
                  (element.marcatiempo == undefined || element.marcatiempo == null) ? valida = false : null;
                  if (valida) {
                    var datevalide = new Date(element.marcatiempo.seconds * 1000)
                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                    if (mesvalide == "01") {
                      recaudoEne++;
                    }
                    if (mesvalide == "02") {
                      recaudoFeb++;
                    }
                    if (mesvalide == "03") {
                      recaudoMar++;
                    }
                    if (mesvalide == "04") {
                      recaudoAbr++;
                    }
                    if (mesvalide == "05") {
                      recaudoMay++;
                    }
                    if (mesvalide == "06") {
                      recaudoJun++;
                    }
                    if (mesvalide == "07") {
                      recaudoJul++;
                    }
                    if (mesvalide == "08") {
                      recaudoAgo++;
                    }
                    if (mesvalide == "09") {
                      recaudoSep++;
                    }
                    if (mesvalide == "10") {
                      recaudoOct++;
                    }
                    if (mesvalide == "11") {
                      recaudoNov++;
                    }
                    if (mesvalide == "12") {
                      recaudoDic++;
                    }
                  } else {
                    recaudoEne++;
                  }
                }
              });
            });
            for (var i = 1; i <= 12; i++) {
              if (i == 1) {
                if (recaudoEne > 0) {
                  llamadames.push("Ene");
                  llamadadatames.push(recaudoEne);
                }
              }
              if (i == 2) {
                if (recaudoFeb > 0) {
                  llamadames.push("Feb");
                  llamadadatames.push(recaudoFeb);
                }
              }
              if (i == 3) {
                if (recaudoMar > 0) {
                  llamadames.push("Mar");
                  llamadadatames.push(recaudoMar);
                }
              }
              if (i == 4) {
                if (recaudoAbr > 0) {
                  llamadames.push("Abr");
                  llamadadatames.push(recaudoAbr);
                }
              }
              if (i == 5) {
                if (recaudoMay > 0) {
                  llamadames.push("May");
                  llamadadatames.push(recaudoMay);
                }
              }
              if (i == 6) {
                if (recaudoJun > 0) {
                  llamadames.push("Jun");
                  llamadadatames.push(recaudoJun);
                }
              }
              if (i == 7) {
                if (recaudoJul > 0) {
                  llamadames.push("Jul");
                  llamadadatames.push(recaudoJul);
                }
              }
              if (i == 8) {
                if (recaudoAgo > 0) {
                  llamadames.push("Ago");
                  llamadadatames.push(recaudoAgo);
                }
              }
              if (i == 9) {
                if (recaudoSep > 0) {
                  llamadames.push("Sep");
                  llamadadatames.push(recaudoSep);
                }
              }
              if (i == 10) {
                if (recaudoOct > 0) {
                  llamadames.push("Oct");
                  llamadadatames.push(recaudoOct);
                }
              }
              if (i == 11) {
                if (recaudoNov > 0) {
                  llamadames.push("Nov");
                  llamadadatames.push(recaudoNov);
                }
              }
              if (i == 12) {
                if (recaudoDic > 0) {
                  llamadames.push("Dic");
                  llamadadatames.push(recaudoDic);
                }
              }
            }
            if (llamadames.length > 0 && llamadadatames.length > 0) {
              finllamadafecha = this.date.getDate() + " Gestor: " + this.listagestor;
              chartPrintLlamada();
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
          } else {
            this.alertPage.presentAlert("Seleccione Gestor.")
          }
        }
      } else {
        if (this.listaintermediario.length != 0) {
          if (this.checkges) {
            if (this.listagestor.length != 0) {
              var recaudoEne = 0;
              var recaudoFeb = 0;
              var recaudoMar = 0;
              var recaudoAbr = 0;
              var recaudoMay = 0;
              var recaudoJun = 0;
              var recaudoJul = 0;
              var recaudoAgo = 0;
              var recaudoSep = 0;
              var recaudoOct = 0;
              var recaudoNov = 0;
              var recaudoDic = 0;
              this.seguimientos.forEach(element => {
                this.listaintermediario.forEach(element2 => {
                  if (element.intermediario == element2) {
                    this.listagestor.forEach(element3 => {
                      if (element3 == element.creadopor) {
                        var valida = true;
                        (element.marcatiempo == undefined || element.marcatiempo == null) ? valida = false : null;
                        if (valida) {
                          var datevalide = new Date(element.marcatiempo.seconds * 1000)
                          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                          if (mesvalide == "01") {
                            recaudoEne++;
                          }
                          if (mesvalide == "02") {
                            recaudoFeb++;
                          }
                          if (mesvalide == "03") {
                            recaudoMar++;
                          }
                          if (mesvalide == "04") {
                            recaudoAbr++;
                          }
                          if (mesvalide == "05") {
                            recaudoMay++;
                          }
                          if (mesvalide == "06") {
                            recaudoJun++;
                          }
                          if (mesvalide == "07") {
                            recaudoJul++;
                          }
                          if (mesvalide == "08") {
                            recaudoAgo++;
                          }
                          if (mesvalide == "09") {
                            recaudoSep++;
                          }
                          if (mesvalide == "10") {
                            recaudoOct++;
                          }
                          if (mesvalide == "11") {
                            recaudoNov++;
                          }
                          if (mesvalide == "12") {
                            recaudoDic++;
                          }
                        } else {
                          recaudoEne++;
                        }
                      }
                    });
                  }
                });
              });
              for (var i = 1; i <= 12; i++) {
                if (i == 1) {
                  if (recaudoEne > 0) {
                    llamadames.push("Ene");
                    llamadadatames.push(recaudoEne);
                  }
                }
                if (i == 2) {
                  if (recaudoFeb > 0) {
                    llamadames.push("Feb");
                    llamadadatames.push(recaudoFeb);
                  }
                }
                if (i == 3) {
                  if (recaudoMar > 0) {
                    llamadames.push("Mar");
                    llamadadatames.push(recaudoMar);
                  }
                }
                if (i == 4) {
                  if (recaudoAbr > 0) {
                    llamadames.push("Abr");
                    llamadadatames.push(recaudoAbr);
                  }
                }
                if (i == 5) {
                  if (recaudoMay > 0) {
                    llamadames.push("May");
                    llamadadatames.push(recaudoMay);
                  }
                }
                if (i == 6) {
                  if (recaudoJun > 0) {
                    llamadames.push("Jun");
                    llamadadatames.push(recaudoJun);
                  }
                }
                if (i == 7) {
                  if (recaudoJul > 0) {
                    llamadames.push("Jul");
                    llamadadatames.push(recaudoJul);
                  }
                }
                if (i == 8) {
                  if (recaudoAgo > 0) {
                    llamadames.push("Ago");
                    llamadadatames.push(recaudoAgo);
                  }
                }
                if (i == 9) {
                  if (recaudoSep > 0) {
                    llamadames.push("Sep");
                    llamadadatames.push(recaudoSep);
                  }
                }
                if (i == 10) {
                  if (recaudoOct > 0) {
                    llamadames.push("Oct");
                    llamadadatames.push(recaudoOct);
                  }
                }
                if (i == 11) {
                  if (recaudoNov > 0) {
                    llamadames.push("Nov");
                    llamadadatames.push(recaudoNov);
                  }
                }
                if (i == 12) {
                  if (recaudoDic > 0) {
                    llamadames.push("Dic");
                    llamadadatames.push(recaudoDic);
                  }
                }
              }
              if (llamadames.length > 0 && llamadadatames.length > 0) {
                finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario + " Gestor: " + this.listagestor;
                chartPrintLlamada();
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            } else {
              this.alertPage.presentAlert("Seleccione Gestor.")
            }
          } else {
            var recaudoEne = 0;
            var recaudoFeb = 0;
            var recaudoMar = 0;
            var recaudoAbr = 0;
            var recaudoMay = 0;
            var recaudoJun = 0;
            var recaudoJul = 0;
            var recaudoAgo = 0;
            var recaudoSep = 0;
            var recaudoOct = 0;
            var recaudoNov = 0;
            var recaudoDic = 0;
            this.seguimientos.forEach(element => {
              this.listaintermediario.forEach(element2 => {
                if (element.intermediario == element2) {
                  var valida = true;
                  (element.marcatiempo == undefined || element.marcatiempo == null) ? valida = false : null;
                  if (valida) {
                    var datevalide = new Date(element.marcatiempo.seconds * 1000)
                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                    if (mesvalide == "01") {
                      recaudoEne++;
                    }
                    if (mesvalide == "02") {
                      recaudoFeb++;
                    }
                    if (mesvalide == "03") {
                      recaudoMar++;
                    }
                    if (mesvalide == "04") {
                      recaudoAbr++;
                    }
                    if (mesvalide == "05") {
                      recaudoMay++;
                    }
                    if (mesvalide == "06") {
                      recaudoJun++;
                    }
                    if (mesvalide == "07") {
                      recaudoJul++;
                    }
                    if (mesvalide == "08") {
                      recaudoAgo++;
                    }
                    if (mesvalide == "09") {
                      recaudoSep++;
                    }
                    if (mesvalide == "10") {
                      recaudoOct++;
                    }
                    if (mesvalide == "11") {
                      recaudoNov++;
                    }
                    if (mesvalide == "12") {
                      recaudoDic++;
                    }
                  } else {
                    recaudoEne++;
                  }
                }
              });
            });
            for (var i = 1; i <= 12; i++) {
              if (i == 1) {
                if (recaudoEne > 0) {
                  llamadames.push("Ene");
                  llamadadatames.push(recaudoEne);
                }
              }
              if (i == 2) {
                if (recaudoFeb > 0) {
                  llamadames.push("Feb");
                  llamadadatames.push(recaudoFeb);
                }
              }
              if (i == 3) {
                if (recaudoMar > 0) {
                  llamadames.push("Mar");
                  llamadadatames.push(recaudoMar);
                }
              }
              if (i == 4) {
                if (recaudoAbr > 0) {
                  llamadames.push("Abr");
                  llamadadatames.push(recaudoAbr);
                }
              }
              if (i == 5) {
                if (recaudoMay > 0) {
                  llamadames.push("May");
                  llamadadatames.push(recaudoMay);
                }
              }
              if (i == 6) {
                if (recaudoJun > 0) {
                  llamadames.push("Jun");
                  llamadadatames.push(recaudoJun);
                }
              }
              if (i == 7) {
                if (recaudoJul > 0) {
                  llamadames.push("Jul");
                  llamadadatames.push(recaudoJul);
                }
              }
              if (i == 8) {
                if (recaudoAgo > 0) {
                  llamadames.push("Ago");
                  llamadadatames.push(recaudoAgo);
                }
              }
              if (i == 9) {
                if (recaudoSep > 0) {
                  llamadames.push("Sep");
                  llamadadatames.push(recaudoSep);
                }
              }
              if (i == 10) {
                if (recaudoOct > 0) {
                  llamadames.push("Oct");
                  llamadadatames.push(recaudoOct);
                }
              }
              if (i == 11) {
                if (recaudoNov > 0) {
                  llamadames.push("Nov");
                  llamadadatames.push(recaudoNov);
                }
              }
              if (i == 12) {
                if (recaudoDic > 0) {
                  llamadames.push("Dic");
                  llamadadatames.push(recaudoDic);
                }
              }
            }
            if (llamadames.length > 0 && llamadadatames.length > 0) {
              finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario;
              chartPrintLlamada();
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
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
                if (this.checkges) {
                  if (this.listagestor.length != 0) {
                    var recaudoEne = 0;
                    var recaudoFeb = 0;
                    var recaudoMar = 0;
                    var recaudoAbr = 0;
                    var recaudoMay = 0;
                    var recaudoJun = 0;
                    var recaudoJul = 0;
                    var recaudoAgo = 0;
                    var recaudoSep = 0;
                    var recaudoOct = 0;
                    var recaudoNov = 0;
                    var recaudoDic = 0;
                    this.seguimientos.forEach(element2 => {
                      this.listaintermediario.forEach(element => {
                        if (element == element2.intermediario) {
                          this.listagestor.forEach(element6 => {
                            if (element6 == element2.creadopor) {
                              this.listaano.forEach(element => {
                                var valida = true;
                                (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                                if (valida) {
                                  var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                  if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                    this.listames.forEach(element3 => {
                                      if (mesvalide == element3) {

                                        if (mesvalide == "01") {
                                          recaudoEne++;
                                        }
                                        if (mesvalide == "02") {
                                          recaudoFeb++;
                                        }
                                        if (mesvalide == "03") {
                                          recaudoMar++;
                                        }
                                        if (mesvalide == "04") {
                                          recaudoAbr++;
                                        }
                                        if (mesvalide == "05") {
                                          recaudoMay++;
                                        }
                                        if (mesvalide == "06") {
                                          recaudoJun++;
                                        }
                                        if (mesvalide == "07") {
                                          recaudoJul++;
                                        }
                                        if (mesvalide == "08") {
                                          recaudoAgo++;
                                        }
                                        if (mesvalide == "09") {
                                          recaudoSep++;
                                        }
                                        if (mesvalide == "10") {
                                          recaudoOct++;
                                        }
                                        if (mesvalide == "11") {
                                          recaudoNov++;
                                        }
                                        if (mesvalide == "12") {
                                          recaudoDic++;
                                        }
                                      }
                                    });
                                  }
                                } else {
                                  recaudoEne++;
                                }
                              });
                            }
                          });
                        }
                      });
                    });
                    for (var i = 1; i <= 12; i++) {
                      if (i == 1) {
                        if (recaudoEne > 0) {
                          llamadames.push("Ene");
                          llamadadatames.push(recaudoEne);
                        }
                      }
                      if (i == 2) {
                        if (recaudoFeb > 0) {
                          llamadames.push("Feb");
                          llamadadatames.push(recaudoFeb);
                        }
                      }
                      if (i == 3) {
                        if (recaudoMar > 0) {
                          llamadames.push("Mar");
                          llamadadatames.push(recaudoMar);
                        }
                      }
                      if (i == 4) {
                        if (recaudoAbr > 0) {
                          llamadames.push("Abr");
                          llamadadatames.push(recaudoAbr);
                        }
                      }
                      if (i == 5) {
                        if (recaudoMay > 0) {
                          llamadames.push("May");
                          llamadadatames.push(recaudoMay);
                        }
                      }
                      if (i == 6) {
                        if (recaudoJun > 0) {
                          llamadames.push("Jun");
                          llamadadatames.push(recaudoJun);
                        }
                      }
                      if (i == 7) {
                        if (recaudoJul > 0) {
                          llamadames.push("Jul");
                          llamadadatames.push(recaudoJul);
                        }
                      }
                      if (i == 8) {
                        if (recaudoAgo > 0) {
                          llamadames.push("Ago");
                          llamadadatames.push(recaudoAgo);
                        }
                      }
                      if (i == 9) {
                        if (recaudoSep > 0) {
                          llamadames.push("Sep");
                          llamadadatames.push(recaudoSep);
                        }
                      }
                      if (i == 10) {
                        if (recaudoOct > 0) {
                          llamadames.push("Oct");
                          llamadadatames.push(recaudoOct);
                        }
                      }
                      if (i == 11) {
                        if (recaudoNov > 0) {
                          llamadames.push("Nov");
                          llamadadatames.push(recaudoNov);
                        }
                      }
                      if (i == 12) {
                        if (recaudoDic > 0) {
                          llamadames.push("Dic");
                          llamadadatames.push(recaudoDic);
                        }
                      }
                    }
                    if (llamadames.length > 0 && llamadadatames.length > 0) {
                      finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Intermediario: " + this.listaintermediario + " Gestor: " + this.listagestor;
                      chartPrintLlamada();
                    } else {
                      this.alertPage.presentAlert("No existe registros para la busqueda.")
                    }
                  } else {
                    this.alertPage.presentAlert("Error! Seleccione gestor.")
                  }
                } else {
                  var recaudoEne = 0;
                  var recaudoFeb = 0;
                  var recaudoMar = 0;
                  var recaudoAbr = 0;
                  var recaudoMay = 0;
                  var recaudoJun = 0;
                  var recaudoJul = 0;
                  var recaudoAgo = 0;
                  var recaudoSep = 0;
                  var recaudoOct = 0;
                  var recaudoNov = 0;
                  var recaudoDic = 0;
                  this.seguimientos.forEach(element2 => {
                    this.listaintermediario.forEach(element => {
                      if (element == element2.intermediario) {
                        this.listaano.forEach(element => {
                          var valida = true;
                          (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                          if (valida) {
                            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                            if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                              this.listames.forEach(element3 => {
                                if (mesvalide == element3) {

                                  if (mesvalide == "01") {
                                    recaudoEne++;
                                  }
                                  if (mesvalide == "02") {
                                    recaudoFeb++;
                                  }
                                  if (mesvalide == "03") {
                                    recaudoMar++;
                                  }
                                  if (mesvalide == "04") {
                                    recaudoAbr++;
                                  }
                                  if (mesvalide == "05") {
                                    recaudoMay++;
                                  }
                                  if (mesvalide == "06") {
                                    recaudoJun++;
                                  }
                                  if (mesvalide == "07") {
                                    recaudoJul++;
                                  }
                                  if (mesvalide == "08") {
                                    recaudoAgo++;
                                  }
                                  if (mesvalide == "09") {
                                    recaudoSep++;
                                  }
                                  if (mesvalide == "10") {
                                    recaudoOct++;
                                  }
                                  if (mesvalide == "11") {
                                    recaudoNov++;
                                  }
                                  if (mesvalide == "12") {
                                    recaudoDic++;
                                  }
                                }
                              });
                            }
                          } else {
                            recaudoEne++;
                          }
                        });
                      }
                    });
                  });
                  for (var i = 1; i <= 12; i++) {
                    if (i == 1) {
                      if (recaudoEne > 0) {
                        llamadames.push("Ene");
                        llamadadatames.push(recaudoEne);
                      }
                    }
                    if (i == 2) {
                      if (recaudoFeb > 0) {
                        llamadames.push("Feb");
                        llamadadatames.push(recaudoFeb);
                      }
                    }
                    if (i == 3) {
                      if (recaudoMar > 0) {
                        llamadames.push("Mar");
                        llamadadatames.push(recaudoMar);
                      }
                    }
                    if (i == 4) {
                      if (recaudoAbr > 0) {
                        llamadames.push("Abr");
                        llamadadatames.push(recaudoAbr);
                      }
                    }
                    if (i == 5) {
                      if (recaudoMay > 0) {
                        llamadames.push("May");
                        llamadadatames.push(recaudoMay);
                      }
                    }
                    if (i == 6) {
                      if (recaudoJun > 0) {
                        llamadames.push("Jun");
                        llamadadatames.push(recaudoJun);
                      }
                    }
                    if (i == 7) {
                      if (recaudoJul > 0) {
                        llamadames.push("Jul");
                        llamadadatames.push(recaudoJul);
                      }
                    }
                    if (i == 8) {
                      if (recaudoAgo > 0) {
                        llamadames.push("Ago");
                        llamadadatames.push(recaudoAgo);
                      }
                    }
                    if (i == 9) {
                      if (recaudoSep > 0) {
                        llamadames.push("Sep");
                        llamadadatames.push(recaudoSep);
                      }
                    }
                    if (i == 10) {
                      if (recaudoOct > 0) {
                        llamadames.push("Oct");
                        llamadadatames.push(recaudoOct);
                      }
                    }
                    if (i == 11) {
                      if (recaudoNov > 0) {
                        llamadames.push("Nov");
                        llamadadatames.push(recaudoNov);
                      }
                    }
                    if (i == 12) {
                      if (recaudoDic > 0) {
                        llamadames.push("Dic");
                        llamadadatames.push(recaudoDic);
                      }
                    }
                  }
                  if (llamadames.length > 0 && llamadadatames.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Intermediario: " + this.listaintermediario;
                    chartPrintLlamada();
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }

                }
              } else {
                this.alertPage.presentAlert("Error! Seleccione Intermediario.")
              }
            } else {
              if (this.checkges) {
                if (this.listagestor.length != 0) {
                  var recaudoEne = 0;
                  var recaudoFeb = 0;
                  var recaudoMar = 0;
                  var recaudoAbr = 0;
                  var recaudoMay = 0;
                  var recaudoJun = 0;
                  var recaudoJul = 0;
                  var recaudoAgo = 0;
                  var recaudoSep = 0;
                  var recaudoOct = 0;
                  var recaudoNov = 0;
                  var recaudoDic = 0;
                  this.seguimientos.forEach(element2 => {
                    this.listagestor.forEach(element => {
                      if (element == element2.creadopor) {

                        this.listaano.forEach(element => {
                          var valida = true;
                          (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                          if (valida) {
                            var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                            if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                              this.listames.forEach(element3 => {
                                if (mesvalide == element3) {

                                  if (mesvalide == "01") {
                                    recaudoEne++;
                                  }
                                  if (mesvalide == "02") {
                                    recaudoFeb++;
                                  }
                                  if (mesvalide == "03") {
                                    recaudoMar++;
                                  }
                                  if (mesvalide == "04") {
                                    recaudoAbr++;
                                  }
                                  if (mesvalide == "05") {
                                    recaudoMay++;
                                  }
                                  if (mesvalide == "06") {
                                    recaudoJun++;
                                  }
                                  if (mesvalide == "07") {
                                    recaudoJul++;
                                  }
                                  if (mesvalide == "08") {
                                    recaudoAgo++;
                                  }
                                  if (mesvalide == "09") {
                                    recaudoSep++;
                                  }
                                  if (mesvalide == "10") {
                                    recaudoOct++;
                                  }
                                  if (mesvalide == "11") {
                                    recaudoNov++;
                                  }
                                  if (mesvalide == "12") {
                                    recaudoDic++;
                                  }
                                }
                              });
                            }
                          } else {
                            recaudoEne++;
                          }
                        });
                      }
                    });
                  });
                  for (var i = 1; i <= 12; i++) {
                    if (i == 1) {
                      if (recaudoEne > 0) {
                        llamadames.push("Ene");
                        llamadadatames.push(recaudoEne);
                      }
                    }
                    if (i == 2) {
                      if (recaudoFeb > 0) {
                        llamadames.push("Feb");
                        llamadadatames.push(recaudoFeb);
                      }
                    }
                    if (i == 3) {
                      if (recaudoMar > 0) {
                        llamadames.push("Mar");
                        llamadadatames.push(recaudoMar);
                      }
                    }
                    if (i == 4) {
                      if (recaudoAbr > 0) {
                        llamadames.push("Abr");
                        llamadadatames.push(recaudoAbr);
                      }
                    }
                    if (i == 5) {
                      if (recaudoMay > 0) {
                        llamadames.push("May");
                        llamadadatames.push(recaudoMay);
                      }
                    }
                    if (i == 6) {
                      if (recaudoJun > 0) {
                        llamadames.push("Jun");
                        llamadadatames.push(recaudoJun);
                      }
                    }
                    if (i == 7) {
                      if (recaudoJul > 0) {
                        llamadames.push("Jul");
                        llamadadatames.push(recaudoJul);
                      }
                    }
                    if (i == 8) {
                      if (recaudoAgo > 0) {
                        llamadames.push("Ago");
                        llamadadatames.push(recaudoAgo);
                      }
                    }
                    if (i == 9) {
                      if (recaudoSep > 0) {
                        llamadames.push("Sep");
                        llamadadatames.push(recaudoSep);
                      }
                    }
                    if (i == 10) {
                      if (recaudoOct > 0) {
                        llamadames.push("Oct");
                        llamadadatames.push(recaudoOct);
                      }
                    }
                    if (i == 11) {
                      if (recaudoNov > 0) {
                        llamadames.push("Nov");
                        llamadadatames.push(recaudoNov);
                      }
                    }
                    if (i == 12) {
                      if (recaudoDic > 0) {
                        llamadames.push("Dic");
                        llamadadatames.push(recaudoDic);
                      }
                    }
                  }
                  if (llamadames.length > 0 && llamadadatames.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Gestor: " + this.listagestor;
                    chartPrintLlamada();
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Error! Seleccione gestor.")
                }
              } else {
                var recaudoEne = 0;
                var recaudoFeb = 0;
                var recaudoMar = 0;
                var recaudoAbr = 0;
                var recaudoMay = 0;
                var recaudoJun = 0;
                var recaudoJul = 0;
                var recaudoAgo = 0;
                var recaudoSep = 0;
                var recaudoOct = 0;
                var recaudoNov = 0;
                var recaudoDic = 0;
                this.seguimientos.forEach(element2 => {
                  this.listaano.forEach(element => {
                    var valida = true;
                    (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                    if (valida) {
                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                      if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                        var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                        this.listames.forEach(element3 => {
                          if (mesvalide == element3) {

                            if (mesvalide == "01") {
                              recaudoEne++;
                            }
                            if (mesvalide == "02") {
                              recaudoFeb++;
                            }
                            if (mesvalide == "03") {
                              recaudoMar++;
                            }
                            if (mesvalide == "04") {
                              recaudoAbr++;
                            }
                            if (mesvalide == "05") {
                              recaudoMay++;
                            }
                            if (mesvalide == "06") {
                              recaudoJun++;
                            }
                            if (mesvalide == "07") {
                              recaudoJul++;
                            }
                            if (mesvalide == "08") {
                              recaudoAgo++;
                            }
                            if (mesvalide == "09") {
                              recaudoSep++;
                            }
                            if (mesvalide == "10") {
                              recaudoOct++;
                            }
                            if (mesvalide == "11") {
                              recaudoNov++;
                            }
                            if (mesvalide == "12") {
                              recaudoDic++;
                            }
                          }
                        });
                      }
                    } else {
                      recaudoEne++;
                    }
                  });
                });
                for (var i = 1; i <= 12; i++) {
                  if (i == 1) {
                    if (recaudoEne > 0) {
                      llamadames.push("Ene");
                      llamadadatames.push(recaudoEne);
                    }
                  }
                  if (i == 2) {
                    if (recaudoFeb > 0) {
                      llamadames.push("Feb");
                      llamadadatames.push(recaudoFeb);
                    }
                  }
                  if (i == 3) {
                    if (recaudoMar > 0) {
                      llamadames.push("Mar");
                      llamadadatames.push(recaudoMar);
                    }
                  }
                  if (i == 4) {
                    if (recaudoAbr > 0) {
                      llamadames.push("Abr");
                      llamadadatames.push(recaudoAbr);
                    }
                  }
                  if (i == 5) {
                    if (recaudoMay > 0) {
                      llamadames.push("May");
                      llamadadatames.push(recaudoMay);
                    }
                  }
                  if (i == 6) {
                    if (recaudoJun > 0) {
                      llamadames.push("Jun");
                      llamadadatames.push(recaudoJun);
                    }
                  }
                  if (i == 7) {
                    if (recaudoJul > 0) {
                      llamadames.push("Jul");
                      llamadadatames.push(recaudoJul);
                    }
                  }
                  if (i == 8) {
                    if (recaudoAgo > 0) {
                      llamadames.push("Ago");
                      llamadadatames.push(recaudoAgo);
                    }
                  }
                  if (i == 9) {
                    if (recaudoSep > 0) {
                      llamadames.push("Sep");
                      llamadadatames.push(recaudoSep);
                    }
                  }
                  if (i == 10) {
                    if (recaudoOct > 0) {
                      llamadames.push("Oct");
                      llamadadatames.push(recaudoOct);
                    }
                  }
                  if (i == 11) {
                    if (recaudoNov > 0) {
                      llamadames.push("Nov");
                      llamadadatames.push(recaudoNov);
                    }
                  }
                  if (i == 12) {
                    if (recaudoDic > 0) {
                      llamadames.push("Dic");
                      llamadadatames.push(recaudoDic);
                    }
                  }
                }
                if (llamadames.length > 0 && llamadadatames.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames;
                  chartPrintLlamada();
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              }
            }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint) {
            if (this.listaintermediario.length != 0) {
              if (this.checkges) {
                if (this.listagestor.length != 0) {
                  var recaudoEne = 0;
                  var recaudoFeb = 0;
                  var recaudoMar = 0;
                  var recaudoAbr = 0;
                  var recaudoMay = 0;
                  var recaudoJun = 0;
                  var recaudoJul = 0;
                  var recaudoAgo = 0;
                  var recaudoSep = 0;
                  var recaudoOct = 0;
                  var recaudoNov = 0;
                  var recaudoDic = 0;
                  this.seguimientos.forEach(element2 => {
                    this.listaano.forEach(element => {
                      var valida = true;
                      (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                      if (valida) {
                        var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                        if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                          this.listaintermediario.forEach(element4 => {
                            if (element4 == element2.intermediario) {
                              this.listagestor.forEach(element3 => {
                                if (element3 == element2.creadopor) {
                                  var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                  if (mesvalide == "01") {
                                    recaudoEne++;
                                  }
                                  if (mesvalide == "02") {
                                    recaudoFeb++;
                                  }
                                  if (mesvalide == "03") {
                                    recaudoMar++;
                                  }
                                  if (mesvalide == "04") {
                                    recaudoAbr++;
                                  }
                                  if (mesvalide == "05") {
                                    recaudoMay++;
                                  }
                                  if (mesvalide == "06") {
                                    recaudoJun++;
                                  }
                                  if (mesvalide == "07") {
                                    recaudoJul++;
                                  }
                                  if (mesvalide == "08") {
                                    recaudoAgo++;
                                  }
                                  if (mesvalide == "09") {
                                    recaudoSep++;
                                  }
                                  if (mesvalide == "10") {
                                    recaudoOct++;
                                  }
                                  if (mesvalide == "11") {
                                    recaudoNov++;
                                  }
                                  if (mesvalide == "12") {
                                    recaudoDic++;
                                  }
                                }
                              });
                            }
                          });
                        }
                      } else {
                        recaudoEne++;
                      }
                    });
                  });
                  for (var i = 1; i <= 12; i++) {
                    if (i == 1) {
                      if (recaudoEne > 0) {
                        llamadames.push("Ene");
                        llamadadatames.push(recaudoEne);
                      }
                    }
                    if (i == 2) {
                      if (recaudoFeb > 0) {
                        llamadames.push("Feb");
                        llamadadatames.push(recaudoFeb);
                      }
                    }
                    if (i == 3) {
                      if (recaudoMar > 0) {
                        llamadames.push("Mar");
                        llamadadatames.push(recaudoMar);
                      }
                    }
                    if (i == 4) {
                      if (recaudoAbr > 0) {
                        llamadames.push("Abr");
                        llamadadatames.push(recaudoAbr);
                      }
                    }
                    if (i == 5) {
                      if (recaudoMay > 0) {
                        llamadames.push("May");
                        llamadadatames.push(recaudoMay);
                      }
                    }
                    if (i == 6) {
                      if (recaudoJun > 0) {
                        llamadames.push("Jun");
                        llamadadatames.push(recaudoJun);
                      }
                    }
                    if (i == 7) {
                      if (recaudoJul > 0) {
                        llamadames.push("Jul");
                        llamadadatames.push(recaudoJul);
                      }
                    }
                    if (i == 8) {
                      if (recaudoAgo > 0) {
                        llamadames.push("Ago");
                        llamadadatames.push(recaudoAgo);
                      }
                    }
                    if (i == 9) {
                      if (recaudoSep > 0) {
                        llamadames.push("Sep");
                        llamadadatames.push(recaudoSep);
                      }
                    }
                    if (i == 10) {
                      if (recaudoOct > 0) {
                        llamadames.push("Oct");
                        llamadadatames.push(recaudoOct);
                      }
                    }
                    if (i == 11) {
                      if (recaudoNov > 0) {
                        llamadames.push("Nov");
                        llamadadatames.push(recaudoNov);
                      }
                    }
                    if (i == 12) {
                      if (recaudoDic > 0) {
                        llamadames.push("Dic");
                        llamadadatames.push(recaudoDic);
                      }
                    }
                  }
                  if (llamadames.length > 0 && llamadadatames.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Gestor: " + this.listagestor + " Intermediario: " + this.listaintermediario;
                    chartPrintLlamada();
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Seleccione gestor.");
                }
              } else {
                var recaudoEne = 0;
                var recaudoFeb = 0;
                var recaudoMar = 0;
                var recaudoAbr = 0;
                var recaudoMay = 0;
                var recaudoJun = 0;
                var recaudoJul = 0;
                var recaudoAgo = 0;
                var recaudoSep = 0;
                var recaudoOct = 0;
                var recaudoNov = 0;
                var recaudoDic = 0;
                this.seguimientos.forEach(element2 => {
                  this.listaano.forEach(element => {
                    var valida = true;
                    (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                    if (valida) {
                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                      if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                        this.listaintermediario.forEach(element3 => {
                          if (element3 == element2.intermediario) {
                            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                            if (mesvalide == "01") {
                              recaudoEne++;
                            }
                            if (mesvalide == "02") {
                              recaudoFeb++;
                            }
                            if (mesvalide == "03") {
                              recaudoMar++;
                            }
                            if (mesvalide == "04") {
                              recaudoAbr++;
                            }
                            if (mesvalide == "05") {
                              recaudoMay++;
                            }
                            if (mesvalide == "06") {
                              recaudoJun++;
                            }
                            if (mesvalide == "07") {
                              recaudoJul++;
                            }
                            if (mesvalide == "08") {
                              recaudoAgo++;
                            }
                            if (mesvalide == "09") {
                              recaudoSep++;
                            }
                            if (mesvalide == "10") {
                              recaudoOct++;
                            }
                            if (mesvalide == "11") {
                              recaudoNov++;
                            }
                            if (mesvalide == "12") {
                              recaudoDic++;
                            }
                          }
                        });
                      }
                    } else {
                      recaudoEne++;
                    }
                  });
                });
                for (var i = 1; i <= 12; i++) {
                  if (i == 1) {
                    if (recaudoEne > 0) {
                      llamadames.push("Ene");
                      llamadadatames.push(recaudoEne);
                    }
                  }
                  if (i == 2) {
                    if (recaudoFeb > 0) {
                      llamadames.push("Feb");
                      llamadadatames.push(recaudoFeb);
                    }
                  }
                  if (i == 3) {
                    if (recaudoMar > 0) {
                      llamadames.push("Mar");
                      llamadadatames.push(recaudoMar);
                    }
                  }
                  if (i == 4) {
                    if (recaudoAbr > 0) {
                      llamadames.push("Abr");
                      llamadadatames.push(recaudoAbr);
                    }
                  }
                  if (i == 5) {
                    if (recaudoMay > 0) {
                      llamadames.push("May");
                      llamadadatames.push(recaudoMay);
                    }
                  }
                  if (i == 6) {
                    if (recaudoJun > 0) {
                      llamadames.push("Jun");
                      llamadadatames.push(recaudoJun);
                    }
                  }
                  if (i == 7) {
                    if (recaudoJul > 0) {
                      llamadames.push("Jul");
                      llamadadatames.push(recaudoJul);
                    }
                  }
                  if (i == 8) {
                    if (recaudoAgo > 0) {
                      llamadames.push("Ago");
                      llamadadatames.push(recaudoAgo);
                    }
                  }
                  if (i == 9) {
                    if (recaudoSep > 0) {
                      llamadames.push("Sep");
                      llamadadatames.push(recaudoSep);
                    }
                  }
                  if (i == 10) {
                    if (recaudoOct > 0) {
                      llamadames.push("Oct");
                      llamadadatames.push(recaudoOct);
                    }
                  }
                  if (i == 11) {
                    if (recaudoNov > 0) {
                      llamadames.push("Nov");
                      llamadadatames.push(recaudoNov);
                    }
                  }
                  if (i == 12) {
                    if (recaudoDic > 0) {
                      llamadames.push("Dic");
                      llamadadatames.push(recaudoDic);
                    }
                  }
                }
                if (llamadames.length > 0 && llamadadatames.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Intermediario: " + this.listaintermediario;
                  chartPrintLlamada();
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              }
            } else {
              this.alertPage.presentAlert("Seleccione intermediario.");
            }
          } else {
            if (this.checkges) {
              if (this.listagestor.length != 0) {
                var recaudoEne = 0;
                var recaudoFeb = 0;
                var recaudoMar = 0;
                var recaudoAbr = 0;
                var recaudoMay = 0;
                var recaudoJun = 0;
                var recaudoJul = 0;
                var recaudoAgo = 0;
                var recaudoSep = 0;
                var recaudoOct = 0;
                var recaudoNov = 0;
                var recaudoDic = 0;
                this.seguimientos.forEach(element2 => {
                  this.listaano.forEach(element => {
                    var valida = true;
                    (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                    if (valida) {
                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                      if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                        this.listagestor.forEach(element3 => {
                          if (element3 == element2.creadopor) {
                            var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                            if (mesvalide == "01") {
                              recaudoEne++;
                            }
                            if (mesvalide == "02") {
                              recaudoFeb++;
                            }
                            if (mesvalide == "03") {
                              recaudoMar++;
                            }
                            if (mesvalide == "04") {
                              recaudoAbr++;
                            }
                            if (mesvalide == "05") {
                              recaudoMay++;
                            }
                            if (mesvalide == "06") {
                              recaudoJun++;
                            }
                            if (mesvalide == "07") {
                              recaudoJul++;
                            }
                            if (mesvalide == "08") {
                              recaudoAgo++;
                            }
                            if (mesvalide == "09") {
                              recaudoSep++;
                            }
                            if (mesvalide == "10") {
                              recaudoOct++;
                            }
                            if (mesvalide == "11") {
                              recaudoNov++;
                            }
                            if (mesvalide == "12") {
                              recaudoDic++;
                            }
                          }
                        });
                      }
                    } else {
                      recaudoEne++;
                    }
                  });
                });
                for (var i = 1; i <= 12; i++) {
                  if (i == 1) {
                    if (recaudoEne > 0) {
                      llamadames.push("Ene");
                      llamadadatames.push(recaudoEne);
                    }
                  }
                  if (i == 2) {
                    if (recaudoFeb > 0) {
                      llamadames.push("Feb");
                      llamadadatames.push(recaudoFeb);
                    }
                  }
                  if (i == 3) {
                    if (recaudoMar > 0) {
                      llamadames.push("Mar");
                      llamadadatames.push(recaudoMar);
                    }
                  }
                  if (i == 4) {
                    if (recaudoAbr > 0) {
                      llamadames.push("Abr");
                      llamadadatames.push(recaudoAbr);
                    }
                  }
                  if (i == 5) {
                    if (recaudoMay > 0) {
                      llamadames.push("May");
                      llamadadatames.push(recaudoMay);
                    }
                  }
                  if (i == 6) {
                    if (recaudoJun > 0) {
                      llamadames.push("Jun");
                      llamadadatames.push(recaudoJun);
                    }
                  }
                  if (i == 7) {
                    if (recaudoJul > 0) {
                      llamadames.push("Jul");
                      llamadadatames.push(recaudoJul);
                    }
                  }
                  if (i == 8) {
                    if (recaudoAgo > 0) {
                      llamadames.push("Ago");
                      llamadadatames.push(recaudoAgo);
                    }
                  }
                  if (i == 9) {
                    if (recaudoSep > 0) {
                      llamadames.push("Sep");
                      llamadadatames.push(recaudoSep);
                    }
                  }
                  if (i == 10) {
                    if (recaudoOct > 0) {
                      llamadames.push("Oct");
                      llamadadatames.push(recaudoOct);
                    }
                  }
                  if (i == 11) {
                    if (recaudoNov > 0) {
                      llamadames.push("Nov");
                      llamadadatames.push(recaudoNov);
                    }
                  }
                  if (i == 12) {
                    if (recaudoDic > 0) {
                      llamadames.push("Dic");
                      llamadadatames.push(recaudoDic);
                    }
                  }
                }
                if (llamadames.length > 0 && llamadadatames.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Gestor: " + this.listagestor;
                  chartPrintLlamada();
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              } else {
                this.alertPage.presentAlert("Seleccione gestor.");
              }
            } else {
              var recaudoEne = 0;
              var recaudoFeb = 0;
              var recaudoMar = 0;
              var recaudoAbr = 0;
              var recaudoMay = 0;
              var recaudoJun = 0;
              var recaudoJul = 0;
              var recaudoAgo = 0;
              var recaudoSep = 0;
              var recaudoOct = 0;
              var recaudoNov = 0;
              var recaudoDic = 0;
              this.seguimientos.forEach(element2 => {
                this.listaano.forEach(element => {
                  var valida = true;
                  (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                  if (valida) {
                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                    if (datevalide.getFullYear().toString().substring(0, 4) == element) {
                      var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                      if (mesvalide == "01") {
                        recaudoEne++;
                      }
                      if (mesvalide == "02") {
                        recaudoFeb++;
                      }
                      if (mesvalide == "03") {
                        recaudoMar++;
                      }
                      if (mesvalide == "04") {
                        recaudoAbr++;
                      }
                      if (mesvalide == "05") {
                        recaudoMay++;
                      }
                      if (mesvalide == "06") {
                        recaudoJun++;
                      }
                      if (mesvalide == "07") {
                        recaudoJul++;
                      }
                      if (mesvalide == "08") {
                        recaudoAgo++;
                      }
                      if (mesvalide == "09") {
                        recaudoSep++;
                      }
                      if (mesvalide == "10") {
                        recaudoOct++;
                      }
                      if (mesvalide == "11") {
                        recaudoNov++;
                      }
                      if (mesvalide == "12") {
                        recaudoDic++;
                      }
                    }
                  } else {
                    recaudoEne++;
                  }
                });
              });
              for (var i = 1; i <= 12; i++) {
                if (i == 1) {
                  if (recaudoEne > 0) {
                    llamadames.push("Ene");
                    llamadadatames.push(recaudoEne);
                  }
                }
                if (i == 2) {
                  if (recaudoFeb > 0) {
                    llamadames.push("Feb");
                    llamadadatames.push(recaudoFeb);
                  }
                }
                if (i == 3) {
                  if (recaudoMar > 0) {
                    llamadames.push("Mar");
                    llamadadatames.push(recaudoMar);
                  }
                }
                if (i == 4) {
                  if (recaudoAbr > 0) {
                    llamadames.push("Abr");
                    llamadadatames.push(recaudoAbr);
                  }
                }
                if (i == 5) {
                  if (recaudoMay > 0) {
                    llamadames.push("May");
                    llamadadatames.push(recaudoMay);
                  }
                }
                if (i == 6) {
                  if (recaudoJun > 0) {
                    llamadames.push("Jun");
                    llamadadatames.push(recaudoJun);
                  }
                }
                if (i == 7) {
                  if (recaudoJul > 0) {
                    llamadames.push("Jul");
                    llamadadatames.push(recaudoJul);
                  }
                }
                if (i == 8) {
                  if (recaudoAgo > 0) {
                    llamadames.push("Ago");
                    llamadadatames.push(recaudoAgo);
                  }
                }
                if (i == 9) {
                  if (recaudoSep > 0) {
                    llamadames.push("Sep");
                    llamadadatames.push(recaudoSep);
                  }
                }
                if (i == 10) {
                  if (recaudoOct > 0) {
                    llamadames.push("Oct");
                    llamadadatames.push(recaudoOct);
                  }
                }
                if (i == 11) {
                  if (recaudoNov > 0) {
                    llamadames.push("Nov");
                    llamadadatames.push(recaudoNov);
                  }
                }
                if (i == 12) {
                  if (recaudoDic > 0) {
                    llamadames.push("Dic");
                    llamadadatames.push(recaudoDic);
                  }
                }
              }
              if (llamadames.length > 0 && llamadadatames.length > 0) {
                finllamadafecha = this.date.getDate() + " Año: " + this.listaano;
                chartPrintLlamada();
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            }
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
    }




  }

  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  consultarSeguimientoAnalistas() {
    if (!this.checkano) {
      if (!this.checkint) {
        if (!this.checkges) {
          findellamada = new Array;
          this.users.forEach(element => {
            findellamada.push(element)
          });
          let balanceseguimientos: any[] = [] = new Array
          findellamadadata = [] = new Array
          findellamada.forEach(element => {
            var seg: Finllamada = new Finllamada();
            seg.finllamada = element;
            var countseg = 0;
            this.seguimientos.forEach(element2 => {
              if (element == element2.creadopor) {
                countseg++;
              }
            });
            seg.countseg = countseg;
            findellamadadata.push(seg.countseg);
            balanceseguimientos.push(seg);
          });
          if (findellamadadata.length > 0 && findellamada.length > 0) {
            finllamadafecha = this.date.getDate();
            chartPrint()
          } else {
            this.alertPage.presentAlert("No existe registros para la busqueda.")
          }
        } else {
          if (this.listagestor.length > 0) {
            findellamada = new Array;
            this.users.forEach(element => {
              findellamada.push(element)
            });
            let balanceseguimientos: any[] = [] = new Array
            findellamadadata = [] = new Array
            findellamada.forEach(element => {
              var seg: Finllamada = new Finllamada();
              seg.finllamada = element;
              var countseg = 0;
              this.seguimientos.forEach(element2 => {
                if (element == element2.creadopor) {
                  this.listagestor.forEach(element3 => {
                    if (element3 == element2.creadopor) {
                      countseg++;
                    }
                  });
                }
              });
              seg.countseg = countseg;
              findellamadadata.push(seg.countseg);
              balanceseguimientos.push(seg);
            });
            if (findellamadadata.length > 0 && findellamada.length > 0) {
              finllamadafecha = this.date.getDate() + " Gestor: " + this.listagestor.toString();
              chartPrint()
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
          } else {
            this.alertPage.presentAlert("Seleccione Gestor.")
          }
        }
      } else {
        if (this.listaintermediario.length != 0) {
          if (this.checkges) {
            if (this.listagestor.length != 0) { 
              findellamada = new Array;
              this.users.forEach(element => {
                findellamada.push(element)
              });
              let balanceseguimientos: any[] = [] = new Array
              findellamadadata = [] = new Array
              findellamada.forEach(element => {
                var seg: Finllamada = new Finllamada();
                seg.finllamada = element;
                var countseg = 0;
                this.seguimientos.forEach(element2 => {
                  if (element == element2.creadopor) {
                    this.listaintermediario.forEach(element3 => {
                      if (element2.intermediario == element3) {
                        this.listagestor.forEach(element4 => {
                          if (element4 == element2.creadopor) { 
                        countseg++;
                          }
                        });
                      }
                    });
                  }
                });
                seg.countseg = countseg;
                findellamadadata.push(seg.countseg);
                balanceseguimientos.push(seg);
              });
              if (findellamadadata.length > 0 && findellamada.length > 0) {
                finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario.toString()+ " Gestor: " + this.listagestor.toString();
                chartPrint()
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            } else {
              this.alertPage.presentAlert("Seleccione Gestor.")
            }
          } else {
            findellamada = new Array;
            this.users.forEach(element => {
              findellamada.push(element)
            });
            let balanceseguimientos: any[] = [] = new Array
            findellamadadata = [] = new Array
            findellamada.forEach(element => {
              var seg: Finllamada = new Finllamada();
              seg.finllamada = element;
              var countseg = 0;
              this.seguimientos.forEach(element2 => {
                if (element == element2.creadopor) {
                  this.listaintermediario.forEach(element3 => {
                    if (element2.intermediario == element3) {
                      countseg++;
                    }
                  });
                }
              });
              seg.countseg = countseg;
              findellamadadata.push(seg.countseg);
              balanceseguimientos.push(seg);
            });
            if (findellamadadata.length > 0 && findellamada.length > 0) {
              finllamadafecha = this.date.getDate() + " Intermediario: " + this.listaintermediario.toString();
              chartPrint()
            } else {
              this.alertPage.presentAlert("No existe registros para la busqueda.")
            }
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
                if (this.checkges) {
                  if (this.listagestor.length != 0) {
                    findellamada = new Array;
                    this.users.forEach(element => {
                      findellamada.push(element)
                    });
                    let balanceseguimientos: any[] = [] = new Array
                    findellamadadata = [] = new Array
                    findellamada.forEach(element => {
                      var seg: Finllamada = new Finllamada();
                      seg.finllamada = element;
                      var countseg = 0;
                      this.seguimientos.forEach(element2 => {
                        if (element == element2.creadopor) {
                          this.listaintermediario.forEach(element6 => {
                            if (element6 == element2.intermediario) {
                              this.listagestor.forEach(element5 => {
                                if (element5 == element2.creadopor) {
                                  this.listaano.forEach(element3 => {
                                    var valida = true;
                                    (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                                    if (valida) {
                                      var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                      if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                        this.listames.forEach(element4 => {
                                          var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                          if (element4 == mesvalide) {
                                            countseg++;
                                          }
                                        });
                                      }
                                    } else {
                                      countseg++;
                                    }
                                  });
                                }
                              });
                            }
                          });

                        }
                      });
                      seg.countseg = countseg;
                      findellamadadata.push(seg.countseg);
                      balanceseguimientos.push(seg);
                    });
                    if (findellamadadata.length > 0 && findellamada.length > 0) {
                      finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Intermediario: " + this.listaintermediario + " Gestor: " + this.listagestor;
                      chartPrint()
                    } else {
                      this.alertPage.presentAlert("No existe registros para la busqueda.")
                    }

                  } else {
                    this.alertPage.presentAlert("Seleccione gestor.")
                  }
                } else {

                  findellamada = new Array;
                  this.users.forEach(element => {
                    findellamada.push(element)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      if (element == element2.creadopor) {
                        this.listaintermediario.forEach(element5 => {
                          if (element5 == element2.intermediario) {
                            this.listaano.forEach(element3 => {
                              var valida = true;
                              (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                              if (valida) {
                                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                  this.listames.forEach(element4 => {
                                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                    if (element4 == mesvalide) {
                                      countseg++;
                                    }
                                  });
                                }
                              } else {
                                countseg++;
                              }
                            });
                          }
                        });

                      }
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Intermediario: " + this.listaintermediario;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }

                }
              } else {
                this.alertPage.presentAlert("Seleccione Intermediario.")
              }
            } else {
              if (this.checkges) {
                if (this.listagestor.length != 0) {
                  findellamada = new Array;
                  this.users.forEach(element => {
                    findellamada.push(element)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      if (element == element2.creadopor) {
                        this.listagestor.forEach(element5 => {
                          if (element5 == element2.creadopor) {
                            this.listaano.forEach(element3 => {
                              var valida = true;
                              (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                              if (valida) {
                                var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                  this.listames.forEach(element4 => {
                                    var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                                    if (element4 == mesvalide) {
                                      countseg++;
                                    }
                                  });
                                }
                              } else {
                                countseg++;
                              }
                            });
                          }
                        });

                      }
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames + " Gestor: " + this.listagestor;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Seleccione Gestor")
                }
              } else {
                findellamada = new Array;
                this.users.forEach(element => {
                  findellamada.push(element)
                });
                let balanceseguimientos: any[] = [] = new Array
                findellamadadata = [] = new Array
                findellamada.forEach(element => {
                  var seg: Finllamada = new Finllamada();
                  seg.finllamada = element;
                  var countseg = 0;
                  this.seguimientos.forEach(element2 => {
                    if (element == element2.creadopor) {
                      this.listaano.forEach(element3 => {
                        var valida = true;
                        (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                        if (valida) {
                          var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                          if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                            this.listames.forEach(element4 => {
                              var mesvalide = ("0" + (datevalide.getMonth() + 1)).slice(-2);
                              if (element4 == mesvalide) {
                                countseg++;
                              }
                            });
                          }
                        } else {
                          countseg++;
                        }
                      });
                    }
                  });
                  seg.countseg = countseg;
                  findellamadadata.push(seg.countseg);
                  balanceseguimientos.push(seg);
                });
                if (findellamadadata.length > 0 && findellamada.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano + " Mes: " + this.listames;
                  chartPrint()
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }
              }
            }
          } else {
            this.alertPage.presentAlert("Error! Seleccione Mes.")
          }
        } else {
          if (this.checkint) {
            if (this.listaintermediario.length != 0) {
              if (this.checkges) {
                if (this.listagestor) {
                  findellamada = new Array;
                  this.users.forEach(element => {
                    findellamada.push(element)
                  });
                  let balanceseguimientos: any[] = [] = new Array
                  findellamadadata = [] = new Array
                  findellamada.forEach(element => {
                    var seg: Finllamada = new Finllamada();
                    seg.finllamada = element;
                    var countseg = 0;
                    this.seguimientos.forEach(element2 => {
                      this.listaintermediario.forEach(element4 => {
                        if (element4 == element2.intermediario) {
                          this.listagestor.forEach(element5 => {
                            if (element5 == element2.intermediario) {
                              if (element == element2.creadopor) {
                                this.listaano.forEach(element3 => {
                                  var valida = true;
                                  (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                                  if (valida) {
                                    var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                                    if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                      countseg++;
                                    }
                                  } else {
                                    countseg++;
                                  }
                                });
                              }
                            }
                          });

                        }
                      });
                    });
                    seg.countseg = countseg;
                    findellamadadata.push(seg.countseg);
                    balanceseguimientos.push(seg);
                  });
                  if (findellamadadata.length > 0 && findellamada.length > 0) {
                    finllamadafecha = this.date.getDate() + " Año: " + this.listaano;
                    chartPrint()
                  } else {
                    this.alertPage.presentAlert("No existe registros para la busqueda.")
                  }
                } else {
                  this.alertPage.presentAlert("Seleccione Gestor.")
                }
              } else {
                findellamada = new Array;
                this.users.forEach(element => {
                  findellamada.push(element)
                });
                let balanceseguimientos: any[] = [] = new Array
                findellamadadata = [] = new Array
                findellamada.forEach(element => {
                  var seg: Finllamada = new Finllamada();
                  seg.finllamada = element;
                  var countseg = 0;
                  this.seguimientos.forEach(element2 => {
                    this.listaintermediario.forEach(element4 => {
                      if (element4 == element2.intermediario) {
                        if (element == element2.creadopor) {
                          this.listaano.forEach(element3 => {
                            var valida = true;
                            (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                            if (valida) {
                              var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                              if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                                countseg++;
                              }
                            } else {
                              countseg++;
                            }
                          });
                        }
                      }
                    });
                  });
                  seg.countseg = countseg;
                  findellamadadata.push(seg.countseg);
                  balanceseguimientos.push(seg);
                });
                if (findellamadadata.length > 0 && findellamada.length > 0) {
                  finllamadafecha = this.date.getDate() + " Año: " + this.listaano;
                  chartPrint()
                } else {
                  this.alertPage.presentAlert("No existe registros para la busqueda.")
                }

              }
            } else {
              this.alertPage.presentAlert("Seleccione Intermediario.")
            }
          } else {
            if (this.checkges) {
              if (this.listagestor.length != 0) {

              } else {
                this.alertPage.presentAlert("Seleccione Gestor.")
              }
            } else {
              findellamada = new Array;
              this.users.forEach(element => {
                findellamada.push(element)
              });
              let balanceseguimientos: any[] = [] = new Array
              findellamadadata = [] = new Array
              findellamada.forEach(element => {
                var seg: Finllamada = new Finllamada();
                seg.finllamada = element;
                var countseg = 0;
                this.seguimientos.forEach(element2 => {
                  if (element == element2.creadopor) {
                    this.listaano.forEach(element3 => {
                      var valida = true;
                      (element2.marcatiempo == undefined || element2.marcatiempo == null) ? valida = false : null;
                      if (valida) {
                        var datevalide = new Date(element2.marcatiempo.seconds * 1000)
                        if (datevalide.getFullYear().toString().substring(0, 4) == element3) {
                          countseg++;
                        }
                      } else {
                        countseg++;
                      }
                    });
                  }
                });
                seg.countseg = countseg;
                findellamadadata.push(seg.countseg);
                balanceseguimientos.push(seg);
              });
              if (findellamadadata.length > 0 && findellamada.length > 0) {
                finllamadafecha = this.date.getDate() + " Año: " + this.listaano;
                chartPrint()
              } else {
                this.alertPage.presentAlert("No existe registros para la busqueda.")
              }
            }
          }
        }
      } else {
        this.alertPage.presentAlert("Error! Seleccione Año.")
      }
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
  }/**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  isAllSelectedGes() {
    if (!this.checkges) {
      this.checkges = true;
    } else {
      this.checkges = false;
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
  addGestor() {
    var valida = true;
    (this.filtrogestor == undefined || this.filtrogestor == null) ? valida = false : null;
    if (valida) {
      this.listagestor.push(this.filtrogestor);
      this.dataSourceGestor = new MatTableDataSource<any>(this.listagestor);
      setTimeout(() => this.dataSourceGestor.paginator = this.paginatorGestor);
    } else {
      this.alertPage.presentAlert("Seleccione Gestor.")
    }
  }
  /**
   * Consulta Estado metodo unico software. 
    * Metodo principal:getEstado();  
    * @return Estado[];
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  deleteGestor(element) {
    const index: number = this.listagestor.indexOf(element);
    this.listagestor.splice(index, 1);
    this.dataSourceGestor = new MatTableDataSource<any>(this.listagestor);
    setTimeout(() => this.dataSourceGestor.paginator = this.paginatorGestor);
  }
}


