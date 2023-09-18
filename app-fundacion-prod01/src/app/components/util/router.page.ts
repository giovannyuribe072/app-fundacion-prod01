import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
  export class RouterPage { 
  constructor(private router: Router){
  }

  getRouter(href:string) {  
   return this.router.navigate([href]).then(()=>{
     location.reload();
   }); ;
  }

 }