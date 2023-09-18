import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EsquemaUnicoAnticipado } from '../model/esquemaunicoanticipado.model';
import { User } from '../model/user.model';
import { Intermediario } from '../model/intermediario.model';
import { DatePage } from '../util/date.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ComisionLinealizada } from '../model/comisionlinealizada.model';
import { TipoLineaIntermediario } from '../model/tipolineaintermediario.model';
import { TipoHistoricoIntermediario } from '../model/tipohistoricointermediario.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoCoberturaService {
  constructor(private afa: AngularFireAuth, private date: DatePage, private afs: AngularFirestore, private storage: AngularFireStorage) {
  }
  getComisionesPeriodosCobertura() {
    var user = this.afs.collection("comisiones");
    return user;
  }

  getIntermediarios() {
    var user = this.afs.collection("intermediarios");
    return user;
  }

  updateCountFiles(any) {
    this.afs.collection("count").doc("countfiles").update({
      countfiles: any
    })
  }
  updateCount(any) {
    this.afs.collection("count").doc("count").update({
      count: any
    })
  }
  updateIndexCount(any) {
    this.afs.collection("count").doc("count").update({
      indexcount: any
    })
  }


  getTiposLineas() {
    var user = this.afs.collection("lineasintermediario");
    return user;
  }


  getComisionesEsquemaUnico() {
    var user = this.afs.collection("comisionesesquemaunico");
    return user;
  }
  
  getComisionesEsquemaMensual() {
    var user = this.afs.collection("comisionesesquemamensual");
    return user;
  }

  getComisionesLinealizadas() {
    var user = this.afs.collection("comisioneslinealizadas");
    return user;
  }

  getComisionesLinealizadasMensual() {
    var user = this.afs.collection("comisioneslinealizadasmensual");
    return user;
  }


  getCount() {
    var user = this.afs.collection("count");
    return user;
  }
  crearComision(user: Intermediario, usersession: User, tipolinea: TipoLineaIntermediario, idcoleccion: string, nombrefile: string , comisiontotal:string) {
    this.afs.collection("comisiones").doc(idcoleccion).set({
      idlinea: tipolinea.idlinea,
      descripcion: tipolinea.nombrelinea,
      intermediario: user.nit,
      nombrefile: nombrefile,
      comisiontotal:comisiontotal,
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      idcomisionregistro: tipolinea.indexcount,
      idcomision: tipolinea.count,
      marcatiempo: new Date
    })
  }

  crearEsquemaUnico(list: EsquemaUnicoAnticipado[], user: Intermediario, usersession: User, tipolinea: TipoLineaIntermediario) {
    var idcoleccion = this.afs.createId();
    var comisiontotal;
    this.updateCount(tipolinea.count + 1);
    list.forEach(element => {
      comisiontotal = element.comisiontotal
      this.updateIndexCount(tipolinea.indexcount + 1);
      this.afs.collection("comisionesesquemaunico").doc(idcoleccion).set({
        idcoleccion: idcoleccion,
        idcomisionregistro: tipolinea.indexcount,
        idcomision: tipolinea.count,
        idlinea: tipolinea.idlinea,
        descripcion: tipolinea.nombrelinea,
        intermediario: user.nit,
        cobertura: element.cobertura,
        administracion: element.administracion,
        ivaadministracion: element.ivaadministracion,
        comisiontotal: element.comisiontotal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });
    if (user.uploadfiles.length >= 0) {
      return user.uploadfiles.forEach(element => {
        this.referenciaCloudStorage(user.nit + element.nombrefile);
        this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
        this.afs.collection("comisionesfile").doc(idcoleccion).set({
          idcoleccion: idcoleccion,
          nit: element.nit,
          nombrefile: element.nombrefile,
          fecha: this.date.getDate(),
          tipfile: element.tipfile,
          marcatiempo: new Date
        })
        this.crearComision(user, usersession, tipolinea, idcoleccion, element.nombrefile,comisiontotal);
      });
    }
  }

  crearEsquemaMensual(list: EsquemaUnicoAnticipado[], user: Intermediario, usersession: User, tipolinea: TipoLineaIntermediario) {
    var idcoleccion = this.afs.createId();
    var comisiontotal;
    this.updateCount(tipolinea.count + 1);
    list.forEach(element => {
      comisiontotal = element.comisiontotal
      this.updateIndexCount(tipolinea.indexcount + 1);
      this.afs.collection("comisionesesquemamensual").doc(idcoleccion).set({
        idcoleccion: idcoleccion,
        idcomisionregistro: tipolinea.indexcount,
        idcomision: tipolinea.count,
        idlinea: tipolinea.idlinea,
        descripcion: tipolinea.nombrelinea,
        intermediario: user.nit,
        cobertura: element.cobertura,
        administracion: element.administracion,
        ivaadministracion: element.ivaadministracion,
        comisiontotal: element.comisiontotal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });
    if (user.uploadfiles.length >= 0) {
      return user.uploadfiles.forEach(element => {
        this.referenciaCloudStorage(user.nit + element.nombrefile);
        this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
        this.afs.collection("comisionesfile").doc(idcoleccion).set({
          idcoleccion: idcoleccion,
          nit: element.nit,
          nombrefile: element.nombrefile,
          fecha: this.date.getDate(),
          tipfile: element.tipfile,
          marcatiempo: new Date
        })
        this.crearComision(user, usersession, tipolinea, idcoleccion, element.nombrefile,comisiontotal);
      });
    }
  }


  crearLinealizada(list: ComisionLinealizada[], user: Intermediario, usersession: User, tipolinea: TipoLineaIntermediario) {
    var idcoleccion = this.afs.createId();
    var comisiontotal;
    this.updateCount(tipolinea.count + 1);
    var indexcount = tipolinea.indexcount;
    list.forEach(element => {
      comisiontotal = element.comisiontotal
      indexcount = indexcount + 1;
      this.updateIndexCount(indexcount);
      var idcoleccionregistro = this.afs.createId();
      this.afs.collection("comisioneslinealizadas").doc(idcoleccionregistro).set({
        idcoleccionregistro: idcoleccionregistro,
        idcoleccion: idcoleccion,
        idcomisionregistro: indexcount,
        idcomision: tipolinea.count,
        idlinea: tipolinea.idlinea,
        descripcion: tipolinea.nombrelinea,
        intermediario: user.nit,
        mesescredito: element.mesescredito,
        cobertura: element.cobertura,
        administracion: element.administracion,
        ivaadministracion: element.ivaadministracion,
        comisiontotal: element.comisiontotal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });
    if (user.uploadfiles.length >= 0) {
      return user.uploadfiles.forEach(element => {
        this.referenciaCloudStorage(user.nit + element.nombrefile);
        this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
        this.afs.collection("comisionesfile").doc(idcoleccion).set({
          idcoleccion: idcoleccion,
          nit: element.nit,
          nombrefile: element.nombrefile,
          fecha: this.date.getDate(),
          tipfile: element.tipfile,
          marcatiempo: new Date
        })
        this.crearComision(user, usersession, tipolinea, idcoleccion, element.nombrefile,comisiontotal);
      });
    }
  }

  crearLinealizadaMensual(list: ComisionLinealizada[], user: Intermediario, usersession: User, tipolinea: TipoLineaIntermediario) {
    var idcoleccion = this.afs.createId();
    var comisiontotal;
    this.updateCount(tipolinea.count + 1);
    var indexcount = tipolinea.indexcount;
    list.forEach(element => {
      comisiontotal = element.comisiontotal
      indexcount = indexcount + 1;
      this.updateIndexCount(indexcount);
      var idcoleccionregistro = this.afs.createId();
      this.afs.collection("comisioneslinealizadasmensual").doc(idcoleccionregistro).set({
        idcoleccionregistro: idcoleccionregistro,
        idcoleccion: idcoleccion,
        idcomisionregistro: indexcount,
        idcomision: tipolinea.count,
        idlinea: tipolinea.idlinea,
        descripcion: tipolinea.nombrelinea,
        intermediario: user.nit,
        mesescredito: element.mesescredito,
        cobertura: element.cobertura,
        administracion: element.administracion,
        ivaadministracion: element.ivaadministracion,
        comisiontotal: element.comisiontotal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });
    if (user.uploadfiles.length >= 0) {
      return user.uploadfiles.forEach(element => {
        this.referenciaCloudStorage(user.nit + element.nombrefile);
        this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
        this.afs.collection("comisionesfile").doc(idcoleccion).set({
          idcoleccion: idcoleccion,
          nit: element.nit,
          nombrefile: element.nombrefile,
          fecha: this.date.getDate(),
          tipfile: element.tipfile
        })
        this.crearComision(user, usersession, tipolinea, idcoleccion, element.nombrefile,comisiontotal);
      });
    }
  }

  hitoricoCobertura(user: EsquemaUnicoAnticipado, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("comisionesesquemaunico").doc(user.idcoleccion).delete().then(() => { })
      this.afs.collection("comisiones").doc(user.idcoleccion).delete().then(() => { })
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    return userToLogin;

  }

  hitoricoCoberturaMensual(user: EsquemaUnicoAnticipado, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("comisionesesquemamensual").doc(user.idcoleccion).delete().then(() => { })
      this.afs.collection("comisiones").doc(user.idcoleccion).delete().then(() => { })
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    return userToLogin;

  }
  hitoricoCoberturaLinealizada(user: ComisionLinealizada[], usersession: User): any {
     var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      user.forEach(element => {
        this.afs.collection("comisioneslinealizadas").doc(element.idcoleccionregistro).delete().then(() => { })
      }); 
      this.afs.collection("comisiones").doc(user[0].idcoleccion).delete().then(() => { })
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    return userToLogin;

  }

  hitoricoCoberturaLinealizadaMensual(user: ComisionLinealizada[], usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
     user.forEach(element => {
       this.afs.collection("comisioneslinealizadasmensual").doc(element.idcoleccionregistro).delete().then(() => { })
     }); 
     this.afs.collection("comisiones").doc(user[0].idcoleccion).delete().then(() => { })
   }).catch(function (error) {
     console.error("Error removing document: ", error);
   });
   return userToLogin;

 }


  crearHistoricoIntermediario(historico: TipoHistoricoIntermediario, usersession: User) {
    this.afs.collection("tiposhistoricosintermediario").doc(historico.idcoleccion).set({
      idcoleccion: historico.idcoleccion,
      idhistorico: historico.idhistorico,
      nombrehistorico: historico.nombrehistorico,
      intermediario: historico.intermediario,
      idlinea: historico.idlinea,
      nombrefile: historico.nombrefile,
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      marcatiempo: new Date
    })
  }
  crearHistoricoEsquemaUnico(historico: EsquemaUnicoAnticipado, usersession: User, nombrefile: string) {
    var historicointermediario: TipoHistoricoIntermediario = new TipoHistoricoIntermediario();
    historicointermediario.idcoleccion = historico.idcoleccion;
    historicointermediario.intermediario = historico.intermediario;
    historicointermediario.nombrehistorico = historico.descripcion;
    historicointermediario.idhistorico = historico.idcomision;
    historicointermediario.idlinea = historico.idlinea;
    historicointermediario.nombrefile = nombrefile;
    this.crearHistoricoIntermediario(historicointermediario, usersession);
    this.afs.collection("comisioneshistoricoesquemaunico").doc(historico.idcoleccion).set({
      idcoleccion: historico.idcoleccion,
      idcomisionregistro: historico.idcomisionregistro,
      idcomision: historico.idcomision,
      idlinea: historico.idlinea,
      descripcion: historico.descripcion,
      intermediario: historico.intermediario,
      cobertura: historico.cobertura,
      administracion: historico.administracion,
      ivaadministracion: historico.ivaadministracion,
      comisiontotal: historico.comisiontotal,
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      marcatiempo: new Date
    })

  }


  crearHistoricoLinealizado(list: ComisionLinealizada[], usersession: User, nombrefile:string) {
    var historicointermediario: TipoHistoricoIntermediario = new TipoHistoricoIntermediario();
    historicointermediario.idcoleccion = list[0].idcoleccion;
    historicointermediario.intermediario = list[0].intermediario;
    historicointermediario.nombrehistorico = list[0].descripcion;
    historicointermediario.idhistorico = list[0].idcomision;
    historicointermediario.idlinea = list[0].idlinea;
    historicointermediario.nombrefile = nombrefile;
    this.crearHistoricoIntermediario(historicointermediario, usersession);
    list.forEach(element => {
      this.afs.collection("comisioneshistoricoesquemalinealizado").doc(element.idcoleccionregistro).set({
        idcoleccionregistro: element.idcoleccionregistro,
        idcoleccion: element.idcoleccion,
        idcomisionregistro: element.idcomisionregistro,
        idcomision: element.idcomision,
        idlinea: element.idlinea,
        descripcion: element.descripcion,
        intermediario: element.intermediario,
        mesescredito: element.mesescredito,
        cobertura: element.cobertura,
        administracion: element.administracion,
        ivaadministracion: element.ivaadministracion,
        comisiontotal: element.comisiontotal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });
  }


  crearHistoricoEsquemaMensaul(historico: EsquemaUnicoAnticipado, usersession: User, nombrefile: string) {
    var historicointermediario: TipoHistoricoIntermediario = new TipoHistoricoIntermediario();
    historicointermediario.idcoleccion = historico.idcoleccion;
    historicointermediario.intermediario = historico.intermediario;
    historicointermediario.nombrehistorico = historico.descripcion;
    historicointermediario.idhistorico = historico.idcomision;
    historicointermediario.idlinea = historico.idlinea;
    historicointermediario.nombrefile = nombrefile;
    this.crearHistoricoIntermediario(historicointermediario, usersession);
    this.afs.collection("comisioneshistoricoesquemamensual").doc(historico.idcoleccion).set({
      idcoleccion: historico.idcoleccion,
      idcomisionregistro: historico.idcomisionregistro,
      idcomision: historico.idcomision,
      idlinea: historico.idlinea,
      descripcion: historico.descripcion,
      intermediario: historico.intermediario,
      cobertura: historico.cobertura,
      administracion: historico.administracion,
      ivaadministracion: historico.ivaadministracion,
      comisiontotal: historico.comisiontotal,
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      marcatiempo: new Date
    })

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

}




