import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';
//importar librería de alertas
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { SeccionACercaDeComponent } from './components/seccion-a-cerca-de/seccion-a-cerca-de.component';
import { ExperienciaYEducacionComponent } from './components/experiencia-y-educacion/experiencia-y-educacion.component';
import { SeccionHabilidadesComponent } from './components/seccion-habilidades/seccion-habilidades.component';
import { SeccionMisProyectosComponent } from './components/seccion-mis-proyectos/seccion-mis-proyectos.component';
import { FooterComponent } from './components/footer/footer.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { interceptorProvider } from './servicios/interceptor-service';


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
    BienvenidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module . forChild ( {  /* opciones */  } ),
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
