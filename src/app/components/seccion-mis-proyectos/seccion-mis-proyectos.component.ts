import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-seccion-mis-proyectos',
  templateUrl: './seccion-mis-proyectos.component.html',
  styleUrls: ['./seccion-mis-proyectos.component.css']
})
export class SeccionMisProyectosComponent implements OnInit {

  @ViewChild('closebuttonEditarProyecto') closebuttonEditarProyecto: any;
  @ViewChild('closebuttonAddProyecto') closebuttonAddProyecto: any;
  @ViewChild('closebuttonEliminarProyecto') closebuttonEliminarProyecto: any;

  formProyectoEdit: FormGroup;
  
  formProyectoAdd: FormGroup;

  formProyectoDelete: FormGroup;


  misProyectos: any;

  logueado: any;


  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 

    this.formProyectoEdit= this.formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      descripcionProyecto: ['', [Validators.required]],
   })

   this.formProyectoAdd= this.formBuilder.group({
    nombreProyecto: ['', [Validators.required]],
    descripcionProyecto: ['', [Validators.required]],
    })

  this.formProyectoDelete= this.formBuilder.group({
    nombreProyecto: '',
    descripcionProyecto: ''
  })

  }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data.MisProyectos);
      this.misProyectos = data.MisProyectos;
    });

    this.logueado = this.authService;
  }

  // CRUD DE PROYECTOS

  // Método para mostrar proyecto

  nombreProyectoSelect: string = '';
  descripcionProyectoSelect: string = '';
  auxIndex: number = 0;
  mostrarProyecto(item: number){
    this.auxIndex = item;
    this.nombreProyectoSelect= this.misProyectos[this.auxIndex].nombreProyecto;
    this.descripcionProyectoSelect=this.misProyectos[this.auxIndex].descripcionProyecto;
  } 

  //Getters de agregar proyecto

  get NombreProyecto(){
    return this.formProyectoAdd.get("nombreProyecto");
   }

   get DescripcionProyecto(){
    return this.formProyectoAdd.get("descripcionProyecto");
   }

  //Funciones para agregar proyecto

  enviarProyectoAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formProyectoAdd.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.agregarProyecto();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formProyectoAdd.markAllAsTouched(); 
    }
  }

  nombreDeProyecto: string = "";
  descripcionDeProyecto: string = "";
  agregarProyecto(){

    this.closebuttonAddProyecto.nativeElement.click();

    this.nombreDeProyecto = this.formProyectoAdd.value.nombreProyecto;
    this.descripcionDeProyecto= this.formProyectoAdd.value.descripcionProyecto;

    this.misProyectos.push({nombreProyecto: this.nombreDeProyecto, descripcionProyecto: this.descripcionDeProyecto});
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

  //Funciones para editar proyecto

  enviarProyectoEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formProyectoEdit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.editarProyecto(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formProyectoEdit.markAllAsTouched(); 
    }
  }

  editarProyecto(item:number){
    this.closebuttonEditarProyecto.nativeElement.click();

    if(this.misProyectos[item].nombreProyecto==this.formProyectoEdit.value.nombreProyecto
      && this.misProyectos[item].descripcionProyecto==this.formProyectoEdit.value.descripcionProyecto){
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
        title: 'Se editó el proyecto: "'+ this.misProyectos[item].nombreProyecto + '"',
        showConfirmButton: false,
        timer: 4000
    })
    this.misProyectos[item].nombreProyecto=this.formProyectoEdit.value.nombreProyecto;
    this.misProyectos[item].descripcionProyecto=this.formProyectoEdit.value.descripcionProyecto;
    }
  }

  //Funcion para eliminar proyecto

  eliminarProyecto(indice: number){
    this.closebuttonEliminarProyecto.nativeElement.click();
    Swal.fire({
      icon: 'error',
      iconHtml: '<i class="bi bi-trash-fill"></i>',
      title: 'Se eliminó el proyecto: "'+ this.misProyectos[indice].nombreProyecto + '"',
      showConfirmButton: false,
      timer: 4000
    })
    this.misProyectos.splice(indice, 1);
  }

}
