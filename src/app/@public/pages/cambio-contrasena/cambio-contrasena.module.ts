import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambioContrasenaRoutingModule } from './cambio-contrasena-routing.module';
import { CambioContrasenaComponent } from './cambio-contrasena.component';


@NgModule({
  declarations: [CambioContrasenaComponent],
  imports: [
    CommonModule,
    CambioContrasenaRoutingModule
  ]
})
export class CambioContrasenaModule { }
