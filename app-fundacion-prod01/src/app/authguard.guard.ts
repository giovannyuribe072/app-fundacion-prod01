import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './components/services/auth.service';
import { Router } from '@angular/router';
import { User } from './components/model/user.model';

@Injectable()
export class Guard implements CanActivate {

  constructor(private userService: AuthService, private router: Router) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var returnUser = true;
    var user = this.userService.getUserLoggedIn();
    var userSession: User = JSON.parse(sessionStorage.getItem('userSession'));
    if (!user) {
      (user == null || user == false) ? returnUser = false : null;
    } 
    if (!returnUser) {
      var validateuserSession = true;
      (userSession == null || userSession.email == "") ? validateuserSession = false : null;
      if (validateuserSession) {   
        this.userService.loginUser(userSession).catch(()=>{ this.router.navigate(['login'])
        });
        returnUser = true;
      }else{
        this.router.navigate(['login'])
      } 
    }
    return returnUser;
  }
}