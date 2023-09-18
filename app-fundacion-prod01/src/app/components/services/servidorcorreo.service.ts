import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact.model';
import { Correo } from '../model/correo.model';
import { Count } from '../model/count.model';
import { GarantiasTotal } from '../model/garantiastotal.model';
import { Intermediario } from '../model/intermediario.model';
import { CORREO } from './urlServices'; 
import { ReporteOperacion } from '../model/reporteoperacion.model';
import { HttpHeaders } from '@angular/common/http'; 
import * as $ from 'jquery'; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};
@Injectable({
    providedIn: 'root'
  })
export class ServidorCorreoService {

    constructor(private Http: HttpClient) { }
 
    public getCorreo(corre: Contact): Observable<Contact> {   
        const headers = { 'content-type': 'application/json'}  
        return this.Http.get<Correo>(CORREO.api + CORREO.correo + "?nom=" + corre.nom+"&ema="+corre.ema+"&des="+corre.des +"&ciu="+corre.ciu+"&ent="+corre.ent+"&ident="+corre.ident,{'headers':headers} );
    }
  
    public getCert(intermediario: Intermediario) {   
        var date: Date = new Date();
        var mes = "";
        if((date.getMonth() + 1).toString() == "1"){
            mes = "enero";
        }if((date.getMonth() + 1).toString() == "2"){
            mes = "febrero";
        }if((date.getMonth() + 1).toString() == "3"){
            mes = "marzo";
        }if((date.getMonth() + 1).toString() == "4"){
            mes = "abril";
        }if((date.getMonth() + 1).toString() == "5"){
            mes = "mayo";
        }if((date.getMonth() + 1).toString() == "6"){
            mes = "junio";
        }if((date.getMonth() + 1).toString() == "7"){
            mes = "julio";
        }if((date.getMonth() + 1).toString() == "8"){
            mes = "agosto";
        } if((date.getMonth() + 1).toString() == "9"){
            mes = "septiembre";
        }if((date.getMonth() + 1).toString() == "10"){
            mes = "octubre";
        } if((date.getMonth() + 1).toString() == "11"){
            mes = "noviembre";
        }if((date.getMonth() + 1).toString() == "12"){
            mes = "diciembre";
        } 
        
        return this.Http.get(CORREO.prod + CORREO.apicert + intermediario.descripcion + '/'+intermediario.sigla + '/'+intermediario.nit + '/'+date.getDate().toString()  + '/'+mes+ '/'+date.getFullYear().toString()+ '/'+intermediario.coberturacreditomora)
    }

    public getCertNormal(intermediario: Intermediario, garantiasTotal : GarantiasTotal, count:Count) {   
        var date: Date = new Date();
        var mes = "";
        if((date.getMonth() + 1).toString() == "1"){
            mes = "enero";
        }if((date.getMonth() + 1).toString() == "2"){
            mes = "febrero";
        }if((date.getMonth() + 1).toString() == "3"){
            mes = "marzo";
        }if((date.getMonth() + 1).toString() == "4"){
            mes = "abril";
        }if((date.getMonth() + 1).toString() == "5"){
            mes = "mayo";
        }if((date.getMonth() + 1).toString() == "6"){
            mes = "junio";
        }if((date.getMonth() + 1).toString() == "7"){
            mes = "julio";
        }if((date.getMonth() + 1).toString() == "8"){
            mes = "agosto";
        } if((date.getMonth() + 1).toString() == "9"){
            mes = "septiembre";
        }if((date.getMonth() + 1).toString() == "10"){
            mes = "octubre";
        } if((date.getMonth() + 1).toString() == "11"){
            mes = "noviembre";
        }if((date.getMonth() + 1).toString() == "12"){
            mes = "diciembre";
        } 
        var mesGarantia = ""; 
        if(garantiasTotal.fechareporte.toString().substring(5,7) == "01"){
            mesGarantia = "enero";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)== "02"){
            mesGarantia = "febrero";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "03"){
            mesGarantia = "marzo";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "04"){
            mesGarantia = "abril";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "05"){
            mesGarantia = "mayo";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)  == "06"){
            mesGarantia = "junio";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)  == "07"){
            mesGarantia = "julio";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "08"){
            mesGarantia = "agosto";
        } if(garantiasTotal.fechareporte.toString().substring(5,7)== "09"){
            mesGarantia = "septiembre";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "10"){
            mesGarantia = "octubre";
        } if(garantiasTotal.fechareporte.toString().substring(5,7)== "11"){
            mesGarantia = "noviembre";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)== "12"){
            mesGarantia = "diciembre";
        } 
        
        return this.Http.get(CORREO.prod + CORREO.apinormal + count.index+'/'+ intermediario.descripcion + '/'+intermediario.sigla + '/'+intermediario.nit + '/'+date.getDate().toString()  + '/'+mes+ '/'+date.getFullYear().toString()+ '/'+garantiasTotal.comisiontotal+ '/'+garantiasTotal.cobertura+ '/'+garantiasTotal.administracion+ '/'+garantiasTotal.ivaadministracion+ '/'+mesGarantia+ '/'+garantiasTotal.fechareporte.toString().substring(0,4))
    }

    public getCertDoble(intermediario: Intermediario, garantiasTotal : GarantiasTotal, count:Count) {   
        var date: Date = new Date();
        var mes = "";
        if((date.getMonth() + 1).toString() == "1"){
            mes = "enero";
        }if((date.getMonth() + 1).toString() == "2"){
            mes = "febrero";
        }if((date.getMonth() + 1).toString() == "3"){
            mes = "marzo";
        }if((date.getMonth() + 1).toString() == "4"){
            mes = "abril";
        }if((date.getMonth() + 1).toString() == "5"){
            mes = "mayo";
        }if((date.getMonth() + 1).toString() == "6"){
            mes = "junio";
        }if((date.getMonth() + 1).toString() == "7"){
            mes = "julio";
        }if((date.getMonth() + 1).toString() == "8"){
            mes = "agosto";
        } if((date.getMonth() + 1).toString() == "9"){
            mes = "septiembre";
        }if((date.getMonth() + 1).toString() == "10"){
            mes = "octubre";
        } if((date.getMonth() + 1).toString() == "11"){
            mes = "noviembre";
        }if((date.getMonth() + 1).toString() == "12"){
            mes = "diciembre";
        } 
        var mesGarantia = ""; 
        if(garantiasTotal.fechareporte.toString().substring(5,7) == "01"){
            mesGarantia = "enero";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)== "02"){
            mesGarantia = "febrero";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "03"){
            mesGarantia = "marzo";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "04"){
            mesGarantia = "abril";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "05"){
            mesGarantia = "mayo";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)  == "06"){
            mesGarantia = "junio";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)  == "07"){
            mesGarantia = "julio";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "08"){
            mesGarantia = "agosto";
        } if(garantiasTotal.fechareporte.toString().substring(5,7)== "09"){
            mesGarantia = "septiembre";
        }if(garantiasTotal.fechareporte.toString().substring(5,7) == "10"){
            mesGarantia = "octubre";
        } if(garantiasTotal.fechareporte.toString().substring(5,7)== "11"){
            mesGarantia = "noviembre";
        }if(garantiasTotal.fechareporte.toString().substring(5,7)== "12"){
            mesGarantia = "diciembre";
        } 
        var admiva = parseInt(garantiasTotal.comisiontotal) - parseInt(garantiasTotal.cobertura); 
        return this.Http.get(CORREO.prod + CORREO.apidoble +count.index+'/'+ garantiasTotal.idgarantia+'/'+ intermediario.descripcion + '/'+intermediario.sigla + '/'+intermediario.nit + '/'+date.getDate().toString()  + '/'+mes+ '/'+date.getFullYear().toString()+ '/'+garantiasTotal.comisiontotal+ '/'+garantiasTotal.cobertura+ '/'+garantiasTotal.administracion+ '/'+garantiasTotal.ivaadministracion+ '/'+mesGarantia+ '/'+garantiasTotal.fechareporte.toString().substring(0,4)+'/'+admiva)
    }

     
}