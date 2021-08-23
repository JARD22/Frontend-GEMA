import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path:'',
    component:PublicComponent,
    children:[
      {
        path:'login',
        loadChildren:()=> import('./login/login.module').then(m=>m.LoginModule)
      },
      {
        path:'forgot-pwd',
        loadChildren:()=>import('./forgot-password/forgot-password.module').then(m=>m.ForgotPasswordModule)
      },
      {
        path:'no-page-found',
        loadChildren:()=> import('./no-page-found/no-page-found.module').then(m=>m.NoPageFoundModule)
      },
      {
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
