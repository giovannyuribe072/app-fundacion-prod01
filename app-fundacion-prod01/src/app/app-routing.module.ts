import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Guard } from './authguard.guard';

const routes: Routes = [  
  
  {
    path: 'paginaweb',
    loadChildren: () => import('./components/web/paginaweb/home.module').then( m => m.HomePageModule) 
  },
  {
    path: '',
    redirectTo: 'paginaweb',
    pathMatch: 'prefix'
  },
  {
    path: '',
    loadChildren: () => import('./components/web/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [Guard]
  } ,
  {
    path: 'login',
    loadChildren: () => import('./components/web/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
