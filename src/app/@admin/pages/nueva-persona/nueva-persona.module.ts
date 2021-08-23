import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaPersonaRoutingModule } from './nueva-persona-routing.module';
import { NuevaPersonaComponent } from './nueva-persona.component';


@NgModule({
  declarations: [NuevaPersonaComponent],
  imports: [
    CommonModule,
    NuevaPersonaRoutingModule
  ]
})
export class NuevaPersonaModule { }
