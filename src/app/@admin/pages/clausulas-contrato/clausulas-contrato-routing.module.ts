import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClausulasContratoComponent } from './clausulas-contrato.component';

const routes: Routes = [
  {
    path:'',
    component:ClausulasContratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClausulasContratoRoutingModule { }
