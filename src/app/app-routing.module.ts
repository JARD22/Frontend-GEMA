import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'**',
  redirectTo:'no-page-found',
  pathMatch:'full'
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      useHash:true,
      scrollPositionRestoration:'enabled'
    })
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
