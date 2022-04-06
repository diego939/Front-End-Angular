import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { AuthGuard } from './guardian/auth.guard';


const routes: Routes = [
  {path: 'inicio', component: AppComponent},
  {path: 'bienvenido', component: AppComponent},
  //Ruta donde se va direccionar cuando inicie sesión 
  {path: 'perfil', component: AppComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
