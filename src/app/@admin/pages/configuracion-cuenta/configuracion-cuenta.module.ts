import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionCuentaRoutingModule } from './configuracion-cuenta-routing.module';
import { ConfiguracionCuentaComponent } from './configuracion-cuenta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ConfiguracionCuentaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ConfiguracionCuentaRoutingModule
  ]
})
export class ConfiguracionCuentaModule { }
