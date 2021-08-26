import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionCuentaRoutingModule } from './configuracion-cuenta-routing.module';
import { ConfiguracionCuentaComponent } from './configuracion-cuenta.component';


@NgModule({
  declarations: [ConfiguracionCuentaComponent],
  imports: [
    CommonModule,
    ConfiguracionCuentaRoutingModule
  ]
})
export class ConfiguracionCuentaModule { }
