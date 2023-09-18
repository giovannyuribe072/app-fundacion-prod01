import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertPage } from '../../alert/alert.page';
import { User } from '../../model/user.model';
import { FormControl, Validators } from '@angular/forms';
import { DatePage } from '../../util/date.page';
import { RouterPage } from '../../util/router.page';
import { CargadorService } from '../../services/cargador.services';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  dates: string; 
  userControler = new FormControl('', [Validators.required && Validators.maxLength(50) && Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  passwordControler = new FormControl('', [Validators.required && Validators.maxLength(50)]);
  constructor(private authService: AuthService, private router: RouterPage, private alertPage: AlertPage, private date: DatePage, private cargador: CargadorService) {
    this.cargador.getCargador(1500);
    this.dates = this.date.getDateYear();

  }

  ngOnInit() {
    sessionStorage.clear();
    this.authService.userLogout();
    this.user = new User(); 
    console.log(sessionStorage)
    if (sessionStorage.getItem('userSession') == "false") {
      this.alertPage.presentAlert("Clave o Correo incorrectos.");
    }
  }

  paginaweb() {
    this.router.getRouter('paginaweb');
  }


  /**
  * Credenciales login metodo unico acceso al software. 
 * Metodo principal:signIn(); 
 * @param user 
 * @return navigate(['menu/bandeja']);
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  signIn() {
    this.cargador.getCargador(0)
    this.alertPage.presentAlert('Espere por favor.')
    this.authService.loginUser(this.user).then(res => {
      this.authService.getAfsFire().collection('users').doc(this.user.email).get().then((data) => {
        this.user = JSON.parse(JSON.stringify(data.data())); 
        sessionStorage.setItem('userSession', JSON.stringify(this.user))
        sessionStorage.setItem('user', this.user.email);
        sessionStorage.setItem('menuopcion', 'Bandeja'); 
        if (this.user.role == "Super Maestro" || this.user.role == "Intermediario" || this.user.role == "Maestro") {
          this.router.getRouter('menu/bandeja')
        }
        if (this.user.role == "Cobrador") {
          this.router.getRouter('menu/buscarclientes')
        }
        if (this.user.role == "Coordinador") {
          this.router.getRouter('menu/creacionusuarios')
        }
      })
    }, error => {
      this.alertPage.closeAlert()
      if (error.status == 304) {

      } else if (error.status == 400) {
        this.alertPage.presentAlert("Clave incorrecta");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o Correo incorrectos /" + error.message);
      }
    });

  }
}
