import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TokenService } from 'src/app/servicios/token.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Proyecto } from "src/app/model/proyecto";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seccion-mis-proyectos',
  templateUrl: './seccion-mis-proyectos.component.html',
  styleUrls: ['./seccion-mis-proyectos.component.css']
})
export class SeccionMisProyectosComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  @ViewChild('closebuttonEditarProyecto') closebuttonEditarProyecto: any;
  @ViewChild('closebuttonAddProyecto') closebuttonAddProyecto: any;
  @ViewChild('closebuttonEliminarProyecto') closebuttonEliminarProyecto: any;

  formProyectoEdit: FormGroup;
  
  formProyectoAdd: FormGroup;

  formProyectoDelete: FormGroup;

  misProyectos: any;

  valoresAceptadosURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  mensajeAddProyectoURL = '';

  mensajeEditProyectoURL = '';


  constructor(
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private proyectoService: ProyectoService,
              private router: Router
              ) { 

    this.formProyectoEdit= this.formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      descripcionProyecto: ['', [Validators.required]],
      imagenProyecto: ['', [Validators.required]]
   })

   this.formProyectoAdd= this.formBuilder.group({
    nombreProyecto: ['', [Validators.required]],
    descripcionProyecto: ['', [Validators.required]],
    imagenProyecto: ['', [Validators.required]]
    })

  this.formProyectoDelete= this.formBuilder.group({
    nombreProyecto: '',
    descripcionProyecto: ''
  })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.proyectoService.mostrarProyecto().subscribe(data => {
      this.misProyectos = data;
    });
  }

  // CRUD DE PROYECTOS

  // Método para mostrar proyecto

  nombreProyectoSelect: string = '';
  descripcionProyectoSelect: string = '';
  imagenProyectoSelect: string = '';
  auxIndex: number = 0;
  mostrarProyecto(item: number){
    this.auxIndex = item;
    this.nombreProyectoSelect= this.misProyectos[this.auxIndex].nombre;
    this.descripcionProyectoSelect=this.misProyectos[this.auxIndex].descripcion;
    this.imagenProyectoSelect = this.misProyectos[this.auxIndex].imageProyecto;
  } 

  //Getters de agregar proyecto

  get NombreProyecto(){
    return this.formProyectoAdd.get("nombreProyecto");
   }

   get DescripcionProyecto(){
    return this.formProyectoAdd.get("descripcionProyecto");
   }

   get ImagenProyecto(){
    return this.formProyectoAdd.get("imagenProyecto");
   }

  validarImagen(){
    if (this.formProyectoAdd.value.imagenProyecto.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

  //Funciones para agregar proyecto

  enviarProyectoAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formProyectoAdd.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra


      if(this.validarImagen()){
        //si la URL tiene formato valido pasa a agregar proyecto
        this.agregarProyecto();
        this. mensajeAddProyectoURL = '';
      }else
      if(!this.validarImagen()){
        this. mensajeAddProyectoURL = "URL inválida. Iintroduzca una URL válida";
      }


    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formProyectoAdd.markAllAsTouched(); 
    }
  }

  nombreDeProyecto: string = "";
  descripcionDeProyecto: string = "";
  imagenDeProyecto: string = "";
  agregarProyecto(){

    this.closebuttonAddProyecto.nativeElement.click();

    this.nombreDeProyecto = this.formProyectoAdd.value.nombreProyecto;
    this.descripcionDeProyecto= this.formProyectoAdd.value.descripcionProyecto;
    this.imagenDeProyecto= this.formProyectoAdd.value.imagenProyecto;
    
    let proyecto: Proyecto =  {
      "nombre": this.nombreDeProyecto, 
      "descripcion": this.descripcionDeProyecto,
      "imageProyecto": this.imagenDeProyecto
    };

    this.proyectoService.crearProyecto(proyecto).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );

    setTimeout(function(){
      location.href ='/';
    }, 1000);


    Swal.fire({
      icon: 'success',
      title: 'Se agregó el proyecto: "'+ this.nombreDeProyecto + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }

  //Métodos para editar proyectos

  get NombreProyectoEdit(){
    return this.formProyectoEdit.get("nombreProyecto");
   }

   get DescripcionProyectoEdit(){
    return this.formProyectoEdit.get("descripcionProyecto");
   }

   
   get ImagenProyectoEdit(){
    return this.formProyectoEdit.get("imagenProyecto");
   }

  validarImagenEdit(){
    if (this.formProyectoEdit.value.imagenProyecto.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

  //Funciones para editar proyecto

  enviarProyectoEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formProyectoEdit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      //this.editarProyecto(item);


        if(this.validarImagenEdit()){
          //si la URL tiene formato valido pasa a agregar proyecto
          this.editarProyecto(item);
          this. mensajeEditProyectoURL = '';
        }else
        if(!this.validarImagenEdit()){
          this. mensajeEditProyectoURL = "URL inválida. Iintroduzca una URL válida";
        }


    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formProyectoEdit.markAllAsTouched(); 
    }
  }

  editarProyecto(item:number){
    this.closebuttonEditarProyecto.nativeElement.click();

    if(this.misProyectos[item].nombre==this.formProyectoEdit.value.nombreProyecto
      && this.misProyectos[item].descripcion==this.formProyectoEdit.value.descripcionProyecto
      && this.misProyectos[item].imageProyecto==this.formProyectoEdit.value.imagenProyecto
      ){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{
      Swal.fire({
        icon: 'question',
        iconHtml: '<i class="bi bi-pencil-fill"></i>',
        title: 'Se editó el proyecto: "'+ this.misProyectos[item].nombre + '"',
        showConfirmButton: false,
        timer: 4000
        })

        this.misProyectos[item].nombre=this.formProyectoEdit.value.nombreProyecto;
        this.misProyectos[item].descripcion=this.formProyectoEdit.value.descripcionProyecto;
        this.misProyectos[item].imageProyecto=this.formProyectoEdit.value.imagenProyecto;

        let proyecto: Proyecto =  {
          "id": this.misProyectos[item].id,
          "nombre": this.misProyectos[item].nombre, 
          "descripcion": this.misProyectos[item].descripcion,
          "imageProyecto": this.misProyectos[item].imageProyecto
        };

        this.proyectoService.editarProyecto(proyecto).subscribe(
          data => {
            //this.router.navigate(['/']);
          }
        );

        setTimeout(function(){
          location.href ='/';
          }, 1000);

    
    }
  }

  //Función para eliminar proyecto

  eliminarProyecto(indice: number){
    this.closebuttonEliminarProyecto.nativeElement.click();
    Swal.fire({
      icon: 'error',
      iconHtml: '<i class="bi bi-trash-fill"></i>',
      title: 'Se eliminó el proyecto: "'+ this.misProyectos[indice].nombre + '"',
      showConfirmButton: false,
      timer: 4000
    })

    this.proyectoService.borrarProyecto(this.misProyectos[indice].id).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );

    setTimeout(function(){
      location.href ='/';
      }, 1000);
  }

}
