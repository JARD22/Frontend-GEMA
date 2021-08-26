import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionCuentaComponent } from './configuracion-cuenta.component';

const routes: Routes = [
  {
    path:'',
    component: ConfiguracionCuentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionCuentaRoutingModule { }
