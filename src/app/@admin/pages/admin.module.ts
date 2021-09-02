import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AdminComponent } from './admin.component';
import { TitleComponent } from '../shared/components/title/title.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';


@NgModule({
  declarations: [AdminComponent, TitleComponent, HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ]
})
export class AdminModule { }
