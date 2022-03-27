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
import { ExperienciaYEducacionComponent } from './components/experiencia-y-educacion/experiencia-y-educacion.component';
import { SeccionHabilidadesComponent } from './components/seccion-habilidades/seccion-habilidades.component';
import { SeccionMisProyectosComponent } from './components/seccion-mis-proyectos/seccion-mis-proyectos.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    SeccionACercaDeComponent,
    ExperienciaYEducacionComponent,
    SeccionHabilidadesComponent,
    SeccionMisProyectosComponent,
    FooterComponent,
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
