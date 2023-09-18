import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class DatePage {
  date: Date;
  constructor(){
  }

  getDate() : string{ 
    this.date = new Date(); 
    var hour = this.date.getHours().toString() + ':' + this.date.getMinutes().toString()+ ':' + this.date.getSeconds().toString();
    var day = ("0" + (this.date.getDate())).slice(-2).toString() + '/' + ("0" + (this.date.getMonth() + 1)).slice(-2).toString() + '/' + this.date.getFullYear().toString();
   return day +" "+hour;
  }

  getDateYear() : string{ 
    this.date = new Date();
    var year =  this.date.getFullYear().toString()
   return year ;
  }
  
 }