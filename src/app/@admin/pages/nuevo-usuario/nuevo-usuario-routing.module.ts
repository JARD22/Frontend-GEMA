import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario.component';

const routes: Routes = [
  {
    path:'',
    component:NuevoUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoUsuarioRoutingModule { }
