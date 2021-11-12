import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ReactiveFormsModule } from '@angular/forms';
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportesRoutingModule,
      
  ]
})
export class ReportesModule { }
