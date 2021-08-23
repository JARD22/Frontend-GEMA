import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoAlumnosComponent } from './listado-alumnos.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoAlumnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoAlumnosRoutingModule { }
