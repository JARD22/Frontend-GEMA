import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeccionesComponent } from './secciones.component';

const routes: Routes = [
  {
    path:'',
    component:SeccionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule { }
