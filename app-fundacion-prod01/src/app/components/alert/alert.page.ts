import { AlertController } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertPage implements OnInit {

    constructor(private alertController: AlertController) {
        this.ngOnInit();
      }
      
  ngOnInit() {
  }

  
 public async presentAlert(message:string) {
    const alert = await this.alertController.create({ 
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async closeAlert(){
    this.alertController.dismiss()
  }

}