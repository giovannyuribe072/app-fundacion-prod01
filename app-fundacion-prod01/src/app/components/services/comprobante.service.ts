import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { DatePage } from '../util/date.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { GarantiasTotal } from '../model/garantiastotal.model';
import { Intermediario } from '../model/intermediario.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Garantias } from '../model/garantias.model';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  constructor(private date: DatePage, private afs: AngularFirestore, private storage: AngularFireStorage, private auth: AngularFireAuth) {
  }
  
  getAfsFirestore(){
    return this.afs.firestore;
  }
  /**
* Consulta tipolinea metodo unico software. 
 * Metodo principal:getIntermediarios();  
 * @return AngularFirestore.collection;
 * AUTH GOOGLE CLOUD FIREBASE SERVICE
 * @author Giovanny Uribe Acevedo
 */
  getTiposPago() {
    var user = this.afs.collection("tipopago");
    return user;
  }
  getAuth() {
    return this.auth;
  }
  getAfs() {
    return this.afs;
  }
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

  getContactSendAdm() {
    var user = this.afs.collection("contactsendadm");
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


  updateEstadoCargueGarantia(garantiasTotal: GarantiasTotal, usersession: User) {
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      estado: garantiasTotal.estado,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }

  aprobarComprobado(intermediario: Intermediario, garantiasTotal: GarantiasTotal, usersession: User) {
    var coberturacreditomora = intermediario.coberturacreditomora + parseFloat(garantiasTotal.cobertura);
    var administracion = intermediario.administracion + parseFloat(garantiasTotal.administracion);
    var ivaadministracion = intermediario.ivaadministracion + parseFloat(garantiasTotal.ivaadministracion);
    var comisiontotal = intermediario.comisiontotal + parseFloat(garantiasTotal.comisiontotal);
    var saldototal = intermediario.saldototal + parseFloat(garantiasTotal.saldototal);
    var cantidadgarantias = intermediario.cantidadgarantias + parseFloat(garantiasTotal.cantidadgarantias);
    this.afs.collection("intermediarios").doc(intermediario.email).update({
      coberturacreditomora: coberturacreditomora,
      administracion: administracion,
      ivaadministracion: ivaadministracion,
      comisiontotal: comisiontotal,
      modificadopor: usersession.email,
      saldototal: saldototal,
      cantidadgarantias: cantidadgarantias,
      modificadoen: this.date.getDate()
    })
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      comprobado: true,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }


  aprobarCobro(intermediario: Intermediario, garantiasTotal: Garantias, usersession: User) {
    var coberturacreditomora = intermediario.coberturacreditomora - parseFloat(garantiasTotal.saldocobrado);
    this.afs.collection("intermediarios").doc(intermediario.email).update({
      coberturacreditomora: coberturacreditomora,
      modificadoen: this.date.getDate(),
      modificadopor: usersession.email
    })
  }

  updateTotalCargueGarantiaFactura(garantiasTotal: GarantiasTotal, usersession: User) {
    this.referenciaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilecomprobante);
    this.tareaCloudStorage(garantiasTotal.intermediario + garantiasTotal.nombrefilecomprobante, garantiasTotal.fileToUpload);
    this.afs.collection("garantiastotal").doc(garantiasTotal.idcoleccionfile).update({
      nombrefilecomprobante: garantiasTotal.nombrefilecomprobante,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate()
    })
  }
  getGarantiasTotales() {
    var user = this.afs.collection("garantiastotal");
    return user;
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


  public updateFiles(element) {
    var idcoleccion = this.afs.createId();
    this.afs.collection("docugarantias").doc(idcoleccion).set({
      id: idcoleccion,
      nit: element.nit,
      nombrefile: element.nombrefile,
      fecha: element.fecha,
      tipfile: element.tipfile
    })
  }

  public updateGarantia(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccion).update({
      modificadoen: this.date.getDate(),
      estado: garantia.estado,
      pagarefile: garantia.pagarefile,
      cartainstruccion: garantia.cartainstruccion,
      liquidacioncredito: garantia.liquidacioncredito,
      cedulaciudadania: garantia.cedulaciudadania,
      anexoservicio: garantia.anexoservicio,
      certificacionriesgo: garantia.certificacionriesgo,
      saldocobrado: garantia.saldocobrado,
      saldorestante: garantia.saldorestante
    })
  }

  public ReverseParcialGarantia(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccionpadre).update({
      modificadoen: this.date.getDate(),
      saldorestante: garantia.saldorestante


    })
  }
  public RestanteParcialGarantia(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccion).update({
      modificadoen: this.date.getDate(),
      saldorestante: garantia.saldorestante,
      saldocobrado: garantia.saldocobrado

    })
  }
  public deleteGarantiaParcial(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccion).delete()
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
      creadoen: this.date.getDate()
    })
  }
  /**
* Consulta contadores metodo unico software. 
* Metodo principal:getCount();  
* @return AngularFirestore.collection;
* AUTH GOOGLE CLOUD FIREBASE SERVICE
* @author Giovanny Uribe Acevedo
*/
  RegisterNotificacionEstadoCobroGarantia(garantias: Garantias, usersession: User) {
    var idcoleccion = this.afs.createId();
    this.afs.collection("notifica").doc(idcoleccion).set({
      idcoleccion: idcoleccion,
      descripcion: 'Se a generado un cobro en la garantia Nro. Identificación:' + garantias.identificacion + '.',
      intermediario: garantias.intermediario,
      estado: garantias.estado,
      modificadopor: usersession.email,
      modificadoen: this.date.getDate(),
      creadopor: usersession.email,
      creadoen: this.date.getDate()
    })
  }
  public createGarantiaParcial(garantia) {
    var idcoleccion = this.afs.createId()
    this.afs.collection("garantias").doc(idcoleccion).set({
      indicativo: 'parcial',
      idcoleccionpadre: garantia.idcoleccion,
      idcolecciongarantias: garantia.idcolecciongarantias,
      idcoleccion: idcoleccion,
      idcoleccionfile: garantia.idcoleccionfile,
      idgarantiaregistro: garantia.idgarantiaregistro,
      idgarantia: garantia.idgarantia,
      idcomision: garantia.idcomision,
      idcomisionregistro: garantia.idcomisionregistro,
      idlinea: garantia.idlinea,
      intermediario: garantia.intermediario,
      codigolineacrediticio: garantia.codigolineacrediticio,
      tipoidentificacion: garantia.tipoidentificacion,
      identificacion: garantia.identificacion,
      codigociiu: garantia.codigociiu,
      apellidos: garantia.apellidos,
      nombres: garantia.nombres,
      municipiocliente: garantia.municipiocliente,
      direccionclienteuno: garantia.direccionclienteuno,
      direccionclientedos: garantia.direccionclientedos,
      telefonouno: garantia.telefonouno,
      telefonodos: garantia.telefonodos,
      celular: garantia.celular,
      correoelectronico: garantia.correoelectronico,
      nombrecodeudor: garantia.nombrecodeudor,
      identificacioncodeudor: garantia.identificacioncodeudor,
      direccioncodeudor: garantia.direccioncodeudor,
      telefonocodeudor: garantia.telefonocodeudor,
      celularcodeudor: garantia.celularcodeudor,
      credito: garantia.credito,
      pagare: garantia.pagare,
      plazo: garantia.plazo,
      periodo: garantia.periodo,
      tasa: garantia.tasa,
      fechadesembolso: garantia.fechadesembolso,
      fechavencimiento: garantia.fechavencimiento,
      amortizacion: garantia.amortizacion,
      periodogracia: garantia.periodogracia,
      valormontodesembolsado: garantia.valormontodesembolsado,
      saldo: garantia.saldo,
      cobertura: garantia.cobertura,
      administracion: garantia.administracion,
      ivaadministracion: garantia.ivaadministracion,
      comisiontotal: garantia.comisiontotal,
      estado: garantia.estado,
      creadopor: garantia.creadopor,
      creadoen: this.date.getDate(),
      modificadopor: garantia.modificadopor,
      modificadoen: this.date.getDate(),
      fechareporte: garantia.fechareporte,
      pagarefile: garantia.pagarefile,
      cartainstruccion: garantia.cartainstruccion,
      liquidacioncredito: garantia.liquidacioncredito,
      cedulaciudadania: garantia.cedulaciudadania,
      anexoservicio: garantia.anexoservicio,
      certificacionriesgo: garantia.certificacionriesgo,
      saldocobrado: garantia.saldocobrado,
      saldorestante: garantia.saldorestante
    })
  }
  public updateGarantiaLiq(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccion).update({
      modificadoen: this.date.getDate(),
      estado: garantia.estado,
      liquidaciongarantia: garantia.liquidaciongarantia


    })
  }
  public updateEstadoGarantia(garantia) {
    this.afs.collection("garantias").doc(garantia.idcoleccion).update({
      modificadoen: this.date.getDate(),
      estado: garantia.estado


    })
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

}


