import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { SeccionACercaDeComponent } from './components/seccion-a-cerca-de/seccion-a-cerca-de.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    SeccionACercaDeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
