/**
 * CREACIÓN DE USUARIOS PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
* Copyright 2020-2021 Start HASTECNOLOGIA S.A.S 
* @author HASTECNOLOGIA S.A.S Copyright 2020-2021 The FUNDACION SAN JOSE Authors
* pathweb=(HASTECNOLOGIA SAS/menu/creacionusuarios)
* pathAplicationConfig=creacionusuarios.page.html
* SecurityContext: @angular/fire/auth, APPLICATION_XML,'Access-Control-Allow-Origin' (solo por peticion Get se accede a este metodo)
* creacionusuarios v0.0.1 (HASTECNOLOGIA SAS/menu/creacionusuarios) 
* Copyright 2020-2021 FUNDACION SAN JOSE, Inc. 
* Licensed under MIT (HASTECNOLOGIA SAS)
 * @author HASTECNOLOGIA S.A.S
 */
import * as XLSX from 'xlsx';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreacionUsuariosService } from '../../services/creacionusuarios.service';
import { AlertPage } from '../../alert/alert.page';
import { User } from '../../model/user.model';
import { Intermediario } from '../../model/intermediario.model';
import { Rol } from '../../model/rol.model';
import { TipoDocumento } from '../../model/tipodocumento.model';
import { Estado } from '../../model/estado.model';
import { Pais } from '../../model/pais.model';
import { Region } from '../../model/region.model';
import { DatePage } from '../../util/date.page';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
import { ModalController } from '@ionic/angular';
import { Count, CountFiles } from '../../model/count.model';
import { AuthService } from '../../services/auth.service';
import { TipoLinea } from '../../model/tipolinea.model';
import { TipoLineaIntermediario } from '../../model/tipolineaintermediario.model';
import { UserUpdate } from '../../model/userupdate.model';
import { CargadorService } from '../../services/cargador.services';
import * as $ from 'jquery';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { Campana } from '../../model/campana.model';
import { Manager } from '../../model/manager.model';
import { ExcelGarantias } from '../../model/excelgarantias.model';
import { CarteraModal } from '../../model/carteramodal.model';
import { Seguimiento } from '../../model/seguimiento.model';

/**
 * CONTROLADOR DE LA PAGINA CONSULTA Y CREACION DE USUARIOS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'app-creacionusuarios',
  templateUrl: 'creacionusuarios.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class CreacionUsuariosPage implements OnInit {

  intermediario: Intermediario = new Intermediario();
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  modalregister: string = 'close';
  modalSuperMaestro: string = 'close';
  modalCoordinador: string = 'close';
  modalCampanas: string = 'close';
  modalManager: string = 'close';
  modalconsulta: string = 'close';
  constructor(private date: DatePage, private cargador: CargadorService,
    private creacionUsuariosService: CreacionUsuariosService,
    private alertPage: AlertPage,
    private modalController: ModalController,
    private auth: AuthService) {
    this.cargador.getCargador(1500);
    this.user = JSON.parse(sessionStorage.getItem('userSession'));
  }

  ngOnInit() { 
       
     
    this.auth.loginUser(this.user).then(res => {
      if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
        this.getIntermediarios()
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
* Consulta Intermediario metodo unico software. 
 * Metodo principal:getIntermediarios(); 
 * @param user 
 * @return Intermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getIntermediarios() {
    //this.alertPage.presentAlert('Espere por favor.')
    if (this.modalconsulta === 'close') {
      this.modalconsulta = 'open';
      this.intermediario = new Intermediario();
      this.intermediario.optionsearchintermediario = 'searchintermediario';
      this.intermediario.intermediarios = new Array<Intermediario>();
      var userToLogin = this.creacionUsuariosService.getIntermediarios().get().subscribe((event) => {
        if (this.user.role === 'Super Maestro') {
          event.forEach(element => {
            this.intermediario.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
            return this.intermediario.intermediarios;
          });
        } if (this.user.role === 'Intermediario') {
          event.forEach(element => {
            let intermediario: Intermediario = new Intermediario()
            intermediario = JSON.parse(JSON.stringify(element.data()))
            if (intermediario.email === this.user.email) {
              this.intermediario.intermediarios.push(intermediario)
            }
            return this.intermediario.intermediarios;
          });
        } if (this.user.role === 'Maestro') {
          event.forEach(element => {
            let intermediario: Intermediario = new Intermediario()
            intermediario = JSON.parse(JSON.stringify(element.data()))
            if (intermediario.nit === this.user.maestro) {
              this.intermediario.intermediarios.push(intermediario)
            }
            return this.intermediario.intermediarios;
          });
        }
        if (this.intermediario.intermediarios.length > 0) {
          this.verModalCreacionModal(this.intermediario);
        } else {
          this.alertPage.presentAlert("Por favor ingresar intermediarios.");
        }
        return userToLogin;
      });
    } else {
      this.modalconsulta = 'close'
    }

  }

  /**
  *  Abre creacionusuariosmodal.page.html intermediario nuevo 
   * Metodo principal:verModalCreacionNew();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  verModalCreacionNew() {
    if (this.modalregister === 'close') {
      this.modalregister = 'open';
      this.intermediario = new Intermediario();
      this.intermediario.optiontipoesquemacomisionregister = 'permissionstipoesquema';
      this.intermediario.optionintermediario = 'addintermediario';
      this.intermediario.optiondocuintermediario = 'closetdocuintermediario'
      this.intermediario.optiondocuhistintermediario = 'closethistdocuintermediario'
      this.intermediario.optiontipoesquemacomision = 'closetipoesquema';
      this.verModalCreacionModal(this.intermediario);
    } else {
      this.modalregister = 'close'
    }
  }

  /**
  *  Abre creacionusuariosmodal.page.html intermediario nuevo 
   * Metodo principal:verModalCreacionNew();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  verModalSuperMaestro() {
    if (this.modalSuperMaestro === 'close') {
      this.modalSuperMaestro = 'open';
      this.verModalSuperMaestroModal();
    } else {
      this.modalSuperMaestro = 'close'
    }
  }

  /**
    *  Abre creacionusuariosmodal.page.html intermediario nuevo 
     * Metodo principal:verModalCreacionNew();  
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  verModalCoordinador() {
    if (this.modalCoordinador === 'close') {
      this.modalCoordinador = 'open';
      this.verModalCoordinadorModal();
    } else {
      this.modalCoordinador = 'close'
    }
  }

  /**
    *  Abre creacionusuariosmodal.page.html intermediario nuevo 
     * Metodo principal:verModalCreacionNew();  
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  verModalCampanas() {
    if (this.modalCampanas === 'close') {
      this.modalCampanas = 'open';
      this.verModalCampanasModal();
    } else {
      this.modalCampanas = 'close'
    }
  }
  /**
    *  Abre creacionusuariosmodal.page.html intermediario nuevo 
     * Metodo principal:verModalCreacionNew();  
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  verModalManager() {
    if (this.modalManager === 'close') {
      this.modalManager = 'open';
      this.verModalManagerModal();
    } else {
      this.modalManager = 'close'
    }
  }
  /**
*  Abre creacionusuariosmodal.page.html intermediario 
 * Metodo principal:verModalCreacionModal();  
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async verModalCreacionModal(intermediario: Intermediario) {
    this.cargador.getCargador(0)
    const modal = await this.modalController.create({
      component: ModalVerPage,
      cssClass: 'my-custom-class-ver',
      componentProps: { intermediario }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.alertPage.closeAlert()
        var datapase = true;
        const user = data['data'];
        this.modalconsulta = 'close';
        this.modalregister = 'close';
        (user === undefined) ? datapase = false : null;
        if (datapase) {
          this.intermediario = user;
          if (this.intermediario.optionintermediario === 'addintermediario') {
            this.registerIntermediario();
          }
          if (this.intermediario.optionintermediario === 'editintermediario') {
            this.ngOnInit();
          }
        }
      });
    return await modal.present();
  }

  /**
*  Abre creacionusuariosmodal.page.html intermediario 
* Metodo principal:verModalCreacionModal();  
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async verModalSuperMaestroModal() {
    this.cargador.getCargador(0)
    const modal = await this.modalController.create({
      component: ModalSuperMaestroPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();
  }

  /**
*  Abre creacionusuariosmodal.page.html intermediario 
* Metodo principal:verModalCreacionModal();  
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async verModalCoordinadorModal() {
    this.cargador.getCargador(0)
    const modal = await this.modalController.create({
      component: ModalCoordinadorPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();
  }

  /**
*  Abre creacionusuariosmodal.page.html intermediario 
* Metodo principal:verModalCreacionModal();  
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async verModalCampanasModal() {
    this.cargador.getCargador(0)
    const modal = await this.modalController.create({
      component: ModalCampanasPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();
  }
  /**
*  Abre creacionusuariosmodal.page.html intermediario 
* Metodo principal:verModalCreacionModal();  
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  async verModalManagerModal() {
    this.cargador.getCargador(0)
    const modal = await this.modalController.create({
      component: ModalManagerPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();
  }
  /**
  * Registrar Intermediario metodo unico software. 
 * Metodo principal:registerIntermediario(); 
 * @param intermediario 
 * @return alertPage;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  registerIntermediario() {
    this.intermediario.creadoen = this.date.getDate();
    this.intermediario.creadopor = this.user.email;
    this.intermediario.modificadoen = this.date.getDate();
    this.intermediario.modificadopor = this.user.email;
    this.intermediario.modificacioncausa = 'Primer creación';
    this.intermediario.rol = this.intermediario.role;
    this.intermediario.maestro = this.intermediario.nit;
    this.intermediario.histemail = this.intermediario.email;
    this.creacionUsuariosService.registerValidateUserIntermediario(this.intermediario, this.user).then(res => {
      this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediario.email + ' Creado.');
      this.ngOnInit()
    }, error => {
      this.alertPage.presentAlert("Correo existente. / " + error.message);
      this.ngOnInit()
    });
  }


}



/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN APROBAR CARGUE GARANTIA SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'editarvaloresintermediario.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalEditarValoresIntermediarioPage implements OnInit {

  intermediario: Intermediario = JSON.parse(sessionStorage.getItem('histintermediario'));
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  constructor(private alertPage: AlertPage, private modalController: ModalController, private creacionUsuariosService: CreacionUsuariosService) { }
  ngOnInit() {

  }

  /**
  * Opción cancelar historico comisiones. 
   * Metodo principal:cancelarEliminacion();  
   * @return dismiss(cancelar);
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  cancelarEliminacion() {
    this.dismiss()
  }

  /**
 * Opción cerrar historico comisiones.  
  * Metodo principal:dismiss(confirmacion);  
  * @return dismiss(confirmacion);
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }
  /**
    * Opción cerrar historico comisiones.  
     * Metodo principal:dismiss(confirmacion);  
     * @return dismiss(confirmacion);
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  calcular() {
    this.creacionUsuariosService.updateValoresIntermediario(this.intermediario).then(() => {
      this.alertPage.presentAlert('Exito! Valor del intermediario actualizado.').then(() => {
        this.dismiss()
      })
    }).catch(() => {
      this.alertPage.presentAlert('Error! Ingrese todos valor del intermediario.').then(() => {
      })
    })

  }
  /**
    * Opción cerrar historico comisiones.  
     * Metodo principal:dismiss(confirmacion);  
     * @return dismiss(confirmacion);
     * AUTH GOOGLE CLOUD FIREBASE SERVICE
     * @author Giovanny Uribe Acevedo
     */
  calcularInt() {
    this.creacionUsuariosService.updateValoresIntermediarioInt(this.intermediario).then(() => {
      this.alertPage.presentAlert('Exito! Valor del intermediario actualizado.').then(() => {
        this.dismiss()
      })
    }).catch(() => {
      this.alertPage.presentAlert('Error! Ingrese todos valor del intermediario.').then(() => {
      })
    })

  }
}
/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
export class Presupuesto {
  idcoleccion
  presupuesto
  fecha
  creadopor
  creadoen
  modificadopor
  modificadoen
}
@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodalsupermaestro.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalSuperMaestroPage implements OnInit {

  confirmacion: string = 'cancelar';
  displayedColumnsSuperM: string[] = ['email', 'edit', 'delete'];
  displayedColumnsPresupuesto: string[] = ['presupuesto', 'fecha', 'delete'];
  dataSourceSuper: MatTableDataSource<any> = new MatTableDataSource();
  dataSourcePresupuesto: MatTableDataSource<any> = new MatTableDataSource();
  user: User = new User();
  useredit: User = new User();
  validateuser: User = new User();
  users: User[] = [];
  estados: Estado[] = [];
  edit = "false";
  presupuestos: Presupuesto[] = [] = new Array;
  presupuesto: Presupuesto = new Presupuesto();
  usersession: User = JSON.parse(sessionStorage.getItem('userSession'));
  @ViewChild('paginatorSuper', { read: MatPaginator }) paginatorSuper: MatPaginator;
  @ViewChild('paginatorPresupuesto', { read: MatPaginator }) paginatorPresupuesto: MatPaginator;
  constructor(private auth:AuthService,private modalController: ModalController, private date: DatePage, private alertPage: AlertPage, private creacionUsuariosService: CreacionUsuariosService) {
  }
  ngOnInit() { 
    
     
    this.edit = "false";
    this.user = new User();
    this.users = new Array();
    this.presupuesto = new Presupuesto();
    this.presupuestos = new Array(); 
    this.creacionUsuariosService.getAfs().collection("users").where("role", "==", 'Super Maestro').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: User = JSON.parse(JSON.stringify(doc.data()))
          this.users.push(garantia)
        });
        this.dataSourceSuper = new MatTableDataSource<any>(this.users);
        setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    this.creacionUsuariosService.getAfs().collection("presupuesto").orderBy("fecha").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Presupuesto = JSON.parse(JSON.stringify(doc.data()))
          this.presupuestos.push(garantia)
        });
        this.dataSourcePresupuesto = new MatTableDataSource<any>(this.presupuestos);
        setTimeout(() => this.dataSourcePresupuesto.paginator = this.paginatorPresupuesto);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    this.getEstado();
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  validateEmail(email): boolean {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false) {
      return false;
    } else {
      return true;
    }
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  RegisterUsuario() {
    this.user.role = "Super Maestro";
    if (this.user.email) {
      if (this.validateEmail(this.user.email)) {
        if (this.user.password) {
          if (this.user.password === this.user.passwordcheck) {
            if (this.user.nombre) {
              if (this.user.estado) {
                this.user.creadoen = this.date.getDate();
                this.user.creadopor = this.user.email;
                this.user.modificadoen = this.date.getDate();
                this.user.modificadopor = this.user.email;
                this.creacionUsuariosService.registerUserSuperMaestroAuth(this.user, this.usersession).then(res => {
                  this.alertPage.presentAlert('Exito! Usuario ' + this.user.email + ' Creado!').then(() => {
                    this.ngOnInit();
                  });

                }, error => {
                  this.alertPage.presentAlert("Correo Existente / " + error.message + ".").then(() => {
                    this.ngOnInit();
                  });;
                });
              } else {
                this.alertPage.presentAlert("Por favor ingresar estado.");
              }
            } else {
              this.alertPage.presentAlert("Por favor ingresar nombre.");
            }
          } else {
            this.alertPage.presentAlert("Las contraseñas no coinciden.");
          }
        } else {
          this.alertPage.presentAlert("Por favor ingresar contraseña.");
        }
      } else {
        this.alertPage.presentAlert("Por favor ingresar E-mail Correcto.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar correo electrónico.");
    }

  }

  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  RegisterPresupuesto() {
    if (this.presupuesto.presupuesto) {
      if (this.presupuesto.fecha) {
        this.creacionUsuariosService.registerPresupuesto(this.presupuesto, this.usersession).then(() => {
          this.alertPage.presentAlert("Exito presupuesto creado.").then(() => {
            this.ngOnInit();
          });
        })
      } else {
        this.alertPage.presentAlert("Por favor ingresar fecha.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar presupuesto.");
    }

  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getEstado() {
    this.estados = new Array<Estado>();
    this.creacionUsuariosService.getEstado().get().subscribe((event) => {
      event.forEach(element => {
        this.estados.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }

  /**
   * Controlador opción  eliminar Usuario intermediario Confirmacion  
   * Metodo principal:eliminarUsuarioConfirmacion();  
   * @param User 
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  eliminarUsuarioConfirmacion(doc: User) {
    this.openEliminacionModal(doc)
  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEliminacionModal(element: User) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deleteUser(element, this.usersession)
          const index: number = this.users.indexOf(element);
          this.users.splice(index, 1);
          this.dataSourceSuper = new MatTableDataSource<any>(this.users);
          setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
        }
      });
    return await modal.present();

  }


  /**
   * Controlador opción  eliminar Usuario intermediario Confirmacion  
   * Metodo principal:eliminarUsuarioConfirmacion();  
   * @param User 
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  eliminarPresupuestoConfirmacion(doc: Presupuesto) {
    this.openEliminacionPresupuestoModal(doc)
  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEliminacionPresupuestoModal(element: Presupuesto) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deletePresupuesto(element)
          const index: number = this.presupuestos.indexOf(element);
          this.presupuestos.splice(index, 1);
          this.dataSourcePresupuesto = new MatTableDataSource<any>(this.presupuestos);
          setTimeout(() => this.dataSourcePresupuesto.paginator = this.paginatorPresupuesto);
        }
      });
    return await modal.present();

  }

  verModalEdit(user) {
    this.edit = "true";
    this.validateuser = user;
  }

  closeEdit() {
    this.edit = "false";
    this.validateuser = new User();
  }

  /**
 * Editar usuario Intermediario metodo unico editar al software. 
* Metodo principal:registerIntermediario(); 
* @param intermediario.userupdate
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateUser() {
    if (this.useredit.histpassword) {
      if (this.useredit.histpassword === this.validateuser.password) {
        if (this.useredit.password) {
          if (this.useredit.password === this.useredit.passwordcheck) {
            this.user.role.trim();
            this.useredit.email = this.validateuser.email
            this.useredit.histpassword = this.validateuser.password
            this.useredit.estado = this.validateuser.estado
            this.useredit.modificadopor = this.usersession.email;
            this.useredit.modificadoen = this.date.getDate();
            this.useredit.modificacioncausa = "Edición Clave Acceso Figatech.";
            this.creacionUsuariosService.updateUser(this.useredit, this.usersession).then(res => {
              this.alertPage.presentAlert('Exito!. Usuario ' + this.validateuser.email + ' actualizado.');
              this.dismiss("");
            });
          } else {
            this.alertPage.presentAlert("Confirmación de clave nueva no coincide.")
          }
        } else {
          this.alertPage.presentAlert("Ingrese clave nueva.")
        }
      } else {
        this.alertPage.presentAlert("La clave actual no coincide.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese clave actual.")
    }
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
    this.dataSourceSuper.data.forEach(element => {

    });
    this.dataSourceSuper.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSuper.paginator) {
      this.dataSourceSuper.paginator.firstPage();
    }
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE INSTITUCIÓNS. 
* Metodo principal:applyFilterIntermediarios(); 
* @param string 
* @return dataSourceIntermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterPresupuesto(filterValue: string) {
    this.dataSourcePresupuesto.data.forEach(element => {

    });
    this.dataSourcePresupuesto.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePresupuesto.paginator) {
      this.dataSourcePresupuesto.paginator.firstPage();
    }
  }
  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}

/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
const EntityRole: Rol[] = [
  { rol: 'Coordinador' }, { rol: 'Cobrador' }
]
@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodalcoordinador.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalCoordinadorPage implements OnInit {

  confirmacion: string = 'cancelar';
  displayedColumnsSuperM: string[] = ['email', 'rol', 'edit', 'delete'];
  dataSourceSuper: MatTableDataSource<any> = new MatTableDataSource();
  user: User = new User();
  useredit: User = new User();
  validateuser: User = new User();
  users: User[] = [];
  estados: Estado[] = [];
  role = EntityRole;
  edit = "false";
  usersession: User = JSON.parse(sessionStorage.getItem('userSession'));
  @ViewChild('paginatorSuper', { read: MatPaginator }) paginatorSuper: MatPaginator;
  constructor(private modalController: ModalController, private auth:AuthService, private date: DatePage, private alertPage: AlertPage, private creacionUsuariosService: CreacionUsuariosService) {
  }
  ngOnInit() {
    this.edit = "false";
    this.user = new User();
    this.users = new Array(); 
     
     
    this.creacionUsuariosService.getAfs().collection("users").where("role", "==", 'Coordinador').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: User = JSON.parse(JSON.stringify(doc.data()))
          this.users.push(garantia)
        });
        this.dataSourceSuper = new MatTableDataSource<any>(this.users);
        setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    this.creacionUsuariosService.getAfs().collection("users").where("role", "==", 'Cobrador').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: User = JSON.parse(JSON.stringify(doc.data()))
          this.users.push(garantia)
        });
        this.dataSourceSuper = new MatTableDataSource<any>(this.users);
        setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    this.getEstado();
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  validateEmail(email): boolean {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false) {
      return false;
    } else {
      return true;
    }
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  RegisterUsuario() { 
    if (this.user.email) {
      if (this.validateEmail(this.user.email)) {
        if (this.user.password) {
          if (this.user.password === this.user.passwordcheck) {
            if (this.user.nombre) {
              if (this.user.estado) {
                if (this.user.role) {
                  this.user.role.replace(/\s{2,}/g, ' ').trim();
                  this.user.creadoen = this.date.getDate();
                  this.user.creadopor = this.usersession.email;
                  this.user.modificadoen = this.date.getDate();
                  this.user.modificadopor = this.usersession.email;
                  this.creacionUsuariosService.registerUserSuperMaestroAuth(this.user, this.usersession).then(res => {
                    this.alertPage.presentAlert('Exito! Usuario ' + this.user.email + ' Creado!').then(() => {
                      this.ngOnInit();
                    });

                  }, error => {
                    this.alertPage.presentAlert("Correo Existente / " + error.message + ".").then(() => {
                      this.ngOnInit();
                    });;
                  });
                } else {
                  this.alertPage.presentAlert("Por favor ingresar rol.");
                }
              } else {
                this.alertPage.presentAlert("Por favor ingresar estado.");
              }
            } else {
              this.alertPage.presentAlert("Por favor ingresar nombre.");
            }
          } else {
            this.alertPage.presentAlert("Las contraseñas no coinciden.");
          }
        } else {
          this.alertPage.presentAlert("Por favor ingresar contraseña.");
        }
      } else {
        this.alertPage.presentAlert("Por favor ingresar E-mail Correcto.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar correo electrónico.");
    }

  }

  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getEstado() {
    this.estados = new Array<Estado>();
    this.creacionUsuariosService.getEstado().get().subscribe((event) => {
      event.forEach(element => {
        this.estados.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }

  /**
   * Controlador opción  eliminar Usuario intermediario Confirmacion  
   * Metodo principal:eliminarUsuarioConfirmacion();  
   * @param User 
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  eliminarUsuarioConfirmacion(doc: User) {
    this.openEliminacionModal(doc)
  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEliminacionModal(element: User) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deleteUser(element, this.usersession)
          const index: number = this.users.indexOf(element);
          this.users.splice(index, 1);
          this.dataSourceSuper = new MatTableDataSource<any>(this.users);
          setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
        }
      });
    return await modal.present();

  }

  verModalEdit(user) {
    this.edit = "true";
    this.validateuser = user;
  }

  closeEdit() {
    this.edit = "false";
    this.validateuser = new User();
  }

  /**
 * Editar usuario Intermediario metodo unico editar al software. 
* Metodo principal:registerIntermediario(); 
* @param intermediario.userupdate
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateUser() {
    if (this.useredit.password) {
      if (this.useredit.password === this.useredit.passwordcheck) {
        this.useredit.email = this.validateuser.email
        this.useredit.histpassword = this.validateuser.password
        this.useredit.estado = this.validateuser.estado
        this.useredit.modificadopor = this.usersession.email;
        this.useredit.modificadoen = this.date.getDate();
        this.useredit.modificacioncausa = "Edición Clave Acceso Figatech.";
        this.creacionUsuariosService.updateUser(this.useredit, this.usersession).then(res => {
          this.alertPage.presentAlert('Exito!. Usuario ' + this.validateuser.email + ' actualizado.');
          this.dismiss("");
        });
      } else {
        this.alertPage.presentAlert("Confirmación de clave nueva no coincide.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese clave nueva.")
    }

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
    this.dataSourceSuper.data.forEach(element => {

    });
    this.dataSourceSuper.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSuper.paginator) {
      this.dataSourceSuper.paginator.firstPage();
    }
  }
  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}

/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodalcampanas.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalCampanasPage implements OnInit {

  confirmacion: string = 'cancelar';
  displayedColumnsSuperM: string[] = ['email', 'rol', 'delete'];
  dataSourceSuper: MatTableDataSource<any> = new MatTableDataSource();
  campana: Campana = new Campana();
  users: User[] = [];
  intermediarios: any[] = [];
  campanas: Campana[] = [];
  edit = "false";
  usersession: User = JSON.parse(sessionStorage.getItem('userSession'));
  @ViewChild('paginatorSuper', { read: MatPaginator }) paginatorSuper: MatPaginator;
  constructor(private modalController: ModalController, private date: DatePage, private alertPage: AlertPage, private creacionUsuariosService: CreacionUsuariosService
    ,private auth:AuthService) {
  }
  ngOnInit() {
    
     
    this.edit = "false";
    this.campana = new Campana();
    this.getCobrador();
    this.getIntemediarios();
    this.getCampanas();
  }

  getCobrador() {
    this.users = new Array();
    this.creacionUsuariosService.getAfs().collection("users").where("role", "==", 'Cobrador').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: User = JSON.parse(JSON.stringify(doc.data()))
          this.users.push(garantia)
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
  validateEmail(email): boolean {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false) {
      return false;
    } else {
      return true;
    }
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  validaExistenciaCampana(campana: Campana): boolean {
    var resolvedFlag = false;
    this.campanas.forEach(element => {
      if (parseInt(campana.intermediario) == parseInt(element.intermediario) && campana.cobrador == element.cobrador) {
        resolvedFlag = true;

      }
    });
    return resolvedFlag;
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  RegisterUsuario() {
    if (this.campana.intermediario) {
      if (this.campana.cobrador) {
        if (!this.validaExistenciaCampana(this.campana)) {
          this.campana.creadopor = this.usersession.email;
          this.campana.creadoen = this.date.getDate();
          this.campana.modificadopor = this.usersession.email;
          this.campana.modificadoen = this.date.getDate();
          this.campana.modificacioncausa = "Primer Creación";
          const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          let autoId = ''
          for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
              Math.floor(Math.random() * CHARS.length)
            )
          }
          this.campana.idcampana = autoId;
          this.creacionUsuariosService.getAfs().collection("campana").doc(autoId).set({
            idcampana: this.campana.idcampana,
            intermediario: this.campana.intermediario,
            cobrador: this.campana.cobrador,
            creadopor: this.campana.creadopor,
            creadoen: this.campana.creadoen,
            modificadopor: this.campana.modificadopor,
            modificadoen: this.campana.modificadoen,
            modificacioncausa: this.campana.modificacioncausa
          }).then(() => {
            this.alertPage.presentAlert("Exito!, campaña creada.")
            this.ngOnInit();
          })
        } else {
          this.alertPage.presentAlert("Campaña ya asignada.")
        }
      } else {
        this.alertPage.presentAlert("Ingrese cobrador.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese intermediario.")
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
    this.creacionUsuariosService.getAfs().collection("intermediarios").get().then((event) => {
      event.forEach(element => {
        this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }


  filterItems(query) {
    const array = this.intermediarios.filter((el) => el.sigla.toLowerCase().includes(query.toLowerCase()));
    this.intermediarios = array;
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCampanas() {
    this.campanas = new Array<Campana>();
    this.creacionUsuariosService.getAfs().collection("campana").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var camp: Campana = JSON.parse(JSON.stringify(doc.data()))
          this.campanas.push(camp)
        });
        this.dataSourceSuper = new MatTableDataSource<any>(this.campanas);
        setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);

      }).then(() => {
        this.campanas.forEach(elementcamp => {
          this.intermediarios.forEach(elementint => {
            if (parseInt(elementcamp.intermediario) == parseInt(elementint.nit)) {
              elementcamp.intermediarionombre = elementint.sigla;
            }
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  /**
   * Controlador opción  eliminar Usuario intermediario Confirmacion  
   * Metodo principal:eliminarUsuarioConfirmacion();  
   * @param User 
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  eliminarUsuarioConfirmacion(doc: Campana) {
    this.openEliminacionModal(doc)
  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEliminacionModal(element: Campana) {
    const modal = await this.modalController.create({
      component: ModalCampanaPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deleteCampana(element, this.usersession)
          const index: number = this.campanas.indexOf(element);
          this.campanas.splice(index, 1);
          this.dataSourceSuper = new MatTableDataSource<any>(this.campanas);
          setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
        }
      });
    return await modal.present();

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
    this.dataSourceSuper.data.forEach(element => {

    });
    this.dataSourceSuper.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSuper.paginator) {
      this.dataSourceSuper.paginator.firstPage();
    }
  }
  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}
/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodalmanager.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalManagerPage implements OnInit {

  confirmacion: string = 'cancelar';
  displayedColumnsTipoEsquema: string[] = ['esquema', 'delete'];
  dataSourceSuper: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceFinal: MatTableDataSource<any> = new MatTableDataSource();
  managersup: Manager = new Manager();
  managerfin: Manager = new Manager();
  managersups: Manager[] = [];
  managerfins: Manager[] = [];
  usersession: User = JSON.parse(sessionStorage.getItem('userSession'));
  @ViewChild('paginatorSuper', { read: MatPaginator }) paginatorSuper: MatPaginator;
  @ViewChild('paginatorFinal', { read: MatPaginator }) paginatorFinal: MatPaginator;
  constructor(private modalController: ModalController, private auth: AuthService, private alertPage: AlertPage, private creacionUsuariosService: CreacionUsuariosService) {
  }
  ngOnInit() {   
    this.managersup = new Manager();
    this.managerfin = new Manager();
    this.getTipoCaracterizacion();
    this.getTipoFinal();
  }

  getTipoCaracterizacion() {
    this.managersups = new Array();
    this.creacionUsuariosService.getAfs().collection("tipocaracterizacion").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Manager = JSON.parse(JSON.stringify(doc.data()))
          this.managersups.push(garantia)
        });
        this.dataSourceSuper = new MatTableDataSource<any>(this.managersups);
        setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);

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
    this.creacionUsuariosService.getAfs().collection("tipofinal").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var garantia: Manager = JSON.parse(JSON.stringify(doc.data()))
          this.managerfins.push(garantia)
        });
        this.dataSourceFinal = new MatTableDataSource<any>(this.managerfins);
        setTimeout(() => this.dataSourceFinal.paginator = this.paginatorFinal);

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
  validaExistenciaCampana(campana: Manager): boolean {
    var resolvedFlag = false;
    this.managersups.forEach(element => {
      if (campana.descripcion == element.descripcion) {
        resolvedFlag = true;
      }
    });
    return resolvedFlag;
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  validaExistenciaFinal(campana: Manager): boolean {
    var resolvedFlag = false;
    this.managerfins.forEach(element => {
      if (campana.descripcion == element.descripcion) {
        resolvedFlag = true;
      }
    });
    return resolvedFlag;
  }
  /**
* Registrar Usuario Intermediario metodo unico registro al software. 
* Metodo principal:RegisterUsuario(); 
* @param newUser 
* @return alertPage;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  agregarTipoCaracterizacion() {
    if (this.managersup.descripcion) {
      if (!this.validaExistenciaCampana(this.managersup)) {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let autoId = ''
        for (let i = 0; i < 20; i++) {
          autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
          )
        }
        this.managersup.idmanage = autoId;
        this.creacionUsuariosService.getAfs().collection("tipocaracterizacion").doc(autoId).set({
          idmanage: this.managersup.idmanage,
          descripcion: this.managersup.descripcion
        }).then(() => {
          this.alertPage.presentAlert("Exito!, Caracterización creada.").then(() => {
            this.ngOnInit();
          })
        })
      } else {
        this.alertPage.presentAlert("Tipo Caraterización ya ingresada.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese Tipo Caraterización.")
    }

  }
  /**
 * Registrar Usuario Intermediario metodo unico registro al software. 
 * Metodo principal:RegisterUsuario(); 
 * @param newUser 
 * @return alertPage;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  agregarTipoFinal() {
    if (this.managerfin.descripcion) {
      if (!this.validaExistenciaFinal(this.managerfin)) {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let autoId = ''
        for (let i = 0; i < 20; i++) {
          autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
          )
        }
        this.managerfin.idmanage = autoId;
        this.creacionUsuariosService.getAfs().collection("tipofinal").doc(autoId).set({
          idmanage: this.managerfin.idmanage,
          descripcion: this.managerfin.descripcion
        }).then(() => {
          this.alertPage.presentAlert("Exito!, Final de llamada creada.").then(() => {
            this.ngOnInit();
          })
        })
      } else {
        this.alertPage.presentAlert("Final de llamada ya ingresada.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese Final de llamada.")
    }

  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async eliminarTipoCaracterizacion(element: Manager) {
    const modal = await this.modalController.create({
      component: ModalTipoPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {  
          this.creacionUsuariosService.deleteTipo(element, this.usersession);
          const index: number = this.managersups.indexOf(element);
          this.managersups.splice(index, 1);
          this.dataSourceSuper = new MatTableDataSource<any>(this.managersups);
          setTimeout(() => this.dataSourceSuper.paginator = this.paginatorSuper);
        }
      });
    return await modal.present();

  }
  /**
   * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
   * Metodo principal:openEliminacionModal();  
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  async eliminarTipoFinal(element: Manager) {
    const modal = await this.modalController.create({
      component: ModalTipoPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {         
          this.creacionUsuariosService.deleteTipoFinal(element, this.usersession);
          const index: number = this.managerfins.indexOf(element);
          this.managerfins.splice(index, 1);
          this.dataSourceFinal = new MatTableDataSource<any>(this.managerfins);
          setTimeout(() => this.dataSourceFinal.paginator = this.paginatorFinal);
        }
      });
    return await modal.present();

  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE INSTITUCIÓNS. 
* Metodo principal:applyFilterIntermediarios(); 
* @param string 
* @return dataSourceIntermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterdataSourceSuper(filterValue: string) {
    this.dataSourceSuper.data.forEach(element => {

    });
    this.dataSourceSuper.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSuper.paginator) {
      this.dataSourceSuper.paginator.firstPage();
    }
  }

  applyFilterdataSourceFinal(filterValue: string) {
    this.dataSourceFinal.data.forEach(element => {

    });
    this.dataSourceFinal.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceFinal.paginator) {
      this.dataSourceFinal.paginator.firstPage();
    }
  }
  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}
/**
 * CONTROLADOR DE LA PAGINA CREACION DE INSTITUCIÓNS SOFTWARE FUNDACION SAN JOSE MODALVER123
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modalcreacionusuariosver-page',
  templateUrl: 'creacionusuariosmodal.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalVerPage implements OnInit {
  displayedColumnsIntermediario: string[] = ['nombre', 'vermas', 'edit', 'users', 'cobertura'];
  displayedColumnsIntermediarios: string[] = ['nombre', 'vermas', 'edit', 'users', 'cobertura', 'administracion', 'ivaadministracion', 'comisiontotal', 'cantidadgarantias', 'saldototal', 'cert'];
  displayedColumnsIntermediarioExcel: string[] = ['email', 'nombre', 'telefono', 'role', 'estado', 'fechalimitereporte', 'tipodocumento', 'documento', 'nit', 'pais', 'region', 'descripcion', 'direccion', 'ciudad', 'contacto', 'trabajocontacto', 'telefonocontacto', 'emailcontacto', 'personacorres', 'trabajopersonacorres', 'emailpersonacorres', 'telefonopersonacorres', 'coberturacreditomora', 'cargues', 'cantidadgarantias'];
  count: CountFiles[] = [];
  counts: Count[] = [];
  displayedColumns: string[] = ['documento', 'nombre', 'telefono', 'role', 'email', 'ver', 'edit', 'delete'];
  displayedColumnsDocs: string[] = ['nameDoc', 'nameFile', 'delete'];
  displayedColumnsTipoEsquema: string[] = ['esquema', 'delete'];
  displayedColumnsTipoEsquemaver: string[] = ['esquema'];
  displayedColumnsConsultDocs: string[] = ['tipfile', 'file', 'fecha'];
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  rol: Rol[] = [];
  tipodocumentos: TipoDocumento[] = [];
  estados: Estado[] = [];
  paises: Pais[] = [];
  regiones: Region[] = [];
  dataSourceFiles: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceFileshist: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceTipoComision: MatTableDataSource<any> = new MatTableDataSource();
  @Input() intermediario: Intermediario;
  excelseguimiento: ExcelGarantias[] = [];
  intermediarionew: Intermediario;
  newUser: User = new User();
  histintermediario: Intermediario;
  selectlinea: TipoLinea = new TipoLinea();
  tiposlineas: TipoLinea[] = [];
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  intermediarios: Intermediario[] = [];
  carteramodal: CarteraModal = new CarteraModal();
  checknormal = false;
  checkdoble = false;
  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  @ViewChild('paginatorUsurs', { read: MatPaginator }) paginatorUsurs: MatPaginator;
  @ViewChild('paginatorFiles', { read: MatPaginator }) paginatorFiles: MatPaginator;
  @ViewChild('paginatorFilesHist', { read: MatPaginator }) paginatorFilesHist: MatPaginator;
  @ViewChild('paginatorTipoEsquema', { read: MatPaginator }) paginatorTipoEsquema: MatPaginator;
  constructor(private auth:AuthService,private cargador: CargadorService, private date: DatePage, private alertPage: AlertPage, private modalController: ModalController, private creacionUsuariosService: CreacionUsuariosService, private cert: ServidorCorreoService) {
  }
  ngOnInit() {  
    this.getRol();
    this.getRegion();
    this.getTipoDocumento();
    this.getPais();
    this.getEstado();
    this.getCount();
    this.getTiposLineas();
    this.getCounts();
    this.checknormal = false;
    this.checkdoble = false;
    if (this.intermediario.optionsearchintermediario === 'searchintermediario') {
      this.intermediarios = this.intermediario.intermediarios
      this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
      setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
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

  isAllSelectedNormal() {
    if (!this.intermediario.checknormal) {
      this.intermediario.checknormal = true;
      if (!this.intermediario.checkdoble) {
        this.creacionUsuariosService.getAfs().collection('intermediarios').doc(this.intermediario.email).update({
          checknormal: this.intermediario.checknormal
        }).then(() => {
          this.alertPage.presentAlert("Exito cuenta de cobro normal activada.").then(() => {
            this.closeSearchModal()
          });
        })
      } else {
        this.alertPage.presentAlert("Error cuenta de cobro dividida activada.").then(() => {
          this.closeSearchModal()
        });
      }

    } else {
      this.intermediario.checknormal = false;
      this.creacionUsuariosService.getAfs().collection('intermediarios').doc(this.intermediario.email).update({
        checknormal: this.intermediario.checknormal
      }).then(() => {
        this.alertPage.presentAlert("Exito cuenta de cobro normal inactivada.").then(() => {
          this.closeSearchModal()
        });
      })
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

  isAllSelectedDoble() {
    if (!this.intermediario.checkdoble) {
      this.intermediario.checkdoble = true;
      if (!this.intermediario.checknormal) {
        this.creacionUsuariosService.getAfs().collection('intermediarios').doc(this.intermediario.email).update({
          checkdoble: this.intermediario.checkdoble
        }).then(() => {
          this.alertPage.presentAlert("Exito cuenta de cobro dividida activada.").then(() => {
            this.closeSearchModal()
          });
        })
      } else {
        this.alertPage.presentAlert("Error cuenta de cobro normal activada.").then(() => {
          this.closeSearchModal()
        });
      }

    } else {
      this.intermediario.checkdoble = false;
      this.creacionUsuariosService.getAfs().collection('intermediarios').doc(this.intermediario.email).update({
        checkdoble: this.intermediario.checkdoble
      }).then(() => {
        this.alertPage.presentAlert("Exito cuenta de cobro dividida inactivada.").then(() => {
          this.closeSearchModal()
        });
      })
    }
  }
  /**
 * Consulta contadores cartera metodo unico software. 
  * Metodo principal:getCount();  
  * @return Count[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCounts() {
    this.counts = new Array<Count>();
    this.creacionUsuariosService.getCount().doc('countgarantias').get().subscribe((event) => {
      var count: any = event.data()
      var countadd: Count = new Count();
      countadd.count = count.count
      countadd.indexcount = count.indexcount
      this.counts.push(countadd)
    });
  }

  updateInfoIntermediario(intermediario: Intermediario) {
    this.creacionUsuariosService.getAfs().collection('intermediarios').doc(intermediario.email).get().then((querySnapshot) => {
      var int: Intermediario = JSON.parse(JSON.stringify(querySnapshot.data()))
      sessionStorage.setItem('histintermediario', JSON.stringify(int))
    })
  }

  /**
*  Abre creacionusuariosmodal.page.html intermediario seleccionado 
 * Metodo principal:verModalCreacionEdit();  
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  verModalCreacionEdit(intermediario: Intermediario) {
    this.intermediario = intermediario;
    this.intermediario.optiontipoesquemacomision = 'closetipoesquema';
    this.intermediario.optiontipoesquemacomisionregister = 'permissionstipoesquema';
    this.intermediario.optionintermediario = 'editintermediario';
    this.intermediario.optioneditpassword = 'close';
    this.intermediario.optionedituserintermediario = 'close';
    this.intermediario.optionsearchintermediario = 'closetsearchintermediario';
    this.intermediario.modificacioncausaedit = '';
    sessionStorage.setItem('histintermediario', JSON.stringify(this.intermediario))
    this.intermediario.uploadfiles = new Array<UploadFilesIntermediario>();
    this.dataSourceFiles = new MatTableDataSource<any>(this.intermediario.uploadfiles);
    setTimeout(() => this.dataSourceFiles.paginator = this.paginatorFiles);
    this.optionTipoEsquemaComisionEdit()
  }
  /**
  *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
   * Metodo principal:verModalCreacionEdit();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  /**
  *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
   * Metodo principal:verModalCreacionEdit();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  generateCert(intermediario: Intermediario) {
    this.cert.getCert(intermediario).subscribe(response => {
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
    }, error => console.log(error));
  }
  /**
 *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
  * Metodo principal:verModalCreacionEdit();  
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  editarValoresIntermediario() {
    this.openEditarValoresIntermediario()
  }

  /**
 * Abre garantiasmodalaprobar.page.html 
 * Metodo principal:openHistoricoModal(GarantiasTotal);  
 * @param EsquemaUnicoAnticipado
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEditarValoresIntermediario() {
    const modal = await this.modalController.create({
      component: ModalEditarValoresIntermediarioPage,
      cssClass: 'my-custom-class-garantia'
    });
    modal.onDidDismiss()
      .then((data) => {
        this.updateInfoIntermediario(this.intermediario)
      });
    return await modal.present();

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
  *  Abre creacionusuariosmodal.page.html intermediario seleccionado 
   * Metodo principal:verModalCreacionVer();  
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  verModalCreacionVer(intermediario: Intermediario) {
    this.cargador.getCargador(0)
    this.intermediario = intermediario;
    this.intermediario.optionintermediario = 'verintermediario';
    this.intermediario.optioncreateuser = 'permissionsusers';
    this.intermediario.optionuser = 'closeusers';
    this.intermediario.optionusersregister = 'permissionsusers';
    this.intermediario.optiontipoesquemacomision = 'closetipoesquema';
    this.intermediario.optiontipoesquemacomisionregister = 'permissionstipoesquema';
    this.intermediario.optiondocuintermediario = 'closetdocuintermediario';
    this.intermediario.optiondocuhistintermediario = 'closethistdocuintermediario';
    this.intermediario.optionsearchintermediario = 'closetsearchintermediario';
    this.checknormal = this.intermediario.checknormal;
    this.optionTipoEsquemaComisionVer();
    this.consultarDocumentosIntermediario()
    this.optionUsers()
    this.consultarDocumentosHistoricosIntermediario()
  }


  /**
* Consulta Usuarios Intermediario metodo unico software. 
 * Metodo principal:consultarUsuarios(intermediario); 
 * @param intermediario 
 * @return users[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarUsuarios(intermediario: Intermediario): any {
    var paso = false;
    this.intermediario.users = new Array<User>();
    var userToLogin = this.creacionUsuariosService.getUsers().get().subscribe((event) => {
      event.query.where('maestro', '==', intermediario.nit).get().then((events) => {
        let user = new User()
        if (this.user.role != 'Maestro') {
          events.forEach(element => {
            user = JSON.parse(JSON.stringify(element.data()))
            if (user.role != 'Intermediario') {
              this.intermediario.users.push(user)
              paso = true;
            }
            return this.intermediario.users;
          });
        } else {
          events.forEach(element => {
            user = JSON.parse(JSON.stringify(element.data()))
            if (user.role != 'Intermediario' && user.maestropermission === this.user.maestropermission) {
              this.intermediario.users.push(user)
              paso = true;
            }
            return this.intermediario.users;
          });
        }
        if (this.intermediario.users.length > 0) {
          this.intermediario.optionsearchintermediario = 'closetsearchintermediario'
          this.intermediario.optionsearch = 'searchusersintermediario';
          this.dataSource = new MatTableDataSource<any>(this.intermediario.users);
          setTimeout(() => this.dataSource.paginator = this.paginatorUsurs);
        } else {
          this.alertPage.presentAlert("Por favor ingresar usuarios al intermediario.");
        }
      })
      return userToLogin;
    });
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
    this.creacionUsuariosService.getCount().doc('countfiles').get().subscribe((events) => {
      this.count.push(JSON.parse(JSON.stringify(events.data())))
    })
  }
  /**
 * Consulta roles metodo unico software. 
  * Metodo principal:getRol();  
  * @return Rol[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getRol() {
    this.rol = new Array<Rol>();
    this.creacionUsuariosService.getRol().get().subscribe((event) => {
      event.forEach(element => {
        let roles = new Rol();
        roles = JSON.parse(JSON.stringify(element.data()))
        if (this.user.role === 'Maestro') {
          if (roles.rol != 'Maestro') {
            this.rol.push(roles)
          }
        } else {
          this.rol.push(roles)
        }
      });
    });
  }
  /**
 * Consulta regiones metodo unico software. 
  * Metodo principal:getRegion();  
  * @return Region[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getRegion() {
    this.regiones = new Array<Region>();
    this.creacionUsuariosService.getRegion().get().subscribe((event) => {
      event.forEach(element => {
        this.regiones.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }
  /**
 * Consulta tipo documento metodo unico software. 
  * Metodo principal:getTipoDocumento();  
  * @return TipoDocumento[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getTipoDocumento() {
    this.tipodocumentos = new Array<TipoDocumento>();
    this.creacionUsuariosService.getTipoDocumento().get().subscribe((event) => {
      event.forEach(element => {
        this.tipodocumentos.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }
  /**
 * Consulta Pais metodo unico software. 
  * Metodo principal:getPais();  
  * @return Pais[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getPais() {
    this.paises = new Array<Pais>();
    this.creacionUsuariosService.getPais().get().subscribe((event) => {
      event.forEach(element => {
        this.paises.push(JSON.parse(JSON.stringify(element.data())))
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
  getEstado() {
    this.estados = new Array<Estado>();
    this.creacionUsuariosService.getEstado().get().subscribe((event) => {
      event.forEach(element => {
        this.estados.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }
  /**
 *  Cierra creacionusuariosmodal.page.html metodo unico software. 
  * Metodo principal:getEstado();  
  * @return creacionusuarios.page.html;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  closeModal() {
    this.intermediario = new Intermediario();
    this.modalController.dismiss();
  }
  /**
*  Cierra creacionusuariosmodal.page.html metodo unico software. 
 * Metodo principal:getEstado();  
 * @return creacionusuarios.page.html;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  closeSearchModal() {
    this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
    setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
    this.intermediario.optionintermediario = 'closetintermediario';
    this.intermediario.optionsearch = 'closetsearchusersintermediario';
    this.intermediario.optionsearchintermediario = 'searchintermediario';
    this.getIntermediarios()
  }

  getIntermediarios() {
    this.intermediario.intermediarios = new Array<Intermediario>();
    var userToLogin = this.creacionUsuariosService.getIntermediarios().get().subscribe((event) => {
      if (this.user.role === 'Super Maestro') {
        event.forEach(element => {
          this.intermediario.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
          return this.intermediario.intermediarios;
        });
      } if (this.user.role === 'Intermediario') {
        event.forEach(element => {
          let intermediario: Intermediario = new Intermediario()
          intermediario = JSON.parse(JSON.stringify(element.data()))
          if (intermediario.email === this.user.email) {
            this.intermediario.intermediarios.push(intermediario)
          }
          return this.intermediario.intermediarios;
        });
      } if (this.user.role === 'Maestro') {
        event.forEach(element => {
          let intermediario: Intermediario = new Intermediario()
          intermediario = JSON.parse(JSON.stringify(element.data()))
          if (intermediario.nit === this.user.maestro) {
            this.intermediario.intermediarios.push(intermediario)
          }
          return this.intermediario.intermediarios;
        });
      }
      if (this.intermediario.intermediarios.length > 0) {
        this.intermediarios = this.intermediario.intermediarios
        this.dataSourceIntermediario = new MatTableDataSource<any>(this.intermediarios);
        setTimeout(() => this.dataSourceIntermediario.paginator = this.paginatorIntermediarios);
      }
      return userToLogin;
    });
  }

  /**
  * Registrar Intermediario metodo unico registro al software. 
 * Metodo principal:registerIntermediario(); 
 * @param intermediario 
 * @return alertPage;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  registerIntermediario() {
    this.intermediario.role = 'Intermediario'
    if (this.intermediario.tipodocumento) {
      if (this.intermediario.documento) {
        if (this.intermediario.email) {
          if (this.intermediario.password) {
            if (this.intermediario.password.length >= 8) {
              if (this.intermediario.password === this.intermediario.passwordcheck) {
                if (this.intermediario.nombre) {
                  if (this.intermediario.telefono) {
                    if (this.intermediario.estado) {
                      if (this.intermediario.fechalimitereporte) {
                        if (this.intermediario.nit) {
                          if (this.intermediario.sigla) {
                            if (this.intermediario.lineasintermediario.length > 0) {
                              this.modalController.dismiss(this.intermediario)
                            } else {
                              this.alertPage.presentAlert("Por favor ingresar al menos un tipo de esquema comisión.");
                            }
                          } else {
                            this.alertPage.presentAlert("Por favor ingresar SIGLA Intermediario.");
                          }

                        } else {
                          this.alertPage.presentAlert("Por favor ingresar NIT Intermediario.");
                        }
                      } else {
                        this.alertPage.presentAlert("Por favor ingresar fecha limite reporte.");
                      }
                    } else {
                      this.alertPage.presentAlert("Por favor ingresar estado.");
                    }
                  } else {
                    this.alertPage.presentAlert("Por favor ingresar telefono.");
                  }
                } else {
                  this.alertPage.presentAlert("Por favor ingresar nombre.");
                }
              } else {
                this.alertPage.presentAlert("Las contraseñas no coinciden.");
              }
            } else {
              this.alertPage.presentAlert("Por favor ingresar contraseña mayor a 8 caracteres.");
            }
          } else {
            this.alertPage.presentAlert("Por favor ingresar contraseña.");
          }
        } else {
          this.alertPage.presentAlert("Por favor ingresar  correo electrónico.");
        }
      } else {
        this.alertPage.presentAlert("Por favor ingresar documento.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar tipo Documento.");
    }
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
 * Metodo principal:changeListener();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  changeListenerSeguimiento($event, string: string): void {
    this.readThisSeguimiento($event.target, string);

  }

  /**
* Controlador opción crear cartera tipo comisión
* Metodo principal:crearGarantiasComisiones();  
* @return crearGarantias();
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearSeguimientos() {
    this.crearSeguimientosCobranza();
  }

  /**
 * Controlador opción crear cartera
 * Metodo principal:crearGarantias();  
 * @return cartera;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  crearSeguimientosCobranza() {
    this.carteramodal.seguimientos = new Array<Seguimiento>();
    var validacion = false;
    var message = "";
    this.excelseguimiento.forEach(element => {
      let garantia: Seguimiento = new Seguimiento();
      if (element[0] !== 'CEDULA DEUDOR') {
        garantia.documento = element[0]
      }
      if (element[1] !== 'NOMBRE DEUDOR') {
        garantia.nombredeudor = element[1]
      }
      if (element[2] !== 'CELULAR') {
        garantia.celular = parseInt(element[2])
      }
      if (element[3] !== 'MAIL') {
        garantia.mail = element[3]
      }
      if (element[4] !== 'DIRECCION') {
        garantia.direccion = element[4]
      }
      if (element[5] !== 'SEGUIMIENTO') {
        garantia.seguimiento = element[5]
      }
      if (element[6] !== 'FECHA COMPROMISO') {
        garantia.fechacompromiso = this.ExcelDateToJSDate(element[6])
      }
      if (element[7] !== 'FECHA PROXIMA LLAMADA') {
        garantia.fechaproxima = this.ExcelDateToJSDate(element[7])
      }
      if (element[8] !== 'CARACTERIZACION') {
        garantia.caracterizacion = element[8]
      }
      if (element[9] !== 'FINAL LLAMADA') {
        garantia.finllamada = element[9]
      }
      if (element[10] !== 'VALOR A PAGAR') {
        garantia.valorapagar = element[10]
      }
      if (element[11] !== 'DIAS MORA') {
        garantia.diasmora = element[11]
      }
      if (element[12] !== 'VALOR CAPITAL') {
        garantia.valorcapital = element[12]
      }
      garantia.estado = "CARGADO"
      var valida = true;
      var validaident = true;
      var validaplazo = true;
      var validasaldo = true;
      var validacobertura = true;
      var validanrocredito = true;
      var validanropagare = true;
      (garantia.documento == '' || garantia.documento == null) ? valida = false : null;
      (garantia.nombredeudor == '' || garantia.nombredeudor == null) ? validaident = false : null;
      (garantia.celular == '' || garantia.celular == null) ? validaplazo = false : null;
      (garantia.seguimiento == '' || garantia.seguimiento == null) ? validasaldo = false : null;
      (garantia.valorcapital == '' || garantia.valorcapital == null) ? validacobertura = false : null;
      (garantia.caracterizacion == '' || garantia.caracterizacion == null) ? validanrocredito = false : null;
      (garantia.finllamada == '' || garantia.finllamada == null) ? validanropagare = false : null;
      if (valida && validaident && validasaldo && validaplazo && validacobertura && validanrocredito && validanropagare) {
        this.carteramodal.seguimientos.push(garantia)
        return validacion = true;
      }
    }
    );
    if (!validacion) {
      this.alertPage.presentAlert("Error!. " + "Cargue de cartera de formato nulo. " + message).then(() => {
        this.ngOnInit();
        this.updateIntermediario()
      })
    }
    if (validacion) {
      this.cargador.getCargador(50 * this.carteramodal.seguimientos.length)
      this.counts.forEach(element => {
        var index = element.count + 1
        this.creacionUsuariosService.crearSeguimiento(this.carteramodal.seguimientos, this.intermediario, this.user, element)
        this.alertPage.presentAlert("Éxito!. " + "Cargue de seguimientos" + ". Identificador: " + index + " creado.").then(() => {
          this.excelseguimiento = new Array<ExcelGarantias>();
          this.ngOnInit();
          this.updateIntermediario()
        })
      });
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
    this.creacionUsuariosService.getIntermediarios().get().subscribe((event) => {
      event.query.where("email", "==", this.intermediario.email).get().then((events) => {
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
    var hour = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
    var day = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();

    return day + "/ " + hour;
  }

  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {

      if (string === 'Id Representante') {
        this.intermediario.idrepresentante = file.name
      }
      if (string === 'Rut') {
        this.intermediario.rut = file.name
      }
      if (string === 'Camara de Comercio') {
        this.intermediario.camaracomercio = file.name
      }
      if (string === 'Certificación Bancaria') {
        this.intermediario.certificacionbancaria = file.name
      }
      if (string === 'Contrato') {
        this.intermediario.contrato = file.name
      }
      if (string === 'Otros si') {
        this.intermediario.otrossi = file.name
      }
      if (string === 'fotoperfil') {
        this.intermediario.fotoperfil = file.name
      }

      this.count.forEach(element => {
        this.creacionUsuariosService.updateCount(element.countfiles + 1);
        let uploadfile = new UploadFilesIntermediario();
        uploadfile.nit = this.intermediario.nit
        uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
        uploadfile.fileToUpload = file;
        uploadfile.tipfile = string;
        if (string === 'fotoperfil') {
          $("#avatarImg")[0].src = myReader.result
        }
        uploadfile.fecha = this.date.getDate();
        this.getCount();
        this.intermediario.uploadfiles.push(uploadfile);
        this.dataSourceFiles = new MatTableDataSource<any>(this.intermediario.uploadfiles);
        setTimeout(() => this.dataSourceFiles.paginator = this.paginatorFiles);
      });
    }
    myReader.readAsDataURL(file);
  }

  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThisSeguimiento(inputValue: any, string: string): void {
    /* wire up file reader */
    this.excelseguimiento = new Array<ExcelGarantias>();
    this.intermediario.uploadfiles = new Array<UploadFilesIntermediario>();
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
            this.excelseguimiento.push(parseexcel)
          });
          this.count.forEach(element => {
            this.creacionUsuariosService.updateCount(element.countfiles + 1);
            let uploadfile = new UploadFilesIntermediario();
            uploadfile.nit = this.intermediario.nit
            uploadfile.nombrefile = '-' + element.countfiles + '-' + file.name;
            uploadfile.fileToUpload = file;
            uploadfile.tipfile = string;
            this.intermediario.uploadfiles.push(uploadfile);
            this.getCount();
          });
        };
        reader.readAsBinaryString(target.files[0]);
      } else {
        this.alertPage.presentAlert("Ingresar formato excel.")
      }
    }
  }

  /**
 *  Elimina archivo leido metodo unico software. 
  * Metodo principal:deleteDoc();  
  * @return UploadFilesIntermediario[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  deleteDoc(element: UploadFilesIntermediario) {
    if (element.nombrefile === 'Id Representante') {
      this.intermediario.idrepresentante = ''
    }
    if (element.nombrefile === 'Rut') {
      this.intermediario.rut = ''
    }
    if (element.nombrefile === 'Camara de Comercio') {
      this.intermediario.camaracomercio = ''
    }
    if (element.nombrefile === 'Certificación Bancaria') {
      this.intermediario.certificacionbancaria = ''
    }
    if (element.nombrefile === 'Contrato') {
      this.intermediario.contrato = ''
    }
    if (element.nombrefile === 'Otros si') {
      this.intermediario.otrossi = ''
    }
    const index: number = this.intermediario.uploadfiles.indexOf(element);
    this.intermediario.uploadfiles.splice(index, 1);
    this.dataSourceFiles = new MatTableDataSource<any>(this.intermediario.uploadfiles);
    setTimeout(() => this.dataSourceFiles.paginator = this.paginatorFiles);
  }


  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS. 
* Metodo principal:applyFilterFiles(); 
* @param string 
* @return dataSourceFiles[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterFiles(filterValue: string) {
    this.dataSourceFiles.data.forEach(element => {

    });
    this.dataSourceFiles.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceFiles.paginator) {
      this.dataSourceFiles.paginator.firstPage();
    }
  } /**
  * FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS. 
  * Metodo principal:applyFilterFiles(); 
  * @param string 
  * @return dataSourceFiles[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  applyFilterFilesHist(filterValue: string) {
    this.dataSourceFileshist.data.forEach(element => {

    });
    this.dataSourceFileshist.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceFileshist.paginator) {
      this.dataSourceFileshist.paginator.firstPage();
    }
  }
  /**
* FILTRO PARA PERMITIR LA BUSQUEDA DE ARCHIVOS. 
* Metodo principal:applyFilterTipoComision(); 
* @param string 
* @return dataSourceTipoComision[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  applyFilterTipoComision(filterValue: string) {
    this.dataSourceTipoComision.data.forEach(element => {

    });
    this.dataSourceTipoComision.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTipoComision.paginator) {
      this.dataSourceTipoComision.paginator.firstPage();
    }
  }
  /**
 * Controlador opción creación usuarios intermediarios 
 * Metodo principal:optionUsers();  
 * @return intermediario.optionuser;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  optionUsers() {
    if (this.intermediario.optionuser === 'closeusers') {
      this.intermediario.optionuser = 'addusers';
    } else {
      this.intermediario.optionuser = 'closeusers'
    }
  }
  /**
 * Controlador opción creación tipo esquema comision intermediarios 
 * Metodo principal:optionTipoEsquemaComision();  
 * @return intermediario.optiontipoesquemacomision;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  optionTipoEsquemaComision() {
    if (this.intermediario.optiontipoesquemacomision === 'closetipoesquema') {
      this.intermediario.optiontipoesquemacomision = 'addtipoesquema';
    } else {
      this.intermediario.optiontipoesquemacomision = 'closetipoesquema'
    }
  }
  optionTipoEsquemaComisionEdit() {
    if (this.intermediario.optiontipoesquemacomision === 'closetipoesquema') {
      this.intermediario.optiontipoesquemacomision = 'addtipoesquema';
      this.getTiposLineasIntermediario();
    } else {
      this.intermediario.optiontipoesquemacomision = 'closetipoesquema'
    }
  }
  /**
 * Controlador opción creación tipo esquema comision intermediarios 
 * Metodo principal:optionTipoEsquemaComision();  
 * @return intermediario.optiontipoesquemacomision;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  optionTipoEsquemaComisionVer() {
    if (this.intermediario.optiontipoesquemacomision === 'closetipoesquema') {
      this.intermediario.optiontipoesquemacomision = 'vertipoesquema';
      this.getTiposLineasIntermediario();
    } else {
      this.intermediario.optiontipoesquemacomision = 'closetipoesquema'
    }
  }
  /**
  * Consulta Tipos de Linea metodo unico software. 
  * Metodo principal:getTiposLineas();  
  * @return TipoLinea[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getTiposLineasIntermediario() {
    this.intermediario.lineasintermediario = new Array<TipoLineaIntermediario>();
    this.creacionUsuariosService.getTiposLineasIntermediario().get().subscribe((event) => {
      event.query.where("intermediario", "==", this.intermediario.nit).get().then((events) => {
        events.forEach(element => {
          this.intermediario.lineasintermediario.push(JSON.parse(JSON.stringify(element.data())))
          this.dataSourceTipoComision = new MatTableDataSource<any>(this.intermediario.lineasintermediario);
          setTimeout(() => this.dataSourceTipoComision.paginator = this.paginatorTipoEsquema);
          return this.intermediario.lineasintermediario;
        })
      });
    });
  }
  /**
  * Controlador opción creación tipo esquema comision intermediarios 
  * Metodo principal:optionTipoEsquemaComision();  
  * @return intermediario.optiontipoesquemacomision;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  agregarTipoEsquemaComision() {
    if (this.selectlinea.idlinea) {
      this.tiposlineas.forEach(element => {
        if (parseFloat(element.idlinea) === parseFloat(this.selectlinea.idlinea)) {
          let comisionintermediario: TipoLineaIntermediario = new TipoLineaIntermediario();
          comisionintermediario.idlinea = element.idlinea;
          comisionintermediario.nombrelinea = element.nombrelinea;
          comisionintermediario.intermediario = this.intermediario.nit;
          this.intermediario.lineasintermediario.push(comisionintermediario)
        }
      });
      this.dataSourceTipoComision = new MatTableDataSource<any>(this.intermediario.lineasintermediario);
      setTimeout(() => this.dataSourceTipoComision.paginator = this.paginatorTipoEsquema);
    } else {
      this.alertPage.presentAlert("Seleccione tipo de esquema comisión.");
    }
  }
  /**
  * Controlador opción creación tipo esquema comision intermediarios 
  * Metodo principal:optionTipoEsquemaComision();  
  * @return intermediario.optiontipoesquemacomision;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  eliminarTipoEsquemaComision(selectlinea: TipoLineaIntermediario) {
    this.tiposlineas.forEach(element => {
      if (parseFloat(element.idlinea) === parseFloat(selectlinea.idlinea)) {
        const index: number = this.intermediario.lineasintermediario.indexOf(selectlinea);
        this.intermediario.lineasintermediario.splice(index, 1);
      }
    });
    this.dataSourceTipoComision = new MatTableDataSource<any>(this.intermediario.lineasintermediario);
    setTimeout(() => this.dataSourceTipoComision.paginator = this.paginatorTipoEsquema);
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
    this.creacionUsuariosService.getTiposLineas().get().subscribe((event) => {
      event.forEach(element => {
        this.tiposlineas.push(JSON.parse(JSON.stringify(element.data())))
      });
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
  RegisterUsuario() {
    if (this.newUser.role) {
      if (this.newUser.tipodocumento) {
        if (this.newUser.documento) {
          if (this.newUser.documento.length >= 8) {
            if (this.newUser.email) {
              if (this.newUser.password) {
                if (this.newUser.password === this.newUser.passwordcheck) {
                  if (this.newUser.nombre) {
                    if (this.newUser.telefono) {
                      if (this.newUser.telefono.length >= 8) {
                        if (this.newUser.estado) {
                          this.newUser.creadoen = this.date.getDate();
                          this.newUser.creadopor = this.user.email;
                          this.newUser.modificadoen = this.date.getDate();
                          this.newUser.modificadopor = this.user.email;
                          this.newUser.modificacioncausa = 'Primer creación';
                          this.newUser.rol = 'Intermediario';
                          this.newUser.maestro = this.intermediario.nit;
                          this.newUser.permission = this.intermediario.permission;
                          if (this.user.role === 'Maestro') {
                            this.newUser.maestropermission = this.user.maestropermission;
                          } else {
                            this.newUser.maestropermission = this.intermediario.permission;
                          }
                          this.creacionUsuariosService.registerUserAuth(this.newUser, this.user).then(res => {
                            this.alertPage.presentAlert('Exito! Usuario ' + this.newUser.email + ' Creado!');
                            this.newUser = new User();
                          }, error => {
                            this.alertPage.presentAlert("Correo Existente / " + error.message + ".");
                          });
                        } else {
                          this.alertPage.presentAlert("Por favor ingresar estado.");
                        }
                      } else {
                        this.alertPage.presentAlert("Por favor ingresar telefono mayor a 8 caracteres.");
                      }
                    } else {
                      this.alertPage.presentAlert("Por favor ingresar telefono.");
                    }
                  } else {
                    this.alertPage.presentAlert("Por favor ingresar nombre.");
                  }
                } else {
                  this.alertPage.presentAlert("Las contraseñas no coinciden.");
                }
              } else {
                this.alertPage.presentAlert("Por favor ingresar contraseña.");
              }
            } else {
              this.alertPage.presentAlert("Por favor ingresar  correo electrónico.");
            }
          } else {
            this.alertPage.presentAlert("Por favor ingresar documento mayor a 8 caracteres.");
          }
        } else {
          this.alertPage.presentAlert("Por favor ingresar documento.");
        }
      } else {
        this.alertPage.presentAlert("Por favor ingresar tipo documento.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar rol.");
    }
  }

  /**
* consultar Documentos Intermediario metodo unico consulta al software. 
* Metodo principal:consultarDocumentosIntermediario();  
* @return void;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  consultarDocumentosIntermediario() {
    this.getDocuIntermediario(this.intermediario.nit);
  }
  /**
 * consultar Documentos Intermediario metodo unico consulta al software. 
* Metodo principal:getDocuIntermediario(); 
* @param nit 
* @return UploadFilesIntermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getDocuIntermediario(nit: string) {
    var paso = false;
    this.intermediario.uploadfiles = new Array<UploadFilesIntermediario>();
    this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
      return event.query.where("nit", "==", nit).get().then((events) => {
        events.forEach(element => {
          let obj = new UploadFilesIntermediario();
          obj = JSON.parse(JSON.stringify(element.data()))
          this.creacionUsuariosService.TareaLeerCloudStorage(obj.nit + obj.nombrefile).subscribe(function (url) {
            // `url` is the download URL for 'images/stars.jpg'
            obj.urlFileUpload = url
            if (obj.tipfile === "fotoperfil") {
              $("#avatarImg")[0].src = obj.urlFileUpload
            }
          });
          this.intermediario.uploadfiles.push(obj);
          this.dataSourceFiles = new MatTableDataSource<any>(this.intermediario.uploadfiles);
          setTimeout(() => this.dataSourceFiles.paginator = this.paginatorFiles);
          paso = true;
          this.intermediario.intermediariodocu = true;
          return this.intermediario.uploadfiles;
        })
        if (paso === true) {
          if (this.intermediario.intermediariodocu === true) {
            if (this.intermediario.optiondocuintermediario === 'closetdocuintermediario') {
              this.intermediario.optiondocuintermediario = 'verdocuintermediario'
            } else {
              this.intermediario.optiondocuintermediario = 'closetdocuintermediario'
            }
          } else {
            if (this.intermediario.optionintermediario === 'verintermediario') {
              this.alertPage.presentAlert("Por favor ingresar documentación intermediario.");
            }
          }
        } else {
          if (this.intermediario.optionintermediario === 'verintermediario') {
            this.alertPage.presentAlert("Por favor ingresar documentación intermediario.");
          }
        }
      });
    })
  }

  /**
 * consultar Documentos Historico Intermediario metodo unico consulta al software. 
* Metodo principal:getDocuIntermediario(); 
* @param nit 
* @return UploadFilesIntermediario[];
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getHistIntermediario(histnit: string) {
    var paso = false;
    this.intermediario.uploadhistfiles = new Array<UploadFilesIntermediario>();
    this.dataSourceFileshist = new MatTableDataSource<any>(this.intermediario.uploadhistfiles);
    this.creacionUsuariosService.getHistIntermediario().get().subscribe((event) => {
      return event.query.where("nit", "==", histnit).get().then((events) => {
        events.forEach(element => {
          let obj = new UploadFilesIntermediario();
          obj = JSON.parse(JSON.stringify(element.data()))
          this.creacionUsuariosService.TareaLeerCloudStorage(obj.nit + obj.nombrefile).subscribe(function (url) {
            // `url` is the download URL for 'images/stars.jpg'
            obj.urlFileUpload = url
          });
          this.intermediario.uploadhistfiles.push(obj);
          this.dataSourceFileshist = new MatTableDataSource<any>(this.intermediario.uploadhistfiles);
          setTimeout(() => this.dataSourceFileshist.paginator = this.paginatorFilesHist);
          paso = true;
          this.intermediario.intermediariohistdocu = true;
          return this.intermediario.uploadhistfiles;
        })
        if (paso === true) {
          if (this.intermediario.intermediariohistdocu === true) {
            if (this.intermediario.optiondocuhistintermediario === 'closethistdocuintermediario') {
              this.intermediario.optiondocuhistintermediario = 'verdocuhistintermediario'
            } else {
              this.intermediario.optiondocuhistintermediario = 'closethistdocuintermediario'
            }
          } else {
            if (this.intermediario.optionintermediario === 'verintermediario') {
              this.alertPage.presentAlert("Por favor ingresar documentación historica del intermediario.");
            }
          }
        } else {
          if (this.intermediario.optionintermediario === 'verintermediario') {
            this.alertPage.presentAlert("Por favor ingresar documentación historica del intermediario.");
          }
        }
      });
    })
  }
  /**
  * consultar Documentos Historico Intermediario metodo unico consulta al software. 
 * Metodo principal:getDocuIntermediario(); 
 * @param nit 
 * @return UploadFilesIntermediario[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  consultarDocumentosHistoricosIntermediario() {
    this.getHistIntermediario(this.intermediario.nit);
  }

  /**
   * Editar Intermediario metodo unico editar al software. 
  * Metodo principal:registerIntermediario(); 
  * @param intermediario 
  * @return alertPage;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  editarIntermediario() {
    var modificacioncausa = true;
    this.histintermediario = JSON.parse(sessionStorage.getItem('histintermediario'));
    (this.intermediario.modificacioncausaedit == null || this.intermediario.modificacioncausaedit == "") ? modificacioncausa = false : null;
    if (modificacioncausa) {
      var idrepresentante = true;
      var rut = true;
      var camaradecomercio = true;
      var certificacionbancaria = true;
      var contrato = true;
      var otrossi = true;
      var fotoperfil = true;
      (this.histintermediario.idrepresentante == null || this.histintermediario.idrepresentante == "" || this.histintermediario.idrepresentante == " ") ? idrepresentante = false : null;
      (this.histintermediario.rut == null || this.histintermediario.rut == "" || this.histintermediario.rut == " ") ? rut = false : null;
      (this.histintermediario.camaracomercio == null || this.histintermediario.camaracomercio == "" || this.histintermediario.camaracomercio == " ") ? camaradecomercio = false : null;
      (this.histintermediario.certificacionbancaria == null || this.histintermediario.certificacionbancaria == "" || this.histintermediario.certificacionbancaria == " ") ? certificacionbancaria = false : null;
      (this.histintermediario.contrato == null || this.histintermediario.contrato == "" || this.histintermediario.contrato == " ") ? contrato = false : null;
      (this.histintermediario.otrossi == null || this.histintermediario.otrossi == "" || this.histintermediario.otrossi == " ") ? otrossi = false : null;
      (this.histintermediario.fotoperfil == null || this.histintermediario.fotoperfil == "" || this.histintermediario.fotoperfil == " ") ? fotoperfil = false : null;
      if (this.intermediario.uploadfiles) {
        if (this.intermediario.uploadfiles.length >= 0) {
          this.intermediario.uploadfiles.forEach(elements => {
            if (elements.tipfile === 'Id Representante') {
              if (!idrepresentante) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'Rut') {
              if (!rut) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'Camara de Comercio') {
              if (!camaradecomercio) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'Certificación Bancaria') {
              if (!certificacionbancaria) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'Contrato') {
              if (!contrato) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'Otros si') {
              if (!otrossi) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
            if (elements.tipfile === 'fotoperfil') {
              if (!fotoperfil) {
                this.creacionUsuariosService.createDocuIntermediario(elements, this.user);
              } else {
                var paso = true;
                let list = Array<UploadFilesIntermediario>();
                this.creacionUsuariosService.getDocuIntermediario().get().subscribe((event) => {
                  return event.query.where("nit", "==", elements.nit).where("tipfile", "==", elements.tipfile).get().then((events) => {
                    events.forEach(element => {
                      let obj = new UploadFilesIntermediario();
                      obj = JSON.parse(JSON.stringify(element.data()))
                      obj.id = element.id
                      elements.id = element.id
                      list.push(obj);
                      paso = true;
                      return list;
                    })
                    if (paso === true) {
                      list.forEach(element => {
                        this.creacionUsuariosService.createHistIntermediario(element, this.user);
                        this.creacionUsuariosService.updateDocuIntermediario(elements, this.user);
                      });
                    }
                  });
                })
              }
            }
          });
        }
      }
      this.intermediario.modificadoen = this.date.getDate();
      this.intermediario.modificadopor = this.user.email;
      this.intermediario.rol = this.intermediario.role;
      this.intermediario.maestro = this.intermediario.nit;
      var editpassword = true;
      var edituseremail = true;
      (this.intermediario.optioneditpassword == null || this.intermediario.optioneditpassword === "close") ? editpassword = false : null;
      (this.intermediario.optionedituserintermediario == null || this.intermediario.optionedituserintermediario === "close") ? edituseremail = false : null;

      if (editpassword) {
        if (this.intermediario.passwordold === this.intermediario.password) {
          if (this.intermediario.passwordnew) {
            if (this.intermediario.passwordnew === this.intermediario.passwordcheck) {
              this.intermediario.modificacioncausa = this.intermediario.modificacioncausaedit;
              this.intermediario.password = this.intermediario.passwordnew
              this.intermediario.histpassword = this.intermediario.passwordold
              this.creacionUsuariosService.updateIntermediario(this.intermediario, this.user, this.intermediario.uploadfiles, this.intermediario.lineasintermediario).then(res => {
                this.creacionUsuariosService.updateUserIntermediario(this.intermediario, this.user).then()
                this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediario.email + ' actualizado.');
                this.closeModal()
              }, error => {
                this.alertPage.presentAlert("Error existente / " + error.message + ".");
                this.ngOnInit()
              });
            } else {
              this.alertPage.presentAlert("Las contraseñas no coinciden.");
            }
          } else {
            this.alertPage.presentAlert("Ingresa contraseña nueva.");
          }
        } else {
          this.alertPage.presentAlert(" La contraseña anterior no coincide.");
        }
      }
      if (edituseremail) {
        if (this.intermediario.emailold === this.intermediario.email) {
          if (this.intermediario.emailnew) {
            if (this.intermediario.emailnew === this.intermediario.emailcheck) {
              this.intermediarionew = new Intermediario();
              this.intermediarionew = this.intermediario;
              var valida = false;
              (this.intermediarionew.fotoperfil == undefined || this.intermediario.fotoperfil == null) ? valida = true : null;
              if (valida) {
                this.intermediarionew.fotoperfil = " "
              }
              this.editarUsuarioConfirmacion()
            } else {
              this.alertPage.presentAlert("Los email no coinciden.");
            }
          } else {
            this.alertPage.presentAlert("Ingresa email nuevo.");
          }
        } else {
          this.alertPage.presentAlert(" Email anterior no coincide.");
        }
      } else {
        this.intermediario.modificacioncausa = this.intermediario.modificacioncausaedit;
        this.creacionUsuariosService.updateIntermediario(this.intermediario, this.user, this.intermediario.uploadfiles, this.intermediario.lineasintermediario).then(res => {
          this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediario.email + ' actualizado.');
          this.closeSearchModal()
        }, error => {
          this.alertPage.presentAlert("Correo existente. / " + error.message + ".");
          this.ngOnInit()
        });
      }
    } else {
      this.alertPage.presentAlert("Ingrese causa modificación.")
    }
  }



  /**
 * Controlador opción editar Password  intermediario
 * Metodo principal:openEditPassword();  
 * @return intermediario.optioneditpassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  openEditPassword() {
    if (this.intermediario.optioneditpassword === 'close') {
      this.intermediario.optioneditpassword = 'open'
    } else {
      this.intermediario.optioneditpassword = 'close'
    }
  }
  /**
* Controlador opción editar email  intermediario
* Metodo principal:openEditEmail();  
* @return intermediario.optionedituserintermediario;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openEditEmail() {
    if (this.intermediario.optionedituserintermediario === 'close') {
      this.intermediario.optionedituserintermediario = 'open'
    } else {
      this.intermediario.optionedituserintermediario = 'close'
    }
  }

  /**
 * FILTRO PARA PERMITIR LA BUSQUEDA DE USUARIOS. 
 * Metodo principal:applyFilterUsers(); 
 * @param string 
 * @return dataSource[];
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  applyFilterUsers(filterValue: string) {
    this.dataSource.data.forEach(element => {

    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Controlador opción  eliminar Usuario intermediario Confirmacion  
   * Metodo principal:eliminarUsuarioConfirmacion();  
   * @param User 
   * @return void;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  eliminarUsuarioConfirmacion(doc: User) {
    this.openEliminacionModal(doc)
  }
  /**
 * Abre creacionusuariosmodaldelete.page.html usuario seleccionado 
 * Metodo principal:openEliminacionModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEliminacionModal(element: User) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deleteUser(element, this.user)
          const index: number = this.intermediario.users.indexOf(element);
          this.intermediario.users.splice(index, 1);
          this.dataSource = new MatTableDataSource<any>(this.intermediario.users);
          setTimeout(() => this.dataSource.paginator = this.paginatorUsurs);
        }
      });
    return await modal.present();

  }
  /**
 * Controlador opción  eliminar Usuario intermediario Confirmacion  
 * Metodo principal:openEliminacionTipoEsquemaModal();  
 * @param User 
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  eliminarTipoEsquemaConfirmacion(doc: TipoLineaIntermediario) {
    this.openEliminacionTipoEsquemaModal(doc)
  }
  /**
  * Abre creacionusuariosmodaldeletetipocomision.page.html usuario seleccionado 
  * Metodo principal:openEliminacionModal();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openEliminacionTipoEsquemaModal(element: TipoLineaIntermediario) {
    const modal = await this.modalController.create({
      component: ModalDeletePage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.creacionUsuariosService.deleteTipoComision(element, this.user)
          const index: number = this.intermediario.lineasintermediario.indexOf(element);
          this.intermediario.lineasintermediario.splice(index, 1);
          this.dataSourceTipoComision = new MatTableDataSource<any>(this.intermediario.lineasintermediario);
          setTimeout(() => this.dataSourceTipoComision.paginator = this.paginatorTipoEsquema);
        }
      });
    return await modal.present();

  }

  /**
 * Controlador opción  Editar email intermediario Confirmacion  
 * Metodo principal:editarUsuarioConfirmacion();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  editarUsuarioConfirmacion() {
    this.openEditarModal()
  }
  /**
  * Abre creacionusuariosmodaledit.page.html 
  * Metodo principal:openEditarModal();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  async openEditarModal() {
    const modal = await this.modalController.create({
      component: ModalConfirmacionPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          if (this.user.role === 'Super Maestro') {
            this.intermediarionew.modificacioncausa = this.intermediario.modificacioncausaedit;
            this.intermediarionew.email = this.intermediario.emailnew;
            this.creacionUsuariosService.registerValidateUserIntermediario(this.intermediarionew, this.user).then(res => {
              this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediarionew.email + ' creado.');
              this.creacionUsuariosService.deleteIntermediarioUserMaestro(this.intermediario, this.user);
              this.ngOnInit();
              this.closeModal();
            }, error => {
              this.alertPage.presentAlert("Correo existente. / " + error.message + ".");
              this.ngOnInit();
              this.closeModal();
            });
          } else {
            this.editarUsuarioIntermediarioConfirmacion();
          }
        }
      });
    return await modal.present();

  }
  /**
 * Controlador opción  Editar email intermediario Confirmacion intermediario
 * Metodo principal:editarUsuarioIntermediarioConfirmacion();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  editarUsuarioIntermediarioConfirmacion() {
    this.openEditarIntermediarioModal()
  }
  /**
 * Abre creacionusuariosmodaleditintermediario.page.html Confirmacion intermediario
 * Metodo principal:openEditarIntermediarioModal();  
 * @return void;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  async openEditarIntermediarioModal() {
    const modal = await this.modalController.create({
      component: ModalIntermediarioConfirmacionPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data['data'];
        if (user === 'confirmar') {
          this.intermediarionew.modificacioncausa = this.intermediario.modificacioncausaedit;
          this.intermediarionew.email = this.intermediario.emailnew;
          this.creacionUsuariosService.registerValidateUserIntermediario(this.intermediarionew, this.user).then(res => {
            this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediarionew.email + ' creado.');
            this.creacionUsuariosService.deleteIntermediarioUser(this.intermediario);
            this.ngOnInit()
            window.location.reload();
          }, error => {
            this.alertPage.presentAlert("Correo existente. / " + error.message + ".");
            this.ngOnInit()
          });
        }
      });
    return await modal.present();

  }
  /**
  * Controlador opción  Editar usuario intermediario
  * Metodo principal:openEdit(User);  
  * @param User
  * @return intermediario.optionsearch;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  openEdit(doc: User) {
    this.intermediario.userupdate = new UserUpdate();
    this.getEstado();
    this.intermediario.optionsearch = 'edit';
    this.intermediario.userdoc = doc;
  }
  /**
* Controlador opción  ver usuario intermediario
* Metodo principal:openVer(User);  
* @param User
* @return intermediario.optionsearch;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openVer(doc: User) {
    this.intermediario.optionsearch = 'ver';
    this.intermediario.userdoc = doc;
  }

  /**
 * Controlador opción  cerrar editación usuario intermediario
 * Metodo principal:closeEdit();  
 * @param User
 * @return intermediario.optionsearch;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  closeEdit() {
    this.intermediario.optionsearch = 'searchusersintermediario';
  }

  /**
   * Editar usuario Intermediario metodo unico editar al software. 
  * Metodo principal:registerIntermediario(); 
  * @param intermediario.userupdate
  * @return alertPage;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  updateUser() {
    if (this.intermediario.userupdate.estado) {
      if (this.intermediario.userupdate.passactual === this.intermediario.userdoc.password) {
        if (this.intermediario.userupdate.causamodificacion != "" && this.intermediario.userupdate.causamodificacion != null) {
          if (this.intermediario.userupdate.passnueva) {
            this.intermediario.userdoc.password = this.intermediario.userupdate.passnueva;
            this.intermediario.userdoc.histpassword = this.intermediario.userupdate.passactual
            this.intermediario.userdoc.estado = this.intermediario.userupdate.estado
            this.intermediario.userdoc.modificadopor = this.user.email;
            this.intermediario.userdoc.modificadoen = this.date.getDate();
            this.intermediario.userdoc.modificacioncausa = this.intermediario.userupdate.causamodificacion;
            this.creacionUsuariosService.updateUser(this.intermediario.userdoc, this.user).then(res => {
              this.alertPage.presentAlert('Exito!. Usuario ' + this.intermediario.userdoc.email + ' actualizado.');
              this.closeModal();
            });
          } else {
            this.alertPage.presentAlert("Ingrese causa modificación.")
          }
        } else {
          this.alertPage.presentAlert("Ingrese clave nueva.")
        }
      } else {
        this.alertPage.presentAlert("La clave actual no coincide.")
      }
    } else {
      this.alertPage.presentAlert("Ingrese estado.")
    }
  }
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN ELIMINACIÓN USUARIO INSTITUCIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */



@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodaldeletetipo.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalTipoPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodalcampana.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalCampanaPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN ELIMINACIÓN USUARIO INSTITUCIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodaldelete.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN ELIMINACIÓN USUARIO INSTITUCIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodaldeletetipocomision.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalDeletePage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN EDITACIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodaledit.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalConfirmacionPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}


/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN EDITACIÓN CORREO INSTITUCIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'creacionusuariosmodaleditintermediario.page.html',
  styleUrls: ['creacionusuarios.page.scss']
})
export class ModalIntermediarioConfirmacionPage {

  confirmacion: string = 'cancelar';

  constructor(private modalController: ModalController) { }

  confirmarEliminacion() {
    this.confirmacion = 'confirmar'
    this.dismiss(this.confirmacion)
  }

  cancelarEliminacion() {
    this.confirmacion = 'cancelar'
    this.dismiss(this.confirmacion)
  }

  dismiss(confirmacion: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(confirmacion);
  }
}