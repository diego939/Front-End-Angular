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

  //miPortfolio: any;

  misHabilidades: any;

  misTecnologias: any;

  logueado: any;


  opciones = ['regular','básico','bueno','muy bueno','excelente'];


  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 

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

  }

  ngOnInit() {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data.HabilidadesBlandas);
      console.log(data.MisTecnologias);
      this.misHabilidades = data.HabilidadesBlandas;
      this.misTecnologias = data.MisTecnologias;
    });

    this.logueado = this.authService;
  }


  mostrarNombre: string ='';
  auxIndice: number = 0;
  seleccionarHabilidad(indice: number, nombre: string){
      this.mostrarNombre =nombre;
      this.auxIndice = indice;

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
  decripcionDeProgreso: string ="";
  agregarHabilidad(){

    this.closebuttonAddHabilidad.nativeElement.click();

    this.nombreDeHabilidad = this.formHabilidadAdd.value.nombreHabilidad;
    this.progresoDeHabilidad= this.formHabilidadAdd.value.progreso;

    switch (this.formHabilidadAdd.value.progreso) {
      case '20': this.decripcionDeProgreso = "Regular ";

      break;

      case '40': this.decripcionDeProgreso = "Básico";

      break;

      case '60': this.decripcionDeProgreso = "Bueno";

      break;

      case '80': this.decripcionDeProgreso = "Muy bueno";

      break;

      case '100': this.decripcionDeProgreso = "Excelente";

      break;
    }

    this.misHabilidades.push({nombreHabilidad: this.nombreDeHabilidad, progreso: this.progresoDeHabilidad, decripcionProgreso: this.decripcionDeProgreso});
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

    if(this.misHabilidades[item].nombreHabilidad==this.formHabilidadEdit.value.nombreHabilidad
      && this.misHabilidades[item].progreso==this.formHabilidadEdit.value.progreso){

        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
        })

      }else{
        this.misHabilidades[item].nombreHabilidad=this.formHabilidadEdit.value.nombreHabilidad;
        this.misHabilidades[item].progreso=this.formHabilidadEdit.value.progreso;

        switch (this.formHabilidadEdit.value.progreso) {
          case '20': this.misHabilidades[item].decripcionProgreso = "Regular ";
    
          break;
    
          case '40': this.misHabilidades[item].decripcionProgreso  = "Básico";
    
          break;
    
          case '60': this.misHabilidades[item].decripcionProgreso  = "Bueno";
    
          break;
    
          case '80': this.misHabilidades[item].decripcionProgreso  = "Muy bueno";
    
          break;
    
          case '100': this.misHabilidades[item].decripcionProgreso  = "Excelente";
    
          break;
        }
        Swal.fire({
          icon: 'question',
          iconHtml: '<i class="bi bi-pencil-fill"></i>',
          title: 'Se editó la habilidad: "'+ this.misHabilidades[item].nombreHabilidad + '"',
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
    this.nombreHabilidadSelect= this.misHabilidades[this.auxIndex].nombreHabilidad;
    this.progresoSelect=this.misHabilidades[this.auxIndex].progreso;
  } 



  eliminarHabilidad(indice: number){
    this.closebuttonEliminarHabilidad.nativeElement.click();
    Swal.fire({
          icon: 'error',
          iconHtml: '<i class="bi bi-trash-fill"></i>',
          title: 'Se eliminó la habilidad: "'+ this.misHabilidades[indice].nombreHabilidad + '"',
          showConfirmButton: false,
          timer: 4000
      })
    this.misHabilidades.splice(indice, 1);
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
  decripcionDeNivel: string = "";
  agregarTecnologia(){

    this.closebuttonAddTecnologia.nativeElement.click();

    this.nombreDeTecnologia = this.formTecnologiaAadd.value.nombreTecnologia;
    this.nivelDeTecnologia = this.formTecnologiaAadd.value.nivel;

    switch (this.formTecnologiaAadd.value.nivel) {
      case '20': this.decripcionDeNivel = "Regular ";

      break;

      case '40': this.decripcionDeNivel = "Básico";

      break;

      case '60': this.decripcionDeNivel = "Bueno";

      break;

      case '80': this.decripcionDeNivel = "Muy bueno";

      break;

      case '100': this.decripcionDeNivel = "Excelente";

      break;
    }

    this.misTecnologias.push({nombreTecnologia: this.nombreDeTecnologia, nivel: this.nivelDeTecnologia, decripcionNivel: this.decripcionDeNivel});
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

    if(this.misTecnologias[item].nombreTecnologia==this.formTecnologiaEdit.value.nombreTecnologia
      && this.misTecnologias[item].nivel==this.formTecnologiaEdit.value.nivel){

            Swal.fire({
              icon: 'info',
              title: 'Sin cambios!!!',
              showConfirmButton: false,
              timer: 4000
          })
      }else{
          this.misTecnologias[item].nombreTecnologia=this.formTecnologiaEdit.value.nombreTecnologia;
            this.misTecnologias[item].nivel=this.formTecnologiaEdit.value.nivel;

            switch (this.formTecnologiaEdit.value.nivel) {
              case '20': this.misTecnologias[item].decripcionNivel = "Regular ";
        
              break;
        
              case '40': this.misTecnologias[item].decripcionNivel = "Básico";
        
              break;
        
              case '60': this.misTecnologias[item].decripcionNivel = "Bueno";
        
              break;
        
              case '80': this.misTecnologias[item].decripcionNivel = "Muy bueno";
        
              break;
        
              case '100': this.misTecnologias[item].decripcionNivel = "Excelente";
        
              break;
            }

            Swal.fire({
              icon: 'question',
              iconHtml: '<i class="bi bi-pencil-fill"></i>',
              title: 'Se editó la tecnología: "'+ this.misTecnologias[item].nombreTecnologia + '"',
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
        title: 'Se eliminó la tecnología: "'+ this.misTecnologias[indice].nombreTecnologia + '"',
        showConfirmButton: false,
        timer: 4000
      })
    this.misTecnologias.splice(indice, 1);
  }

  nombreTecnologiaSelect: string = '';
  nivelSelect: string = '';
  //auxIndex: number = 0; //ya se definió para habilidades un auxiliar
  mostrarTecnologia(item: number){
    this.auxIndex = item;
    this.nombreTecnologiaSelect= this.misTecnologias[this.auxIndex].nombreTecnologia;
    this.nivelSelect=this.misTecnologias[this.auxIndex].nivel;
  } 

}
