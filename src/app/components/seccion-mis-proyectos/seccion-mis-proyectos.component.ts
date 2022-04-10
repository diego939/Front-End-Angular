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


  miPortfolio: any;

  logueado: any;


  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });

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

  this.logueado = this.authService;
  }

  ngOnInit(): void {
  }

  // CRUD DE PROYECTOS

  // Método para mostrar proyecto

  nombreProyectoSelect: string = '';
  descripcionProyectoSelect: string = '';
  auxIndex: number = 0;
  mostrarProyecto(item: number){
    this.auxIndex = item;
    this.nombreProyectoSelect= this.miPortfolio.MisProyectos[this.auxIndex].nombreProyecto;
    this.descripcionProyectoSelect=this.miPortfolio.MisProyectos[this.auxIndex].descripcionProyecto;
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

    this.miPortfolio.MisProyectos.push({nombreProyecto: this.nombreDeProyecto, descripcionProyecto: this.descripcionDeProyecto});
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

    if(this.miPortfolio.MisProyectos[item].nombreProyecto==this.formProyectoEdit.value.nombreProyecto
      && this.miPortfolio.MisProyectos[item].descripcionProyecto==this.formProyectoEdit.value.descripcionProyecto){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Se editó el proyecto: "'+ this.miPortfolio.MisProyectos[item].nombreProyecto + '"',
        showConfirmButton: false,
        timer: 4000
    })
    this.miPortfolio.MisProyectos[item].nombreProyecto=this.formProyectoEdit.value.nombreProyecto;
    this.miPortfolio.MisProyectos[item].descripcionProyecto=this.formProyectoEdit.value.descripcionProyecto;
    }
  }

  //Funcion para eliminar proyecto

  eliminarProyecto(indice: number){
    this.closebuttonEliminarProyecto.nativeElement.click();
    Swal.fire({
      icon: 'success',
      title: 'Se eliminó el proyecto: "'+ this.miPortfolio.MisProyectos[indice].nombreProyecto + '"',
      showConfirmButton: false,
      timer: 4000
    })
    this.miPortfolio.MisProyectos.splice(indice, 1);
  }

}
