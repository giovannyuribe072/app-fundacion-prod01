import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';


/**
 * SERVICIO DEL MENU Y LOGIN DE SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn;
  loginObs$: Subject<any>; // your street-data type
  loginData: any;
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private storage: AngularFireStorage, private router: Router) {
    this.isUserLoggedIn = false;
    this.loginObs$ = new Subject();
  }
  getLoginObs(): Observable<any> {
    return this.loginObs$.asObservable();
  }

  setLoginObs(data: any) {
    this.loginData = data;
    this.loginObs$.next(data);
  }

  getGarantiasTotales() {
    var user = this.afs.collection("garantiastotal");
    return user;
  }
  /**
 * Eliminar Intermediario  metodo unico software. 
  * Metodo principal:deleteIntermediarioUser(Intermediario,User); 
  * @param  Intermediario
  * @param  User
  * @return AngularFireAuth.signInWithEmailAndPassword;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getAfs() {
    var afs = this.afs
    return afs;
  }
   /**
 * Eliminar Intermediario  metodo unico software. 
  * Metodo principal:deleteIntermediarioUser(Intermediario,User); 
  * @param  Intermediario
  * @param  User
  * @return AngularFireAuth.signInWithEmailAndPassword;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getAfsFire() {
    var afs = this.afs.firestore
    return afs;
  }
  /**
 * Eliminar Intermediario  metodo unico software. 
  * Metodo principal:deleteIntermediarioUser(Intermediario,User); 
  * @param  Intermediario
  * @param  User
  * @return AngularFireAuth.signInWithEmailAndPassword;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getStorage() {
    var storage = this.storage
    return storage;
  }
  /**
  * Consulta Intermediarios metodo unico software. 
   * Metodo principal:getIntermediarios();  
   * @return AngularFirestore.collection;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getIntermediarios() {
    var user = this.afs.collection("intermediarios");
    return user;
  }

  /**
   * Consulta Intermediarios metodo unico software. 
    * Metodo principal:getIntermediarios();  
    * @return AngularFirestore.collection;
    * AUTH GOOGLE CLOUD FIREBASE SERVICE
    * @author Giovanny Uribe Acevedo
    */
  getNotificaciones() {
    var user = this.afs.collection("notifica");
    return user;
  }
  /**
 * login  metodo unico software. 
 * Metodo principal:loginUser(User);  
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  deleteNotificaciones(notifica) {
    return this.afs.collection("notifica").doc(notifica.idcoleccion).delete();
  }
  /**
* login  metodo unico software. 
* Metodo principal:loginUser(User);  
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
loginUser(user: User): any {  
  return this.afa.signInWithEmailAndPassword(user.email, user.password);
}
 
  /**
* Consulta usuarios metodo unico software. 
 * Metodo principal:loginUserInfo(string);  
 * @param  string
 * @return AngularFirestore.collection.doc;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  loginUserInfo(email: string) {
    var tur = this.afs.collection('users').doc(email).get().subscribe((event) => {
      var user: User = JSON.parse(JSON.stringify(event.data()))
      sessionStorage.setItem('userSession', JSON.stringify(user))
    });
    return tur;
  }
  /**
* serLoggedIn  metodo unico software. 
 * Metodo principal:loginUser();    
 * @return boolean;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  public getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  /**
* userLogout  metodo unico software. 
 * Metodo principal:userLogout();   
 * @return boolean;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  public userLogout(): boolean {
    this.isUserLoggedIn = false;
    this.afa.signOut();
    return this.isUserLoggedIn;
  }

 

}

