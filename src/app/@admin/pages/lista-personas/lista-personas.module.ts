import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPersonasRoutingModule } from './lista-personas-routing.module';
import { ListaPersonasComponent } from './lista-personas.component';


@NgModule({
  declarations: [ListaPersonasComponent],
  imports: [
    CommonModule,
    ListaPersonasRoutingModule
  ]
})
export class ListaPersonasModule { }
