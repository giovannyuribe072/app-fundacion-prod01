
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
import * as XLSX from 'xlsx';
import { ObjectExcelParseComision } from '../../model/objectexcelparsecomision.model';
import { Count, CountFiles } from '../../model/count.model';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ComisionLinealizada } from '../../model/comisionlinealizada.model';
import { Comisiones } from '../../model/comisiones.model';
import { EsquemaUnicoAnticipadoModel } from '../../model/comisionesesquemaunicomodel.model';
import { ComisionesLinealizadasModel } from '../../model/comisioneslinealizadasmodel.model';
import { TipoLineaIntermediario } from '../../model/tipolineaintermediario.model';
import { CargadorService } from '../../services/cargador.services';



/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN HISTORICO COMISIONES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'periodocoberturamodalhistorico.page.html',
  styleUrls: ['periodocobertura.page.scss']
})
export class ModalPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  /**
 * Opción confirmación historico comisiones. 
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
 * CONTROLADOR DE LA PAGINA BUSQUEDA Intermediarios CONSULTA Y CARGUE DE COMISIONES SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'app-periodocobertura',
  templateUrl: 'periodocobertura.page.html',
  styleUrls: ['periodocobertura.page.scss']
})
export class PeriodoCoberturaPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario;
  selectlinea: TipoLineaIntermediario;
  tiposlineas: TipoLineaIntermediario[] = [];
  optionselectintermediario: string = 'close';
  objectexcelparsecomision: ObjectExcelParseComision[] = [];
  comisionlinealizada: ComisionLinealizada[] = [];
  esquemaunicoanticipado: EsquemaUnicoAnticipado[] = [];
  esquemaunicomodel: EsquemaUnicoAnticipadoModel = new EsquemaUnicoAnticipadoModel();
  comisionlinealizadamodel: ComisionesLinealizadasModel = new ComisionesLinealizadasModel();
  comisiones: Comisiones[] = [];
  count: Count[] = [];
  countfiles: CountFiles[] = [];
  validatepageopen: string = "close";

  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService,
    private alertPage: AlertPage,
    private coberturaservice: PeriodoCoberturaService,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
    this.validatepageopen = "close"
  }

  ngOnInit() { 
    
    
    
    this.auth.loginUser(this.user).then(res => {
      this.getIntermediarios();
      this.getCount();
      this.getCountFiles();
      this.selectlinea = new TipoLineaIntermediario();
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
* Consulta Tipos de Linea metodo unico software. 
* Metodo principal:getTiposLineas();  
* @return TipoLinea[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getTiposLineas() {
    this.tiposlineas = new Array<TipoLineaIntermediario>();
    this.coberturaservice.getTiposLineas().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.selectintermediario.nit).get().then((events) => {
        events.forEach(element => {
          this.tiposlineas.push(JSON.parse(JSON.stringify(element.data())))
          return this.tiposlineas;
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
    this.coberturaservice.getCount().doc('count').get().subscribe((event) => {
      this.count.push(JSON.parse(JSON.stringify(event.data())))
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
    this.coberturaservice.getCount().doc('countfiles').get().subscribe((events) => {
      this.countfiles.push(JSON.parse(JSON.stringify(events.data())))
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
  getIntermediarios() {
    this.intermediarios = new Array<Intermediario>();
    var userToLogin = this.coberturaservice.getIntermediarios().get().subscribe((event) => {
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
    this.getTiposLineas()
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
 *  Lee archivos metodo unico software. 
  * Metodo principal:changeListener();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  changeListener($event, string: string): void {
    this.readThis($event.target, string);
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
    this.objectexcelparsecomision = new Array<ObjectExcelParseComision>();
    this.selectintermediario.uploadfiles = new Array<UploadFilesIntermediario>();
    var file: File = inputValue.files[0];
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
        (XLSX.utils.sheet_to_json(ws, { header: 1 })).forEach(element => {
          let parseexcel: ObjectExcelParseComision = JSON.parse(JSON.stringify(element))
          this.objectexcelparsecomision.push(parseexcel)
        });
        this.countfiles.forEach(element => {
          this.coberturaservice.updateCountFiles(element.countfiles + 1);
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
    }
  }
  /**
* Controlador opción crear tipo comisión
* Metodo principal:crearComisiones();  
* @return selectlinea.idlinea;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearComisiones() {
    var idlinea = this.selectlinea.idlinea
    var idlineachek = true;
    (idlinea == null || idlinea == "") ? idlineachek = false : null;
    if (idlineachek) {
      if (idlinea === '1') {
        this.crearComisionesEsquemaUnico();
      }
      if (idlinea === '2') {
        this.crearComisionesLinealizadas();
      }
      if (idlinea === '3') {
        this.crearComisionesMensuales();
      }
      if (idlinea === '4') {
        this.crearComisionesLinealizadasMensual();
      }
    } else {
      this.alertPage.presentAlert("Selecciona un tipo de comisión.")
    }
  }

  /**
* Consulta Comisiones metodo unico software. 
 * Metodo principal:consultarComisiones();  
 * @return selectlinea.idlinea;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarComisiones() {
    var idlinea = this.selectlinea.idlinea
    var idlineachek = true;
    (idlinea == null || idlinea == "") ? idlineachek = false : null;
    if (idlineachek) {
      this.cargador.getCargador(60)
      if (idlinea === '1') {
        this.consultarComisionesEsquemaUnico();
      }
      if (idlinea === '2') {
        this.consultarComisionesLinealizadas();
      }
      if (idlinea === '3') {
        this.consultarComisionesEsquemaMensual();
      }
      if (idlinea === '4') {
        this.consultarComisionesLinealizadasMensual();
      }
    } else {
      this.alertPage.presentAlert("Selecciona un tipo de comisión.")
    }
  }
  /**
   * Registrar Comisiones Esquema unico Intermediario metodo unico registro al software. 
  * Metodo principal:crearComisionesEsquemaUnico(); 
  * @param ObjectExcelParseComision 
  * @return EsquemaUnicoAnticipado;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  crearComisionesEsquemaUnico() {
    this.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        if (this.objectexcelparsecomision.length === 2) {
          var validacion = false;
          this.objectexcelparsecomision.forEach(element => {
            let esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
            if (element[0] !== 'COBERTURA PARA CRÉDITOS EN MORA') {

              esquemaunico.cobertura = (parseFloat(element[0]) * 100).toFixed(4).toString()
            }
            if (element[1] !== 'ADMINISTRACIÓN') {
              esquemaunico.administracion = (parseFloat(element[1]) * 100).toFixed(4).toString()
            }
            if (element[2] !== 'IVA') {
              esquemaunico.ivaadministracion = (parseFloat(element[2]) * 100).toFixed(4).toString()
            }
            if (element[3] !== 'COMISIÓN TOTAL') {
              esquemaunico.comisiontotal = (parseFloat(element[3]) * 100).toFixed(4).toString()
            }
            var valida = true;
            (esquemaunico.cobertura == '' || esquemaunico.cobertura == null) ? valida = false : null;
            if (valida) {
              this.esquemaunicoanticipado.push(esquemaunico);
              validacion = true;
            }
          });
          if (validacion) {
            this.count.forEach(element => {
              this.selectlinea.count = element.count
              this.selectlinea.indexcount = element.indexcount
              this.coberturaservice.crearEsquemaUnico(this.esquemaunicoanticipado, this.selectintermediario, this.user, this.selectlinea)
              this.alertPage.presentAlert("Éxito! " + this.selectlinea.nombrelinea + ". Línea identificador: " + element.count + " creada.").then(() => {
                this.ngOnInit();
              })

            });
          }
        } else {
          this.objectexcelparsecomision = new Array<ObjectExcelParseComision>();
          this.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
          this.alertPage.presentAlert("Formato de tipo de comisión incorrecto.")
        }
      }
    } else {
      this.alertPage.presentAlert("Selecciona un intermediario.")
    }
  }
  /**
    * Registrar Comisiones Mensuales Intermediario metodo unico registro al software. 
   * Metodo principal:crearComisionesMensuales(); 
   * @param ObjectExcelParseComision 
   * @return EsquemaUnicoAnticipado;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  crearComisionesMensuales() {
    this.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        if (this.objectexcelparsecomision.length === 2) {
          var validacion = false;
          this.objectexcelparsecomision.forEach(element => {
            let esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
            if (element[0] !== 'COBERTURA PARA CRÉDITOS EN MORA') {

              esquemaunico.cobertura = (parseFloat(element[0]) * 100).toFixed(4).toString()
            }
            if (element[1] !== 'ADMINISTRACIÓN') {
              esquemaunico.administracion = (parseFloat(element[1]) * 100).toFixed(4).toString()
            }
            if (element[2] !== 'IVA') {
              esquemaunico.ivaadministracion = (parseFloat(element[2]) * 100).toFixed(4).toString()
            }
            if (element[3] !== 'COMISIÓN TOTAL') {
              esquemaunico.comisiontotal = (parseFloat(element[3]) * 100).toFixed(4).toString()
            }
            var valida = true;
            (esquemaunico.cobertura == '' || esquemaunico.cobertura == null) ? valida = false : null;
            if (valida) {
              this.esquemaunicoanticipado.push(esquemaunico);
              validacion = true;
            }
          });
          if (validacion) {
            this.count.forEach(element => {
              this.selectlinea.count = element.count
              this.selectlinea.indexcount = element.indexcount
              this.coberturaservice.crearEsquemaMensual(this.esquemaunicoanticipado, this.selectintermediario, this.user, this.selectlinea)
              this.alertPage.presentAlert("Éxito! " + this.selectlinea.nombrelinea + ". Línea identificador: " + element.count + " creada.").then(() => {
                this.ngOnInit();
              })

            });
          }
        } else {
          this.objectexcelparsecomision = new Array<ObjectExcelParseComision>();
          this.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
          this.alertPage.presentAlert("Formato de tipo de comisión incorrecto.")
        }
      }
    } else {
      this.alertPage.presentAlert("Selecciona un intermediario.")
    }
  }
  /**
  * Registrar Comisiones Esquema unico Intermediario metodo unico registro al software. 
 * Metodo principal:crearComisionesEsquemaUnico(); 
 * @param objectexcelparsecomision 
 * @return ComisionLinealizada;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  crearComisionesLinealizadas() {
    this.comisionlinealizada = new Array<ComisionLinealizada>();
    var paso = false;
    this.tiposlineas.forEach(element => {
      if (element.idlinea === this.selectlinea.idlinea) {
        this.selectlinea = element
        paso = true;
      }
    });
    if (paso) {
      var validacion = false;
      if (this.objectexcelparsecomision.length === 121) {
        this.objectexcelparsecomision.forEach(element => {
          let comisionlinealizada: ComisionLinealizada = new ComisionLinealizada();
          if (element[0] !== 'MESES DE CRÉDITO') {


            comisionlinealizada.mesescredito = element[0]
          }
          if (element[1] !== 'COBERTURA PARA CRÉDITOS EN MORA') {
            var parse1 = element[1]
            try {
              if (parse1.substring(0, 1) === '0') {
                comisionlinealizada.cobertura = (parse1).substring(0, 6).toString()
              } else {
                comisionlinealizada.cobertura = (parseFloat(parse1) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.cobertura = (parseFloat(parse1) * 100).toString()
            }
          }
          if (element[2] !== 'ADMINISTRACIÓN') {
            var parse2 = element[2]
            try {
              if (parse2.substring(0, 1) === '0') {
                comisionlinealizada.administracion = (parse2).substring(0, 6).toString()
              } else {
                comisionlinealizada.administracion = (parseFloat(parse2) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.administracion = (parseFloat(parse2) * 100).toString()
            }
          }
          if (element[3] !== 'IVA') {
            var parse3 = element[3]
            try {
              if (parse3.substring(0, 1) === '0') {
                comisionlinealizada.ivaadministracion = (parse3).substring(0, 6).toString()
              } else {
                comisionlinealizada.ivaadministracion = (parseFloat(parse3) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.ivaadministracion = (parseFloat(parse3) * 100).toString()
            }
          }
          if (element[4] !== 'COMISIÓN TOTAL') {
            var parse4 = element[4]
            try {
              if (parse4.substring(0, 1) === '0') {
                comisionlinealizada.comisiontotal = (parse4).substring(0, 6).toString()
              } else {
                comisionlinealizada.comisiontotal = (parseFloat(parse4) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.comisiontotal = (parseFloat(parse4) * 100).toString()
            }
          }
          var valida = true;
          (comisionlinealizada.cobertura == '' || comisionlinealizada.cobertura == null) ? valida = false : null;
          if (valida) {
            this.comisionlinealizada.push(comisionlinealizada);
            validacion = true;
          }
        });
        if (validacion) {
          this.count.forEach(element => {
            this.selectlinea.count = element.count
            this.selectlinea.indexcount = element.indexcount
            this.coberturaservice.crearLinealizada(this.comisionlinealizada, this.selectintermediario, this.user, this.selectlinea)
            this.alertPage.presentAlert("Éxito! " + this.selectlinea.nombrelinea + ". Identificador: " + element.count + " creada.").then(() => {
              this.ngOnInit();
            })

          });
        }
      } else {
        this.alertPage.presentAlert("Formato de tipo de comisión incorrecto.")
      }
    }
  }
  /**
   * Registrar Comisiones Esquema unico Intermediario metodo unico registro al software. 
  * Metodo principal:crearComisionesEsquemaUnico(); 
  * @param objectexcelparsecomision 
  * @return ComisionLinealizada;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  crearComisionesLinealizadasMensual() {
    this.comisionlinealizada = new Array<ComisionLinealizada>();
    var paso = false;
    this.tiposlineas.forEach(element => {
      if (element.idlinea === this.selectlinea.idlinea) {
        this.selectlinea = element
        paso = true;
      }
    });
    if (paso) {
      var validacion = false;
      if (this.objectexcelparsecomision.length === 4) {
        this.objectexcelparsecomision.forEach(element => {
          let comisionlinealizada: ComisionLinealizada = new ComisionLinealizada();
          if (element[0] !== 'MESES DE CRÉDITO') {


            comisionlinealizada.mesescredito = element[0]
          }
          if (element[1] !== 'COBERTURA PARA CRÉDITOS EN MORA') {
            var parse1 = element[1]
            try {
              if (parse1.substring(0, 1) === '0') {
                comisionlinealizada.cobertura = (parse1).substring(0, 6).toString()
              } else {
                comisionlinealizada.cobertura = (parseFloat(parse1) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.cobertura = (parseFloat(parse1) * 100).toString()
            }
          }
          if (element[2] !== 'ADMINISTRACIÓN') {
            var parse2 = element[2]
            try {
              if (parse2.substring(0, 1) === '0') {
                comisionlinealizada.administracion = (parse2).substring(0, 6).toString()
              } else {
                comisionlinealizada.administracion = (parseFloat(parse2) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.administracion = (parseFloat(parse2) * 100).toString()
            }
          }
          if (element[3] !== 'IVA') {
            var parse3 = element[3]
            try {
              if (parse3.substring(0, 1) === '0') {
                comisionlinealizada.ivaadministracion = (parse3).substring(0, 6).toString()
              } else {
                comisionlinealizada.ivaadministracion = (parseFloat(parse3) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.ivaadministracion = (parseFloat(parse3) * 100).toString()
            }
          }
          if (element[4] !== 'COMISIÓN TOTAL') {
            var parse4 = element[4]
            try {
              if (parse4.substring(0, 1) === '0') {
                comisionlinealizada.comisiontotal = (parse4).substring(0, 6).toString()
              } else {
                comisionlinealizada.comisiontotal = (parseFloat(parse4) * 100).toString()
              }
            } catch (error) {
              comisionlinealizada.comisiontotal = (parseFloat(parse4) * 100).toString()
            }
          }
          var valida = true;
          (comisionlinealizada.cobertura == '' || comisionlinealizada.cobertura == null) ? valida = false : null;
          if (valida) {
            this.comisionlinealizada.push(comisionlinealizada);
            validacion = true;
          }
        });
        if (validacion) {
          this.count.forEach(element => {
            this.selectlinea.count = element.count
            this.selectlinea.indexcount = element.indexcount
            this.coberturaservice.crearLinealizadaMensual(this.comisionlinealizada, this.selectintermediario, this.user, this.selectlinea)
            this.alertPage.presentAlert("Éxito! " + this.selectlinea.nombrelinea + ". Identificador: " + element.count + " creada.").then(() => {
              this.ngOnInit();
            })

          });
        }
      } else {
        this.alertPage.presentAlert("Formato de tipo de comisión incorrecto.")
      }
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
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        var pase = false;
        this.coberturaservice.getComisionesEsquemaUnico().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").orderBy("idcomisionregistro").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
              this.esquemaunicomodel.esquemaunicoanticipado.push(JSON.parse(JSON.stringify(element.data())))
              pase = true;
              return this.esquemaunicomodel.esquemaunicoanticipado;
            })
            if (pase) {
              var pass = false;
              this.esquemaunicomodel.comisiones = new Array<Comisiones>();
              this.coberturaservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").get().then((events) => {
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
  consultarComisionesEsquemaMensual() {
    this.esquemaunicomodel.esquemaunicoanticipado = new Array<EsquemaUnicoAnticipado>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        var pase = false;
        this.coberturaservice.getComisionesEsquemaMensual().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").orderBy("idcomisionregistro").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
              this.esquemaunicomodel.esquemaunicoanticipado.push(JSON.parse(JSON.stringify(element.data())))
              pase = true;
              return this.esquemaunicomodel.esquemaunicoanticipado;
            })
            if (pase) {
              var pass = false;
              this.esquemaunicomodel.comisiones = new Array<Comisiones>();
              this.coberturaservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").get().then((events) => {
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
  consultarComisionesLinealizadas() {
    this.comisionlinealizadamodel.comisionlinealizada = new Array<ComisionLinealizada>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        var pase = false;
        this.coberturaservice.getComisionesLinealizadas().get().subscribe((event) => { 
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").orderBy("idcomisionregistro").orderBy("mesescredito").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
              this.comisionlinealizadamodel.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
              pase = true;
              return this.comisionlinealizadamodel.comisionlinealizada;
            }) 
            if (pase) { 
              var pass = false;
              this.comisionlinealizadamodel.comisiones = new Array<Comisiones>();
              this.coberturaservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").get().then((events) => {
                  events.forEach(element => {
                    this.comisionlinealizadamodel.comisiones.push(JSON.parse(JSON.stringify(element.data())))
                    pass = true;
                    return this.comisionlinealizadamodel.comisiones;
                  }) 
                  if (pass) {
                    this.openModalConsultarLinealizadas(this.comisionlinealizadamodel);
                  }else{
                    this.alertPage.presentAlert("No tienes comisiones linealizadas a consultar.")  
                  }
                });
              });
            } else {
              this.alertPage.presentAlert("No tienes comisiones linealizadas a consultar.")
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
  consultarComisionesLinealizadasMensual() {
    this.comisionlinealizadamodel.comisionlinealizada = new Array<ComisionLinealizada>();
    if (this.optionselectintermediario === 'open') {
      var paso = false;
      this.tiposlineas.forEach(element => {
        if (element.idlinea === this.selectlinea.idlinea) {
          this.selectlinea = element
          paso = true;
        }
      });
      if (paso) {
        var pase = false;
        this.coberturaservice.getComisionesLinealizadasMensual().get().subscribe((event) => {
          event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").orderBy("idcomisionregistro").orderBy("mesescredito").orderBy("creadoen").get().then((events) => {
            events.forEach(element => {
              this.comisionlinealizadamodel.comisionlinealizada.push(JSON.parse(JSON.stringify(element.data())))
              pase = true;
              return this.comisionlinealizadamodel.comisionlinealizada;
            })
            if (pase) {
              var pass = false;
              this.comisionlinealizadamodel.comisiones = new Array<Comisiones>();
              this.coberturaservice.getComisionesPeriodosCobertura().get().subscribe((event) => {
                event.query.where("intermediario", "==", this.selectintermediario.nit).where("idlinea", "==", this.selectlinea.idlinea).orderBy("idcomision").get().then((events) => {
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
              this.alertPage.presentAlert("No tienes comisiones linealizadas a consultar.")
            }
          })
        })
      }
    } else {
      this.alertPage.presentAlert("Selecciona un Intermediario.")
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
  selector: 'modalperiodocoberturaver-page',
  templateUrl: 'periodocoberturamodalver.page.html',
  styleUrls: ['periodocobertura.page.scss']
})
export class ModalVerPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() esquemaunicomodel: EsquemaUnicoAnticipadoModel
  optionsearch: string;
  esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
  displayedColumnsEsquemaUnico: string[] = ['idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver', 'historico'];
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorEsquemaUnico', { read: MatPaginator }) paginatorEsquemaUnico: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController,
    private alertPage: AlertPage,
    private coberturaservice: PeriodoCoberturaService,
    private auth:AuthService) { }
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

  /**
*  Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openhistorico(EsquemaUnicoAnticipado);  
* @param EsquemaUnicoAnticipado
* @return openHistoricoModal(EsquemaUnicoAnticipado);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openhistorico(doc: EsquemaUnicoAnticipado) {
    this.openHistoricoModal(doc)
  }
  /**
* Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openHistoricoModal(EsquemaUnicoAnticipado);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openHistoricoModal(element: EsquemaUnicoAnticipado) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.esquemaunicomodel.comisiones.forEach(comision => {
            if (parseFloat(element.idcomision) === parseFloat(comision.idcomision)) {
              this.coberturaservice.crearHistoricoEsquemaUnico(element, this.user, comision.nombrefile);
              this.coberturaservice.hitoricoCobertura(element, this.user);
              const index: number = this.esquemaunicomodel.comisiones.indexOf(comision);
              this.esquemaunicomodel.comisiones.splice(index, 1);
              this.dataSourceComision = new MatTableDataSource<any>(this.esquemaunicomodel.comisiones);
              setTimeout(() => this.dataSourceComision.paginator = this.paginatorComisiones);
            }
          });
          const index: number = this.esquemaunicomodel.esquemaunicoanticipado.indexOf(element);
          this.esquemaunicomodel.esquemaunicoanticipado.splice(index, 1);
          this.dataSource = new MatTableDataSource<any>(this.esquemaunicomodel.esquemaunicoanticipado);
          setTimeout(() => this.dataSource.paginator = this.paginatorEsquemaUnico);
          this.alertPage.presentAlert("Éxito, periodo de comisión enviado al histórico")
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
  selector: 'modalperiodocoberturavermensual-page',
  templateUrl: 'periodocoberturamodalvermensual.page.html',
  styleUrls: ['periodocobertura.page.scss']
})
export class ModalVerMensualPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() esquemaunicomodel: EsquemaUnicoAnticipadoModel
  optionsearch: string;
  esquemaunico: EsquemaUnicoAnticipado = new EsquemaUnicoAnticipado();
  displayedColumnsEsquemaUnico: string[] = ['idcomision', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver', 'historico'];
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorEsquemaUnico', { read: MatPaginator }) paginatorEsquemaUnico: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController,
    private alertPage: AlertPage,
    private coberturaservice: PeriodoCoberturaService,
    private auth: AuthService) { }
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

  /**
*  Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openhistorico(EsquemaUnicoAnticipado);  
* @param EsquemaUnicoAnticipado
* @return openHistoricoModal(EsquemaUnicoAnticipado);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openhistorico(doc: EsquemaUnicoAnticipado) {
    this.openHistoricoModal(doc)
  }
  /**
* Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openHistoricoModal(EsquemaUnicoAnticipado);  
* @param EsquemaUnicoAnticipado
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openHistoricoModal(element: EsquemaUnicoAnticipado) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.esquemaunicomodel.comisiones.forEach(comision => {
            if (parseFloat(element.idcomision) === parseFloat(comision.idcomision)) {
              this.coberturaservice.crearHistoricoEsquemaMensaul(element, this.user, comision.nombrefile);
              this.coberturaservice.hitoricoCoberturaMensual(element, this.user);
              const index: number = this.esquemaunicomodel.comisiones.indexOf(comision);
              this.esquemaunicomodel.comisiones.splice(index, 1);
              this.dataSourceComision = new MatTableDataSource<any>(this.esquemaunicomodel.comisiones);
              setTimeout(() => this.dataSourceComision.paginator = this.paginatorComisiones);
            }
          });
          const index: number = this.esquemaunicomodel.esquemaunicoanticipado.indexOf(element);
          this.esquemaunicomodel.esquemaunicoanticipado.splice(index, 1);
          this.dataSource = new MatTableDataSource<any>(this.esquemaunicomodel.esquemaunicoanticipado);
          setTimeout(() => this.dataSource.paginator = this.paginatorEsquemaUnico);
          this.alertPage.presentAlert("Éxito, periodo de comisión enviado al histórico")
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
  selector: 'modalperiodocoberturaverlinealizada-page',
  templateUrl: 'periodocoberturamodalverlinealizada.page.html',
  styleUrls: ['periodocobertura.page.scss']
})
export class ModalVerLinealizadaPage implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  @Input() comisionlinealizadamodel: ComisionesLinealizadasModel
  optionsearch: string = 'search';
  comisionlinealizada: ComisionLinealizada = new ComisionLinealizada();
  displayedColumnsComisiones: string[] = ['idcomision', 'nombrefile'];
  displayedColumnsComisionLinealizada: string[] = ['idcomision', 'mesescredito', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'ver', 'historico'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceComision: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginatorComisionLinealizada', { read: MatPaginator }) paginatorComisionLinealizada: MatPaginator;
  @ViewChild('paginatorComisiones', { read: MatPaginator }) paginatorComisiones: MatPaginator;
  constructor(private modalController: ModalController,
    private alertPage: AlertPage,
    private cargador: CargadorService,
    private coberturaservice: PeriodoCoberturaService ) { }
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

  /**
*  Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openhistorico(EsquemaUnicoAnticipado);  
* @param ComisionLinealizada
* @return openHistoricoModal(ComisionLinealizada);
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openhistorico(doc: ComisionLinealizada) {
    this.openHistoricoModal(doc)
  }
  /**
* Abre periodocoberturamodalhistorico.page.html  
* Metodo principal:openHistoricoModal(ComisionLinealizada);  
* @param ComisionLinealizada
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async openHistoricoModal(elementComision: ComisionLinealizada) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          var paso = false;
          this.cargador.getCargador(2000) 
          let comisionlinealizada: ComisionLinealizada[] = new Array<ComisionLinealizada>();
          this.comisionlinealizadamodel.comisionlinealizada.forEach(element => {
            if (element.idcoleccion === elementComision.idcoleccion ) {
              comisionlinealizada.push(element)
              paso = true;
            }
          }); 
          if (paso) {  
            var act = false
            this.comisionlinealizadamodel.comisiones.forEach(element => {
              if(elementComision.idcomision == element.idcomision){
                elementComision.nombrefile = element.nombrefile
                act = true
              }
            });
            if(!act){
              elementComision.nombrefile = "NULL"
            }
              if (elementComision.idlinea === '2') {
                this.coberturaservice.crearHistoricoLinealizado(comisionlinealizada, this.user, elementComision.nombrefile)
                this.coberturaservice.hitoricoCoberturaLinealizada(comisionlinealizada, this.user)
                this.alertPage.presentAlert("Éxito, periodo de comisión enviado al histórico").then(() => {
                  this.cerrarConsultar();
                })
              }
              if ( elementComision.idlinea === '4') {
                this.coberturaservice.crearHistoricoLinealizado(comisionlinealizada, this.user, elementComision.nombrefile)
                this.coberturaservice.hitoricoCoberturaLinealizadaMensual(comisionlinealizada, this.user)
                this.alertPage.presentAlert("Éxito, periodo de comisión enviado al histórico").then(() => {
                  this.cerrarConsultar();
                })
              } 
          }
        }
      });
    return await modal.present();

  }

}




