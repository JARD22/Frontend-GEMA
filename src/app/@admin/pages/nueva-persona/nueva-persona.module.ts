import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaPersonaRoutingModule } from './nueva-persona-routing.module';
import { NuevaPersonaComponent } from './nueva-persona.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevaPersonaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NuevaPersonaRoutingModule
  ]
})
export class NuevaPersonaModule { }
