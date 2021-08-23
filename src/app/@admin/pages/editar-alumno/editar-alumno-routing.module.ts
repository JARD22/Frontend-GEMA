import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarAlumnoComponent } from './editar-alumno.component';

const routes: Routes = [
  {
    path:'',
    component:EditarAlumnoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarAlumnoRoutingModule { }
