import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { User } from '../model/user.model';
import { Intermediario } from '../model/intermediario.model';
import { DatePage } from '../util/date.page';
import { Count } from '../model/count.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Cartera } from '../model/cartera.model';
import { CarteraTotal } from '../model/carteratotal.model';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {
  constructor(private afa: AngularFireAuth, private date: DatePage, private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  getAfsFirestore() {
    return this.afs.firestore;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getIntermediarios() {
    var user = this.afs.collection("intermediarios");
    return user;
  }
  
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateCountFiles(index) {
    this.afs.collection("count").doc("countfiles").update({
      countfiles: index
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateCountCartera(index) {
    this.afs.collection("count").doc("countgarantias").update({
      count: index
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateIndexCountGarantia(index) {
    this.afs.collection("count").doc("countgarantias").update({
      indexcount: index
    })
  } 
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteCargueCartera(garantiasTotal: CarteraTotal, garantias: Cartera[]) {
    this.afs.collection("carteratotal").doc(garantiasTotal.idcoleccionfile).delete()
    this.afs.collection("carterafile").doc(garantiasTotal.idcoleccionfile).delete()
    garantias.forEach(element => {
      this.afs.collection("cartera").doc(element.idcoleccion).delete()
    });
    this.TareaEliminarCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefile)
  }
     
  getCount() {
    var user = this.afs.collection("count");
    return user;
  }

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getCarteraTotal() {
    var user = this.afs.collection("carteratotal")
    return user;
  }


  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearCartera(list: Cartera[], user: Intermediario, usersession: User, tipolinea: Count, nombrefile: string) {
    var countgarantias = tipolinea.count + 1;
    var countgarantiasregistro = tipolinea.indexcount + 1; 
    var countvalorcapitaltotal = 0;
    var idcolecciongarantias = this.afs.createId();
    var idcoleccion = '';
    var idcoleccionfile = this.afs.createId();
    var cantidadgarantias = list.length;
    this.updateCountCartera(countgarantias)
    list.forEach(element => {  
      countgarantiasregistro++ 
      countvalorcapitaltotal = countvalorcapitaltotal + element.valorcapital; 
      idcoleccion = this.afs.createId()
      this.updateIndexCountGarantia(countgarantiasregistro);
      this.afs.collection("cartera").doc(idcoleccion).set({
        idcolecciongarantias: idcolecciongarantias,
        idcoleccion: idcoleccion,
        idcoleccionfile: idcoleccionfile,
        idgarantiaregistro: countgarantiasregistro,
        idgarantia: countgarantias,
        ceduladeudor:element.ceduladeudor,
        nombredeudor:element.nombredeudor, 
        intermediario: user.nit, 
        intermediariodes: user.sigla, 
        celular: element.celular,
        mail:element.mail,
        direccion:element.direccion,
        ciudad:element.ciudad,
        departamento:element.departamento,
        nropagare:element.nropagare,
        valorcapital: element.valorcapital,
        fechaprestamo:element.fechaprestamo,    
        fechavencimiento:element.fechavencimiento,
        fechaprestamoserial : element.fechaprestamoserial,
        fechavencimientoserial : element.fechavencimientoserial,
        valorcuota:element.valorcuota,
        coutas: element.coutas,
        estado: element.estado,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    })
    this.afs.collection("carteratotal").doc(idcoleccionfile).set({
      idcoleccionfile: idcoleccionfile,
      nombrefile: nombrefile,
      intermediario: user.nit,
      idgarantia: countgarantias, 
      valorcapitaltotal: countvalorcapitaltotal, 
      cantidadgarantias: cantidadgarantias, 
      estado: 'CARGADO', 
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      marcatiempo: new Date
    })
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        return user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("carterafile").doc(idcoleccionfile).set({
            idcoleccionfile: idcoleccionfile,
            nit: element.nit,
            nombrefile: element.nombrefile,
            fecha: this.date.getDate(),
            tipfile: element.tipfile,
            marcatiempo: new Date
          })
        });
      }
    }
  } 
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  // Tarea para leer archivo
  public TareaLeerCloudStorage(nombreArchivo: string) {
    var storageRef = this.storage.ref(nombreArchivo).getDownloadURL();
    return storageRef;
  }

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  // Tarea para leer archivo
  public TareaEliminarCloudStorage(nombreArchivo: string) {
    var storageRef = this.storage.ref(nombreArchivo).delete()
    return storageRef;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  } 

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
updateCarteraCargueTotal( garantias: Cartera, usersession: User) {
  return this.afs.collection("cartera").doc(garantias.idcoleccion).update(
    {
      celular: garantias.celular,
      mail: garantias.mail,
      direccion: garantias.direccion,
      ciudad: garantias.ciudad,
      departamento: garantias.departamento,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
    }
  )
}
}




