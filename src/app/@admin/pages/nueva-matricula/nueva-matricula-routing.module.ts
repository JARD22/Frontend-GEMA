import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaMatriculaComponent } from './nueva-matricula.component';

const routes: Routes = [
  {
    path:'',
    component: NuevaMatriculaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaMatriculaRoutingModule { }
