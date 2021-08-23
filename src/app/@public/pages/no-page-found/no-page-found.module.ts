import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoPageFoundRoutingModule } from './no-page-found-routing.module';
import { NoPageFoundComponent } from './no-page-found.component';


@NgModule({
  declarations: [NoPageFoundComponent],
  imports: [
    CommonModule,
    NoPageFoundRoutingModule
  ]
})
export class NoPageFoundModule { }
