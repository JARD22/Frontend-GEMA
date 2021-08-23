import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoUsuarioRoutingModule } from './nuevo-usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario.component';


@NgModule({
  declarations: [NuevoUsuarioComponent],
  imports: [
    CommonModule,
    NuevoUsuarioRoutingModule
  ]
})
export class NuevoUsuarioModule { }
