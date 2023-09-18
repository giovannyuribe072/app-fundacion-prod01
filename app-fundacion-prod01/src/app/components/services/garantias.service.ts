import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EsquemaUnicoAnticipado } from '../model/esquemaunicoanticipado.model';
import { User } from '../model/user.model';
import { Intermediario } from '../model/intermediario.model';
import { DatePage } from '../util/date.page';
import { Count } from '../model/count.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Garantias } from '../model/garantias.model';
import { GarantiasTotal } from '../model/garantiastotal.model';

@Injectable({
  providedIn: 'root'
})
export class GarantiasService {
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
  getContactSendCont() {
    var user = this.afs.collection("contactsendcont");
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
  updateCountGarantias(index) {
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
  updateCountGarantiasCuenta(index) {
    this.afs.collection("count").doc("countgarantias").update({
      index: index
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
  RegisterNotificacionEstadoCargueGarantia(garantiasTotal: GarantiasTotal, usersession: User) {
    var idcoleccion = this.afs.createId();
    this.afs.collection("notifica").doc(idcoleccion).set({
      idcoleccion: idcoleccion,
      descripcion: 'Se a generado un cambio en el cargue:' + garantiasTotal.idgarantia,
      intermediario: garantiasTotal.intermediario,
      estado: garantiasTotal.estado,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      creadopor: usersession.email,
      creadoen: this.date.getDate(),
      marcatiempo: new Date
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateEstadoCargueGarantia(garantiasTotal: GarantiasTotal, usersession: User) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      estado: garantiasTotal.estado,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateEstadoCargueGarantiaRecaudo(garantiasTotal: GarantiasTotal, usersession: User) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      cobertura: garantiasTotal.cobertura,
      administracion: garantiasTotal.administracion,
      ivaadministracion: garantiasTotal.ivaadministracion,
      comisiontotal: garantiasTotal.comisiontotal,
      estado: garantiasTotal.estado,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateGarantiaCargueTotal(garantiasTotal: GarantiasTotal, garantias: Garantias, usersession: User) {
    return this.afs.collection("garantias").doc(garantias.idcoleccion).update(
      {
        cobertura: garantias.cobertura,
        administracion: garantias.administracion,
        ivaadministracion: garantias.ivaadministracion,
        comisiontotal: garantias.comisiontotal,
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
      }
    ).then(() => {
      this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update(
        {
          cobertura: garantiasTotal.cobertura,
          administracion: garantiasTotal.administracion,
          ivaadministracion: garantiasTotal.ivaadministracion,
          comisiontotal: garantiasTotal.comisiontotal,
          modificadopor: usersession.email,
          modificadoen: this.date.getDate(),
        }
      )
    })
  }

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  updateGarantias(garantias: Garantias, usersession: User) {
    return this.afs.collection("garantias").doc(garantias.idcoleccion).update(
      {
        estado: garantias.estado,
        cobertura: garantias.cobertura,
        administracion: garantias.administracion,
        ivaadministracion: garantias.ivaadministracion,
        comisiontotal: garantias.comisiontotal,
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
      }
    )
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteCargueGarantiaSum(garantiasTotal: GarantiasTotal, garantias: Garantias[]) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).delete()
    this.afs.collection("garantiasfile").doc(garantiasTotal.idcoleccionfile).delete()
    garantias.forEach(element => {
      this.afs.collection("garantias").doc(element.idcoleccion).delete()
    });
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteCargueGarantia(garantiasTotal: GarantiasTotal, garantias: Garantias[]) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).delete()
    this.afs.collection("garantiasfile").doc(garantiasTotal.idcoleccionfile).delete()
    garantias.forEach(element => {
      this.afs.collection("garantias").doc(element.idcoleccion).delete()
    });
    this.TareaEliminarCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefile)
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  deleteCargueGarantiaDevuelto(garantiasTotal: GarantiasTotal, garantias: Garantias[], intermediario: Intermediario) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).delete()
    this.afs.collection("garantiasfile").doc(garantiasTotal.idcoleccionfile).delete()
    garantias.forEach(element => {
      this.afs.collection("garantias").doc(element.idcoleccion).delete()
    });
    this.TareaEliminarCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefile)
    this.TareaEliminarCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilefactura)
    this.TareaEliminarCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilecomprobante)
    this.eliminarCountIntermediario(intermediario, garantias.length, garantiasTotal)

  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  eliminarCountIntermediario(intermediario: Intermediario, garantiascount: number, garantiasTotal: GarantiasTotal) {
    var cantidadgarantias = intermediario.cantidadgarantias - garantiascount;
    var cobertura = intermediario.coberturacreditomora - parseFloat(garantiasTotal.cobertura)
    var cobertura = intermediario.coberturacreditomora - parseFloat(garantiasTotal.cobertura)
    var saldototal = intermediario.saldototal - parseFloat(garantiasTotal.saldototal)
    var administracion = intermediario.administracion - parseFloat(garantiasTotal.administracion)
    var ivaadministracion = intermediario.ivaadministracion - parseFloat(garantiasTotal.ivaadministracion)
    var comisiontotal = intermediario.comisiontotal - parseFloat(garantiasTotal.comisiontotal)
    this.afs.collection("intermediarios").doc(intermediario.email).update({
      cantidadgarantias: cantidadgarantias,
      coberturacreditomora: cobertura,
      saldototal: saldototal,
      administracion: administracion,
      ivaadministracion: ivaadministracion,
      comisiontotal: comisiontotal
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesPeriodosCobertura() {
    var user = this.afs.collection("comisiones");
    return user;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesEsquemaUnico() {
    var user = this.afs.collection("comisionesesquemaunico");
    return user;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesEsquemaMensual() {
    var user = this.afs.collection("comisionesesquemamensual");
    return user;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesLinealizadas() {
    var user = this.afs.collection("comisioneslinealizadas");
    return user;
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getComisionesLinealizadasMensual() {
    var user = this.afs.collection("comisioneslinealizadasmensual");
    return user;
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
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  getGarantiasTotal() {
    var user = this.afs.collection("garantiastotal")
    return user;
  }


  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantias(list: Garantias[], user: Intermediario, usersession: User, tipolinea: Count, nombrefile: string, date: string) {
    var countgarantias = tipolinea.count + 1;
    var countgarantiasregistro = tipolinea.indexcount + 1;
    var countcoberturatotal = 0;
    var countadministraciontotal = 0;
    var countivaadministraciontotal = 0;
    var countcomisiontotaltotal = 0;
    var countsaldototal = 0;
    var idcomision = ''
    var idlinea = ''
    var validacionidcomision;
    var idcolecciongarantias = this.afs.createId();
    var idcoleccion = '';
    var idcoleccionfile = this.afs.createId();
    var cantidadgarantias = list.length;
    this.updateCountGarantias(countgarantias)
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("garantiasfile").doc(idcoleccionfile).set({
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
    const start = performance.now();
    return new Promise((resolve, reject) => {
      var bar = new Promise((resolves, reject) => {
        let id = 0;
        list.forEach(element => {
          id++;
          validacionidcomision = parseInt(element.idcomision);
          try {
            countcoberturatotal = countcoberturatotal + parseFloat(element.cobertura);
            countadministraciontotal = countadministraciontotal + parseFloat(element.administracion);
            countivaadministraciontotal = countivaadministraciontotal + parseFloat(element.ivaadministracion);
            countcomisiontotaltotal = countcomisiontotaltotal + parseFloat(element.comisiontotal);
            countsaldototal = countsaldototal + parseFloat(element.saldo);

          } catch (error) {
          }
          idcomision = element.idcomision
          idlinea = element.idlinea
          countgarantiasregistro++
          idcoleccion = this.afs.createId()
          this.updateIndexCountGarantia(countgarantiasregistro);
          this.afs.collection("garantias").doc(idcoleccion).set({
            idcolecciongarantias: idcolecciongarantias,
            idcoleccion: idcoleccion,
            idcoleccionfile: idcoleccionfile,
            idgarantiaregistro: countgarantiasregistro,
            idgarantia: countgarantias,
            idcomision: element.idcomision,
            idcomisionregistro: element.idcomisionregistro,
            idlinea: element.idlinea,
            intermediario: user.nit,
            codigolineacrediticio: element.codigolineacrediticio,
            tipoidentificacion: element.tipoidentificacion,
            identificacion: element.identificacion,
            codigociiu: element.codigociiu,
            apellidos: element.apellidos,
            nombres: element.nombres,
            municipiocliente: element.municipiocliente,
            direccionclienteuno: element.direccionclienteuno,
            direccionclientedos: element.direccionclientedos,
            telefonouno: element.telefonouno,
            telefonodos: element.telefonodos,
            celular: element.celular,
            correoelectronico: element.correoelectronico,
            nombrecodeudor: element.nombrecodeudor,
            identificacioncodeudor: element.identificacioncodeudor,
            direccioncodeudor: element.direccioncodeudor,
            telefonocodeudor: element.telefonocodeudor,
            celularcodeudor: element.celularcodeudor,
            credito: element.credito,
            pagare: element.pagare,
            plazo: element.plazo,
            periodo: element.periodo,
            tasa: element.tasa,
            fechadesembolso: element.fechadesembolso,
            fechavencimiento: element.fechavencimiento,
            amortizacion: element.amortizacion,
            periodogracia: element.periodogracia,
            valormontodesembolsado: element.valormontodesembolsado,
            saldo: element.saldo,
            cobertura: element.cobertura,
            administracion: element.administracion,
            ivaadministracion: element.ivaadministracion,
            comisiontotal: element.comisiontotal,
            estado: element.estado,
            creadopor: usersession.email,
            creadoen: this.date.getDate(),
            modificadopor: usersession.email,
            modificadoen: this.date.getDate(),
            fechareporte: date,
            marcatiempo: new Date
          })
          if (id == list.length) {
            const end = performance.now();
            const duration = end - start;
            resolves({ duration });
          }
        })
      });
      bar.then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      })
    }).then((duration) => {
      this.afs.collection("garantiastotal").doc(idcoleccionfile).set({
        idcoleccionfile: idcoleccionfile,
        nombrefile: nombrefile,
        intermediario: user.nit,
        idgarantia: countgarantias,
        idcomision: idcomision,
        idlinea: idlinea,
        cobertura: countcoberturatotal,
        administracion: countadministraciontotal,
        ivaadministracion: countivaadministraciontotal,
        comisiontotal: countcomisiontotaltotal,
        cantidadgarantias: cantidadgarantias,
        comprobado: false,
        estado: 'CARGADO',
        fechareporte: date,
        saldototal: countsaldototal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });

  }
  /**
  * Consulta contadores metodo unico software. 
  * Metodo principal:getCount();  
  * @return AngularFirestore.collection;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  crearGarantiasMen(list: Garantias[], user: Intermediario, usersession: User, tipolinea: Count, nombrefile: string, date: string) {
    var countgarantias = tipolinea.count + 1;
    var countgarantiasregistro = tipolinea.indexcount + 1;
    var countcoberturatotal = 0;
    var countadministraciontotal = 0;
    var countivaadministraciontotal = 0;
    var countcomisiontotaltotal = 0;
    var countsaldototal = 0;
    var idcomision = ''
    var idlinea = ''
    var validacionidcomision;
    var idcolecciongarantias = this.afs.createId();
    var idcoleccion = '';
    var idcoleccionfile = this.afs.createId();
    var cantidadgarantias = 0;
    this.updateCountGarantias(countgarantias)
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("garantiasfile").doc(idcoleccionfile).set({
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
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("garantiasfile").doc(idcoleccionfile).set({
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
    const start = performance.now();
    return new Promise((resolve, reject) => {
      var bar = new Promise((resolves, reject) => {
        let id = 0;
        list.forEach(element => {
          id++;
          validacionidcomision = parseInt(element.idcomision);
          try {
            countcoberturatotal = countcoberturatotal + parseFloat(element.cobertura);
            countadministraciontotal = countadministraciontotal + parseFloat(element.administracion);
            countivaadministraciontotal = countivaadministraciontotal + parseFloat(element.ivaadministracion);
            countcomisiontotaltotal = countcomisiontotaltotal + parseFloat(element.comisiontotal);
            countsaldototal = countsaldototal + parseFloat(element.saldo);

          } catch (error) {
          }
          idcomision = element.idcomision
          idlinea = element.idlinea
          countgarantiasregistro++
          idcoleccion = this.afs.createId()
          this.updateIndexCountGarantia(countgarantiasregistro);
          this.afs.collection("garantias").doc(idcoleccion).set({
            idcolecciongarantias: idcolecciongarantias,
            idcoleccion: idcoleccion,
            idcoleccionfile: idcoleccionfile,
            idgarantiaregistro: countgarantiasregistro,
            idgarantia: countgarantias,
            idcomision: element.idcomision,
            idcomisionregistro: element.idcomisionregistro,
            idlinea: element.idlinea,
            intermediario: user.nit,
            codigolineacrediticio: element.codigolineacrediticio,
            tipoidentificacion: element.tipoidentificacion,
            identificacion: element.identificacion,
            codigociiu: element.codigociiu,
            apellidos: element.apellidos,
            nombres: element.nombres,
            municipiocliente: element.municipiocliente,
            direccionclienteuno: element.direccionclienteuno,
            direccionclientedos: element.direccionclientedos,
            telefonouno: element.telefonouno,
            telefonodos: element.telefonodos,
            celular: element.celular,
            correoelectronico: element.correoelectronico,
            nombrecodeudor: element.nombrecodeudor,
            identificacioncodeudor: element.identificacioncodeudor,
            direccioncodeudor: element.direccioncodeudor,
            telefonocodeudor: element.telefonocodeudor,
            celularcodeudor: element.celularcodeudor,
            credito: element.credito,
            pagare: element.pagare,
            plazo: element.plazo,
            periodo: element.periodo,
            tasa: element.tasa,
            fechadesembolso: element.fechadesembolso,
            fechavencimiento: element.fechavencimiento,
            amortizacion: element.amortizacion,
            periodogracia: element.periodogracia,
            valormontodesembolsado: element.valormontodesembolsado,
            saldo: element.saldo,
            cobertura: element.cobertura,
            administracion: element.administracion,
            ivaadministracion: element.ivaadministracion,
            comisiontotal: element.comisiontotal,
            estado: element.estado,
            creadopor: usersession.email,
            creadoen: this.date.getDate(),
            modificadopor: usersession.email,
            modificadoen: this.date.getDate(),
            fechareporte: date,
            marcatiempo: new Date
          })
          if (id == list.length) {
            const end = performance.now();
            const duration = end - start;
            resolves({ duration });
          }
        })
      });
      bar.then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      })
    }).then((duration) => {
      this.afs.collection("garantiastotal").doc(idcoleccionfile).set({
        idcoleccionfile: idcoleccionfile,
        nombrefile: nombrefile,
        intermediario: user.nit,
        idgarantia: countgarantias,
        idcomision: idcomision,
        idlinea: idlinea,
        cobertura: countcoberturatotal,
        administracion: countadministraciontotal,
        ivaadministracion: countivaadministraciontotal,
        comisiontotal: countcomisiontotaltotal,
        cantidadgarantias: cantidadgarantias,
        comprobado: false,
        estado: 'CARGADO',
        fechareporte: date,
        saldototal: countsaldototal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });  
  }


  updateTotalCargueGarantiaFactura(garantiasTotal: GarantiasTotal, usersession: User) {
    this.referenciaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilefactura);
    this.tareaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilefactura, garantiasTotal.fileToUpload);
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      nombrefilefactura: garantiasTotal.nombrefilefactura,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }

  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  crearGarantiasRecaudado(list: Garantias[], user: Intermediario, usersession: User, tipolinea: Count, nombrefile: string, date: string) {
    var countgarantias = tipolinea.count + 1;
    var countgarantiasregistro = tipolinea.indexcount + 1;
    var countcoberturatotal = 0;
    var countadministraciontotal = 0;
    var countivaadministraciontotal = 0;
    var countcomisiontotaltotal = 0;
    var countsaldototal = 0;
    var idcomision = ''
    var idlinea = ''
    var validacionidcomision;
    var idcolecciongarantias = this.afs.createId();
    var idcoleccion = '';
    var idcoleccionfile = this.afs.createId();
    var cantidadgarantias = list.length;
    this.updateCountGarantias(countgarantias)
    if (user.uploadfiles) {
      if (user.uploadfiles.length >= 0) {
        user.uploadfiles.forEach(element => {
          this.referenciaCloudStorage(user.nit + element.nombrefile);
          this.tareaCloudStorage(user.nit + element.nombrefile, element.fileToUpload);
          this.afs.collection("garantiasfile").doc(idcoleccionfile).set({
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
    const start = performance.now();
    return new Promise((resolve, reject) => {
      var bar = new Promise((resolves, reject) => {
        let id = 0;
        list.forEach(element => {
          id++;
          validacionidcomision = parseInt(element.idcomision);
          try {
            countcoberturatotal = countcoberturatotal + parseFloat(element.cobertura);
            countadministraciontotal = countadministraciontotal + parseFloat(element.administracion);
            countivaadministraciontotal = countivaadministraciontotal + parseFloat(element.ivaadministracion);
            countcomisiontotaltotal = countcomisiontotaltotal + parseFloat(element.comisiontotal);
            countsaldototal = countsaldototal + parseFloat(element.saldo);

          } catch (error) {
          }
          idcomision = element.idcomision
          idlinea = element.idlinea
          countgarantiasregistro++
          idcoleccion = this.afs.createId()
          this.updateIndexCountGarantia(countgarantiasregistro);
          this.afs.collection("garantias").doc(idcoleccion).set({
            idcolecciongarantias: idcolecciongarantias,
            idcoleccion: idcoleccion,
            idcoleccionfile: idcoleccionfile,
            idgarantiaregistro: countgarantiasregistro,
            idgarantia: countgarantias,
            idcomision: element.idcomision,
            idcomisionregistro: element.idcomisionregistro,
            idlinea: element.idlinea,
            intermediario: user.nit,
            codigolineacrediticio: element.codigolineacrediticio,
            tipoidentificacion: element.tipoidentificacion,
            identificacion: element.identificacion,
            codigociiu: element.codigociiu,
            apellidos: element.apellidos,
            nombres: element.nombres,
            municipiocliente: element.municipiocliente,
            direccionclienteuno: element.direccionclienteuno,
            direccionclientedos: element.direccionclientedos,
            telefonouno: element.telefonouno,
            telefonodos: element.telefonodos,
            celular: element.celular,
            correoelectronico: element.correoelectronico,
            nombrecodeudor: element.nombrecodeudor,
            identificacioncodeudor: element.identificacioncodeudor,
            direccioncodeudor: element.direccioncodeudor,
            telefonocodeudor: element.telefonocodeudor,
            celularcodeudor: element.celularcodeudor,
            credito: element.credito,
            pagare: element.pagare,
            plazo: element.plazo,
            periodo: element.periodo,
            tasa: element.tasa,
            fechadesembolso: element.fechadesembolso,
            fechavencimiento: element.fechavencimiento,
            amortizacion: element.amortizacion,
            periodogracia: element.periodogracia,
            valormontodesembolsado: element.valormontodesembolsado,
            saldo: element.saldo,
            cobertura: element.cobertura,
            administracion: element.administracion,
            ivaadministracion: element.ivaadministracion,
            comisiontotal: element.comisiontotal,
            estado: element.estado,
            creadopor: usersession.email,
            creadoen: this.date.getDate(),
            modificadopor: usersession.email,
            modificadoen: this.date.getDate(),
            fechareporte: date,
            marcatiempo: new Date
          })
          if (id == list.length) {
            const end = performance.now();
            const duration = end - start;
            resolves({ duration });
          }
        })
      });
      bar.then(() => {
        const end = performance.now();
        const duration = end - start;
        resolve({ duration });
      })
    }).then((duration) => {
      this.afs.collection("garantiastotal").doc(idcoleccionfile).set({
        idcoleccionfile: idcoleccionfile,
        nombrefile: nombrefile,
        intermediario: user.nit,
        idgarantia: countgarantias,
        idcomision: idcomision,
        idlinea: idlinea,
        cobertura: countcoberturatotal,
        administracion: countadministraciontotal,
        ivaadministracion: countivaadministraciontotal,
        comisiontotal: countcomisiontotaltotal,
        cantidadgarantias: cantidadgarantias,
        comprobado: false,
        estado: 'APROBADO',
        fechareporte: date,
        saldototal: countsaldototal,
        creadopor: usersession.email,
        creadoen: this.date.getDate(),
        modificadopor: usersession.email,
        modificadoen: this.date.getDate(),
        marcatiempo: new Date
      })
    });  
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
  hitoricoCobertura(user: EsquemaUnicoAnticipado, usersession: User): any {
    var userToLogin = this.afa.signInWithEmailAndPassword(usersession.email, usersession.password).then(() => {
      this.afs.collection("comisionesesquemaunico").doc(user.idcoleccion).delete().then(() => { })

    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    return userToLogin;

  }

}




