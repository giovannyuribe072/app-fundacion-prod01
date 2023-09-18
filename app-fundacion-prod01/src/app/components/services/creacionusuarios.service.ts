/**
 * CREACIÓN DE USUARIOS SERVICE PAGINA SOFTWARE FUNDACION SAN JOSE EN IONIC 5 ANGULAR 9 MATERIAL 9 Bootstrap 4.5.3 - Agency v1 (HASTECNOLOGIA SAS)
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
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { Intermediario } from '../model/intermediario.model';
import { UploadFilesIntermediario } from '../model/uploadfilesintermediario.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { TipoLineaIntermediario } from '../model/tipolineaintermediario.model';
import { Campana } from '../model/campana.model';
import { Manager } from '../model/manager.model';
import { Seguimiento } from '../model/seguimiento.model';
import { Count } from '../model/count.model';
import { DatePage } from '../util/date.page';

/**
 * SERVICIO DE CREACION USUARIOS DE SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */
@Injectable({
  providedIn: 'root'
})
export class CreacionUsuariosService {
  constructor(private afa: AngularFireAuth, private date: DatePage, private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  getAfs() {
    return this.afs.firestore;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getCount() {
    var user = this.afs.collection("count");
    return user;
  }
  /**
 * Actualiza contadores metodo unico software. 
  * Metodo principal:updateCount();  
  * @return AngularFirestore.doc.update;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  updateCount(any) {
    this.afs.collection("count").doc("countfiles").update({
      countfiles: any
    })
  }
  /**
 * Consulta Usuarios metodo unico software. 
  * Metodo principal:getUsers();  
  * @return AngularFirestore.collection;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getUsers() {
    var user = this.afs.collection("users");
    return user;
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
* Consulta tipolinea metodo unico software. 
 * Metodo principal:getIntermediarios();  
 * @return AngularFirestore.collection;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getTiposLineas() {
    var user = this.afs.collection("tipolinea");
    return user;
  }
  /**
* Consulta tipolinea metodo unico software. 
* Metodo principal:getIntermediarios();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getTiposLineasIntermediario() {
    var user = this.afs.collection("lineasintermediario");
    return user;
  }
  /**
* Consulta Documentos Intermediarios metodo unico software. 
 * Metodo principal:getDocuIntermediario();  
 * @return AngularFirestore.collection;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getDocuIntermediario() {
    var user = this.afs.collection("docuintermediarios");
    return user;
  }
  /**
* Consulta Documentos Historicos Intermediarios metodo unico software. 
* Metodo principal:getHistIntermediario();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getHistIntermediario() {
    var user = this.afs.collection("histintermediarios");
    return user;
  }
  /**
* Consulta Roles Usuarios Intermediarios metodo unico software. 
* Metodo principal:getRol();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getRol() {
    var rol = this.afs.collection("rol");
    return rol;
  }
  /**
* Consulta Tipo Documentos metodo unico software. 
 * Metodo principal:getTipoDocumento();  
 * @return AngularFirestore.collection;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getTipoDocumento() {
    var rol = this.afs.collection("tipodocumento");
    return rol;
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return AngularFirestore.collection;
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getEstado() {
    var rol = this.afs.collection("estado");
    return rol;
  }
  /**
* Consulta Pais metodo unico software. 
 * Metodo principal:getPais();  
 * @return AngularFirestore.collection;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getPais() {
    var rol = this.afs.collection("pais");
    return rol;
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
  crearSeguimiento(list: Seguimiento[], user: Intermediario, usersession: User, tipolinea: Count) {
    var countgarantias = tipolinea.count + 1;
    var countgarantiasregistro = tipolinea.indexcount + 1;
    var countvalorcapitaltotal = 0;
    var idcolecciongarantias = this.afs.createId();
    var idcoleccion = '';
    var idcoleccionfile = this.afs.createId();
    var cantidadgarantias = list.length;
    this.updateCountCartera(countgarantias)
    list.forEach(seguimiento => {
      countgarantiasregistro++
      countvalorcapitaltotal = countvalorcapitaltotal + seguimiento.valorcapital;
      idcoleccion = this.afs.createId()
      this.updateIndexCountGarantia(countgarantiasregistro);
      this.afs.collection("seguimiento").doc(idcoleccion).set({
        idcolecciongarantias: idcolecciongarantias,
        idcoleccion: idcoleccion,
        idcoleccionfile: idcoleccionfile,
        idgarantiaregistro: countgarantiasregistro,
        idgarantia: countgarantias,
        index: countgarantiasregistro,
        intermediario: user.nit,
        documento: seguimiento.documento,
        nombredeudor: seguimiento.nombredeudor,
        celular: seguimiento.celular,
        direccion: seguimiento.direccion,
        mail: seguimiento.mail,
        seguimiento: seguimiento.seguimiento,
        fechacompromiso: seguimiento.fechacompromiso,
        fechaproxima: seguimiento.fechaproxima,
        caracterizacion: seguimiento.caracterizacion,
        finllamada: seguimiento.finllamada,
        diasmora: seguimiento.diasmora,
        valorcapital: seguimiento.valorcapital,
        valorapagar: seguimiento.valorapagar,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadoen: usersession.email,
        modificadopor: this.date.getDate(),
        marcatiempo: new Date
      })
    })
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        return user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("seguimientosfile").doc(idcoleccionfile).set({
            idcoleccionfile: idcoleccionfile,
            nit: element.nit,
            nombrefile: element.nombrefile,
            fecha: this.date.getDate(),
            tipfile: element.tipfile
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
  updateIndexCountGarantia(index) {
    this.afs.collection("count").doc("countgarantias").update({
      indexcount: index
    })
  }
  /**
* Consulta Region metodo unico software. 
* Metodo principal:getRegion();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getRegion() {
    var rol = this.afs.collection("region");
    return rol;
  }
  /**
 * registro usuario autenticación  metodo unico software. 
  * Metodo principal:registerUserAuth(User,User); 
  * @param  User
  * @param  User
  * @return AngularFirestore.doc.set;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  registerUserAuth(user: User, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afa.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        this.afa.signInWithEmailAndPassword(user.email, user.password).then(function (info) {
          var user = info.user;
          user.sendEmailVerification()
        })
        if (user.role === 'Maestro') {
          user.maestropermission = this.afs.createId();
        }
        return this.afs.collection("users").doc(user.email).set({
          role: user.role,
          tipodocumento: user.tipodocumento,
          documento: user.documento,
          email: user.email,
          password: user.password,
          histpassword: user.password,
          estado: user.estado,
          nombre: user.nombre,
          telefono: user.telefono,
          rol: user.rol,
          maestro: user.maestro,
          permission: user.permission,
          maestropermission: user.maestropermission,
          creadopor: user.creadopor,
          creadoen: user.creadoen,
          modificadopor: user.modificadopor,
          modificadoen: user.modificadoen,
          modificacioncausa: user.modificacioncausa
        }).then(() => { this.afa.signInWithEmailAndPassword(usersession.email, usersession.password) })
      })

    })
    return userToLogin;
  }

  /**
* registro usuario autenticación  metodo unico software. 
 * Metodo principal:registerUserAuth(User,User); 
 * @param  User
 * @param  User
 * @return AngularFirestore.doc.set;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  registerUserSuperMaestroAuth(user: User, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afa.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        this.afa.signInWithEmailAndPassword(user.email, user.password).then(function (info) {
          var user = info.user;
          user.sendEmailVerification()
        })
        return this.afs.collection("users").doc(user.email).set({
          role: user.role,
          email: user.email,
          password: user.password,
          estado: user.estado,
          nombre: user.nombre,
          creadopor: user.creadopor,
          creadoen: user.creadoen,
          modificadopor: user.modificadopor,
          modificadoen: user.modificadoen
        }).then(() => { this.afa.signInWithEmailAndPassword(usersession.email, usersession.password) })
      })

    })
    return userToLogin;
  }
  /**
 * registro usuario autenticación  metodo unico software. 
  * Metodo principal:registerUserAuth(User,User); 
  * @param  User
  * @param  User
  * @return AngularFirestore.doc.set;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  registerPresupuesto(user,usersession) {
    var idcoleccion = this.afs.createId()
    return this.afs.collection("presupuesto").doc(idcoleccion).set({
      idcoleccion: idcoleccion,
      presupuesto: user.presupuesto,
      fecha: user.fecha, 
      creadopor: usersession.email,
      creadoen: new Date,
      modificadopor: usersession.email,
      modificadoen: new Date
    })
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
  deleteIntermediarioUser(user: Intermediario): any {
    this.afs.collection("intermediarios").doc(user.emailold).delete()
    this.afs.collection("users").doc(user.emailold).delete()
    var userToLogin = this.afa.signInWithEmailAndPassword(user.emailold, user.histpassword).then(function (info) {
      var user = info.user;
      user.delete();
    })
    return userToLogin;

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
  deleteIntermediarioUserMaestro(user: Intermediario, usersession: User): any {
    this.afs.collection("intermediarios").doc(user.emailold).delete()
    this.afs.collection("users").doc(user.emailold).delete()
    var userToLogin = this.afa.signInWithEmailAndPassword(user.emailold, user.histpassword).then(function (info) {
      var user = info.user;
      user.delete();
    }).then(() => {
      return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password)
    })
    return userToLogin;

  }
  /**
* Eliminar usuario  de Intermediario  metodo unico software. 
 * Metodo principal:deleteUser(User,User); 
 * @param  user
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  deleteUser(user: User, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afa.signInWithEmailAndPassword(user.email, user.password).then(function (info) {
        var user = info.user;
        user.delete();
      }).then(() => {
        return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password);
      })
        .then(() => {
          this.afs.collection("users").doc(user.email).delete().then(() => { })
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
    })
    return userToLogin;

  }
/**
* Eliminar usuario  de Intermediario  metodo unico software. 
 * Metodo principal:deleteUser(User,User); 
 * @param  user
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
deletePresupuesto(presupuesto){
  this.afs.collection("presupuesto").doc(presupuesto.idcoleccion).delete().then(() => { }) 
}
  /**
* Eliminar usuario  de Intermediario  metodo unico software. 
* Metodo principal:deleteUser(User,User); 
* @param  user
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteCampana(user: Campana, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("campana").doc(user.idcampana).delete()
    })
    return userToLogin;

  }

  /**
* Eliminar usuario  de Intermediario  metodo unico software. 
* Metodo principal:deleteUser(User,User); 
* @param  user
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteTipo(user: Manager, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("tipocaracterizacion").doc(user.idmanage).delete()
    })
    return userToLogin;

  }
  /**
* Eliminar usuario  de Intermediario  metodo unico software. 
 * Metodo principal:deleteUser(User,User); 
 * @param  user
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  deleteTipoFinal(user: Manager, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("tipofinal").doc(user.idmanage).delete()
    })
    return userToLogin;

  }
  /**
* Eliminar usuario  de Intermediario  metodo unico software. 
* Metodo principal:deleteUser(User,User); 
* @param  user
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteTipoComision(user: TipoLineaIntermediario, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afs.collection("lineasintermediario").doc(user.idcoleccion).delete().then(() => { })
    })
    return userToLogin;
  }
  /**
* Edita  usuario  de Intermediario  metodo unico software. 
 * Metodo principal:updateUser(User,User); 
 * @param  user
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  updateUser(user: User, usersession: User): any {
    return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afs.collection("users").doc(user.email).update({
        estado: user.estado,
        modificadopor: user.modificadopor,
        modificadoen: user.modificadoen,
        modificacioncausa: user.modificacioncausa,
        password: user.password,
        histpassword: user.histpassword
      }).then(() => {
        return this.afa.signInWithEmailAndPassword(user.email, user.histpassword)
          .then(function (info) {
            var userinfo = info.user;
            userinfo.updatePassword(user.password);
          }).then(() => {
            return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password);
          });;
      })
    })
  }

  /**
* Edita Intermediario  metodo unico software. 
 * Metodo principal:updateUserIntermediario(Intermediario,User); 
 * @param  Intermediario
 * @param  User
 * @return AngularFireAuth.signInWithEmailAndPassword;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  updateUserIntermediario(user: Intermediario, usersession: User) {
    return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afs.collection("intermediarios").doc(user.email).update({
        modificadopor: user.modificadopor,
        modificadoen: user.modificadoen,
        modificacioncausa: user.modificacioncausa,
        password: user.password,
        histpassword: user.histpassword
      }).then(() => {
        this.afs.collection("users").doc(user.email).update({
          modificadopor: user.modificadopor,
          modificadoen: user.modificadoen,
          modificacioncausa: user.modificacioncausa,
          password: user.password,
          histpassword: user.histpassword
        })
        return this.afa.signInWithEmailAndPassword(user.email, user.histpassword)
          .then(function (info) {
            var userinfo = info.user;
            userinfo.updatePassword(user.password);
          }).then(() => {
            return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password);
          });;
      })
    })
  }
  /**
* Registra Intermediario  metodo unico software. 
* Metodo principal:registerValidateUserIntermediario(Intermediario,User); 
* @param  Intermediario
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  registerValidateUserIntermediario(user: Intermediario, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afa.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        user.permission = this.afs.createId();
        return this.afs.collection("users").doc(user.email).set({
          role: user.role,
          tipodocumento: user.tipodocumento,
          documento: user.documento,
          email: user.email,
          password: user.password,
          histpassword: user.password,
          estado: user.estado,
          nombre: user.nombre,
          telefono: user.telefono,
          rol: user.rol,
          maestro: user.maestro,
          permission: user.permission,
          creadopor: user.creadopor,
          creadoen: user.creadoen,
          modificadopor: user.modificadopor,
          modificadoen: user.modificadoen,
          modificacioncausa: user.modificacioncausa
        }).then(() => {
          return this.afs.collection("intermediarios").doc(user.email).set({
            sigla: user.sigla,
            role: user.role,
            fechalimitereporte: user.fechalimitereporte,
            tipodocumento: user.tipodocumento,
            pais: user.pais,
            region: user.region,
            documento: user.documento,
            email: user.email,
            histemail: user.histemail,
            password: user.password,
            histpassword: user.password,
            estado: user.estado,
            nombre: user.nombre,
            nit: user.nit,
            descripcion: user.descripcion,
            direccion: user.direccion,
            telefono: user.telefono,
            ciudad: user.ciudad,
            contacto: user.contacto,
            trabajocontacto: user.trabajocontacto,
            telefonocontacto: user.telefonocontacto,
            emailcontacto: user.emailcontacto,
            personacorres: user.personacorres,
            trabajopersonacorres: user.trabajopersonacorres,
            emailpersonacorres: user.emailpersonacorres,
            telefonopersonacorres: user.telefonopersonacorres,
            rol: user.rol,
            maestro: user.maestro,
            coberturacreditomora: user.coberturacreditomora,
            administracion: user.administracion,
            ivaadministracion: user.ivaadministracion,
            comisiontotal: user.comisiontotal,
            saldototal: user.saldototal,
            idrepresentante: user.idrepresentante,
            rut: user.rut,
            fotoperfil: user.fotoperfil,
            camaracomercio: user.camaracomercio,
            certificacionbancaria: user.certificacionbancaria,
            contrato: user.contrato,
            otrossi: user.otrossi,
            permission: user.permission,
            creadopor: user.creadopor,
            creadoen: user.creadoen,
            modificadopor: user.modificadopor,
            modificadoen: user.modificadoen,
            modificacioncausa: user.modificacioncausa,
            cantidadgarantias: user.cantidadgarantias,
            saldocreditocobrado: user.saldocreditocobrado
          })
        }).then(() => {
          if (user.optionintermediario === 'addintermediario') {
            if (user.uploadfiles.length >= 0) {
              return user.uploadfiles.forEach(element => {
                this.referenciaCloudStorage(user.nit + element.nombrefile);
                this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
                var idcoleccion = this.afs.createId();
                this.afs.collection("docuintermediarios").doc(idcoleccion).set({
                  id: idcoleccion,
                  nit: element.nit,
                  nombrefile: element.nombrefile,
                  fecha: element.fecha,
                  tipfile: element.tipfile
                })
              });
            }
          }
        }).then(() => {
          if (user.optionintermediario === 'addintermediario') {
            return user.lineasintermediario.forEach(element => {
              var idcoleccion = this.afs.createId()
              this.afs.collection("lineasintermediario").doc(idcoleccion).set({
                idcoleccion: idcoleccion,
                idlinea: element.idlinea,
                nombrelinea: element.nombrelinea,
                intermediario: element.intermediario
              })
            });
          }
        })
      })

    })
    return userToLogin;

  }
  /**
* Registra Documentos Intermediario  metodo unico software. 
* Metodo principal:createDocuIntermediario(UploadFilesIntermediario,User); 
* @param  UploadFilesIntermediario
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  createDocuIntermediario(uploadfiles: UploadFilesIntermediario, usersession: User) {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      var idcoleccion = this.afs.createId();
      this.afs.collection("docuintermediarios").doc(idcoleccion).set({
        idcoleccion: idcoleccion,
        nit: uploadfiles.nit,
        nombrefile: uploadfiles.nombrefile,
        fecha: uploadfiles.fecha,
        tipfile: uploadfiles.tipfile
      })
    })
    return userToLogin;
  }
  /**
* Actualiza Documentos Intermediario  metodo unico software. 
* Metodo principal:updateDocuIntermediario(UploadFilesIntermediario,User); 
* @param  UploadFilesIntermediario
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateDocuIntermediario(uploadfiles: UploadFilesIntermediario, usersession: User) {
    return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afs.collection("docuintermediarios").doc(uploadfiles.id).update({
        nit: uploadfiles.nit,
        nombrefile: uploadfiles.nombrefile,
        fecha: uploadfiles.fecha,
        tipfile: uploadfiles.tipfile
      })
    })
  }
  /**
* Registra Documentos Historico Intermediario  metodo unico software. 
* Metodo principal:createHistIntermediario(UploadFilesIntermediario,User); 
* @param  UploadFilesIntermediario
* @param  User
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  createHistIntermediario(user: UploadFilesIntermediario, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      var idcoleccion = this.afs.createId()
      return this.afs.collection("histintermediarios").doc(idcoleccion).set({
        idcoleccion: idcoleccion,
        nit: user.nit,
        nombrefile: user.nombrefile,
        fecha: user.fecha,
        tipfile: user.tipfile
      })

    })
    return userToLogin;

  }

  /**
* Actualiza Intermediario  metodo unico software. 
* Metodo principal:Intermediario(Intermediario,User,UploadFilesIntermediario); 
* @param  Intermediario
* @param  User
* @param  UploadFilesIntermediario
* @return AngularFireAuth.signInWithEmailAndPassword;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateIntermediario(user: Intermediario, usersession: User, uploadfiles: UploadFilesIntermediario[], lineasintermediario: TipoLineaIntermediario[]) {
    return this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      return this.afs.collection("intermediarios").doc(user.email).update({
        fechalimitereporte: user.fechalimitereporte,
        pais: user.pais,
        region: user.region,
        estado: user.estado,
        nombre: user.nombre,
        sigla: user.sigla,
        tipodocumento: user.tipodocumento,
        documento: user.documento,
        descripcion: user.descripcion,
        direccion: user.direccion,
        telefono: user.telefono,
        ciudad: user.ciudad,
        contacto: user.contacto,
        trabajocontacto: user.trabajocontacto,
        telefonocontacto: user.telefonocontacto,
        emailcontacto: user.emailcontacto,
        personacorres: user.personacorres,
        trabajopersonacorres: user.trabajopersonacorres,
        emailpersonacorres: user.emailpersonacorres,
        telefonopersonacorres: user.telefonopersonacorres,
        idrepresentante: user.idrepresentante,
        rut: user.rut,
        camaracomercio: user.camaracomercio,
        certificacionbancaria: user.certificacionbancaria,
        contrato: user.contrato,
        otrossi: user.otrossi,
        modificadopor: user.modificadopor,
        modificadoen: user.modificadoen,
        modificacioncausa: user.modificacioncausa
      })
    }).then(() => {
      if (uploadfiles) {
        if (uploadfiles.length >= 0) {
          return uploadfiles.forEach(element => {
            this.referenciaCloudStorage(user.nit + element.nombrefile);
            this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          });
        }
      }
    }).then(() => {
      if (lineasintermediario) {
        if (lineasintermediario.length >= 0) {
          return lineasintermediario.forEach(element => {
            if (element.idcoleccion) {
              this.afs.collection("lineasintermediario").doc(element.idcoleccion).update({
                idlinea: element.idlinea,
                nombrelinea: element.nombrelinea,
                intermediario: element.intermediario
              })
            } else {
              var idcoleccion = this.afs.createId()
              this.afs.collection("lineasintermediario").doc(idcoleccion).set({
                idcoleccion: idcoleccion,
                idlinea: element.idlinea,
                nombrelinea: element.nombrelinea,
                intermediario: element.intermediario
              })
            }
          });
        }
      }
    })
  }


  /**
* Tarea para subir archivo 
* Metodo principal:tareaCloudStorage(string,any); 
* @param  string
* @param  any 
* @return AngularFireStorage.upload;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }
  /**
* Referencia del archivo
* Metodo principal:referenciaCloudStorage(Intermediario,User,UploadFilesIntermediario); 
* @param  string 
* @return AngularFireStorage.ref;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  /**
*  Tarea para leer archivo
* Metodo principal:TareaLeerCloudStorage(string); 
* @param  string 
* @return AngularFireStorage.ref;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
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
  public updateValoresIntermediario(intermediario: Intermediario) {
    return this.afs.collection("intermediarios").doc(intermediario.email).update({
      coberturacreditomora: intermediario.coberturacreditomora,
      administracion: intermediario.administracion,
      ivaadministracion: intermediario.ivaadministracion,
      comisiontotal: intermediario.comisiontotal,
      saldocreditocobrado: intermediario.saldocreditocobrado,
      cantidadgarantias: intermediario.cantidadgarantias,
      intereses: intermediario.intereses,
      gac: intermediario.gac,
      recuperacion: intermediario.recuperacion
    });
  }
/**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
public updateValoresIntermediarioInt(intermediario: Intermediario) {
  return this.afs.collection("intermediarios").doc(intermediario.email).update({
    saldocreditocobrado: intermediario.saldocreditocobrado
  });
}
}




