import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRolRoutingModule } from './pantallas-rol-routing.module';
import { PantallasRolComponent } from './pantallas-rol.component';


@NgModule({
  declarations: [PantallasRolComponent],
  imports: [
    CommonModule,
    PantallasRolRoutingModule
  ]
})
export class PantallasRolModule { }
