
import { Injectable } from '@angular/core';
import * as please from 'please-wait';
declare var pleaseWait;
@Injectable({
    providedIn: 'root'
})
export class CargadorService {
    constructor() { }
    getCargador(time) {
        please.loading_screen = pleaseWait({
            logo: "./../../../assets/img/LogoverticalPNG.png",
            backgroundColor: '#ffff',
            loadingHtml: "<div class='spinner'>  <div class='dot1'></div>  <div class='dot2'></div>  </div>"
        });
        setTimeout(() => {
            please.loading_screen.finish();
        }, time);
    }
    getFinish(){
        please.loading_screen.finish();
    }
}