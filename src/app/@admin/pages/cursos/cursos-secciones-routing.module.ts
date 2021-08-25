import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosSeccionesComponent } from './cursos-secciones.component';

const routes: Routes = [
  {
    path:'',
    component:CursosSeccionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosSeccionesRoutingModule { }
