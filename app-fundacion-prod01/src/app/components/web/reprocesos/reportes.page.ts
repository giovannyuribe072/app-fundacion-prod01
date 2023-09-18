import { Component, Input, OnInit, ViewChild } from '@angular/core'; 
import * as $ from 'jquery';
import { AlertPage } from '../../alert/alert.page'; 
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { DatePage } from '../../util/date.page'; 
import { CargadorService } from '../../services/cargador.services'; 
import { ReportesService } from '../../services/reportes.service';
import { Intermediario } from '../../model/intermediario.model';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { AplicarPagos } from '../../model/aplicarpago.model';
import { RecaudoAnalista } from '../../model/recaudoanalista.model';
import { ExcelGarantias } from '../../model/excelgarantias.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reportes',
  templateUrl: 'reportes.page.html',
  styleUrls: ['reportes.page.scss']
})
export class HomePage implements OnInit { 
   
  intermediarios: Intermediario[] = [];
  users: User[] = [];
  aplicarpagos: AplicarPagos[] = [];
  recaudoAnalista: RecaudoAnalista[] = [];
  user: User = JSON.parse(sessionStorage.getItem('userSession')); 
  excelgarantias: ExcelGarantias[];  
  aplicarpagoscruce: AplicarPagos[] = [];
  constructor(private auth: AuthService, private reporteService: ReportesService, private alertPage: AlertPage, private date: DatePage, private correo: ServidorCorreoService, private cargador: CargadorService) {
    this.cargador.getCargador(5500); 
    this.auth.loginUser(this.user).then(res => {
      this.getIntemediarios();
      this.getCobradores();
      this.getRecaudoAnalista();
    }, error => {
      if (error.status == 304) {

      } else if (error.status == 400) {
        this.alertPage.presentAlert("Clave incorrecta.");
      } else if (error.status == 401) {

      } else {
        this.alertPage.presentAlert("Clave o correo incorrectos. /" + error.message);
      }
    });
  }
  ngOnInit() {
  }
  /**
  * Consulta Estado metodo unico software. 
   * Metodo principal:getEstado();  
   * @return Estado[];
   * AUTH GOOGLE CLOUD FIREBASE SERVICE
   * @author Giovanny Uribe Acevedo
   */
  getIntemediarios() {
    this.intermediarios = new Array<Intermediario>();
    this.reporteService.getAfs().collection("intermediarios").get().then((event) => {
      event.forEach(element => {
        this.intermediarios.push(JSON.parse(JSON.stringify(element.data())))
      });
    });
  }
  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getCobradores() {
    this.users = new Array<User>();
    this.reporteService.getAfs().collection("users").get().then((event) => {
      event.forEach(element => {
        var user: User = JSON.parse(JSON.stringify(element.data()));
        if (user.role == 'Cobrador') {
          this.users.push(JSON.parse(JSON.stringify(element.data())))
        }
      });
    });
  }

  /**
 * Consulta Estado metodo unico software. 
  * Metodo principal:getEstado();  
  * @return Estado[];
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  getRecaudoAnalista() {
    this.aplicarpagos = new Array<AplicarPagos>();
    this.reporteService.getAfs().collection("aplicarpago").get().then((event) => {
      event.forEach(element => {
        var user: AplicarPagos = JSON.parse(JSON.stringify(element.data()));
        this.aplicarpagos.push(user);
      });
    });
  }
  
     /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:changeListener();  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  changeListener($event, string: string): void {
    if ($event) {
      this.readThis($event.target, string);
    } else {
      this.readThis($event, string);
    }
  }

  /**
 *  Lee archivos metodo unico software. 
  * Metodo principal:readThis(any,string);  
  * @return void;
  * AUTH GOOGLE CLOUD FIREBASE SERVICE
  * @author Giovanny Uribe Acevedo
  */
  readThis(inputValue: any, string: string): void {
    /* wire up file reader */
    this.excelgarantias = new Array<ExcelGarantias>(); 
    try {
      var file: File = inputValue.files[0];
    } catch (error) {
      var file: File = inputValue
    }
    if (file) { 
        const target: DataTransfer = <DataTransfer>(inputValue);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */

          (XLSX.utils.sheet_to_json(ws, { header: 1, dateNF: "dd.mm.yy" })).forEach(element => {
            let parseexcel: ExcelGarantias = JSON.parse(JSON.stringify(element))
            this.excelgarantias.push(parseexcel)
          }); 
          
        };
        reader.readAsBinaryString(target.files[0]);
       
    }
  }
  crearCrucePagos(){ 

    var validacion = false;
    var message = "";
    this.aplicarpagoscruce = []=new Array<AplicarPagos>();
    this.excelgarantias.forEach(element => {
      let garantia: AplicarPagos = new AplicarPagos();
      if (element[0] !== 'N. DOCUMENTO') {
        garantia.documento = element[0]
      }
      if (element[1] !== 'NOMBRE COMPLETO') {
        garantia.nombredeudor = element[1]
      }
      if (element[2] !== '# CREDITO') {
        garantia.nropagare = parseInt(element[2])
      }
      if (element[3] !== 'FECHA DE PAGO') {
        garantia.creadoen = element[3]
      } 
      if (element[4] !== 'PAGÓ') {
        garantia.valorpago = element[4]
      }
      if (element[5] !== 'GESTOR') {
        garantia.cobrador = element[5]
      } 
      var valida = true;
      var validaident = true;
      var validaplazo = true;
      var validasaldo = true;
      var validacobertura = true;
      var validanrocredito = true;
      var validanropagare = true;
      (garantia.documento == '' || garantia.documento == null) ? valida = false : null;
      (garantia.nombredeudor == '' || garantia.nombredeudor == null) ? validaident = false : null;
      (garantia.nropagare == '' || garantia.nropagare == null) ? validaplazo = false : null;
      (garantia.creadoen == '' || garantia.creadoen == null) ? validasaldo = false : null;
      (garantia.valorpago == '' || garantia.valorpago == null) ? validacobertura = false : null;
      (garantia.cobrador == '' || garantia.cobrador == null) ? validanrocredito = false : null; 
      if (valida && validaident && validasaldo && validaplazo && validacobertura && validanrocredito && validanropagare) {
        this.aplicarpagoscruce.push(garantia)
        return validacion = true;
      }
    }
    );
    if (!validacion) {
      this.alertPage.presentAlert("Error!. " + "Cargue de cartera de formato nulo. " + message).then(() => {
        this.ngOnInit(); 
      })
    }
    if (validacion) {
      console.log(this.aplicarpagoscruce.length)
      this.alertPage.presentAlert("Exito!. " + "Cargue de pagos. " +this.aplicarpagoscruce.length + message).then(() => {
        this.ngOnInit(); 
      })
    }
  }

  compararCruce(){
   console.log(this.aplicarpagos,this.users)
   var countcruce = 0;
   var countpagos = 0;
   var aplicarcruces = new Array<AplicarPagos>();
   this.aplicarpagoscruce.forEach(elementcru => {
   countcruce++;
   this.aplicarpagos.forEach(element => {
    countpagos++;
    if(elementcru.nropagare == element.nropagare){
      if(elementcru.cobrador == 'ANGELICA'){
        element.cobrador = "coordinacion.operativa@fundacion-san-jose.com"; 
      }
      if(elementcru.cobrador == 'DIANA'){
        element.cobrador = "diana@fundacion-san-jose.com"; 
      }
      if(elementcru.cobrador == 'KAROL'){
        element.cobrador = "karol@fundacion-san-jose.com"; 
      }
      if(elementcru.cobrador == 'SINERJOY'){
        console.log("entro")
        element.cobrador = "synergoycartera@synergoy.com"; 
      }
      var valida = true;
      (element.marcatiempo == undefined || element.marcatiempo == null) ? valida = false : null;
      if(!valida){
        element.marcatiempo = new Date; 
      }
      aplicarcruces.push(element)
    }
   }); 
   });
   aplicarcruces.forEach(element => {
    this.reporteService.getAfs().collection("aplicarpago").doc(element.idcoleccion).update({ 
      marcatiempo: element.marcatiempo,
      cobrador: element.cobrador
    })
   });
   console.log(aplicarcruces,countcruce,countpagos)
  }
}

 