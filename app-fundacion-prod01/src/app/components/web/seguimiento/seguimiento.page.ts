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
import { CarteraModal } from '../../model/carteramodal.model';
import { Cartera } from '../../model/cartera.model';
import { Seguimiento } from '../../model/seguimiento.model';
import { Manager } from '../../model/manager.model';
import { DatePage } from '../../util/date.page';
import { Campana } from '../../model/campana.model';
import { Count } from '../../model/count.model';
import { Intermediario } from '../../model/intermediario.model';
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
@Component({
  selector: 'app-seguimiento',
  templateUrl: 'seguimiento.page.html',
  styleUrls: ['seguimiento.page.scss']
})
export class SeguimientoPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceInt: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsCarteraInt: string[] = ['apellidos', 'saldo', 'nrocredito'];
  displayedColumnsCartera: string[] = ['apellidos', 'saldo', 'nrocredito', 'pagare', 'estado', 'intermediario', 'valorcuota', 'creadopor'];
  optionselectintermediario: string = 'close';
  carteras: CarteraModal = new CarteraModal();
  documento: any;
  seguimiento: Seguimiento = new Seguimiento();
  seguimientos: Seguimiento[] = new Array<Seguimiento>();
  managersups: Manager[] = [];
  managerfins: Manager[] = [];
  intermediarios: Intermediario[] = [];
  valida;
  validaliq;
  checkint = false;
  count: Count[] = [];
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  @ViewChild('paginatorInt', { read: MatPaginator }) paginatorInt: MatPaginator;
  constructor(private date: DatePage, private cargador: CargadorService,
    private alertPage: AlertPage,
    private cobroservice: CobroService,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.checkint = false;
      this.validaliq = false;
      this.carteras = new CarteraModal();
      this.carteras.carteralobj = new Cartera();
      this.seguimiento = new Seguimiento();
      this.seguimientos = new Array<Seguimiento>();
      this.dataSource = new MatTableDataSource<any>(this.seguimientos);
      setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
      this.dataSourceInt = new MatTableDataSource<any>(this.carteras.selectcartera);
      setTimeout(() => this.dataSource.paginator = this.paginatorInt);
      this.getTipoCaracterizacion();
      this.getTipoFinal();
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

  getCount() {
    this.count = new Array<Count>();
    this.cobroservice.getAfsFirestore().collection("count").doc('countgarantias').get().then((doc) => {
      var count: any = doc.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      countadd.index = count.index;
      this.count.push(countadd)
    });
  }
  /**
    * Registrar Usuario Intermediario metodo unico registro al software. 
    * Metodo principal:RegisterUsuario(); 
    * @param newUser 
    * @return alertPage;
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  getTipoCaracterizacion() {
    this.managersups = new Array();
    this.cobroservice.getAfsFirestore().collection("tipocaracterizacion").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Manager = JSON.parse(JSON.stringify(doc.data()))
          this.managersups.push(garantia)
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  /**
  * Registrar Usuario Intermediario metodo unico registro al software. 
  * Metodo principal:RegisterUsuario(); 
  * @param newUser 
  * @return alertPage;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getTipoFinal() {
    this.managerfins = new Array();
    this.cobroservice.getAfsFirestore().collection("tipofinal").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Manager = JSON.parse(JSON.stringify(doc.data()))
          this.managerfins.push(garantia)
        });
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
    this.carteras = new CarteraModal();
    this.carteras.carteralobj = new Cartera();
    this.seguimientos = new Array<Seguimiento>();
    this.cargador.getCargador(150)
    if (this.documento) {
      var pase = false;
      if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
        var garantia: Cartera;
        var valorcapital = 0;
        this.cobroservice.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              garantia = new Cartera();
              garantia = JSON.parse(JSON.stringify(doc.data()));
              if (garantia.intermediariodes == null || garantia.intermediariodes == undefined || garantia.intermediariodes == "") {
                garantia.intermediariodes = garantia.intermediario;
              }
              valorcapital = valorcapital + garantia.valorcapital;
              this.carteras.selectcartera.push(JSON.parse(JSON.stringify(doc.data())));
              this.dataSourceInt = new MatTableDataSource<any>(this.carteras.selectcartera);
              setTimeout(() => this.dataSource.paginator = this.paginatorInt);
              pase = true;
              this.valida = pase;
            });
            if (pase) {
              console.log(this.carteras.selectcartera)
              garantia.valorcapital = valorcapital;
              garantia.valorcapitaltext = formatearNumero(garantia.valorcapital);
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              this.carteras.carteralobj = garantia;
              this.carteras.selectcartera.forEach(element => {
                this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                      element.intermediariodes = intermediario.sigla;
                    });
                  });
              });
            } else {
              this.alertPage.presentAlert("Validar Cedula. " + "No existe" + " Identificación de cobranza " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        this.cobroservice.getAfsFirestore().collection("seguimiento").where("documento", "==", parseInt(this.documento)).orderBy("index", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Seguimiento = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.seguimientos.push(garantia)
            });
            if (pase) {
              this.dataSource = new MatTableDataSource<any>(this.seguimientos);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
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
              garantia.valorcapitaltext = formatearNumero(garantia.valorcapital);
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              this.carteras.selectcartera.push(JSON.parse(JSON.stringify(doc.data())));  
              this.dataSourceInt = new MatTableDataSource<any>(this.carteras.selectcartera);
              setTimeout(() => this.dataSource.paginator = this.paginatorInt); 
              pase = true;
              this.valida = pase;
              this.carteras.carteralobj = garantia;
            });
            if (pase) {
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de cobranza " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        this.dataSource = new MatTableDataSource<any>(this.seguimientos);
        setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
        this.cobroservice.getAfsFirestore().collection("seguimiento").where("documento", "==", parseInt(this.documento)).orderBy("index", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Seguimiento = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.seguimientos.push(garantia)
            });
            if (pase) {
              this.dataSource = new MatTableDataSource<any>(this.seguimientos);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      if (this.user.role === 'Cobrador') {
        var validacamp = false;
        this.cobroservice.getAfsFirestore().collection("campana").where("cobrador", "==", this.user.email).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var camp: Campana = JSON.parse(JSON.stringify(doc.data()))
              validacamp = true;
              this.cobroservice.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO").where("intermediario", "==", camp.intermediario)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
                    garantia.valorcapitaltext = formatearNumero(garantia.valorcapital);
                    garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
                    this.carteras.selectcartera.push(JSON.parse(JSON.stringify(doc.data())));
                    this.dataSourceInt = new MatTableDataSource<any>(this.carteras.selectcartera);
                    setTimeout(() => this.dataSource.paginator = this.paginatorInt);
                    pase = true;
                    this.valida = pase;
                    this.carteras.carteralobj = garantia;
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            })
          });
        this.cobroservice.getAfsFirestore().collection("seguimiento").where("documento", "==", parseInt(this.documento)).orderBy("index", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Seguimiento = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.seguimientos.push(garantia)
            });
            if (pase) {
              this.dataSource = new MatTableDataSource<any>(this.seguimientos);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
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
          }
        })

      }
    } else {
      this.documento = 'No a ingresado';
      this.alertPage.presentAlert("Error!. " + "Ingrese" + " nro. Identificación de cobranza " + " creada.")
      this.documento = '';
    }
  }

  isAllSelected() {
    if (!this.checkint) {
      this.checkint = true;
    } else {
      this.checkint = false;
    }
  }
  /**
  * Controlador opción crear tipo comisión
  * Metodo principal:ExcelDateToJSDate();  
  * @return Date;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  liquidar() {
    if (this.valida) {
      if (this.seguimiento.valorpago) {
        if (this.checkint) {
          this.cobroservice.getAfsFirestore().collection('intermediarios').where('nit', '==', this.carteras.carteralobj.intermediario).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var int: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                this.seguimiento.intereses = int.intereses;
                this.seguimiento.gac = int.gac;
              })
              if (this.seguimiento.intereses >= 0) {
                if (this.seguimiento.gac >= 0) {
                  this.validaliq = true;
                  var intereses = parseFloat(this.seguimiento.intereses);
                  var gac = parseFloat(this.seguimiento.gac);
                  this.seguimiento.valorintereses = this.seguimiento.valorpago * ((intereses / 100) * (this.carteras.carteralobj.diasmora / 30));
                  this.seguimiento.valorgac = this.seguimiento.valorpago * ((gac / 100));
                  this.seguimiento.valorapagar = this.seguimiento.valorpago + this.seguimiento.valorintereses + this.seguimiento.valorgac;
                } else {
                  this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " GAC al intermediario. ")
                }
              } else {
                this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " tasa en Mora al intermediario. ")
              }
            });
        } else {
          this.seguimiento.valorapagar = this.seguimiento.valorpago;
          this.validaliq = true;
        }
      } else {
        this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " valor a pagar. ")
      }
    } else {
      this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " nro. Identificación de cobranza. ")
    }
  }
  /**
 * Controlador opción crear tipo comisión
 * Metodo principal:ExcelDateToJSDate();  
 * @return Date;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  guardarSeguimiento() {
    if (this.valida) {
      if (this.seguimiento.seguimiento) {
        if (this.seguimiento.fechacompromiso) {
          if (this.seguimiento.fechaproxima) {
            if (this.seguimiento.caracterizacion) {
              if (this.seguimiento.finllamada) {
                if (this.validaliq) {
                  if (this.checkint) {
                    this.count.forEach(element => {
                      this.seguimiento.index = element.index;
                      element.index = element.index + 1;
                      this.updateCountRc(element.index)

                      this.seguimiento.intermediario = this.carteras.carteralobj.intermediario
                      this.seguimiento.diasmora = this.carteras.carteralobj.diasmora
                      this.seguimiento.documento = this.documento
                      this.seguimiento.nombredeudor = this.carteras.carteralobj.nombredeudor
                      this.seguimiento.celular = this.carteras.carteralobj.celular
                      this.seguimiento.direccion = this.carteras.carteralobj.direccion
                      this.seguimiento.mail = this.carteras.carteralobj.mail
                      this.seguimiento.valorcapital = this.carteras.carteralobj.valorcapital
                      this.seguimiento.creadopor = this.user.email;
                      this.seguimiento.creadoen = this.date.getDate();
                      this.seguimiento.modificadopor = this.user.email;
                      this.seguimiento.modificadoen = this.date.getDate();
                      this.seguimiento.modificacioncausa = "Primer Creación";
                      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                      let autoId = ''
                      for (let i = 0; i < 20; i++) {
                        autoId += CHARS.charAt(
                          Math.floor(Math.random() * CHARS.length)
                        )
                      }
                      this.seguimiento.idcoleccion = autoId
                      this.cobroservice.getAfsFirestore().collection("seguimiento").doc(autoId).set({
                        idcoleccion: this.seguimiento.idcoleccion,
                        index: this.seguimiento.index,
                        intermediario: this.seguimiento.intermediario,
                        documento: this.seguimiento.documento,
                        nombredeudor: this.seguimiento.nombredeudor,
                        celular: this.seguimiento.celular,
                        direccion: this.seguimiento.direccion,
                        mail: this.seguimiento.mail,
                        seguimiento: this.seguimiento.seguimiento,
                        fechacompromiso: this.seguimiento.fechacompromiso,
                        fechaproxima: this.seguimiento.fechaproxima,
                        caracterizacion: this.seguimiento.caracterizacion,
                        finllamada: this.seguimiento.finllamada,
                        diasmora: this.seguimiento.diasmora,
                        valorcapital: this.seguimiento.valorcapital,
                        valorpago: this.seguimiento.valorpago,
                        valorapagar: this.seguimiento.valorapagar,
                        intereses: this.seguimiento.intereses,
                        gac: this.seguimiento.gac,
                        valorgac: this.seguimiento.valorgac,
                        valorintereses: this.seguimiento.valorintereses,
                        creadopor: this.seguimiento.creadopor,
                        creadoen: this.seguimiento.creadoen,
                        modificadoen: this.seguimiento.modificadoen,
                        modificadopor: this.seguimiento.modificadopor,
                        modificacioncausa: this.seguimiento.modificacioncausa,
                        marcatiempo: new Date
                      }).then(() => {
                        this.alertPage.presentAlert("Exito!, Seguimiento creado.").then(() => {
                          location.reload();
                        })
                      })
                    });
                  } else {
                    this.count.forEach(element => {
                      this.seguimiento.index = element.index;
                      element.index = element.index + 1;
                      this.updateCountRc(element.index)
                      this.seguimiento.diasmora = this.carteras.carteralobj.diasmora
                      this.seguimiento.documento = this.documento
                      this.seguimiento.intermediario = this.carteras.carteralobj.intermediario
                      this.seguimiento.nombredeudor = this.carteras.carteralobj.nombredeudor
                      this.seguimiento.celular = this.carteras.carteralobj.celular
                      this.seguimiento.direccion = this.carteras.carteralobj.direccion
                      this.seguimiento.mail = this.carteras.carteralobj.mail
                      this.seguimiento.valorcapital = this.carteras.carteralobj.valorcapital
                      this.seguimiento.creadopor = this.user.email;
                      this.seguimiento.creadoen = this.date.getDate();
                      this.seguimiento.modificadopor = this.user.email;
                      this.seguimiento.modificadoen = this.date.getDate();
                      this.seguimiento.modificacioncausa = "Primer Creación";
                      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                      let autoId = ''
                      for (let i = 0; i < 20; i++) {
                        autoId += CHARS.charAt(
                          Math.floor(Math.random() * CHARS.length)
                        )
                      }
                      this.seguimiento.idcoleccion = autoId
                      this.cobroservice.getAfsFirestore().collection("seguimiento").doc(autoId).set({
                        idcoleccion: this.seguimiento.idcoleccion,
                        index: this.seguimiento.index,
                        intermediario: this.seguimiento.intermediario,
                        documento: this.seguimiento.documento,
                        nombredeudor: this.seguimiento.nombredeudor,
                        celular: this.seguimiento.celular,
                        direccion: this.seguimiento.direccion,
                        mail: this.seguimiento.mail,
                        seguimiento: this.seguimiento.seguimiento,
                        fechacompromiso: this.seguimiento.fechacompromiso,
                        fechaproxima: this.seguimiento.fechaproxima,
                        caracterizacion: this.seguimiento.caracterizacion,
                        finllamada: this.seguimiento.finllamada,
                        diasmora: this.seguimiento.diasmora,
                        valorcapital: this.seguimiento.valorcapital,
                        valorpago: this.seguimiento.valorpago,
                        valorapagar: this.seguimiento.valorapagar,
                        creadopor: this.seguimiento.creadopor,
                        creadoen: this.seguimiento.creadoen,
                        modificadoen: this.seguimiento.modificadoen,
                        modificadopor: this.seguimiento.modificadopor,
                        modificacioncausa: this.seguimiento.modificacioncausa,
                        marcatiempo: new Date
                      }).then(() => {
                        this.alertPage.presentAlert("Exito!, Seguimiento creado.").then(() => {
                          this.ngOnInit();
                        })
                      })
                    });
                  }
                } else {
                  this.count.forEach(element => {
                    this.seguimiento.index = element.index;
                    element.index = element.index + 1;
                    this.updateCountRc(element.index)
                    this.seguimiento.diasmora = this.carteras.carteralobj.diasmora
                    this.seguimiento.documento = this.documento
                    this.seguimiento.intermediario = this.carteras.carteralobj.intermediario
                    this.seguimiento.nombredeudor = this.carteras.carteralobj.nombredeudor
                    this.seguimiento.celular = this.carteras.carteralobj.celular
                    this.seguimiento.direccion = this.carteras.carteralobj.direccion
                    this.seguimiento.mail = this.carteras.carteralobj.mail
                    this.seguimiento.valorcapital = this.carteras.carteralobj.valorcapital
                    this.seguimiento.creadopor = this.user.email;
                    this.seguimiento.creadoen = this.date.getDate();
                    this.seguimiento.modificadopor = this.user.email;
                    this.seguimiento.modificadoen = this.date.getDate();
                    this.seguimiento.modificacioncausa = "Primer Creación";
                    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                    let autoId = ''
                    for (let i = 0; i < 20; i++) {
                      autoId += CHARS.charAt(
                        Math.floor(Math.random() * CHARS.length)
                      )
                    }
                    this.seguimiento.idcoleccion = autoId
                    this.cobroservice.getAfsFirestore().collection("seguimiento").doc(autoId).set({
                      idcoleccion: this.seguimiento.idcoleccion,
                      index: this.seguimiento.index,
                      intermediario: this.seguimiento.intermediario,
                      documento: this.seguimiento.documento,
                      nombredeudor: this.seguimiento.nombredeudor,
                      celular: this.seguimiento.celular,
                      direccion: this.seguimiento.direccion,
                      mail: this.seguimiento.mail,
                      seguimiento: this.seguimiento.seguimiento,
                      fechacompromiso: this.seguimiento.fechacompromiso,
                      fechaproxima: this.seguimiento.fechaproxima,
                      caracterizacion: this.seguimiento.caracterizacion,
                      finllamada: this.seguimiento.finllamada,
                      diasmora: this.seguimiento.diasmora,
                      valorcapital: this.seguimiento.valorcapital,
                      creadopor: this.seguimiento.creadopor,
                      creadoen: this.seguimiento.creadoen,
                      modificadoen: this.seguimiento.modificadoen,
                      modificadopor: this.seguimiento.modificadopor,
                      modificacioncausa: this.seguimiento.modificacioncausa,
                      marcatiempo: new Date
                    }).then(() => {
                      this.alertPage.presentAlert("Exito!, Seguimiento creado.").then(() => {
                        this.ngOnInit();
                      })
                    })
                  })
                }
              } else {
                this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " final de la llamada de cobranza. ")
              }
            } else {
              this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " caracterización de cobranza. ")
            }
          } else {
            this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " fecha de proxima llamada de cobranza. ")
          }
        } else {
          this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " fecha de compromiso de cobranza. ")
        }
      } else {
        this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " seguimiento de cobranza. ")
      }
    } else {
      this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " nro. Identificación de cobranza. ")
    }
  }

  updateCountRc(index) {
    this.cobroservice.getAfsFirestore().collection("count").doc("countgarantias").update({
      index: index
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
    var datepast: Date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate() + 1, hours, minutes, seconds);
    var date = new Date();
    var daypresent = date.getDate();
    var monthpresent = date.getMonth() + 1;
    var yearpresent = date.getFullYear();
    var daypast = datepast.getDate();
    var monthpast = datepast.getMonth() + 1;
    var yearpast = datepast.getFullYear();
    var anos = yearpresent - yearpast;
    var mes;
    var day;
    if (monthpresent == monthpast) {
      mes = 0
    }
    if (monthpresent < monthpast) {
      mes = monthpast - monthpresent
    }
    if (monthpresent > monthpast) {
      mes = monthpresent - monthpast
    }
    if (daypresent == daypast) {
      day = 0
    }
    if (daypresent < daypast) {
      day = daypast - daypresent
    }
    if (daypresent > daypast) {
      day = daypresent - daypast
    }
    var diascouta = (anos * 365) + (mes * 12) + day;

    return diascouta;
  }


}





