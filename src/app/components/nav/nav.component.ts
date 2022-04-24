import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SESIONES 
import { AuthService } from "../../servicios/auth.service";
import {  Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttonBienvenido') closebuttonBienvenido: any;
  logueado: any;
  
  miPortfolio: any;

  form: FormGroup;

  correo: string = "";
  contra: string = "";

  // Inyectar en el constructor el formBuilder
  // SESIONES private authService: AuthService EN EL CONSTRUCTOR ERA PRIVADO Y NO ME TOMABA
  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService,private authService: AuthService ){ 
    ///Creamos el grupo de controles para el formulario de login
    this.form= this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email:['', [Validators.required, Validators.email]],
   })


  }

  // SESION: ESTE MÉTODO PASARÁ EL USUARIO Y LA CONTRASEÑA AL MÉTODO login DEL SERVICIO
  Login (){
   // this.authService.login(this.correo,atob(this.contra));
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.miPortfolio = data.Usuarios;
      for (let item of this.miPortfolio) {
        this.correo = item.usuario;
        this.contra = item.pass;
      }
  
      
  
    });

    this.logueado = this.authService;
  }

  get Password(){
    return this.form.get("password");
  }
 
  get Mail(){
   return this.form.get("email");
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get MailValid() {
    return false
  }
 


  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.validarUsuario();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
 
  }

  validarUsuario(){
    if (this.form.value.email == this.correo &&  this.form.value.password == atob(this.contra)) {

      //location.href ='perfil';
      //SESIONES 
      //this.authService.login(this.correo,atob(this.contra));
      this.closebutton.nativeElement.click();
      this.closebuttonBienvenido.nativeElement.click();
      return this.authService.login();
    }else{
      this.dispararMensaje();
    }
  }
  mensaje: string ='';
  dispararMensaje(){
    //this.mensaje = "Usuario o contraseña no valido";
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

}
