import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaComponent } from './persona.component';


@NgModule({
  declarations: [PersonaComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule
  ]
})
export class PersonaModule { }
