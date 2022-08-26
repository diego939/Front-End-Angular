import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { __values } from 'tslib';
import { TokenService } from 'src/app/servicios/token.service';
import { Persona } from '../../model/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionService } from "src/app/servicios/direccion.service";
import { Direccion } from "src/app/model/direccion";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('guardarcambios') guardarcambios: any;
  @ViewChild('cerrarPortada') cerrarPortada: any;
  @ViewChild('cerrarPerfil') cerrarPerfil: any;
  @ViewChild('cerrarLocation') cerrarLocation: any;

  form: FormGroup;

  formLocation: FormGroup;

  miPortfolio: any;

  miDireccion: any;

  valoresAceptadosNum = /^[0-9]+$/;

  mensajeNum = '';

  //Patrones para validar mail
  ValoresAceptadosMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  mensajeMail = '';

  //Patrones para validar La url de las imagenes
  valoresAceptadosURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  mensajePortadaURL = '';

  mensajePerfilURL = '';

  constructor(
              private datosPortfolio: PortfolioService,
              private datosDireccion: DireccionService, 
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private router: Router
              ) { 

    this.form= this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      ocupacion: ['', [Validators.required]],
      email: ['', [Validators.required]],
      celular:['', [Validators.required]],
      imagePortada:['', [Validators.required]],
      imagePerfil:['', [Validators.required]],
   })

   this.formLocation= this.formBuilder.group({
    localidad: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    domicilio: ['', [Validators.required]],
    })
   
  }

  ngOnInit(): void {


    this.datosPortfolio.mostrarPersona().subscribe(data => {
      this.miPortfolio = data;
    });

    this.datosDireccion.mostrarDireccion().subscribe(data => {
      this.miDireccion = data;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  get Nombres(){
    return this.form.get("nombres");
   }

   get Apellido(){
    return this.form.get("apellido");
   }

   get Ocupacion(){
    return this.form.get("ocupacion");
   }

   get Email(){
    return this.form.get("email");
   }

   get Celular(){
    return this.form.get("celular");
   }

   get ImagePortada(){
    return this.form.get("imagePortada");
   }

   get ImagePerfil(){
    return this.form.get("imagePerfil");
   }

   celularValid(): boolean{
        if (this.form.value.celular.match(this.valoresAceptadosNum)){
          //Es numérico
          return true;
      } else {
          //No es numérico
          return false;
      }
   }

   mailValid(){
        if (this.form.value.email.match(this.ValoresAceptadosMail)){
          //Es mail
          return true;
      } else {
          //No es mail
          return false;
      }
   }

   portadaValid(){
    if (this.form.value.imagePortada.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

  perfilValid(){
    if (this.form.value.imagePerfil.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

   onEnviar(event: Event, item:number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      if(this.celularValid() && this.mailValid()){
        //si el mail y el telefono tienen formato valido modifica los datos
        this.modificarDatos(item);
        this.mensajeNum = "";
        this.mensajeMail = "";
      }else
      if(!this.celularValid() && !this.mailValid()){
        this.mensajeNum = "El telefono solamente debe contener números";
        this.mensajeMail = "El mail debe ser un correo válido";
      }else
      if(!this.celularValid() && this.mailValid()){
        this.mensajeNum = "El telefono solamente debe contener números";
        this.mensajeMail = "";
      }else
      if(this.celularValid() && !this.mailValid()){
        this.mensajeNum = "";
        this.mensajeMail = "El mail debe ser un correo válido";
      }
      
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
 
  }


  modificarDatos(item:number) {
        
        if( 
             this.miPortfolio[item].nombres==this.form.value.nombres
          && this.miPortfolio[item].apellido==this.form.value.apellido
          && this.miPortfolio[item].ocupacion==this.form.value.ocupacion
          && this.miPortfolio[item].email==this.form.value.email
          && this.miPortfolio[item].celular==this.form.value.celular
          ){
          //Cerramos el modal 
          this.closebutton.nativeElement.click();
          //Si no se produjeron cambios se muestra una alerta que dice sin cambios!
          this.sincambios()
        }else{

          let persona1: Persona = {
            "id": this.miPortfolio[item].id,
            "nombres": this.form.value.nombres,
            "apellido": this.form.value.apellido,
            "nacionalidad": this.miPortfolio[item].nacionalidad,
            "email": this.form.value.email,
            "celular": this.form.value.celular,
            "sobreMi": this.miPortfolio[item].sobreMi,
            "ocupacion": this.form.value.ocupacion,
            "imagePortada": this.miPortfolio[item].imagePortada,
            "imagePerfil": this.miPortfolio[item].imagePerfil
          }
          //Se muestra una alerta cuando se producen cambios (Cambios guardados y un lapicito)
          this.cambios();
          this.datosPortfolio.editarPersona(persona1).subscribe(
            data => {
                  //Se refresca el sitio luego del tiempo indicado
                  setTimeout(function(){
                    location.reload();
                }, 1000);
            }
          );

          
        }
  }

  cambios(){
    
    Swal.fire({
      icon: 'question',
      iconHtml: '<i class="bi bi-pencil-fill"></i>',
      title: 'Cambios Guardados!!!',
      showConfirmButton: false,
      timer: 4000
})
  }

  sincambios(){
    
    Swal.fire({
      icon: 'info',
      title: 'Sin cambios!!!',
      showConfirmButton: false,
      timer: 4000
})
  }

  // Funciones de la portada o banner


  visualizarPortada(item: number){
    //Esta función sirve para ver la foto en una alerta animada
    Swal.fire({
      imageUrl: this.miPortfolio[item].imagePortada,
      imageWidth: 2000,
      width: 2000,
      imageAlt: 'Custom image',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: '#dc3545',
      cancelButtonText: "Cerrar",
    })
  }


  onEnviarPortada(event: Event, item:number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
  
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      if(this.portadaValid()){
        //si la URL tiene formato valido modifica la imagen
        this.modificarPortada(item);
        this.mensajePortadaURL = "";
      }else
      if(!this.portadaValid()){
        this.mensajePortadaURL = "URL inválida. Iintroduzca una URL válida";
      }
      
      
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
  
  }

modificarPortada(item: number){

  if(this.miPortfolio[item].imagePortada==this.form.value.imagePortada){
    //Cerramos el modal
    this.cerrarPortada.nativeElement.click();
    //Si no hubo modificaciones se muestra un alerta (sin cambios!)
    this.sincambios();
  }else{
   
    //instanciamos un objeto de tipo persona para pasar los cambios al servidor
    let persona1: Persona = {
      "id": this.miPortfolio[item].id,
      "nombres": this.miPortfolio[item].nombres,
			"apellido": this.miPortfolio[item].apellido,
			"nacionalidad": this.miPortfolio[item].nacionalidad,
			"email": this.miPortfolio[item].email,
			"celular": this.miPortfolio[item].celular,
			"sobreMi": this.miPortfolio[item].sobreMi,
      "ocupacion": this.miPortfolio[item].ocupacion,
			"imagePortada": this.form.value.imagePortada,
			"imagePerfil": this.miPortfolio[item].imagePerfil
    }

    //Si se produjeron cambios en el formulario se mostrará una alerta que cambios guardados
    this.cambios();

    //Llamamos al servicio para hacer los cambios en el servidor
    this.datosPortfolio.editarPersona(persona1).subscribe(
      data => {
              //Luego del tiempo transcurrido se refresca el sitio
              setTimeout(function(){
                location.reload();
            }, 1000);
      }
    );

  }
     
}

// fUCIONES PARA LA IMAGEN DE PERFIL

visualizarPerfil(item: number){
  //Esta función sirve para ver la foto en una alerta animada
  Swal.fire({
    imageUrl: this.miPortfolio[item].imagePerfil,
    imageWidth: 500,
    width: 500,
    imageAlt: 'Custom image',
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonColor: '#dc3545',
    cancelButtonText: "Cerrar",
  })
}


onEnviarPerfil(event: Event, item:number){
  // Detenemos la propagación o ejecución del compotamiento submit de un form
  event.preventDefault; 

  if (this.form.valid){
    // Llamamos a nuestro servicio para enviar los datos al servidor
    // También podríamos ejecutar alguna lógica extra
    if(this.perfilValid()){
      //si la URL tiene formato valido modifica la imagen
      this.modificarPerfil(item);
      this.mensajePerfilURL = "";
    }else
    if(!this.perfilValid()){
      this.mensajePerfilURL = "URL inválida. Iintroduzca una URL válida";
    }
    
    
  }else{
    // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
    this.form.markAllAsTouched(); 
  }

}

modificarPerfil(item: number){
  if(this.miPortfolio[item].imagePerfil==this.form.value.imagePerfil){
    this.cerrarPerfil.nativeElement.click();
    this.sincambios();
  }else{
    
    let persona1: Persona = {
      "id": this.miPortfolio[item].id,
      "nombres": this.miPortfolio[item].nombres,
			"apellido": this.miPortfolio[item].apellido,
			"nacionalidad": this.miPortfolio[item].nacionalidad,
			"email": this.miPortfolio[item].email,
			"celular": this.miPortfolio[item].celular,
			"sobreMi": this.miPortfolio[item].sobreMi,
      "ocupacion": this.miPortfolio[item].ocupacion,
			"imagePortada": this.miPortfolio[item].imagePortada,
			"imagePerfil": this.form.value.imagePerfil
    }

    //Si se produjeron cambios en el formulario se mostrará una alerta que cambios guardados
    this.cambios();

    this.datosPortfolio.editarPersona(persona1).subscribe(
      data => {
        //Luego del tiempo transcurrido se refresca el sitio
        setTimeout(function(){
          location.reload();
       }, 1000);

      }
    );

          
  }
}

// FUNCIONES PARA EDITAR LOCALIZACIÓN

// Getters para Localización 

get Localidad(){
  return this.formLocation.get("localidad");
 }

 get Provincia(){
  return this.formLocation.get("provincia");
 }

 get Pais(){
  return this.formLocation.get("pais");
 }

 get Domicilio(){
  return this.formLocation.get("domicilio");
 }

 onEnviarLocation(event: Event, item:number){
  // Detenemos la propagación o ejecución del compotamiento submit de un form
  event.preventDefault; 

  if (this.formLocation.valid){

    // Llamamos a nuestro servicio para enviar los datos al servidor
    // Cuando la validación es superada pasa a modificar datos
      this.modificarLocation(item); 
    
  }else{
    // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
    this.form.markAllAsTouched(); 
  }

}

modificarLocation(item: number){
  //Si no se produjeron cambios en el formulario se mostrará una alerta que diga sin cambios
  if(
      this.miDireccion[item].localidad==this.formLocation.value.localidad
      && this.miDireccion[item].pais==this.formLocation.value.pais
      && this.miDireccion[item].provincia==this.formLocation.value.provincia
      && this.miDireccion[item].domicilio==this.formLocation.value.domicilio
    ){
    this. cerrarLocation.nativeElement.click();
    this.sincambios();
  }else{

    //creamos un objeto de tipo Direccion
    let direccion: Direccion = {
      "id": this.miDireccion[item].id,
			"pais": this.formLocation.value.pais,
      "provincia": this.formLocation.value.provincia,
      "localidad": this.formLocation.value.localidad,
      "domicilio": this.formLocation.value.domicilio
    }

    //Si se produjeron cambios en el formulario se mostrará una alerta que cambios guardados
    this.cambios();

    //Llamamos a nuestro servicio para hacer los cambios en el servidor
    this.datosDireccion.editarDireccion(direccion).subscribe(
      data => {

        
        //La página se refresca automáticamente luego del tiempo transcurrido
        setTimeout(function(){
          location.reload();
       }, 1000);

      }
    );
  }
}

}
