export class GarantiasTotal{
    idcoleccionfile:string;
    nombrefile:string;
    nombrefilefactura:string;
    nombrefilecomprobante:string;
    urlFileUpload:string;
    urlFileUploadFactura:string;
    urlFileUploadComprobante:string;
    intermediario:string;
    idgarantia: string; 
    idcomision:string;
    idlinea:string;
    cobertura: string;
    administracion:string; 
    ivaadministracion:string;
    comisiontotal:string;
    comisiontotaltotal:string;
    saldototal;
    cantidadgarantias;
    fechareporte:Date;
    comprobado:boolean;
    public fileToUpload: File = null;
    confirmacion:string;
    estado:string;
    creadopor:string;
    creadoen:string;
    modificadopor:string;
    modificadoen:string;  
}