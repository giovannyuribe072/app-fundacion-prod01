import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EsquemaUnicoAnticipado } from '../model/esquemaunicoanticipado.model'; 
import { User } from '../model/user.model'; 
import { DatePage } from '../util/date.page'; 
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { GarantiasTotal } from '../model/garantiastotal.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  constructor(private afa: AngularFireAuth, private date: DatePage, private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  updateEstadoCargueGarantia(garantiasTotal:GarantiasTotal,usersession: User){
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
       estado:garantiasTotal.estado,
       modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    }) 
  }

  getIntermediarios() {
    var user = this.afs.collection("intermediarios");
    return user;
  }

  updateCountFiles(index) {
    this.afs.collection("count").doc("countfiles").update({
      countfiles: index
    })
  }
  updateCountGarantias(index) {
    this.afs.collection("count").doc("countgarantias").update({
      count: index
    })
  }
  updateIndexCountGarantia(index) {
    this.afs.collection("count").doc("countgarantias").update({
      indexcount: index
    })
  } 

  updateTotalCargueGarantiaFactura(garantiasTotal: GarantiasTotal,usersession: User) {
    this.referenciaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilefactura);
    this.tareaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilefactura, garantiasTotal.fileToUpload);
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({ 
      nombrefilefactura: garantiasTotal.nombrefilefactura,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    }) 
  }
  getGarantiasTotales() {
    var user = this.afs.collection("garantiastotal");
    return user;
  }
  getAfsFirestore(){
    return this.afs.firestore;
  }
  getComisionesEsquemaUnico() {
    var user = this.afs.collection("comisionesesquemaunico");
    return user;
  }

  getComisionesLinealizadas() {
    var user = this.afs.collection("comisioneslinealizadas");
    return user;
  }

  getCount() {
    var user = this.afs.collection("count");
    return user;
  }

  getGarantias() {
    var user = this.afs.collection("garantias")
    return user;
  }
  getGarantiasTotal() {
    var user = this.afs.collection("garantiastotal")
    return user;
  }
 
  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  // Tarea para leer archivo
  public TareaLeerCloudStorage(nombreArchivo: string) {
    var storageRef = this.storage.ref(nombreArchivo).getDownloadURL();
    return storageRef;
  }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  hitoricoCobertura(user: EsquemaUnicoAnticipado, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("comisionesesquemaunico").doc(user.idcoleccion).delete().then(() => { })

    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    return userToLogin;

  }
 

}




