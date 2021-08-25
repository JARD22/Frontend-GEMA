import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColegiosComponent } from './colegios.component';

const routes: Routes = [{
  path:'',
  component:ColegiosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColegiosRoutingModule { }
