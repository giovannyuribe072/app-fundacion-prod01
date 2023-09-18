import { Cartera } from './cartera.model';
import { CarteraTotal } from './carteratotal.model'; 
import { Intermediario } from './intermediario.model';
import { Seguimiento } from './seguimiento.model';

export class CarteraModal{
    carteralobj:Cartera = new Cartera();
    cartera:Cartera[]=[];
    selectcartera:Cartera[]=[];
    seguimientos:Seguimiento[]=[];
    carteratotal:CarteraTotal[]=[];
    intermediario:Intermediario;
    carteratotales: CarteraTotal = new CarteraTotal();
    estado:string;
}