import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaPersonaComponent } from './nueva-persona.component';

const routes: Routes = [{
  path:'',
  component:NuevaPersonaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaPersonaRoutingModule { }
