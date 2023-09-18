import { Garantias } from './garantias.model';
import { GarantiasTotal } from './garantiastotal.model';
import { Intermediario } from './intermediario.model';

export class GarantiasModal{
    garantia:Garantias = new Garantias();
    garantias:Garantias[]=[];
    garantiastotal:GarantiasTotal[]=[];
    intermediario:Intermediario;
    garantiatotales: GarantiasTotal = new GarantiasTotal();
    estado:string;
}