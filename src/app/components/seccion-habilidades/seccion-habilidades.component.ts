import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-seccion-habilidades',
  templateUrl: './seccion-habilidades.component.html',
  styleUrls: ['./seccion-habilidades.component.css']
})
export class SeccionHabilidadesComponent implements OnInit {

  @ViewChild('closebuttonEditarHabilidad') closebuttonEditarHabilidad: any;
  @ViewChild('closebuttonAddHabilidad') closebuttonAddHabilidad: any;
  @ViewChild('closebuttonEliminarHabilidad') closebuttonEliminarHabilidad: any;
  @ViewChild('closebuttonEditarTecnologia') closebuttonEditarTecnologia: any;
  @ViewChild('closebuttonAddTecnologia') closebuttonAddTecnologia: any;
  @ViewChild('closebuttonEliminarTecnologia') closebuttonEliminarTecnologia: any;

  formHabilidadEdit: FormGroup;
  
  formHabilidadAdd: FormGroup;

  formHabilidadDelete: FormGroup;

  formTecnologiaEdit: FormGroup;
  
  formTecnologiaAadd: FormGroup;

  formTecnologiaDelete: FormGroup;

  miPortfolio: any;

  logueado: any;


  opciones = ['regular','básico','bueno','muy bueno','excelente'];


  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });

    this.formHabilidadEdit= this.formBuilder.group({
      nombreHabilidad: ['', [Validators.required]],
      progreso: ['', [Validators.required]],
   })

   this.formHabilidadAdd= this.formBuilder.group({
    nombreHabilidad: ['', [Validators.required]],
    progreso: ['', [Validators.required]],
    })

  this.formHabilidadDelete= this.formBuilder.group({
    nombreHabilidad: '',
    progreso: ''
  })

  this.formTecnologiaEdit= this.formBuilder.group({
    nombreTecnologia: ['', [Validators.required]],
    nivel: ['', [Validators.required]],
  })

  this.formTecnologiaAadd= this.formBuilder.group({
    nombreTecnologia: ['', [Validators.required]],
    nivel: ['', [Validators.required]],
  })

  this.formTecnologiaDelete= this.formBuilder.group({
    nombreTecnologia: '',
    nivel: ''
  })

   this.logueado = this.authService;
  }

  ngOnInit(): void {
  }


  mostrarNombre: string ='';
  auxIndice: number = 0;
  seleccionarHabilidad(indice: number, nombre: string){
      this.mostrarNombre =nombre;
      this.auxIndice = indice;

  }

  nivelHabilidad(opcion: string, item: number){
    switch (opcion) {
      case 'regular': this.miPortfolio.HabilidadesBlandas[item].progreso = 20;

        break;

      case 'básico': this.miPortfolio.HabilidadesBlandas[item].progreso = 40;

        break;
      case 'bueno': this.miPortfolio.HabilidadesBlandas[item].progreso = 60;
        
          break;
      case 'muy bueno': this.miPortfolio.HabilidadesBlandas[item].progreso = 80;
        
        break;

      case 'excelente': this.miPortfolio.HabilidadesBlandas[item].progreso = 100;
        break;
    }
  }

  nivelTecnologia(opcion: string, item: number){
    switch (opcion) {
      case 'regular': this.miPortfolio.MisTecnologias[item].nivel = 20;

        break;

      case 'básico': this.miPortfolio.MisTecnologias[item].nivel = 40;

        break;
      case 'bueno': this.miPortfolio.MisTecnologias[item].nivel = 60;
        
          break;
      case 'muy bueno': this.miPortfolio.MisTecnologias[item].nivel = 80;
        
        break;

      case 'excelente': this.miPortfolio.MisTecnologias[item].nivel = 100;
        break;
    }
  }


  // CRUD DE HABILIDADES

  //Getters para agregar habilidad

  get NombreHabilidad(){
    return this.formHabilidadAdd.get("nombreHabilidad");
   }

   get Progreso(){
    return this.formHabilidadAdd.get("progreso");
   }

   enviarHabilidadAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formHabilidadAdd.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.agregarHabilidad();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formHabilidadAdd.markAllAsTouched(); 
    }
  }


  // Funcion para agregar habilidad
  nombreDeHabilidad: string = "";
  progresoDeHabilidad: string = "";
  agregarHabilidad(){

    this.closebuttonAddHabilidad.nativeElement.click();

    this.nombreDeHabilidad = this.formHabilidadAdd.value.nombreHabilidad;
    this.progresoDeHabilidad= this.formHabilidadAdd.value.progreso;

    this.miPortfolio.HabilidadesBlandas.push({nombreHabilidad: this.nombreDeHabilidad, progreso: this.progresoDeHabilidad});
    Swal.fire({
      icon: 'success',
      title: 'Se agregó la habilidad: "'+ this.nombreDeHabilidad + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }

  //Funciones para editar habilidad

  //Getters para editar habilidad

  get NombreHabilidadEdit(){
    return this.formHabilidadEdit.get("nombreHabilidad");
   }

   get ProgresoEdit(){
    return this.formHabilidadEdit.get("progreso");
   }

   enviarHabilidadEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formHabilidadEdit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.editarHabilidad(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formHabilidadEdit.markAllAsTouched(); 
    }
  }

  //Funcion para Editar habilidad

  editarHabilidad(item:number){
    this.closebuttonEditarHabilidad.nativeElement.click();

    if(this.miPortfolio.HabilidadesBlandas[item].nombreHabilidad==this.formHabilidadEdit.value.nombreHabilidad
      && this.miPortfolio.HabilidadesBlandas[item].progreso==this.formHabilidadEdit.value.progreso){

        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
        })

      }else{
        this.miPortfolio.HabilidadesBlandas[item].nombreHabilidad=this.formHabilidadEdit.value.nombreHabilidad;
        this.miPortfolio.HabilidadesBlandas[item].progreso=this.formHabilidadEdit.value.progreso;
        Swal.fire({
          icon: 'question',
          iconHtml: '<i class="bi bi-pencil-fill"></i>',
          title: 'Se editó la habilidad: "'+ this.miPortfolio.HabilidadesBlandas[item].nombreHabilidad + '"',
          showConfirmButton: false,
          timer: 4000
        })
      }
  }

  nombreHabilidadSelect: string = '';
  progresoSelect: string = '';
  auxIndex: number = 0;
  mostrarHabilidad(item: number){
    this.auxIndex = item;
    this.nombreHabilidadSelect= this.miPortfolio.HabilidadesBlandas[this.auxIndex].nombreHabilidad;
    this.progresoSelect=this.miPortfolio.HabilidadesBlandas[this.auxIndex].progreso;
  } 



  eliminarHabilidad(indice: number){
    this.closebuttonEliminarHabilidad.nativeElement.click();
    Swal.fire({
          icon: 'error',
          iconHtml: '<i class="bi bi-trash-fill"></i>',
          title: 'Se eliminó la habilidad: "'+ this.miPortfolio.HabilidadesBlandas[indice].nombreHabilidad + '"',
          showConfirmButton: false,
          timer: 4000
      })
    this.miPortfolio.HabilidadesBlandas.splice(indice, 1);
  }

  // CRUD DE TECNOLOGÍAS

  //Getters para agregar tecnologias

  get NombreTecnologiaAdd(){
    return this.formTecnologiaAadd.get("nombreTecnologia");
   }

   get NivelAdd(){
    return this.formTecnologiaAadd.get("nivel");
   }
  
   //Métodos para agregar tecnología

   enviarTecnologiaAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formTecnologiaAadd.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.agregarTecnologia();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formTecnologiaAadd.markAllAsTouched(); 
    }
  }


  nombreDeTecnologia: string = "";
  nivelDeTecnologia: string = "";
  agregarTecnologia(){

    this.closebuttonAddTecnologia.nativeElement.click();

    this.nombreDeTecnologia = this.formTecnologiaAadd.value.nombreTecnologia;
    this.nivelDeTecnologia = this.formTecnologiaAadd.value.nivel;

    this.miPortfolio.MisTecnologias.push({nombreTecnologia: this.nombreDeTecnologia, nivel: this.nivelDeTecnologia});
    Swal.fire({
      icon: 'success',
      title: 'Se agregó una tecnología: "'+ this.nombreDeTecnologia + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }

  //Getters para editar tecnologias

  get NombreTecnologiaEdit(){
    return this.formTecnologiaEdit.get("nombreTecnologia");
   }

   get NivelEdit(){
    return this.formTecnologiaEdit.get("nivel");
   }
  
   //Métodos para editar tecnología

   enviarTecnologiaEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.formTecnologiaEdit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.editarTecnologia(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formTecnologiaEdit.markAllAsTouched(); 
    }
  }


  editarTecnologia(item:number){
    this.closebuttonEditarTecnologia.nativeElement.click();

    if(this.miPortfolio.MisTecnologias[item].nombreTecnologia==this.formTecnologiaEdit.value.nombreTecnologia
      && this.miPortfolio.MisTecnologias[item].nivel==this.formTecnologiaEdit.value.nivel){

            Swal.fire({
              icon: 'info',
              title: 'Sin cambios!!!',
              showConfirmButton: false,
              timer: 4000
          })
      }else{
          this.miPortfolio.MisTecnologias[item].nombreTecnologia=this.formTecnologiaEdit.value.nombreTecnologia;
            this.miPortfolio.MisTecnologias[item].nivel=this.formTecnologiaEdit.value.nivel;
            Swal.fire({
              icon: 'question',
              iconHtml: '<i class="bi bi-pencil-fill"></i>',
              title: 'Se editó la tecnología: "'+ this.miPortfolio.MisTecnologias[item].nombreTecnologia + '"',
              showConfirmButton: false,
              timer: 4000
          })
      }
  }

  eliminarTecnologia(indice: number){
    this.closebuttonEliminarTecnologia.nativeElement.click();
      Swal.fire({
        icon: 'error',
        iconHtml: '<i class="bi bi-trash-fill"></i>',
        title: 'Se eliminó la tecnología: "'+ this.miPortfolio.MisTecnologias[indice].nombreTecnologia + '"',
        showConfirmButton: false,
        timer: 4000
      })
    this.miPortfolio.MisTecnologias.splice(indice, 1);
  }

  nombreTecnologiaSelect: string = '';
  nivelSelect: string = '';
  //auxIndex: number = 0; //ya se definió para habilidades un auxiliar
  mostrarTecnologia(item: number){
    this.auxIndex = item;
    this.nombreTecnologiaSelect= this.miPortfolio.MisTecnologias[this.auxIndex].nombreTecnologia;
    this.nivelSelect=this.miPortfolio.MisTecnologias[this.auxIndex].nivel;
  } 

}
