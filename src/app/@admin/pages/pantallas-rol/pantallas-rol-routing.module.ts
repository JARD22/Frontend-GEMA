import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PantallasRolComponent } from './pantallas-rol.component';

const routes: Routes = [
  {
    path:'',
    component:PantallasRolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRolRoutingModule { }
