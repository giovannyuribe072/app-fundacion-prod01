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
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/components/model/user.model';
import { AlertPage } from 'src/app/components/alert/alert.page';
import { AuthService } from 'src/app/components/services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { CarteraService } from '../../services/cartera.service';
import { CarteraModal } from '../../model/carteramodal.model';
import { Cartera } from '../../model/cartera.model';
import { AplicarPagos } from '../../model/aplicarpago.model';
import { Seguimiento } from '../../model/seguimiento.model';
import { DatePage } from '../../util/date.page';
import { ModalController } from '@ionic/angular';
import { Count } from '../../model/count.model';
import { Intermediario } from '../../model/intermediario.model';

@Component({
  selector: 'app-aplicarpagos',
  templateUrl: 'aplicarpagos.page.html',
  styleUrls: ['aplicarpagos.page.scss']
})
export class AplicarPagosPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  carteras: CarteraModal = new CarteraModal();
  carteralobj: Cartera = new Cartera();
  documento: any;
  valida;
  checkint = false;
  checkcobertura = false;
  checkntc = false;
  aplicarpago: AplicarPagos = new AplicarPagos();
  count: Count[] = [];
  usercobrador: any[] = [];
  constructor(private date: DatePage, private cargador: CargadorService,
    private alertPage: AlertPage,
    private aplicarPagoService: CarteraService,
    private auth: AuthService, private modalController: ModalController) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
     
    
    this.auth.loginUser(this.user).then(res => {
      this.checkint = false;
      this.checkcobertura = false;
      this.checkntc = false;
      this.carteras = new CarteraModal();
      this.aplicarpago = new AplicarPagos();
      this.carteras.carteralobj = new Cartera();
      this.getCount();
      this.getUsersCobrador()
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
    this.aplicarPagoService.getAfsFirestore().collection("count").doc('countgarantias').get().then((doc) => {
      var count: any = doc.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      countadd.index = count.index;
      this.count.push(countadd)
    });
  }


  getUsersCobrador() {
    this.usercobrador = new Array<any>();
    this.aplicarPagoService.getAfsFirestore().collection("users").get().then((doc) => {
      doc.forEach(element => {
        var count: any = element.data();
        if (count.role == "Cobrador"||count.role == "Coordinador") {
          this.usercobrador.push(count);
        }
      });
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

  isAllSelectedCob() {
    if (!this.checkcobertura) {
      this.checkcobertura = true;
    } else {
      this.checkcobertura = false;
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

  isAllSelectedNtc() {
    if (!this.checkntc) {
      this.checkntc = true;
    } else {
      this.checkntc = false;
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
  openConsultar() {
    this.carteras = new CarteraModal();
    this.carteras.carteralobj = new Cartera();
    this.cargador.getCargador(150)
    if (this.documento) {
      var pase = false;
      if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
        this.aplicarPagoService.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              pase = true;
              this.valida = pase;
              this.carteras.carteralobj = garantia;
            });
            if (pase) {
              this.aplicarPagoService.getAfsFirestore().collection("seguimiento").where("documento", "==", parseInt(this.documento)).orderBy("index")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var seg: Seguimiento = JSON.parse(JSON.stringify(doc.data()))
                    this.aplicarpago.valorpago = seg.valorpago;
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de Cobranza " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

      }
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        this.aplicarPagoService.getAfsFirestore().collection("cartera").where("ceduladeudor", "==", parseInt(this.documento)).where("estado", "==", "CARGADO").where("intermediario", "==", this.user.maestro)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              pase = true;
              this.valida = pase;
              this.carteras.carteralobj = garantia;
            });
            if (pase) {
              this.aplicarPagoService.getAfsFirestore().collection("seguimiento").where("documento", "==", parseInt(this.documento)).orderBy("index")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var seg: Seguimiento = JSON.parse(JSON.stringify(doc.data()))
                    pase = true;
                    this.aplicarpago.valorpago = seg.valorpago;
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de Cobranza " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    } else {
      this.documento = 'No a ingresado';
      this.alertPage.presentAlert("Error!. " + "Ingrese" + " nro. Identificación de cobranza " + " creada.")
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
  openConsultarPagare() {
    this.cargador.getCargador(150)
    if (this.carteras.carteralobj.nropagare) {
      var pase = false;
      if (this.user.role === 'Super Maestro' || this.user.role === 'Coordinador') {
        this.aplicarPagoService.getAfsFirestore().collection("cartera").where("nropagare", "==", parseInt(this.carteras.carteralobj.nropagare))
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.valida = pase;
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              this.carteras.carteralobj = garantia;
              this.documento = garantia.ceduladeudor;
            });
            if (pase) {
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. pagare de Cobranza " + this.carteras.carteralobj.nropagare + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

      }
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        this.aplicarPagoService.getAfsFirestore().collection("cartera").where("nropagare", "==", parseInt(this.carteras.carteralobj.nropagare)).where("intermediario", "==", this.user.maestro)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Cartera = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.valida = pase;
              garantia.diasmora = this.ExcelDateToJSDate(garantia.fechavencimientoserial);
              this.carteras.carteralobj = garantia;
              this.documento = garantia.ceduladeudor;
            });
            if (pase) {
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. pagare de Cobranza " + this.carteras.carteralobj.nropagare + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    } else {
      this.alertPage.presentAlert("Error!. " + "Ingrese" + " nro. pagare de cobranza " + " .")
    }
  }

  isAllSelected() {
    if (!this.checkint) {
      this.checkint = true;
    } else {
      this.checkint = false;
    }
  }

  aplicarPagos() {
    if (this.valida) {
      if(this.carteras.carteralobj.cobrador){
      if (this.aplicarpago.valorpago) {
        if (this.carteras.carteralobj.nropagare) {
          var validapagare = false;
          this.aplicarPagoService.getAfsFirestore().collection("cartera").where("nropagare", "==", parseInt(this.carteras.carteralobj.nropagare)).where("ceduladeudor", "==", parseInt(this.carteras.carteralobj.ceduladeudor))
            .get().then((querySnapshot) => {
              querySnapshot.forEach(element => {
                var cart: Cartera = JSON.parse(JSON.stringify(element.data()))
                this.carteralobj = cart;
                validapagare = true;
              });
              if (validapagare) {
                if (parseInt(this.carteras.carteralobj.valorcapital) >= parseInt(this.aplicarpago.valorpago)) {
                  this.aplicarpago.cobrador = this.carteras.carteralobj.cobrador;
                  if (this.checkint) {
                    this.aplicarPagoService.getAfsFirestore().collection('intermediarios').where('nit', '==', this.carteras.carteralobj.intermediario).get()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          var int: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                          this.aplicarpago.intereses = int.intereses;
                          this.aplicarpago.gac = int.gac;
                        })
                        if (this.aplicarpago.intereses >= 0) {
                          if (this.aplicarpago.gac >= 0) {
                            var intereses = parseFloat(this.aplicarpago.intereses);
                            var gac = parseFloat(this.aplicarpago.gac);
                            this.aplicarpago.valorintereses = this.aplicarpago.valorpago * ((intereses / 100) * (this.carteras.carteralobj.diasmora / 30));
                            this.aplicarpago.valorgac = this.aplicarpago.valorpago * ((gac / 100));
                            this.aplicarpago.valorapagar = this.aplicarpago.valorpago + this.aplicarpago.valorintereses + this.aplicarpago.valorgac;
                            localStorage.setItem('valorcapital', this.carteras.carteralobj.valorcapital);
                            localStorage.setItem('valorpago', this.aplicarpago.valorpago);
                            localStorage.setItem('intereses', intereses.toString());
                            localStorage.setItem('gac', gac.toString());
                            localStorage.setItem('valorintereses', this.aplicarpago.valorintereses);
                            localStorage.setItem('valorgac', this.aplicarpago.valorgac);
                            localStorage.setItem('valorapagar', this.aplicarpago.valorapagar);
                            localStorage.setItem('tipopago', "checkint");
                            this.openConfirmarModal(this.aplicarpago)

                          } else {
                            this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " GAC al intermediario. ")
                          }
                        } else {
                          this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " tasa en Mora al intermediario. ")
                        }
                      });
                  } else {
                    localStorage.setItem('valorcapital', this.carteras.carteralobj.valorcapital);
                    localStorage.setItem('valorpago', this.aplicarpago.valorpago);
                    localStorage.setItem('tipopago', "basic");
                    this.openConfirmarModal(this.aplicarpago)
                  }
                } else {
                  this.alertPage.presentAlert("Error!. " + "Valor capital es menor que valor de pago" + ".")
                }
              } else {
                this.alertPage.presentAlert("Error!. " + "Pagare no coincide con identificación de cobranza" + ".")
              }
            })
        } else {
          this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " nro. Pagare de cobranza. ")
        }
      } else {
        this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " valor pago de cobranza. ")
      }
      } else {
        this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " el cobrador. ")
      }
    } else {
      this.alertPage.presentAlert("Por Favor. " + "Ingrese" + " nro. Identificación o pagare de cobranza.")
    }
  }
  async openConfirmarModal(element) {

    const modal = await this.modalController.create({
      component: ModalAplicarPagosPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          var tipopago = localStorage.getItem('tipopago');
          if (tipopago == 'basic') {
            if (this.checkcobertura) {
              if (!this.checkntc) {
                this.count.forEach(element => {
                  var intermediario: Intermediario;
                  this.aplicarpago.rc = "RC-" + element.index
                  this.aplicarpago.rcid = element.index;
                  this.aplicarpago.intermediario = this.carteras.carteralobj.intermediario
                  this.aplicarpago.nropagare = this.carteras.carteralobj.nropagare
                  this.aplicarpago.nombredeudor = this.carteras.carteralobj.nombredeudor
                  this.aplicarpago.valorcapital = this.carteras.carteralobj.valorcapital
                  this.aplicarpago.saldocapital = parseInt(this.aplicarpago.valorcapital) - parseInt(this.aplicarpago.valorpago)
                  this.aplicarpago.documento = this.documento
                  this.aplicarpago.creadopor = this.user.email;
                  this.aplicarpago.creadoen = this.date.getDate();
                  this.aplicarpago.modificadopor = this.user.email;
                  this.aplicarpago.modificadoen = this.date.getDate();
                  this.aplicarpago.modificacioncausa = "Primer Creación";
                  this.aplicarPagoService.getAfsFirestore().collection("intermediarios").where("nit", "==", this.carteras.carteralobj.intermediario).get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        intermediario = JSON.parse(JSON.stringify(doc.data()))
                      });
                      intermediario.coberturacreditomora = intermediario.coberturacreditomora + this.aplicarpago.valorpago
                      this.aplicarPagoService.getAfsFirestore().collection("intermediarios").doc(intermediario.email).update({
                        coberturacreditomora: intermediario.coberturacreditomora,
                        modificadoen: this.date.getDate()
                      })
                    });
                  element.index = element.index + 1;
                  this.updateCountRc(element.index)
                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let autoId = ''
                  for (let i = 0; i < 20; i++) {
                    autoId += CHARS.charAt(
                      Math.floor(Math.random() * CHARS.length)
                    )
                  }
                  this.aplicarpago.idcoleccion = autoId
                  this.aplicarPagoService.getAfsFirestore().collection("aplicarpago").doc(autoId).set({
                    idcoleccion: this.aplicarpago.idcoleccion,
                    intermediario: this.aplicarpago.intermediario,
                    documento: this.aplicarpago.documento,
                    nombredeudor: this.aplicarpago.nombredeudor,
                    valorpago: this.aplicarpago.valorpago,
                    valorcapital: this.aplicarpago.valorcapital,
                    saldocapital: this.aplicarpago.saldocapital,
                    rc: this.aplicarpago.rc,
                    nropagare: this.aplicarpago.nropagare,
                    rcid: this.aplicarpago.rcid,
                    cobertura: this.checkcobertura,
                    creadopor: this.aplicarpago.creadopor,
                    creadoen: this.aplicarpago.creadoen,
                    modificadoen: this.aplicarpago.modificadoen,
                    modificadopor: this.aplicarpago.modificadopor,
                    modificacioncausa: this.aplicarpago.modificacioncausa,
                    marcatiempo: new Date,
                    cobrador:this.aplicarpago.cobrador
                  }).then(() => {
                    this.updateCartera(this.carteralobj, this.aplicarpago.saldocapital)
                    this.alertPage.presentAlert("Exito!, Pago creado.").then(() => {
                      location.reload();
                    })
                  })
                });
              } else {
                this.alertPage.presentAlert("Error!, No se puede sumar a la cobertura una nota crédito.").then(() => {
                })
              }
            } else {
              if (!this.checkntc) {
                this.count.forEach(element => {
                  this.aplicarpago.rc = "RC-" + element.index
                  this.aplicarpago.rcid = element.index;
                  this.aplicarpago.intermediario = this.carteras.carteralobj.intermediario
                  this.aplicarpago.nropagare = this.carteras.carteralobj.nropagare
                  this.aplicarpago.nombredeudor = this.carteras.carteralobj.nombredeudor
                  this.aplicarpago.valorcapital = this.carteras.carteralobj.valorcapital
                  this.aplicarpago.saldocapital = parseInt(this.aplicarpago.valorcapital) - parseInt(this.aplicarpago.valorpago)
                  this.aplicarpago.documento = this.documento
                  this.aplicarpago.creadopor = this.user.email;
                  this.aplicarpago.creadoen = this.date.getDate();
                  this.aplicarpago.modificadopor = this.user.email;
                  this.aplicarpago.modificadoen = this.date.getDate();
                  this.aplicarpago.modificacioncausa = "Primer Creación";
                  element.index = element.index + 1;
                  this.updateCountRc(element.index)
                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let autoId = ''
                  for (let i = 0; i < 20; i++) {
                    autoId += CHARS.charAt(
                      Math.floor(Math.random() * CHARS.length)
                    )
                  }
                  this.aplicarpago.idcoleccion = autoId
                  this.aplicarPagoService.getAfsFirestore().collection("aplicarpago").doc(autoId).set({
                    idcoleccion: this.aplicarpago.idcoleccion,
                    intermediario: this.aplicarpago.intermediario,
                    documento: this.aplicarpago.documento,
                    nombredeudor: this.aplicarpago.nombredeudor,
                    valorpago: this.aplicarpago.valorpago,
                    valorcapital: this.aplicarpago.valorcapital,
                    saldocapital: this.aplicarpago.saldocapital,
                    rc: this.aplicarpago.rc,
                    nropagare: this.aplicarpago.nropagare,
                    rcid: this.aplicarpago.rcid,
                    cobertura: this.checkcobertura,
                    creadopor: this.aplicarpago.creadopor,
                    creadoen: this.aplicarpago.creadoen,
                    modificadoen: this.aplicarpago.modificadoen,
                    modificadopor: this.aplicarpago.modificadopor,
                    modificacioncausa: this.aplicarpago.modificacioncausa,
                    marcatiempo: new Date,
                    cobrador:this.aplicarpago.cobrador
                  }).then(() => {
                    this.updateCartera(this.carteralobj, this.aplicarpago.saldocapital)
                    this.alertPage.presentAlert("Exito!, Pago creado.").then(() => {
                      this.ngOnInit();
                    })
                  })
                });
              } else {
                this.count.forEach(element => {
                  this.aplicarpago.rc = "NTC-" + element.index
                  this.aplicarpago.rcid = element.index;
                  this.aplicarpago.intermediario = this.carteras.carteralobj.intermediario
                  this.aplicarpago.nropagare = this.carteras.carteralobj.nropagare
                  this.aplicarpago.nombredeudor = this.carteras.carteralobj.nombredeudor
                  this.aplicarpago.valorcapital = this.carteras.carteralobj.valorcapital
                  this.aplicarpago.saldocapital = parseInt(this.aplicarpago.valorcapital) - parseInt(this.aplicarpago.valorpago)
                  this.aplicarpago.documento = this.documento
                  this.aplicarpago.creadopor = this.user.email;
                  this.aplicarpago.creadoen = this.date.getDate();
                  this.aplicarpago.modificadopor = this.user.email;
                  this.aplicarpago.modificadoen = this.date.getDate();
                  this.aplicarpago.modificacioncausa = "Primer Creación";
                  element.index = element.index + 1;
                  this.updateCountRc(element.index)
                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let autoId = ''
                  for (let i = 0; i < 20; i++) {
                    autoId += CHARS.charAt(
                      Math.floor(Math.random() * CHARS.length)
                    )
                  }
                  this.aplicarpago.idcoleccion = autoId
                  this.aplicarPagoService.getAfsFirestore().collection("aplicarpago").doc(autoId).set({
                    idcoleccion: this.aplicarpago.idcoleccion,
                    intermediario: this.aplicarpago.intermediario,
                    documento: this.aplicarpago.documento,
                    nombredeudor: this.aplicarpago.nombredeudor,
                    valorpago: this.aplicarpago.valorpago,
                    valorcapital: this.aplicarpago.valorcapital,
                    saldocapital: this.aplicarpago.saldocapital,
                    nropagare: this.aplicarpago.nropagare,
                    observacion: this.aplicarpago.observacion,
                    rc: this.aplicarpago.rc,
                    rcid: this.aplicarpago.rcid,
                    cobertura: this.checkcobertura,
                    creadopor: this.aplicarpago.creadopor,
                    creadoen: this.aplicarpago.creadoen,
                    modificadoen: this.aplicarpago.modificadoen,
                    modificadopor: this.aplicarpago.modificadopor,
                    modificacioncausa: this.aplicarpago.modificacioncausa,
                    marcatiempo: new Date,
                    cobrador:this.aplicarpago.cobrador
                  }).then(() => {
                    this.updateCartera(this.carteralobj, this.aplicarpago.saldocapital)
                    this.alertPage.presentAlert("Exito!, Pago creado.").then(() => {
                      location.reload();
                    })
                  })
                });
              }

            }

          }
          if (tipopago == 'checkint') {
            if (this.checkcobertura) {
              if (!this.checkntc) {

                this.count.forEach(element => {
                  var intermediario: Intermediario;
                  this.aplicarpago.rc = "RC-" + element.index
                  this.aplicarpago.rcid = element.index;
                  this.aplicarpago.intermediario = this.carteras.carteralobj.intermediario
                  this.aplicarpago.diasmora = this.carteras.carteralobj.diasmora
                  this.aplicarpago.nropagare = this.carteras.carteralobj.nropagare
                  this.aplicarpago.nombredeudor = this.carteras.carteralobj.nombredeudor
                  this.aplicarpago.valorcapital = this.carteras.carteralobj.valorcapital
                  this.aplicarpago.saldocapital = parseInt(this.aplicarpago.valorcapital) - parseInt(this.aplicarpago.valorpago)
                  this.aplicarpago.documento = this.documento
                  this.aplicarpago.creadopor = this.user.email;
                  this.aplicarpago.creadoen = this.date.getDate();
                  this.aplicarpago.modificadopor = this.user.email;
                  this.aplicarpago.modificadoen = this.date.getDate();
                  this.aplicarpago.modificacioncausa = "Primer Creación";
                  element.index = element.index + 1;
                  this.updateCountRc(element.index)
                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let autoId = ''
                  for (let i = 0; i < 20; i++) {
                    autoId += CHARS.charAt(
                      Math.floor(Math.random() * CHARS.length)
                    )
                  }
                  this.aplicarpago.idcoleccion = autoId
                  this.aplicarPagoService.getAfsFirestore().collection("intermediarios").where("nit", "==", this.carteras.carteralobj.intermediario).get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        intermediario = JSON.parse(JSON.stringify(doc.data()))
                      });
                      intermediario.coberturacreditomora = intermediario.coberturacreditomora + this.aplicarpago.valorpago
                      this.aplicarPagoService.getAfsFirestore().collection("intermediarios").doc(intermediario.email).update({
                        coberturacreditomora: intermediario.coberturacreditomora,
                        modificadoen: this.date.getDate()
                      })
                    });
                  this.aplicarPagoService.getAfsFirestore().collection("aplicarpago").doc(autoId).set({
                    idcoleccion: this.aplicarpago.idcoleccion,
                    intermediario: this.aplicarpago.intermediario,
                    documento: this.aplicarpago.documento,
                    nombredeudor: this.aplicarpago.nombredeudor,
                    valorpago: this.aplicarpago.valorpago,
                    valorcapital: this.aplicarpago.valorcapital,
                    saldocapital: this.aplicarpago.saldocapital,
                    nropagare: this.aplicarpago.nropagare,
                    rc: this.aplicarpago.rc,
                    gac: this.aplicarpago.gac,
                    intereses: this.aplicarpago.intereses,
                    valorgac: this.aplicarpago.valorgac,
                    valorintereses: this.aplicarpago.valorintereses,
                    diasmora: this.aplicarpago.diasmora,
                    valorapagar: this.aplicarpago.valorapagar,
                    rcid: this.aplicarpago.rcid,
                    cobertura: this.checkcobertura,
                    creadopor: this.aplicarpago.creadopor,
                    creadoen: this.aplicarpago.creadoen,
                    modificadoen: this.aplicarpago.modificadoen,
                    modificadopor: this.aplicarpago.modificadopor,
                    modificacioncausa: this.aplicarpago.modificacioncausa,
                    marcatiempo: new Date,
                    cobrador:this.aplicarpago.cobrador
                  }).then(() => {
                    this.updateCartera(this.carteralobj, this.aplicarpago.saldocapital)
                    this.alertPage.presentAlert("Exito!, Pago creado.").then(() => {
                      location.reload();
                    })
                  })
                });
              } else {
                this.alertPage.presentAlert("Error!, No se puede sumar a la cobertura una nota crédito.").then(() => {
                })
              }
            } else {
              if (!this.checkntc) {
                this.count.forEach(element => {
                  this.aplicarpago.rc = "RC-" + element.index
                  this.aplicarpago.rcid = element.index;
                  this.aplicarpago.intermediario = this.carteras.carteralobj.intermediario
                  this.aplicarpago.diasmora = this.carteras.carteralobj.diasmora
                  this.aplicarpago.nropagare = this.carteras.carteralobj.nropagare
                  this.aplicarpago.nombredeudor = this.carteras.carteralobj.nombredeudor
                  this.aplicarpago.valorcapital = this.carteras.carteralobj.valorcapital
                  this.aplicarpago.saldocapital = parseInt(this.aplicarpago.valorcapital) - parseInt(this.aplicarpago.valorpago)
                  this.aplicarpago.documento = this.documento
                  this.aplicarpago.creadopor = this.user.email;
                  this.aplicarpago.creadoen = this.date.getDate();
                  this.aplicarpago.modificadopor = this.user.email;
                  this.aplicarpago.modificadoen = this.date.getDate();
                  this.aplicarpago.modificacioncausa = "Primer Creación";
                  element.index = element.index + 1;
                  this.updateCountRc(element.index)
                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let autoId = ''
                  for (let i = 0; i < 20; i++) {
                    autoId += CHARS.charAt(
                      Math.floor(Math.random() * CHARS.length)
                    )
                  }
                  this.aplicarpago.idcoleccion = autoId
                  this.aplicarPagoService.getAfsFirestore().collection("aplicarpago").doc(autoId).set({
                    idcoleccion: this.aplicarpago.idcoleccion,
                    intermediario: this.aplicarpago.intermediario,
                    documento: this.aplicarpago.documento,
                    nombredeudor: this.aplicarpago.nombredeudor,
                    valorpago: this.aplicarpago.valorpago,
                    valorcapital: this.aplicarpago.valorcapital,
                    saldocapital: this.aplicarpago.saldocapital,
                    nropagare: this.aplicarpago.nropagare,
                    rc: this.aplicarpago.rc,
                    gac: this.aplicarpago.gac,
                    intereses: this.aplicarpago.intereses,
                    valorgac: this.aplicarpago.valorgac,
                    valorintereses: this.aplicarpago.valorintereses,
                    diasmora: this.aplicarpago.diasmora,
                    valorapagar: this.aplicarpago.valorapagar,
                    rcid: this.aplicarpago.rcid,
                    cobertura: this.checkcobertura,
                    creadopor: this.aplicarpago.creadopor,
                    creadoen: this.aplicarpago.creadoen,
                    modificadoen: this.aplicarpago.modificadoen,
                    modificadopor: this.aplicarpago.modificadopor,
                    modificacioncausa: this.aplicarpago.modificacioncausa,
                    marcatiempo: new Date,
                    cobrador:this.aplicarpago.cobrador
                  }).then(() => {
                    this.updateCartera(this.carteralobj, this.aplicarpago.saldocapital)
                    this.alertPage.presentAlert("Exito!, Pago creado.").then(() => {
                      location.reload();
                    })
                  })
                });
              } else {
                this.alertPage.presentAlert("Error!, No se puede aplicar intereses a una nota crédito.").then(() => {
                })
              }

            }

          }
        }
      });
    return await modal.present();

  }
  updateCountRc(index) {
    this.aplicarPagoService.getAfsFirestore().collection("count").doc("countgarantias").update({
      index: index
    })
  }

  updateCartera(index: Cartera, saldo) {
    this.aplicarPagoService.getAfsFirestore().collection("cartera").doc(index.idcoleccion).update({
      valorcapital: saldo
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
/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'aplicarpagosmodalconfirmar.page.html',
  styleUrls: ['aplicarpagos.page.scss']
})
export class ModalAplicarPagosPage {

  confirmacion: string = 'cancelar';
  valorcapital = localStorage.getItem('valorcapital');
  valorpago = localStorage.getItem('valorpago');
  tipopago = localStorage.getItem('tipopago');
  gac = localStorage.getItem('gac');
  intereses = localStorage.getItem('intereses');
  valorintereses = localStorage.getItem('valorintereses');
  valorgac = localStorage.getItem('valorgac');
  valorapagar = localStorage.getItem('valorapagar');
  saldocapital;

  constructor(private modalController: ModalController) {
    this.saldocapital = parseFloat(this.valorcapital) - parseFloat(this.valorpago);
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
}