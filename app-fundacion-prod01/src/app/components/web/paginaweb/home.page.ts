import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as $ from 'jquery';
import { AlertPage } from '../../alert/alert.page';
import { Contact } from '../../model/contact.model';
import { ServidorCorreoService } from '../../services/servidorcorreo.service';
import { DatePage } from '../../util/date.page';
import { RouterPage } from '../../util/router.page';
import { environment } from 'src/environments/environment.prod';
import { CargadorService } from '../../services/cargador.services'; 
var data;
var term;
var count = 0;
var highchart = 0;
declare var TweenMax, Circ, Highcharts, firebase 

 
function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//touch event
var clickEventType = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
$("body").bind(clickEventType, function () {
  var div = document.querySelector('div');
  var divOffset = offset(div);
  if (location.pathname === '/paginaweb') {
    if(data != "undefined"){if (data.tipovideo === 'mp4') {
      if (divOffset.top <= -100) {
        $("#video_player")[0].pause();
      } else if (divOffset.top == 0 || divOffset.top >= -30) {
        $("#video_player")[0].play();
      }
    } }
    
  } 
   
}); 
// Existing code unchanged. 
var browser = (function (agent) {
  switch (true) {
    case agent.indexOf("edge") > -1: return "edge";
    case agent.indexOf("edg") > -1: return "chromium";
    case agent.indexOf("opr") > -1 && !!window: return "opera";
    case agent.indexOf("chrome") > -1 && !!window: return "chrome";
    case agent.indexOf("trident") > -1: return "trident";
    case agent.indexOf("firefox") > -1: return "firefox";
    case agent.indexOf("safari") > -1: return "safari";
    default: return "other";
  }
})(window.navigator.userAgent.toLowerCase());
if (browser == 'edge' || browser == 'chromium' || browser == 'chrome' || browser == 'opera') {
  //funcion detectar scroll con mouse
  $(window).bind('mousewheel', function (event) {
    var div = document.querySelector('div');
    var divOffset = offset(div);
    if (location.pathname === '/paginaweb') {
      if(data != "undefined"){if (data.tipovideo === 'mp4') {
        if (divOffset.top <= -100) {
          $("#video_player")[0].pause();
        } else if (divOffset.top == 0 || divOffset.top >= -30) {
          $("#video_player")[0].play();
        }
      } }
      
    } 
     
  });
}
if (browser == 'safari' || browser == 'firefox' || browser == 'other') {
  $(window).bind('wheel', function (event) {
    var div = document.querySelector('div');
    var divOffset = offset(div);
    if (location.pathname === '/paginaweb') {
      if(data != "undefined"){if (data.tipovideo === 'mp4') {
        if (divOffset.top <= -100) {
          $("#video_player")[0].pause();
        } else if (divOffset.top == 0 || divOffset.top >= -30) {
          $("#video_player")[0].play();
        }
      } }
      
    } 
     
  });
}
  

var userpagedefault = 'paginaweb@fundacionsanjose.com'
var api = 'AIzaSyCCFRVouHyF1f71RvWfNYUchTxoEaHkqiw';
firebase.initializeApp(environment.firebaseConfigPaginaWeb);
firebase.analytics();
const auth = firebase.auth();
var afs = firebase.firestore();
var afa = firebase.storage(); 
@Component({
  selector: 'app-home',
  templateUrl: 'paginaweb.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServidorCorreoService]
})
export class HomePage implements OnInit {
  contact: Contact = new Contact();
  dates: string;
  tipovideo: string;
  nombrevideo: string;
  optionuser: string;
  menu1: string;
  menu2: string;
  menu3: string;
  menu4: string;
  menu5: string;
  menu6: string; 
  menu7: string;
  menu8: string;
  menu9: string;
  menu10: string;
  menu11: string;
  sobrenosotrostext: string;
  sobrenosotrostextbody: string;
  count1: string;
  count2: string;
  count3: string;
  serviciostext: string;
  serviciostextbody: string;
  servicio1: string;
  servicio1body1: string;
  servicio1body2: string;
  servicio1body3: string;
  servicio1body4: string;
  servicio1body5: string;
  servicio2: string;
  servicio2body1: string;
  clientessatisfechostext: string;
  contacttext: string;
  contactbody1: string;
  contactbody1Id:String;
  contactbody2: string;
  contactbody3: string;
  contactbody4: string;
  contactbody5: string;
  contactbody6: string;
  direccion: string;
  pbx: string;
  cel: string;
  contactbody7: string;
  contactbody8: string;
  contactbody9: string;
  contactbody10: string;
  textbutton: string;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('imgPlayer') imgPlayer: ElementRef;
  @ViewChild('menuimg') menuimg: ElementRef;
  @ViewChild('sobrenosotrosimg') sobrenosotrosimg: ElementRef;
  @ViewChild('servicio1img') servicio1img: ElementRef;
  @ViewChild('servicio2img') servicio2img: ElementRef;
  @ViewChild('contactoimg') contactoimg: ElementRef;
  constructor(public modalController: ModalController, private router: RouterPage, private alertPage: AlertPage, private date: DatePage, private correo: ServidorCorreoService, private cargador: CargadorService) {
    this.cargador.getCargador(3500)
    var userToLogin = auth.signInWithEmailAndPassword(userpagedefault, api).then(() => {
      return afs.collection("pagecharts").doc("NoBasfA15Xriy1tMMWkJ").get().then((doc) => {
         if (doc.exists) { 
          this.dates = this.date.getDateYear();  
          data = doc.data(); 
          this.menuimg.nativeElement.style.width = data.menuimgwidth
          this.menu1 = data.menu1;
          this.menu2 = data.menu2;
          this.menu3 = data.menu3;
          this.menu4 = data.menu4;
          this.menu5 = data.menu5;
          this.menu6 = data.menu6;
          this.menu7 = data.menu7;
          this.menu8 = data.menu8;
          this.menu9 = data.menu9;
          this.menu10 = data.menu10; 
          this.menu11 = data.menu11;
          afa.ref(data.menuimg).getDownloadURL().then((url) => {
            this.menuimg.nativeElement.src = url
          });
          this.tipovideo = data.tipovideo;
          if (data.tipovideo === 'mp4') {
            afa.ref(data.nombrevideo).getDownloadURL().then((url) => {
              this.videoPlayer.nativeElement.src = url
              this.nombrevideo = url
              this.videoPlayer.nativeElement.controls = null;
              this.videoPlayer.nativeElement.metadata = 'preload';
              this.videoPlayer.nativeElement.loop = true;
              this.videoPlayer.nativeElement.autoplay = true;
              $("#video_player")[0].autoplay = true;
              $("#video_player")[0].play();
              if (browser == 'chrome' || browser == 'safari' || browser == 'firefox' || browser == 'opera' || browser == 'other') {
                this.optionuser = 'sonidohidden';
                this.videoPlayer.nativeElement.muted = true;
              } else {
                this.videoPlayer.nativeElement.muted = null;
              }
            });
          }
          if (data.tipovideo === 'img') {
            afa.ref(data.nombrevideo).getDownloadURL().then((url) => { 
              $(document).ready(function() {
                $("#imgPlayer").attr("src", url); 
            });
            })
          }
          afa.ref(data.sobrenosotrosimg).getDownloadURL().then((url) => {
            this.sobrenosotrosimg.nativeElement.src = url
          });
          this.sobrenosotrostext = data.sobrenosotrostext;
          this.sobrenosotrostextbody = data.sobrenosotrostextbody;
          this.count1 = data.count1;
          this.count2 = data.count2;
          this.count3 = data.count3;
          this.serviciostext = data.serviciostext;
          this.serviciostextbody = data.serviciostextbody;
          afa.ref(data.servicio1img).getDownloadURL().then((url) => {
            this.servicio1img.nativeElement.src = url
          });
          this.servicio1 = data.servicio1;
          this.servicio1body1 = data.servicio1body1;
          this.servicio1body2 = data.servicio1body2;
          this.servicio1body3 = data.servicio1body3;
          this.servicio1body4 = data.servicio1body4;
          this.servicio1body5 = data.servicio1body5;
          afa.ref(data.servicio2img).getDownloadURL().then((url) => {
            this.servicio2img.nativeElement.src = url
          });
          this.servicio2 = data.servicio2
          this.servicio2body1 = data.servicio2body1
          this.clientessatisfechostext = data.clientessatisfechos
          this.contacttext = data.contacttext
          afa.ref(data.contactimg).getDownloadURL().then((url) => {
            var urlString = 'url(' + url + ')';
            this.contactoimg.nativeElement.style.backgroundImage = urlString;
          });
          this.contactbody1 = data.contactbody1;
          this.contactbody1Id = data.contactbody1Id;
          this.contactbody2 = data.contactbody2;
          this.contactbody3 = data.contactbody3;
          this.contactbody4 = data.contactbody4;
          this.contactbody5 = data.contactbody5;
          this.contactbody6 = data.contactbody6;
          this.contactbody7 = data.contactbody7;
          this.contactbody8 = data.contactbody8;
          this.contactbody9 = data.contactbody9;
          this.contactbody10 = data.contactbody10;
          this.textbutton = data.textbutton;
          this.direccion = data.direccion;
          this.pbx = data.pbx;
          this.cel = data.cel;
          afs.collection("pagecharts").doc("Fc14jX6k6edaLRMsinPv").get().then((doc) => {
            if (doc.exists) {
              term = doc.data().term;
            } else {
              // doc.data() will be undefined in this case 
            }
          }).catch((error) => {
             
          });
        } else {
          // doc.data() will be undefined in this case
          
        }
      }).catch((error) => {
         
      });
    })
  }
  ngOnInit() {
  }
  login() {
    this.router.getRouter('login')
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class-privacity',
      componentProps: { term }
    });
    return await modal.present();
  }

  toggleMuteAudio() {
    $('video').prop("muted", false);
    this.optionuser = 'hidden'
  }

  pauseVideo() {
    this.videoPlayer.nativeElement.pause();
  }
  reanudarVideo() {
    this.videoPlayer.nativeElement.play();
  }

 validateEmail(email):boolean{
  var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

  if (caract.test(email) == false){ 
      return false;
  }else{ 
//        $(div).html('');
      return true;
  }
 }

  contactSend() {

    if (this.contact.nom) {
      if(this.contact.ident){
      if (this.contact.ent) {
        if (this.contact.tel) {
          if (this.contact.ciu) {
            if(this.contact.ema){
            if (this.validateEmail(this.contact.ema)) {
              this.correo.getCorreo(this.contact).subscribe(
                res => { 
                  var userToLogin = auth.signInWithEmailAndPassword(userpagedefault, api).then(() => {
                    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

                    let autoId = ''

                    for (let i = 0; i < 20; i++) {
                      autoId += CHARS.charAt(
                        Math.floor(Math.random() * CHARS.length)
                      )
                    }  
                    return afs.collection("contact").doc(autoId).set({
                      idcoleccion: autoId,
                      nombre: this.contact.nom,
                      telefono: this.contact.tel,
                      ciudad: this.contact.ciu,
                      entidad: this.contact.ent,
                      email: this.contact.ema,
                      descripcion: this.contact.des,
                      creadoen: this.date.getDate(),
                      identificacion: this.contact.ident
                    })
                  }).then(()=> {
                    this.alertPage.presentAlert("Exito. Pronto te contactaremos.").then(()=>{ 
                      this.contact = new Contact();
                      }) 
                  }) 
                }, error => console.log(error),
              )
            } else {
              this.alertPage.presentAlert("Por favor ingresar E-mail Correcto.");
            }
            } else {
              this.alertPage.presentAlert("Por favor ingresar E-mail.");
            }
          } else {
            this.alertPage.presentAlert("Por favor ingresar ciudad.");
          }
        } else {
          this.alertPage.presentAlert("Por favor ingresar teléfono.");
        }
      } else {
        this.alertPage.presentAlert("Por favor ingresar entidad.");
      }
    } else {
      this.alertPage.presentAlert("Por favor ingresar Nro. Identificación"); 
    }
    } else {
      this.alertPage.presentAlert("Por favor ingresar nombre.");
    }
  }
}

/**
 * CONTROLADOR DE LA PAGINA CONFIRMACIÓN ELIMINACIÓN USUARIO INSTITUCIÓN SOFTWARE FUNDACION SAN JOSE
 * @author HASTECNOLOGIA S.A.S
 */

@Component({
  selector: 'modal-page',
  templateUrl: 'privacity.page.html',
  styleUrls: ['home.page.scss']
})
export class ModalPage {

  @Input() term: string;

  constructor(private modalController: ModalController) { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

}
