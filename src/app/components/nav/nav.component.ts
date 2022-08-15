import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SESIONES 
import { AuthService } from "src/app/servicios/auth.service";
//El sitema de rutas no lo consideré necesario de ocupar ya que voy a ponerle seguridad a los botones que alta baja y modificación en el back end y se trabaja todo sobre la misma página
import {  Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { TokenService } from 'src/app/servicios/token.service';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { PortfolioService } from 'src/app/servicios/portfolio.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //Se agregó hoy: 01-08-2022
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  @ViewChild('closebutton') closebutton: any;
  
  misDatos: any;

  form: FormGroup;

  constructor(
    private datosPersonales: PortfolioService, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private tokenService: TokenService,
    ){ 
    ///Creamos el grupo de controles para el formulario de login
    this.form= this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      nombreUsuario:['', [Validators.required]],
   })


  }


  ngOnInit(): void {

    this.datosPersonales.mostrarPersona().subscribe(data => {
      this.misDatos = data;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

  }

  get Password(){
    return this.form.get("password");
  }

  get NombreUsuario(){
    return this.form.get("nombreUsuario");
  }
 

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }


  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // Si supera la validaciónn pasará al método onLogin() para verificar si las credenciales pertenecen a un usuario
      this.onLogin();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
 
  }

  mensaje: string ='';
  dispararMensaje(){
    // "Usuario o contraseña no validos";
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña no validos',
      confirmButtonColor: '#0d6efd',
    })
  }

  simpleAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido!!!',
      showConfirmButton: false,
      timer: 4000  
      })
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.form.value.nombreUsuario, this.form.value.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        //cerramos el formulario de login
        this.closebutton.nativeElement.click();
        //Mostramos un mensaje de bienvenida
        this.simpleAlert();
        //Refrescamos la página luego de 4 segundos
        setTimeout(function(){
          location.href ='/';
       }, 4000);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.message;
        console.log(this.errMsj);
        //Mostramos un mensaje de error si las credenciales no son las correctas
        this.dispararMensaje();
      }
    );
  }

  logoUt(){
    //Se elimina la sesion del Session Storage
    this.tokenService.logOut();
    //Refrescamos la página
    this.isLogged = false;
    location.href ='/';
  }

}
