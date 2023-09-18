/**
*  MENU DE PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
* Copyright 2020-2021 Start HASTECNOLOGIA S.A.S 
* @author HASTECNOLOGIA S.A.S Copyright 2020-2021 The FUNDACION SAN JOSE Authors
* pathweb=(HASTECNOLOGIA SAS/menu/bandeja)
* pathAplicationConfig=menu.page.html
* SecurityContext: @angular/fire/auth, APPLICATION_XML,'Access-Control-Allow-Origin' (solo por peticion Get se accede a este metodo)
* menu v0.0.1 (HASTECNOLOGIA SAS/menu/bandeja) 
* Copyright 2020-2021 FUNDACION SAN JOSE, Inc. 
* Licensed under MIT (HASTECNOLOGIA SAS)
* @author HASTECNOLOGIA S.A.S
*/
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
import { DatePage } from '../../util/date.page';
import { RouterPage } from '../../util/router.page';
import * as $ from 'jquery';
import { Intermediario } from '../../model/intermediario.model';
import { CreacionUsuariosService } from '../../services/creacionusuarios.service';
import { UploadFilesIntermediario } from '../../model/uploadfilesintermediario.model';
/**
 * CONTROLADOR DEL MENU DE SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {
  public permissions = false;
  user: User = new User;
  userName: string;
  menuopcion: string;
  dates: string;
  width: any = $(window).width();
  detalle: string = "close";
  statusSidebar: boolean;
  imgMenu = './../../../../assets/img/customLogo.gif';
  classSidebar: string;
  intermediario: Intermediario = new Intermediario();
  notificalenght = 0;
  cobrolenght = 0;
  constructor(private menu: MenuController, private creacionUsuariosService: CreacionUsuariosService,
    private auth: AuthService,
    private router: RouterPage,
    private date: DatePage) {
    this.userName = sessionStorage.getItem('user');
    this.user = JSON.parse(sessionStorage.getItem('userSession')); 
    this.dates = this.date.getDateYear();
    $(window).resize(() => {
      this.width = $(window).width();
      if (this.width > 420) {
        this.statusSidebar = !this.statusSidebar;
        this.toggleSidebar();
      } else {
        this.toggleSidebar();
      }
    });
    this.width = $(window).width();
    if (this.width > 420) {
      this.statusSidebar = !this.statusSidebar;
      this.toggleSidebar();
    } else {
      this.toggleSidebar();
    }
  }

  ngOnInit() {
    if (this.user) {
      this.getPermissions();
       
       
      this.auth.loginUser(this.user).then(res => {
        if (this.user.role === 'Intermediario' || this.user.role === 'Maestro') {
          this.getIntermediarios()
        }
        if (this.user.role === 'Super Maestro') {
          this.auth.getNotificaciones().get().subscribe((event) => {
            event.forEach(element => {
              var user: any = JSON.parse(JSON.stringify(element.data()))
              if (user.estado == "FACTURADO" || user.estado == "APROBADO" || user.estado == "COMPROBADO") {
                this.notificalenght++;
                this.notificaMensajes(user)
              }
              if (user.estado == "EN TRAMITE" || user.estado == "PAGADA") {
                this.cobrolenght++;
                this.notificaMensajesCobro(user)
              }
            });
          });
        }
      }, error => {
        if (error.status == 304) {

        } else if (error.status == 400) {
        } else if (error.status == 401) {

        } else {
        }
      });
      this.menuopcion = sessionStorage.getItem('menuopcion');
    }
  }
  /**
* Controlador opción menu usuarios  
* Metodo principal:openFirst();  
* @return menu;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  notificaMensajes(name) {

    var elementpadre = document.getElementById('notifica')

    if (elementpadre) {
      let li = document.createElement('li');
      li.textContent = name.descripcion + "  " + " del intermediario: " + name.intermediario + ". Estado: " + name.estado;
      li.className = "card container"
      let btn = document.createElement('li');
      btn.textContent = "X"
      btn.className = "btn btn-icon btn-ghost-secondary rounded-circle"
      btn.addEventListener('click', () => {
        this.deleteNotifica(name)
      });
      li.appendChild(btn)
      return elementpadre.appendChild(li);
    } else {
      elementpadre = document.createElement('notifica')
      let li = document.createElement('li');
      li.textContent = name.descripcion + "  " + " del intermediario: " + name.intermediario + ". Estado: " + name.estado;
      li.className = "card container"
      let btn = document.createElement('li');
      btn.textContent = "X"
      btn.className = "btn btn-icon btn-ghost-secondary rounded-circle"
      btn.addEventListener('click', () => {
        this.deleteNotifica(name)
      });
      li.appendChild(btn)
      return elementpadre.appendChild(li);
    }

  }
  /**
  * Controlador opción menu usuarios  
  * Metodo principal:openFirst();  
  * @return menu;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  notificaMensajesCobro(name) {

    var elementpadre = document.getElementById('cobro')

    if (elementpadre) {
      let li = document.createElement('li');
      li.textContent = name.descripcion + "  " + " del intermediario: " + name.intermediario + ". Estado: " + name.estado;
      li.className = "card container"
      let btn = document.createElement('li');
      btn.textContent = "X"
      btn.className = "btn btn-icon btn-ghost-secondary rounded-circle"
      btn.addEventListener('click', () => {
        this.deleteNotifica(name)
      });
      li.appendChild(btn)
      return elementpadre.appendChild(li);
    } else {
      elementpadre = document.createElement('cobro')
      let li = document.createElement('li');
      li.textContent = name.descripcion + "  " + " del intermediario: " + name.intermediario + ". Estado: " + name.estado;
      li.className = "card container"
      let btn = document.createElement('li');
      btn.textContent = "X"
      btn.className = "btn btn-icon btn-ghost-secondary rounded-circle"
      btn.addEventListener('click', () => {
        this.deleteNotifica(name)
      });
      li.appendChild(btn)
      return elementpadre.appendChild(li);
    }

  }
  deleteNotifica(name) {
    this.auth.deleteNotificaciones(name).then(() => {
      location.reload()
    })
  }

  /**
* Controlador opción menu usuarios  
* Metodo principal:openFirst();  
* @return menu;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  /**
* Controlador opción menu usuarios  
* Metodo principal:openFirst();  
* @return menu;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  openDetalle() {
    if (this.detalle === "close") {
      this.detalle = "open"
    } else {
      this.detalle = "close"
    }
  }
  /**
* Controlador opción menu texto 
* Metodo principal:closeFirst(string);  
* @param string
* @return menuopcion;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  closeFirst(menuopcion: string) {
    if (menuopcion === 'bandeja') {
      this.menuopcion = 'Bandeja';
      this.router.getRouter('menu/bandeja')
      sessionStorage.setItem('menuopcion', 'Bandeja');
    }
    if (menuopcion === 'creacionusuarios') {
      this.menuopcion = 'Creación de Usuarios';
      this.router.getRouter('menu/creacionusuarios')
      sessionStorage.setItem('menuopcion', 'Creación de Usuarios');
    }
    if (menuopcion === 'periodocobertura') {
      this.menuopcion = 'Periodo de Cobertura';
      this.router.getRouter('menu/periodocobertura')
      sessionStorage.setItem('menuopcion', 'Periodo de Cobertura');
    }
    if (menuopcion === 'garantias') {
      this.menuopcion = 'Cargue de Garantias';
      this.router.getRouter('menu/garantias')
      sessionStorage.setItem('menuopcion', 'Cargue de Garantias');
    }
    if (menuopcion === 'factura') {
      this.menuopcion = 'Cargue de Facturas';
      this.router.getRouter('menu/factura')
      sessionStorage.setItem('menuopcion', 'Cargue de Factura');
    }
    if (menuopcion === 'comprobante') {
      this.menuopcion = 'Cargue de Comprobante';
      this.router.getRouter('menu/comprobante')
      sessionStorage.setItem('menuopcion', 'Cargue de Comprobante');
    }
    if (menuopcion === 'historico') {
      this.menuopcion = 'Históricos';
      this.router.getRouter('menu/historico')
      sessionStorage.setItem('menuopcion', 'Históricos');
    }
    if (menuopcion === 'consolidado') {
      this.menuopcion = 'Consolidado';
      this.router.getRouter('menu/consolidado')
      sessionStorage.setItem('menuopcion', 'Consolidado');
    }
    if (menuopcion === 'cobrogarantia') {
      this.menuopcion = 'Cobro de Créditos';
      this.router.getRouter('menu/cobrocredito')
      sessionStorage.setItem('menuopcion', 'Cobro de Créditos');
    }
    if (menuopcion === 'verificacioncobrogarantias') {
      this.menuopcion = 'Verificación de Soporte';
      this.router.getRouter('menu/verificacioncobrogarantias')
      sessionStorage.setItem('menuopcion', 'Verificación de Soporte');
    }
    if (menuopcion === 'cartera') {
      this.menuopcion = 'Cartera';
      this.router.getRouter('menu/cartera')
      sessionStorage.setItem('menuopcion', 'Cartera');
    }
    if (menuopcion === 'buscarclientes') {
      this.menuopcion = 'Buscar Clientes';
      this.router.getRouter('menu/buscarclientes')
      sessionStorage.setItem('menuopcion', 'Buscar Clientes');
    }
    if (menuopcion === 'seguimiento') {
      this.menuopcion = 'Seguimiento';
      this.router.getRouter('menu/seguimiento')
      sessionStorage.setItem('menuopcion', 'Seguimiento');
    }
    if (menuopcion === 'aplicarpagos') {
      this.menuopcion = 'Aplicar Pagos';
      this.router.getRouter('menu/aplicarpagos')
      sessionStorage.setItem('menuopcion', 'Aplicar Pagos');
    }
    if (menuopcion === 'reportecobranza') {
      this.menuopcion = 'Reporte';
      this.router.getRouter('menu/reportecobranza')
      sessionStorage.setItem('menuopcion', 'Reporte');
    }
    if (menuopcion === 'analista') {
      this.menuopcion = 'Tablero Cobranza';
      this.router.getRouter('menu/informe')
      sessionStorage.setItem('menuopcion', 'Tablero Cobranza');
      sessionStorage.setItem('menuopcionT', 'analista');

    }
    if (menuopcion === 'anodia') {
      this.menuopcion = 'Tablero Cobranza';
      this.router.getRouter('menu/informe')
      sessionStorage.setItem('menuopcion', 'Tablero Cobranza');
      sessionStorage.setItem('menuopcionT', 'anodia');
    }
    if (menuopcion === 'dia') {
      this.menuopcion = 'Tablero Cobranza';
      this.router.getRouter('menu/informe')
      sessionStorage.setItem('menuopcion', 'Tablero Cobranza');
      sessionStorage.setItem('menuopcionT', 'dia');
    }
    if (menuopcion === 'mes') {
      this.menuopcion = 'Tablero Cobranza';
      this.router.getRouter('menu/informe')
      sessionStorage.setItem('menuopcion', 'Tablero Cobranza');
      sessionStorage.setItem('menuopcionT', 'mes');
    }
    if (menuopcion === 'presupuestorecaudo') {
      this.menuopcion = 'Tablero Cobranza';
      this.router.getRouter('menu/informe')
      sessionStorage.setItem('menuopcion', 'Tablero Cobranza');
      sessionStorage.setItem('menuopcionT', 'presupuestorecaudo');
    }
    if (menuopcion === 'finllamada') {
      this.menuopcion = 'Tablero Seguimiento';
      this.router.getRouter('menu/gestion')
      sessionStorage.setItem('menuopcion', 'Tablero Seguimiento');
      sessionStorage.setItem('menuopcionTg', 'finllamada');
    }
    if (menuopcion === 'llamadaanomes') {
      this.menuopcion = 'Tablero Seguimiento';
      this.router.getRouter('menu/gestion')
      sessionStorage.setItem('menuopcion', 'Tablero Seguimiento');
      sessionStorage.setItem('menuopcionTg', 'llamadaanomes');
    }
    if (menuopcion === 'seguimientoanalista') {
      this.menuopcion = 'Tablero Seguimiento';
      this.router.getRouter('menu/gestion')
      sessionStorage.setItem('menuopcion', 'Tablero Seguimiento');
      sessionStorage.setItem('menuopcionTg', 'seguimientoanalista');
    } 
    if (menuopcion === 'operacion') {
      this.menuopcion = 'Tablero Operación';
      this.router.getRouter('menu/operacion')
      sessionStorage.setItem('menuopcion', 'Tablero Operación');
    }
    if (menuopcion === 'reprocesos') {
      this.menuopcion = 'Tablero Reprocesos';
      this.router.getRouter('menu/reprocesos')
      sessionStorage.setItem('menuopcion', 'Tablero Reprocesos');
    }
    this.menu.enable(true, 'first');
    this.menu.close('first');
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
    this.intermediario = new Intermediario();
    this.intermediario.optionsearchintermediario = 'searchintermediario';
    this.intermediario.intermediarios = new Array<Intermediario>();
    var userToLogin = this.creacionUsuariosService.getIntermediarios().get().subscribe((event) => {
      if (this.user.role === 'Intermediario') {
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
        this.consultarDocumentosIntermediario()
      } else {
      }
      return userToLogin;
    });

  }

  /**
  * consultar Documentos Intermediario metodo unico consulta al software. 
  * Metodo principal:consultarDocumentosIntermediario();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  consultarDocumentosIntermediario() {
    this.getDocuIntermediario(this.intermediario.intermediarios[0].nit);
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
              $("#avatarImgMenu")[0].src = obj.urlFileUpload
              $("#avatarImgMenu1")[0].src = obj.urlFileUpload
            }
          });
          paso = true;
          this.intermediario.intermediariodocu = true;
          return this.intermediario.uploadfiles;
        })
      });
    })
  }
  /**
  * Credenciales Outlogin metodo unico signOut al software. 
 * Metodo principal:signOut();  
 * @return navigate(['/login']);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  signOut() {
    if (!this.auth.userLogout()) {
      sessionStorage.clear();
      this.router.getRouter('login')
    }
  }
  /**
* Controlador opción permisos usuarios  
* Metodo principal:getPermissions();  
* @return permissions;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getPermissions() {
    if (this.user.estado === 'Activo') {
      this.permissions = true;
    } else {
      this.permissions = false;
    }
  }

  toggleSidebar() {
    this.statusSidebar = !this.statusSidebar;
    if (this.statusSidebar) {
      this.classSidebar = 'hideSidebar';
      if (this.width > 420) {
        this.imgMenu = './../../../../assets/img/customLogo.gif';
        document.getElementById("Logo").style.width = '38px';
      }
    } else {
      this.classSidebar = 'showSidebar';
      this.imgMenu = './../../../../assets/img/customLogo.gif';
      if (this.width <= 420) {
        setTimeout(() => {
          document.getElementById("Logo").style.width = '40px';
        }, 300)
      } else {
        setTimeout(() => {
          document.getElementById("Logo").style.width = '70px';
        }, 300)
      }
    }
    if (this.width < 420) {
      setTimeout(() => {
        document.getElementById("Logo").style.width = '80px';
      }, 300)
    } else {
      setTimeout(() => {
        document.getElementById("Logo").style.width = '95px';
      }, 300)
    }
  }

}


