import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPersonasComponent } from './lista-personas.component';

const routes: Routes = [
  {
    path:'',
    component:ListaPersonasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPersonasRoutingModule { }
