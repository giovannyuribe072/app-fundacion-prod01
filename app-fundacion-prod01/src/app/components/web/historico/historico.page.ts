
/**
 * PERIODO COBERTURA DE PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
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
import { PeriodoCoberturaService } from '../../services/periodocobertura.service';
import { EsquemaUnicoAnticipado } from '../../model/esquemaunicoanticipado.model';
import { ObjectExcelParseComision } from '../../model/objectexcelparsecomision.model';
import { Count, CountFiles } from '../../model/count.model';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ComisionLinealizada } from '../../model/comisionlinealizada.model';
import { Comisiones } from '../../model/comisiones.model';
import { EsquemaUnicoAnticipadoModel } from '../../model/comisionesesquemaunicomodel.model';
import { ComisionesLinealizadasModel } from '../../model/comisioneslinealizadasmodel.model';
import { TipoHistoricoIntermediario } from '../../model/tipohistoricointermediario.model';
import { HistoricoService } from '../../services/historico.service';
import { CargadorService } from '../../services/cargador.services';


/**
 * CONTROLADOR DE LA PAGINA BUSQUEDA Intermediarios CONSULTA Y CARGUE DE COMISIONES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'app-historico',
  templateUrl: 'historico.page.html',
  styleUrls: ['historico.page.scss']
})
export class HistoricoPage implements OnInit {
  user: User;
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario;
  selecthistorico: TipoHistoricoIntermediario;
  tiposhistoricos: TipoHistoricoIntermediario[] = [];
  optionselectintermediario: string = 'close';
  objectexcelparsecomision: ObjectExcelParseComision[] = [];
  comisionlinealizada: ComisionLinealizada[] = [];
  esquemaunicoanticipado: EsquemaUnicoAnticipado[] = [];
  esquemaunicomodel: EsquemaUnicoAnticipadoModel = new EsquemaUnicoAnticipadoModel();
  comisionlinealizadamodel: ComisionesLinealizadasModel = new ComisionesLinealizadasModel();
  comisiones: Comisiones[] = [];
  count: Count[] = [];
  countfiles: CountFiles[] = [];

  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private historicoservice: HistoricoService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getIntermediarios();
      this.getCount();
      this.selecthistorico = new TipoHistoricoIntermediario();
    }, error => {
      if (error.status == 304) {

      } else if (error.status == 400) {
        this.alertPage.presentAlert("Clave incorrecta.");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o Correo incorrectos. /" + error.message);
      }
    });
  }
  /**
* Consulta Tipos de historico metodo unico software. 
* Metodo principal:getTiposHistoricos();  
* @return TipoLinea[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getTiposHistoricos() {
    this.tiposhistoricos = new Array<TipoHistoricoIntermediario>();
    this.historicoservice.getTiposHistoricos().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).get().then((events) => {
        events.forEach(element => {
          this.tiposhistoricos.push(JSON.parse(JSON.stringify(element.data())))
          return this.tiposhistoricos;
        })
      });
    });
  }
  /**
 * Consulta contadores comisiones metodo unico software. 
  * Metodo principal:getCount();  
  * @return Count[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCount() {
    this.count = new Array<Count>();
    this.historicoservice.getCount().doc('count').get().subscribe((event) => {
      this.count.push(JSON.parse(JSON.stringify(event.data())))
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
    var userToLogin = this.historicoservice.getIntermediarios().get().subscribe((event) => {
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
        });
      } if (this.user.role === 'Maestro') {
        event.query.where("nit", "==", this.user.maestro).get().then((events) => {
          events.forEach(element => {
            this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
            this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
            setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
            return this.intermediarios;
          })
        });
      }
      return userToLogin;
    });
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
  * Controlador opción selección intermediario
  * Metodo principal:selectIntermediario();  
  * @return optionselectintermediario;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  selectIntermediario(user: Intermediario) {
    this.selectintermediario = user;
    this.optionselectintermediario = 'open'
    this.getTiposHistoricos()
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
    this.optionselectintermediario = 'close'
  }



  /**
* Consulta Comisiones metodo unico software. 
 * Metodo principal:consultarComisiones();  
 * @return selectlinea.idlinea;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarHistorico() {
    var paso = false;
    this.tiposhistoricos.forEach(element => {
      if (parseFloat(element.idhistorico) === parseFloat(this.selecthistorico.idhistorico)) {
        this.selecthistorico = element
        paso = true;
      }
    });
    var idlinea = this.selecthistorico.idlinea
    var idlineachek = true;
    (idlinea == null || idlinea == "") ? idlineachek = false : null;
    if (idlineachek) {
      if (paso) {
        if (idlinea === '1') {
          this.consultarComisionesEsquemaUnico();
        }
        if (idlinea === '2') {
          this.consultarComisionesLinealizadas();
        }
        if (idlinea === '3') {
          this.consultarComisionesEsquemaMensual();
        }
      }
    } else {
      this.alertPage.presentAlert("Selecciona un tipo de comisión.")
    }
  }
  /**
  * Abre periodocoberturamodalver.page.html usuario seleccionado 
  * Metodo principal:ModalVerPage();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openModalConsultarMensual(esquemaunicomodel: EsquemaUnicoAnticipadoModel) {
    const modal = await this.modalController.create({
      component: ModalVerMensualPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { esquemaunicomodel }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.ngOnInit()
        var datapase = true;
        const user = data['data'];
        (user === undefined) ? datapase = false : null;
        if (datapase) {

        }
      });
    return await modal.present();
  }
  /**
* Consulta Comisiones Esquema Unico metodo unico software. 
 * Metodo principal:consultarComisionesEsquemaUnico();  
 * @return selectlinea.idlinea;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarComisionesEsquemaMensual() {
    this.esquemaunicomodel.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposhistoricos.forEach(element => {
        if (element.idhistorico === this.selecthistorico.idhistorico) {
          this.selecthistorico = element
          paso = true;
        }
      }); 
      if (paso) {
        var pase = false;
        this.historicoservice.getComisionesEsquemaMensual().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.selecthistorico.idhistorico).orderBy("idcomisionregistro").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
               this.esquemaunicomodel.esquemaunicoanticipado.push(JSON.parse(JSON.stringify(element.data())))
               pase = true;
              return this.esquemaunicomodel.esquemaunicoanticipado;
            })
            if (pase) {
              var pass = false;
              this.esquemaunicomodel.comisiones = new Array<Comisiones>();
              this.historicoservice.getComisionesHistoricoPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idhistorico", "==", this.selecthistorico.idhistorico).get().then((events) => {
                  events.forEach(element => {
                    this.esquemaunicomodel.comisiones.push(JSON.parse(JSON.stringify(element.data())))
                    pass = true;
                    return this.esquemaunicomodel.comisiones;
                  })
                  if (pass) {
                    this.openModalConsultarMensual(this.esquemaunicomodel);
                  }
                });
              });
            } else {
              this.alertPage.presentAlert("No tienes esquemas mensuales a consultar.")
            }
          })
        })
      }
    } else {
      this.alertPage.presentAlert("Selecciona un Intermediario.")
    }
  }

  /**
 * Consulta Comisiones Esquema Unico metodo unico software. 
  * Metodo principal:consultarComisionesEsquemaUnico();  
  * @return selectlinea.idlinea;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  consultarComisionesEsquemaUnico() {
    this.esquemaunicomodel.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
    var pase = false;
    this.historicoservice.getComisionesHistoricoEsquemaUnico().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.selecthistorico.idhistorico).orderBy("idcomisionregistro").orderBy("creadoen").get().then((events) => {
        events.forEach(element => {
          this.esquemaunicomodel.esquemaunicoanticipado.push(JSON.parse(JSON.stringify(element.data())))
          pase = true;
          return this.esquemaunicomodel.esquemaunicoanticipado;
        })
        if (pase) {
          var pass = false;
          this.esquemaunicomodel.comisiones = new Array<Comisiones>();
          this.historicoservice.getComisionesHistoricoPeriodosCobertura().get().subscribe((event) => {
            event.query.where("intermediario", "==", this.selectintermediario.nit).where("idhistorico", "==", this.selecthistorico.idhistorico).get().then((events) => {
              events.forEach(element => {
                this.esquemaunicomodel.comisiones.push(JSON.parse(JSON.stringify(element.data())))
                pass = true;
                return this.esquemaunicomodel.comisiones;
              })
              if (pass) {
                this.openModalConsultar(this.esquemaunicomodel);
              }
            });
          });
        } else {
          this.alertPage.presentAlert("No tienes esquemas unicos a consultar.")
        }
      })
    })
  }
  /**
* Consulta Comisiones Esquema Unico metodo unico software. 
* Metodo principal:consultarComisionesEsquemaUnico();  
* @return selecthistorico.idlinea;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  consultarComisionesLinealizadas() {
    this.comisionlinealizadamodel.comisionlinealizada = new Array<ComisionLinealizada>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposhistoricos.forEach(element => {
        if (element.idhistorico === this.selecthistorico.idhistorico) {
          this.selecthistorico = element
          paso = true;
        }
      });
      if (paso) {
        var pase = false;
        this.historicoservice.getComisionesLinealizadas().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idcomision", "==", this.selecthistorico.idhistorico).orderBy("idcomisionregistro").orderBy("mesescredito").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
              this.comisionlinealizadamodel.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
              pase = true;
              return this.comisionlinealizadamodel.comisionlinealizada;
            })
            if (pase) {
              var pass = false;
              this.comisionlinealizadamodel.comisiones = new Array<Comisiones>();
              this.historicoservice.getComisionesHistoricoPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idhistorico", "==", this.selecthistorico.idhistorico).get().then((events) => {
                  events.forEach(element => {
                    this.comisionlinealizadamodel.comisiones.push(JSON.parse(JSON.stringify(element.data())))
                    pass = true;
                    return this.comisionlinealizadamodel.comisiones;
                  })
                  if (pass) {
                    this.openModalConsultarLinealizadas(this.comisionlinealizadamodel);
                  }
                });
              });
            } else {
              this.alertPage.presentAlert("No tienes comisiones linealzadas a consultar.")
            }
          })
        })
      }
    } else {
      this.alertPage.presentAlert("Selecciona un Intermediario")
    }
  }
  /**
  * Abre periodocoberturamodalver.page.html usuario seleccionado 
  * Metodo principal:ModalVerPage();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openModalConsultar(esquemaunicomodel: EsquemaUnicoAnticipadoModel) {
    const modal = await this.modalController.create({
      component: ModalVerPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { esquemaunicomodel }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.ngOnInit()
        var datapase = true;
        const user = data['data'];
        (user === undefined) ? datapase = false : null;
        if (datapase) {

        }
      });
    return await modal.present();
  }

  /**
* Abre periodocoberturamodalverlinealizada.page.html usuario seleccionado 
* Metodo principal:ModalVerPage();  
* @return void;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openModalConsultarLinealizadas(comisionlinealizadamodel: ComisionesLinealizadasModel) {
    const modal = await this.modalController.create({
      component: ModalVerLinealizadaPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { comisionlinealizadamodel }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.ngOnInit()
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
 * CONTROLADOR DE LA PAGINA VER PERIODOS COBERTURA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modalhistorico-page',
  templateUrl: 'historicomodalver.page.html',
  styleUrls: ['historico.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() esquemaunicomodel: EsquemaUnicoAnticipadoModel
  optionsearch: string;
  esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
  displayedColumnsEsquemaUnico: string[] = ['idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver'];
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorEsquemaUnico', { read: MatPaginator }) paginatorEsquemaUnico: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController,
    private auth: AuthService,
    private historicoservice: HistoricoService) { }
  ngOnInit() { 
    
    
    
    this.optionsearch = 'search';
    this.esquemaunicomodel.comisiones.forEach(element => {
      this.historicoservice.TareaLeerCloudStorage(element.intermediario + element.nombrefile).subscribe(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        element.urlFileUpload = url
      });
    });
    this.dataSourceComision = new MatTableDataSource<any>(this.esquemaunicomodel.comisiones);
    this.dataSource = new MatTableDataSource<any>(this.esquemaunicomodel.esquemaunicoanticipado);
    setTimeout(() => this.dataSource.paginator = this.paginatorEsquemaUnico);

  }

  /**
   * Controlador opción ver esquema unico intermediario
   * Metodo principal:openVer(EsquemaUnicoAnticipado);  
   * @param EsquemaUnicoAnticipado
   * @return esquemaunico;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  openVer(doc: EsquemaUnicoAnticipado) {
    this.optionsearch = 'ver';
    this.esquemaunico = doc;
  }
  /**
 * Controlador opción cerrar ver esquema unico intermediario
 * Metodo principal:close();  
 * @return optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  close() {
    this.optionsearch = 'search';
  }
  /**
  *  Cierra periodocoberturamodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return periodocobertura.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.modalController.dismiss()
  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterEsquemaUnico(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS COMISIONES. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterComisiones(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


/**
 * CONTROLADOR DE LA PAGINA VER PERIODOS COBERTURA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modalhistoricomensual-page',
  templateUrl: 'historicomodalvermensual.page.html',
  styleUrls: ['historico.page.scss']
})
export class ModalVerMensualPage implements OnInit { 
  @Input() esquemaunicomodel: EsquemaUnicoAnticipadoModel
  optionsearch: string= 'search';
  esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
  displayedColumnsEsquemaUnico: string[] = ['idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver' ];
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorEsquemaUnico', { read: MatPaginator }) paginatorEsquemaUnico: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController, 
    private coberturaservice: PeriodoCoberturaService) { }
  ngOnInit() {  
    this.optionsearch = 'search';   
    this.esquemaunicomodel.comisiones.forEach(element => {
      this.coberturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefile).subscribe(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        element.urlFileUpload = url
      });
    });
    this.dataSourceComision = new MatTableDataSource<any>(this.esquemaunicomodel.comisiones);
    this.dataSource = new MatTableDataSource<any>(this.esquemaunicomodel.esquemaunicoanticipado);
    setTimeout(() => this.dataSource.paginator = this.paginatorEsquemaUnico);
    setTimeout(() => this.dataSourceComision.paginator = this.paginatorComisiones);
  }

  /**
   * Controlador opción ver esquema unico intermediario
   * Metodo principal:openVer(EsquemaUnicoAnticipado);  
   * @param EsquemaUnicoAnticipado
   * @return esquemaunico;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  openVer(doc: EsquemaUnicoAnticipado) {
    this.optionsearch = 'ver';
    this.esquemaunico = doc;
  }
  /**
 * Controlador opción cerrar ver esquema unico intermediario
 * Metodo principal:close();  
 * @return optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  close() {
    this.optionsearch = 'search';
  }
  /**
  *  Cierra periodocoberturamodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return periodocobertura.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.modalController.dismiss()
  }

  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterEsquemaUnico(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS COMISIONES. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterComisiones(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


/**
 * CONTROLADOR DE LA PAGINA VER PERIODOS COBERTURA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modalhistoricolinealizada-page',
  templateUrl: 'historicomodalverlinealizada.page.html',
  styleUrls: ['historico.page.scss']
})
export class ModalVerLinealizadaPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() comisionlinealizadamodel: ComisionesLinealizadasModel
  optionsearch: string = 'search';
  comisionlinealizada: ComisionLinealizada = new ComisionLinealizada();
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  displayedColumnsComisionLinealizada: string[] = ['idcomision', 'mesescredito', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorComisionLinealizada', { read: MatPaginator }) paginatorComisionLinealizada: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController,
    private auth: AuthService,
    private coberturaservice: PeriodoCoberturaService) { }
  ngOnInit() { 
    
    
    
    this.comisionlinealizadamodel.comisiones.forEach(element => {
      this.coberturaservice.TareaLeerCloudStorage(element.intermediario + element.nombrefile).subscribe(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        element.urlFileUpload = url
      });
    });
    this.dataSourceComision = new MatTableDataSource<any>(this.comisionlinealizadamodel.comisiones);
    this.optionsearch = 'search';
    this.dataSource = new MatTableDataSource<any>(this.comisionlinealizadamodel.comisionlinealizada);
    setTimeout(() => this.dataSource.paginator = this.paginatorComisionLinealizada);
    setTimeout(() => this.dataSourceComision.paginator = this.paginatorComisiones);
  }

  /**
   * Controlador opción ver esquema unico intermediario
   * Metodo principal:openVer(comisionlinealizadaAnticipado);  
   * @param comisionlinealizadaAnticipado
   * @return comisionlinealizada;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  openVer(doc: ComisionLinealizada) {
    this.optionsearch = 'ver';
    this.comisionlinealizada = doc;
  }
  /**
 * Controlador opción cerrar ver esquema unico intermediario
 * Metodo principal:close();  
 * @return optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  close() {
    this.optionsearch = 'search';
  }
  /**
  *  Cierra periodocoberturamodalver.page.html metodo unico software. 
   * Metodo principal:cerrarConsultar();  
   * @return periodocobertura.page.html;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cerrarConsultar() {
    this.modalController.dismiss()
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS COMISIONES. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterComisiones(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ESQUEMAS UNICOS. 
* Metodo principal:applyFilterEsquemaUnico(string); 
* @param string 
* @return dataSource[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterComisionesLinealizadas(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



