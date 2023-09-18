import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { AngularFireStorage } from '@angular/fire/storage'; 
import { EsquemaUnicoAnticipado } from '../model/esquemaunicoanticipado.model';
import { User } from '../model/user.model';


/**
 * SERVICIO DEL MENU Y LOGIN DE SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  public isUserLoggedIn;
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore,  private storage: AngularFireStorage) {
    this.isUserLoggedIn = false;
  }

  getTiposHistoricos(){
    var user = this.afs.collection("tiposhistoricosintermediario");
    return user;
  }

  getCount() {
    var user = this.afs.collection("count");
    return user;
  }
  getIntermediarios() {
    var user = this.afs.collection("intermediarios");
    return user;
  }
  getGarantiasTotales() {
    var user = this.afs.collection("garantiastotal");
    return user;
  }
  getComisionesEsquemaMensual() {
    var user = this.afs.collection("comisioneshistoricoesquemamensual");
    return user;
  }
  getComisionesHistoricoPeriodosCobertura() {
    var user = this.afs.collection("tiposhistoricosintermediario");
    return user;
  }

  getComisionesHistoricoEsquemaUnico() {
    var user = this.afs.collection("comisioneshistoricoesquemaunico");
    return user;
  }

  getComisionesLinealizadas() {
    var user = this.afs.collection("comisioneshistoricoesquemalinealizado");
    return user;
  }

    // Tarea para leer archivo
    public TareaLeerCloudStorage(nombreArchivo: string) {
      var storageRef = this.storage.ref(nombreArchivo).getDownloadURL();
      return storageRef;
    }

    eliminarCobertura(user: EsquemaUnicoAnticipado, usersession: User): any {
      var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
            this.afs.collection("comisioneshistoricoesquemaunico").doc(user.idcoleccion).delete().then(() => { })
            this.afs.collection("tiposhistoricosintermediario").doc(user.idcoleccion).delete().then(() => { })
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          }); 
      return userToLogin;
  
    }
}