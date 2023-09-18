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
import { Garantias } from 'src/app/components/model/garantias.model';
import { CountFiles } from 'src/app/components/model/count.model';
import { ModalController } from '@ionic/angular';
import { GarantiasModal } from 'src/app/components/model/garantiasmodal.model';
import { GarantiasTotal } from 'src/app/components/model/garantiastotal.model';
import { AuthService } from 'src/app/components/services/auth.service';
import { CargadorService } from '../../services/cargador.services';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { DatePage } from '../../util/date.page';
import { Contact } from '../../model/contact.model';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { Intermediario } from '../../model/intermediario.model';
import { TipoLinea } from '../../model/tipolinea.model';
import { Correo } from '../../model/correo.model';
import { CobroService } from '../../services/cobro.service';

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'cobrogarantias-page',
  templateUrl: 'cobrogarantiasmodalaprobar.page.html',
  styleUrls: ['cobrogarantias.page.scss']
})
export class ModalPage {
  cobro;
  contact: Contact = new Contact();
  count: CountFiles[] = [];
  confirmacion: string = 'cancelar';
  garantiastotal: GarantiasTotal = new GarantiasTotal();
  displayedColumnsDocs: string[] = ['nameDoc', 'nameFile', 'delete'];
  dataSourceFiles: MatTableDataSource<any> = new MatTableDataSource();
  uploadfiles: UploadFilesIntermediario[] = [] = new Array<UploadFilesIntermediario>();
  @ViewChild('paginatorFiles', { read: MatPaginator }) paginatorFiles: MatPaginator;
  tiposlineas: TipoLinea[];
  tipopago;
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  correoinfo: Correo = new Correo();
  constructor(private auth: AuthService, private correo: ServidorCorreoService, private alert: AlertPage, private date: DatePage, private modalController: ModalController, private cobroservice: CobroService) { 
      
    
    this.auth.loginUser(this.user).then(res => {
      this.getCount()
      this.getTiposLineas();
    }, error => {
      if (error.status == 304) {

      } else if (error.status == 400) { 
      } else if (error.status == 401) {

      } else { 
      }
    });
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
    this.cobroservice.getCount().doc('countfiles').get().subscribe((events) => {
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
    this.readThis($event.target, string, JSON.parse(sessionStorage.getItem('garantia')));

  }
  /**
  *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string, garantias: Garantias): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => { 
      this.count.forEach(element => {
        this.cobroservice.updateCountFiles(element.countfiles + 1);
        let uploadfile = new UploadFilesIntermediario();
        uploadfile.nit = garantias.idgarantiaregistro
        uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
        uploadfile.fileToUpload = file;
        uploadfile.tipfile = string;
        uploadfile.fecha = this.date.getDate();
        this.getCount();
        this.uploadfiles.push(uploadfile);
        this.dataSourceFiles = new MatTableDataSource<any>(this.uploadfiles);
        setTimeout(() => this.dataSourceFiles.paginator = this.paginatorFiles);
      });
    }
    myReader.readAsDataURL(file);
  }

  /**
 *  Elimina archivo leido metodo unico software. 
  * Metodo principal:deleteDoc();  
  * @return UploadFilesIntermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteDoc(tipfile) {
    this.uploadfiles.forEach(element => {
      if (element.tipfile == tipfile) {
        const index: number = this.uploadfiles.indexOf(element);
        this.uploadfiles.splice(index, 1);
      }
    });
  }

  /**
*  Elimina archivo leido metodo unico software. 
 * Metodo principal:deleteDoc();  
 * @return UploadFilesIntermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  loadDoc() {
    if (this.tipopago == '02') {
      var garantia: Garantias = JSON.parse(sessionStorage.getItem('garantia'))
      var intermediario: Intermediario;
      this.cobroservice.getIntermediarios().get().subscribe((event) => {
        event.query.where("nit", "==", garantia.intermediario).get().then((events) => {
          events.forEach(element => {
            intermediario = JSON.parse(JSON.stringify(element.data()))
          })
        }).then(() => {
          if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
            if (intermediario.coberturacreditomora > parseFloat(this.cobro)) {
              if (parseFloat(garantia.saldo) > parseFloat(this.cobro)) {
                garantia.saldocobrado = this.cobro;
                garantia.saldorestante = (parseFloat(garantia.saldo) - this.cobro).toString();
                if (garantia.pagarefile == "" || garantia.pagarefile == undefined) {
                  garantia.pagarefile = ""
                }
                if (garantia.cartainstruccion == "" || garantia.cartainstruccion == undefined) {
                  garantia.cartainstruccion = ""
                }
                if (garantia.liquidacioncredito == "" || garantia.liquidacioncredito == undefined) {
                  garantia.liquidacioncredito = ""
                }
                if (garantia.cedulaciudadania == "" || garantia.cedulaciudadania == undefined) {
                  garantia.cedulaciudadania = ""
                }
                if (garantia.anexoservicio == "" || garantia.anexoservicio == undefined) {
                  garantia.anexoservicio = ""
                }
                if (garantia.certificacionriesgo == "" || garantia.certificacionriesgo == undefined) {
                  garantia.certificacionriesgo = ""
                }
                if (this.uploadfiles.length > 0) {
                  let countfile = 0;
                  const start = performance.now();
                  new Promise((resolve, reject) => {
                    this.uploadfiles.forEach(element => {
                      countfile++;
                      if (element.tipfile === 'pagare') {
                        garantia.pagarefile = element.nombrefile
                      }
                      if (element.tipfile === 'cartainstruccion') {
                        garantia.cartainstruccion = element.nombrefile
                      }
                      if (element.tipfile === 'liquidacioncredito') {
                        garantia.liquidacioncredito = element.nombrefile
                      }
                      if (element.tipfile === 'anexoservicio') {
                        garantia.anexoservicio = element.nombrefile
                      }
                      if (element.tipfile === 'certificacionriesgo') {
                        garantia.certificacionriesgo = element.nombrefile
                      }
                      if (element.tipfile === 'cedulaciudadania') {
                        garantia.cedulaciudadania = element.nombrefile
                      }
                      garantia.estado = "EN TRAMITE"
                      this.cobroservice.referenciaCloudStorage(garantia.idgarantiaregistro + element.nombrefile);
                      this.cobroservice.tareaCloudStorage(garantia.idgarantiaregistro + element.nombrefile, element.fileToUpload);
                      this.cobroservice.updateFiles(element)
                    });
                    if (countfile == this.uploadfiles.length) {
                      const end = performance.now();
                      const duration = end - start;
                      resolve({ duration });
                    }
                   }).then(()=>{
                    this.cobroservice.RegisterNotificacionEstadoCobroGarantia(garantia, this.user)
                    this.cobroservice.updateGarantia(garantia)
                    this.alert.presentAlert("Exito. Pronto te contactaremos.").then(() => {
                      this.cobroservice.getContactSendAdm().get().subscribe((event) => {
                        event.forEach(element => {
                          var any: any = element.data()
                          this.correoinfo.ema = any.email;
                          this.correoinfo.des = any.contact + 'id:' + garantia.identificacion + '. Estado: ' + garantia.estado
                          this.correoinfo.ent = garantia.intermediario;
                          this.correoinfo.nom = any.nom;
                          this.correoinfo.ciu = any.ciu;
                          this.contactSend()
                        });
                      })
                    })
                    this.dismiss("LoadDocs")
                   }) 
                } else {
                  this.alert.presentAlert("Error, inserte documentos")
                }
              } else {
                this.alert.presentAlert("Error, Valor Desembolsado menor al valor cobrado.")
              }
            } else {
              this.alert.presentAlert("Error, Saldo de cobertura insuficiente.")
            }
          }
          if (this.user.role === 'Super Maestro') {
            if (intermediario.coberturacreditomora > parseFloat(this.cobro)) {
              garantia.saldocobrado = this.cobro;
              garantia.saldorestante = (parseFloat(garantia.saldo) - this.cobro).toString();
              if (garantia.pagarefile == "" || garantia.pagarefile == undefined) {
                garantia.pagarefile = ""
              }
              if (garantia.cartainstruccion == "" || garantia.cartainstruccion == undefined) {
                garantia.cartainstruccion = ""
              }
              if (garantia.liquidacioncredito == "" || garantia.liquidacioncredito == undefined) {
                garantia.liquidacioncredito = ""
              }
              if (garantia.cedulaciudadania == "" || garantia.cedulaciudadania == undefined) {
                garantia.cedulaciudadania = ""
              }
              if (garantia.anexoservicio == "" || garantia.anexoservicio == undefined) {
                garantia.anexoservicio = ""
              }
              if (garantia.certificacionriesgo == "" || garantia.certificacionriesgo == undefined) {
                garantia.certificacionriesgo = ""
              }
              if (this.uploadfiles.length > 0) {
                  let countfile = 0;
                  const start = performance.now();
                  new Promise((resolve, reject) => {
                    this.uploadfiles.forEach(element => {
                      countfile++;
                      if (element.tipfile === 'pagare') {
                        garantia.pagarefile = element.nombrefile
                      }
                      if (element.tipfile === 'cartainstruccion') {
                        garantia.cartainstruccion = element.nombrefile
                      }
                      if (element.tipfile === 'liquidacioncredito') {
                        garantia.liquidacioncredito = element.nombrefile
                      }
                      if (element.tipfile === 'anexoservicio') {
                        garantia.anexoservicio = element.nombrefile
                      }
                      if (element.tipfile === 'certificacionriesgo') {
                        garantia.certificacionriesgo = element.nombrefile
                      }
                      if (element.tipfile === 'cedulaciudadania') {
                        garantia.cedulaciudadania = element.nombrefile
                      }
                      garantia.estado = "EN TRAMITE"
                      this.cobroservice.referenciaCloudStorage(garantia.idgarantiaregistro + element.nombrefile);
                      this.cobroservice.tareaCloudStorage(garantia.idgarantiaregistro + element.nombrefile, element.fileToUpload);
                      this.cobroservice.updateFiles(element)
                    });
                    if (countfile == this.uploadfiles.length) {
                      const end = performance.now();
                      const duration = end - start;
                      resolve({ duration });
                    }
                   }).then(()=>{
                    this.cobroservice.RegisterNotificacionEstadoCobroGarantia(garantia, this.user)
                    this.cobroservice.updateGarantia(garantia)
                    this.alert.presentAlert("Exito. Pronto te contactaremos.").then(() => {
                      this.cobroservice.getContactSendAdm().get().subscribe((event) => {
                        event.forEach(element => {
                          var any: any = element.data()
                          this.correoinfo.ema = any.email;
                          this.correoinfo.des = any.contact + 'id:' + garantia.identificacion + '. Estado: ' + garantia.estado
                          this.correoinfo.ent = garantia.intermediario;
                          this.correoinfo.nom = any.nom;
                          this.correoinfo.ciu = any.ciu;
                          this.contactSend()
                        });
                      })
                    })
                    this.dismiss("LoadDocs")
                   }) 
                } else {
                this.alert.presentAlert("Error, inserte documentos")
              }

            } else {
              this.alert.presentAlert("Error, Saldo de cobertura insuficiente.")
            }
          }

        })
      })

    }
    if (this.tipopago == '01') {
      var garantia: Garantias = JSON.parse(sessionStorage.getItem('garantia'))
      var hijogarantia: Garantias = garantia;
      var intermediario: Intermediario;
      this.cobroservice.getIntermediarios().get().subscribe((event) => {
        event.query.where("nit", "==", garantia.intermediario).get().then((events) => {
          events.forEach(element => {
            intermediario = JSON.parse(JSON.stringify(element.data()))
          })
        }).then(() => {
          if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
            if (intermediario.coberturacreditomora > parseFloat(this.cobro)) {
              if (parseFloat(garantia.saldo) > parseFloat(this.cobro)) {
                if (!garantia.saldorestante) {
                  garantia.saldorestante = (parseFloat(garantia.saldo)).toString()
                }
                if (parseFloat(garantia.saldorestante) > parseFloat(this.cobro)) {
                  if (hijogarantia.pagarefile == "" || hijogarantia.pagarefile == undefined) {
                    hijogarantia.pagarefile = ""
                  }
                  if (hijogarantia.cartainstruccion == "" || hijogarantia.cartainstruccion == undefined) {
                    hijogarantia.cartainstruccion = ""
                  }
                  if (hijogarantia.liquidacioncredito == "" || hijogarantia.liquidacioncredito == undefined) {
                    hijogarantia.liquidacioncredito = ""
                  }
                  if (hijogarantia.cedulaciudadania == "" || hijogarantia.cedulaciudadania == undefined) {
                    hijogarantia.cedulaciudadania = ""
                  }
                  if (hijogarantia.anexoservicio == "" || hijogarantia.anexoservicio == undefined) {
                    hijogarantia.anexoservicio = ""
                  }
                  if (hijogarantia.certificacionriesgo == "" || hijogarantia.certificacionriesgo == undefined) {
                    hijogarantia.certificacionriesgo = ""
                  }
                  garantia.saldocobrado = this.cobro
                  garantia.saldorestante = (parseFloat(garantia.saldorestante) - this.cobro).toString()
                  if (this.uploadfiles.length > 0) {
                  this.cobroservice.RestanteParcialGarantia(garantia)
                    let countfile = 0;
                    const start = performance.now();
                    new Promise((resolve, reject) => {
                      this.uploadfiles.forEach(element => {
                        countfile++;
                        if (element.tipfile === 'pagare') {
                          hijogarantia.pagarefile = element.nombrefile
                        }
                        if (element.tipfile === 'cartainstruccion') {
                          hijogarantia.cartainstruccion = element.nombrefile
                        }
                        if (element.tipfile === 'liquidacioncredito') {
                          hijogarantia.liquidacioncredito = element.nombrefile
                        }
                        if (element.tipfile === 'anexoservicio') {
                          hijogarantia.anexoservicio = element.nombrefile
                        }
                        if (element.tipfile === 'certificacionriesgo') {
                          hijogarantia.certificacionriesgo = element.nombrefile
                        }
                        if (element.tipfile === 'cedulaciudadania') {
                          hijogarantia.cedulaciudadania = element.nombrefile
                        }
                        hijogarantia.estado = "EN TRAMITE"
                        this.cobroservice.referenciaCloudStorage(hijogarantia.idgarantiaregistro + element.nombrefile);
                        this.cobroservice.tareaCloudStorage(hijogarantia.idgarantiaregistro + element.nombrefile, element.fileToUpload);
                        this.cobroservice.updateFiles(element)
                      });
                      if (countfile == this.uploadfiles.length) {
                        const end = performance.now();
                        const duration = end - start;
                        resolve({ duration });
                      }
                     }).then(()=>{
                      this.cobroservice.RegisterNotificacionEstadoCobroGarantia(hijogarantia, this.user)
                      this.cobroservice.updateGarantia(hijogarantia)
                      this.alert.presentAlert("Exito. Pronto te contactaremos.").then(() => {
                        this.cobroservice.getContactSendAdm().get().subscribe((event) => {
                          event.forEach(element => {
                            var any: any = element.data()
                            this.correoinfo.ema = any.email;
                            this.correoinfo.des = any.contact + 'id:' + garantia.identificacion + '. Estado: ' + garantia.estado
                            this.correoinfo.ent = garantia.intermediario;
                            this.correoinfo.nom = any.nom;
                            this.correoinfo.ciu = any.ciu;
                            this.contactSend()
                          });
                        })
                      })
                      this.dismiss("LoadDocs")
                     }) 
                  } else {
                    this.alert.presentAlert("Error, inserte documentos")
                  }
                } else {
                  this.alert.presentAlert("Error, Valor Saldo Crédito restante menor al valor cobrado.")
                }
              } else {
                this.alert.presentAlert("Error, Valor Desembolsado menor al valor cobrado.")
              }
            } else {
              this.alert.presentAlert("Error, Saldo de cobertura insuficiente.")
            }
          }
          if (this.user.role === 'Super Maestro') {
            if (intermediario.coberturacreditomora > parseFloat(this.cobro)) {
              if (!garantia.saldorestante) {
                garantia.saldorestante = (parseFloat(garantia.saldo)).toString()
              }
              if (parseFloat(garantia.saldorestante) > parseFloat(this.cobro)) {
                if (hijogarantia.pagarefile == "" || hijogarantia.pagarefile == undefined) {
                  hijogarantia.pagarefile = ""
                }
                if (hijogarantia.cartainstruccion == "" || hijogarantia.cartainstruccion == undefined) {
                  hijogarantia.cartainstruccion = ""
                }
                if (hijogarantia.liquidacioncredito == "" || hijogarantia.liquidacioncredito == undefined) {
                  hijogarantia.liquidacioncredito = ""
                }
                if (hijogarantia.cedulaciudadania == "" || hijogarantia.cedulaciudadania == undefined) {
                  hijogarantia.cedulaciudadania = ""
                }
                if (hijogarantia.anexoservicio == "" || hijogarantia.anexoservicio == undefined) {
                  hijogarantia.anexoservicio = ""
                }
                if (hijogarantia.certificacionriesgo == "" || hijogarantia.certificacionriesgo == undefined) {
                  hijogarantia.certificacionriesgo = ""
                }
                  garantia.saldocobrado = this.cobro
                  garantia.saldorestante = (parseFloat(garantia.saldorestante) - this.cobro).toString()
                  if (this.uploadfiles.length > 0) {
                    this.cobroservice.RestanteParcialGarantia(garantia)
                      let countfile = 0;
                      const start = performance.now();
                      new Promise((resolve, reject) => {
                        this.uploadfiles.forEach(element => {
                          countfile++;
                          if (element.tipfile === 'pagare') {
                            hijogarantia.pagarefile = element.nombrefile
                          }
                          if (element.tipfile === 'cartainstruccion') {
                            hijogarantia.cartainstruccion = element.nombrefile
                          }
                          if (element.tipfile === 'liquidacioncredito') {
                            hijogarantia.liquidacioncredito = element.nombrefile
                          }
                          if (element.tipfile === 'anexoservicio') {
                            hijogarantia.anexoservicio = element.nombrefile
                          }
                          if (element.tipfile === 'certificacionriesgo') {
                            hijogarantia.certificacionriesgo = element.nombrefile
                          }
                          if (element.tipfile === 'cedulaciudadania') {
                            hijogarantia.cedulaciudadania = element.nombrefile
                          }
                          hijogarantia.estado = "EN TRAMITE"
                          this.cobroservice.referenciaCloudStorage(hijogarantia.idgarantiaregistro + element.nombrefile);
                          this.cobroservice.tareaCloudStorage(hijogarantia.idgarantiaregistro + element.nombrefile, element.fileToUpload);
                          this.cobroservice.updateFiles(element)
                        });
                        if (countfile == this.uploadfiles.length) {
                          const end = performance.now();
                          const duration = end - start;
                          resolve({ duration });
                        }
                       }).then(()=>{
                        this.cobroservice.RegisterNotificacionEstadoCobroGarantia(hijogarantia, this.user)
                        this.cobroservice.updateGarantia(hijogarantia)
                        this.alert.presentAlert("Exito. Pronto te contactaremos.").then(() => {
                          this.cobroservice.getContactSendAdm().get().subscribe((event) => {
                            event.forEach(element => {
                              var any: any = element.data()
                              this.correoinfo.ema = any.email;
                              this.correoinfo.des = any.contact + 'id:' + garantia.identificacion + '. Estado: ' + garantia.estado
                              this.correoinfo.ent = garantia.intermediario;
                              this.correoinfo.nom = any.nom;
                              this.correoinfo.ciu = any.ciu;
                              this.contactSend()
                            });
                          })
                        })
                        this.dismiss("LoadDocs")
                       }) 
                    }else {
                  this.alert.presentAlert("Error, inserte documentos")
                }
              } else {
                this.alert.presentAlert("Error, Valor Saldo Crédito restante menor al valor cobrado.")
              }
            } else {
              this.alert.presentAlert("Error, Saldo de cobertura insuficiente.")
            }
          }
        })
      })
    }

  }
  /**
  * Consulta Tipos de Linea metodo unico software. 
   * Metodo principal:getTiposLineas();  
   * @return TipoLinea[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getTiposLineas() {
    this.tiposlineas = new Array<TipoLinea>();
    this.cobroservice.getTiposPago().get().subscribe((event) => {
      event.forEach(element => {
        this.tiposlineas.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }

  contactSend() {
    this.correo.getCorreo(this.correoinfo).subscribe(
      res => {
      }, error => error,
    )
  }
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'app-cobrogarantias',
  templateUrl: 'cobrogarantias.page.html',
  styleUrls: ['cobrogarantias.page.scss']
})
export class CobroGarantiasPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsGarantias: string[] = ['intermediario', 'identificacion', 'nombres', 'apellidos', 'saldo', 'saldorestante', 'nrocredito', 'pagare', 'estado', 'cargar'];
  optionselectintermediario: string = 'close';
  garantias: GarantiasModal;
  documento: any;
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private cobroservice: CobroService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() {
      
    
    this.auth.loginUser(this.user).then(res => {
      this.getGarantias()
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

  getGarantias() {
    this.garantias = new GarantiasModal();
    this.garantias.garantias = new Array<Garantias>();
    var pase = false;
    if (this.user.role === 'Super Maestro') {
      this.cobroservice.getAfsFirestore().collection("garantias").where("estado", "==", "EN TRAMITE")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                  pase = true;
                  this.garantias.garantias.push(garantia)
                })
                if (pase) {
                  this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                  setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                }
              })
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
      this.cobroservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.user.maestro).where("estado", "==", "EN TRAMITE")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
            this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                  garantia.intermediariodes = intermediario.sigla;
                  pase = true;
                  this.garantias.garantias.push(garantia)
                })
                if (pase) {
                  this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                  setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                }
              })
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
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
    this.garantias = new GarantiasModal();
    this.garantias.garantias = new Array<Garantias>();
    this.cargador.getCargador(150)
    if (this.documento) {
      var pase = false;
      if (this.user.role === 'Super Maestro') {
        this.cobroservice.getAfsFirestore().collection("garantias").where("identificacion", "==", parseInt(this.documento)).where("estado", "==", "CARGADO")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
              pase = true;
              this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                    garantia.intermediariodes = intermediario.sigla;
                    pase = true;
                    this.garantias.garantias.push(garantia)
                  })
                  if (pase) {
                    this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                    setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                  }
                })
            });
            if (pase) {
              this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
              setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
            } else {
              this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de garantía " + this.documento + " ingresada.")
              this.documento = '';
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        this.cobroservice.getAfsFirestore().collection("garantias").where("intermediario", "==", this.user.maestro).where("identificacion", "==", parseInt(this.documento)).where("estado", "==", "CARGADO").get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var garantia: Garantias = JSON.parse(JSON.stringify(doc.data()))
              this.cobroservice.getAfsFirestore().collection("intermediarios").where("nit", "==", garantia.intermediario).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var intermediario: Intermediario = JSON.parse(JSON.stringify(doc.data()))
                    garantia.intermediariodes = intermediario.sigla;
                    pase = true;
                    this.garantias.garantias.push(garantia)
                  })
                  if (pase) {
                    this.dataSource = new MatTableDataSource<any>(this.garantias.garantias);
                    setTimeout(() => this.dataSource.paginator = this.paginatorGarantias);
                  } else {
                    this.alertPage.presentAlert("Error!. " + "No existe" + " no. Identificación de garantía " + this.documento + " ingresada.")
                    this.documento = '';
                  }
                })
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    } else {
      this.documento = 'No a ingresado';
      this.alertPage.presentAlert("Error!. " + "Ingrese" + " no. Identificación de garantía " + " creada.")
      this.documento = '';
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
  openAprobar(element: Garantias) {
    if (element.estado == "PAGADA") {
      this.alertPage.presentAlert("Error, pago de crédito afianzado pagada.")
    }
    if (element.estado == "EN TRAMITE") {
      this.alertPage.presentAlert("Error, pago de crédito afianzado en tramite.")
    } else {
      sessionStorage.setItem('garantia', JSON.stringify(element))
      this.garantias.garantia = element
      this.openHistoricoModal(this.garantias)

    }
  }
  /**
 * Abre garantiasmodalaprobar.page.html 
 * Metodo principal:openHistoricoModal(GarantiasTotal);  
 * @param EsquemaUnicoAnticipado
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openHistoricoModal(element: GarantiasModal) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class-parametriza-cobrar',
      componentProps: { element }
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        this.ngOnInit()
        if (user == "LoadDocs") {
          this.alertPage.presentAlert("Éxito, cargue de documentos a garantía realizado.").then(() => {

          })
        }

      });
    return await modal.present();
  }



}





