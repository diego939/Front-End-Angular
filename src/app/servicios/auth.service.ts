import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {  NavigationStart, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Observable } from 'rxjs';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  logEstado: number = 0;

  //Se agregó hoy: 01-08-2022
  authURL = 'https://almirondiegodavidbackendap.herokuapp.com/auth/';

  uri = 'http://localhost3000/api';
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  constructor(private http: HttpClient, private router: Router) {
   }

   /*login(email: string, password: string){
     this.http.post(this.uri + '/autenticate', {email: email,password: password})
     .subscribe((resp: any)=> {
      //redireccionamos al usuario a su perfil
      this.router.navigate(['perfil']);
      //guardamos el token en localStorage
      localStorage.setItem('auth_token', resp.token);
     });
   }*/

   logueadoEstado(){
    return this.logEstado;
   }

   logueadoActivo(){
     this.logEstado = 1;
   }

   logueadoInactivo(){
    this.logEstado = 0;
   }

   //Se comentó hoy: 01-08-2022 este método login
   /*login(){

    this.router.navigate(['bienvenido']);
    this.logueadoActivo();
    this.logueadoEstado();
   }*/

   logout(){
    //this.router.navigate(['inicio']);
     this.logueadoInactivo();
     this.logueadoEstado();
     location.href ='/';
   }

   /*logout(){
    localStorage.removeItem('token');
   }*/

  public get logIn(): boolean{
    return (localStorage.getItem('token') !== null);
   }

   isLoggedIn() {
    const token = localStorage.getItem('token'); // get token from local storage
    const payload = atob(this.token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }

  //Se agregó hoy: 01-08-2022
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }
  
}
