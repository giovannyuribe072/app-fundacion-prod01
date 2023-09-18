import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertPage } from '../../alert/alert.page';
import { GarantiasTotal } from '../../model/garantiastotal.model';
import { Intermediario } from '../../model/intermediario.model';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { CargadorService } from '../../services/cargador.services';
@Component({
  selector: 'app-consolidado',
  templateUrl: 'consolidado.page.html',
  styleUrls: ['consolidado.page.scss']
})
export class ConsolidadoPage implements OnInit {
  fechareporte: Date;
  user: User = JSON.parse(sessionStorage.getItem('userSession'));
  saldo: string = '0';
  creditosreportador: string = '0';
  garantiacobrada: string = '0';
  saldocreditocobrado: string = '0'
  cantidadcreditocolocado: string = '0'
  intermediario: Intermediario = new Intermediario();
  tipovideo: string;
  nombrevideo: string;
  optionuser: string;
  intermediarios: Intermediario[] = [];
  selectintermediario: Intermediario = new Intermediario();
  optionselectintermediario: string = 'close';
  dataSourceIntermediario: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsIntermediario: string[] = ['nombre', 'select'];
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('imgPlayer') imgPlayer: ElementRef;
  @ViewChild('paginatorIntermediarios', { read: MatPaginator }) paginatorIntermediarios: MatPaginator;
  constructor(private cargador: CargadorService, private alertPage: AlertPage, private auth: AuthService) {
    this.cargador.getCargador(1500);

  }

  ngOnInit() { 
    
    
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
    this.optionselectintermediario = 'close'
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
  garantiastotales: GarantiasTotal[] = [];
  consolidadototales: GarantiasTotal[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumnsGarantiasExcel: string[] = ['fechareporte', 'cantidadgarantias', 'cobertura', 'saldototal'];
  @ViewChild('paginatorGarantias', { read: MatPaginator }) paginatorGarantias: MatPaginator;
  getGarantiasTotalesIntermediario() {
    if (this.fechareporte) {

      this.garantiastotales = new Array<GarantiasTotal>();
      this.consolidadototales = new Array<GarantiasTotal>();
      this.auth.getGarantiasTotales().get().subscribe((event) => {
        event.query.where("intermediario", "==", this.selectintermediario.nit).orderBy("fechareporte").get().then((events) => {
          events.forEach(element => {
            let garantiaestado: GarantiasTotal = JSON.parse(JSON.stringify(element.data()))
            if (garantiaestado.estado === 'COMPROBADO') {
              this.garantiastotales.push(garantiaestado)
            }
            return this.garantiastotales;
          })
          if (this.garantiastotales.length === 0) {
            this.alertPage.presentAlert("Error! intermediario, sin cargue de garantías facturado o comprobado.").then(() => { this.optionselectintermediario = 'close' })
          } else {
            this.garantiastotales.forEach(element => {
              if (element.fechareporte.toString().substring(0, 4) == this.fechareporte.toString().substring(0, 4)) {
                this.consolidadototales.push(element)
              }
            });
            if (this.consolidadototales.length === 0) {
              this.alertPage.presentAlert("Error! intermediario, sin consolidado para este año.")
            } else {
              this.dataSource = new MatTableDataSource<any>(this.consolidadototales);
              setTimeout(() => {
                var elem = document.getElementById("garantiasexcel");
                elem.click();
                this.dataSource.paginator = this.paginatorGarantias;
              }
              );
            } 
          }
        });
      });
    } else {
      this.alertPage.presentAlert("Error! seleccionar fecha consolidado.")
    }
  }
}
