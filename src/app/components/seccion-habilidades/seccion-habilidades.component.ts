import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { TokenService } from 'src/app/servicios/token.service';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { Habilidad } from "src/app/model/habilidad";
import { TecnologiaService } from 'src/app/servicios/tecnologia.service';
import { Tecnologia } from "src/app/model/tecnologia";
import { NivelService } from 'src/app/servicios/nivel.service';
import { Nivel } from 'src/app/model/nivel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seccion-habilidades',
  templateUrl: './seccion-habilidades.component.html',
  styleUrls: ['./seccion-habilidades.component.css']
})
export class SeccionHabilidadesComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

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

  misHabilidades: any;

  misTecnologias: any;

  misNiveles: any;


  constructor(
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private habilidadService: HabilidadService,
              private tecnologiaService: TecnologiaService,
              private nivelService: NivelService,
              private router: Router
              ) { 

    this.formHabilidadEdit= this.formBuilder.group({
      nombreHabilidad: ['', [Validators.required]],
      progreso: ['', [Validators.required]],
   })

   this.formHabilidadAdd= this.formBuilder.group({
    nombreHabilidad: ['', [Validators.required]],
    progreso: ['', [Validators.required]],
    })

  this.formHabilidadDelete= this.formBuilder.group({
    nombre: '',
    nivelId: ''
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


    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.habilidadService.mostrarHabilidad().subscribe(data => {
      this.misHabilidades = data;
    });

    this.tecnologiaService.mostrarTecnologia().subscribe(data => {
      this.misTecnologias = data;
    });

    this.nivelService.mostrarNivel().subscribe(data => {
      this.misNiveles = data;
    });
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
      // Si la validación fué superada se pasará a agregar el nuevo registro
      this.agregarHabilidad();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formHabilidadAdd.markAllAsTouched(); 
    }
  }


  // Funcion para agregar habilidad
  nombreDeHabilidad: string = "";
  progresoDeHabilidad: number = 1;
  agregarHabilidad(){

    this.closebuttonAddHabilidad.nativeElement.click();

    this.nombreDeHabilidad = this.formHabilidadAdd.value.nombreHabilidad;
    this.progresoDeHabilidad= this.formHabilidadAdd.value.progreso;


    let habilidad: Habilidad =  {
      "nombre": this.nombreDeHabilidad, 
      "nivelId": this.progresoDeHabilidad
      
    };

    Swal.fire({
      icon: 'success',
      title: 'Se agregó la habilidad: "'+ this.nombreDeHabilidad +'"',
      showConfirmButton: false,
      timer: 4000
    })

    this.habilidadService.crearHabilidad(habilidad).subscribe(
      data => {

              setTimeout(function(){
                location.reload();
              }, 1000);

              }
    );

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
      // Si la validación fué superada se pasará a editar el registro
      this.editarHabilidad(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formHabilidadEdit.markAllAsTouched(); 
    }
  }

  //Funcion para Editar habilidad

  editarHabilidad(item:number){
    this.closebuttonEditarHabilidad.nativeElement.click();

    if(this.misHabilidades[item].nombre==this.formHabilidadEdit.value.nombreHabilidad
      && this.misHabilidades[item].nivelId==this.formHabilidadEdit.value.progreso){

        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
        })

      }else{
       
        this.misHabilidades[item].nombre=this.formHabilidadEdit.value.nombreHabilidad;
        this.misHabilidades[item].nivelId=this.formHabilidadEdit.value.progreso;

        let habilidad: Habilidad =  {
          "id": this.misHabilidades[item].id,
          "nombre": this.misHabilidades[item].nombre, 
          "nivelId": this.misHabilidades[item].nivelId
        };

        Swal.fire({
          icon: 'question',
          iconHtml: '<i class="bi bi-pencil-fill"></i>',
          title: 'Se editó la habilidad: "'+ this.misHabilidades[item].nombre + '"',
          showConfirmButton: false,
          timer: 4000
        })

        this.habilidadService.editarHabilidad(habilidad).subscribe(
          data => {
              setTimeout(function(){
                location.reload();
              }, 1000);
          }
        );

      }
  }

  nombreHabilidadSelect: string = '';
  progresoSelect: number = 1;
  auxIndex: number = 0;
  mostrarHabilidad(item: number){
      this.auxIndex = item;
      this.nombreHabilidadSelect= this.misHabilidades[this.auxIndex].nombre;
      this.progresoSelect=this.misHabilidades[this.auxIndex].nivelId;

      //La búsqueda la dejo comentada porque opté por hacerla con typescript 
      //Pero se puede probar que funciona comentando las lineas de arriba  de la función y descomentando estas
      /*
      this.habilidadService.buscarHabilidad(this.misHabilidades[item].id).subscribe(
        data => {
          this.auxIndex = item;
          this.nombreHabilidadSelect = data.nombre;
          this.progresoSelect = data.nivelId;
        }
      )*/
      
  } 



  eliminarHabilidad(indice: number){
    this.closebuttonEliminarHabilidad.nativeElement.click();
    Swal.fire({
          icon: 'error',
          iconHtml: '<i class="bi bi-trash-fill"></i>',
          title: 'Se eliminó la habilidad: "'+ this.misHabilidades[indice].nombre + '"',
          showConfirmButton: false,
          timer: 4000
      })
    //this.misHabilidades.splice(indice, 1);
    this.habilidadService.borrarHabilidad(this.misHabilidades[indice].id).subscribe(
      data => {
        setTimeout(function(){
          location.reload();
        }, 1000);
      }
    );
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
      // Si la validación fué superada se pasará a agregar el nuevo registro
      this.agregarTecnologia();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formTecnologiaAadd.markAllAsTouched(); 
    }
  }


  nombreDeTecnologia: string = "";
  nivelDeTecnologia: number = 1;
  decripcionDeNivel: string = "";
  agregarTecnologia(){

    this.closebuttonAddTecnologia.nativeElement.click();

    this.nombreDeTecnologia = this.formTecnologiaAadd.value.nombreTecnologia;
    this.nivelDeTecnologia = this.formTecnologiaAadd.value.nivel;

    let tecnologia: Tecnologia =  {
      "nombre": this.nombreDeTecnologia, 
      "nivelId": this.nivelDeTecnologia
      
    };+

    Swal.fire({
      icon: 'success',
      title: 'Se agregó una tecnología: "'+ this.nombreDeTecnologia + '"',
      showConfirmButton: false,
      timer: 4000
    })

    this.tecnologiaService.crearTecnologia(tecnologia).subscribe(
      data => {
        setTimeout(function(){
          location.reload();
        }, 1000);
      }
    );

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
      // Si la validación fué superada se pasará a editar el registro
      this.editarTecnologia(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.formTecnologiaEdit.markAllAsTouched(); 
    }
  }


  editarTecnologia(item:number){
    this.closebuttonEditarTecnologia.nativeElement.click();

    if(this.misTecnologias[item].nombre==this.formTecnologiaEdit.value.nombreTecnologia
      && this.misTecnologias[item].nivelId==this.formTecnologiaEdit.value.nivel){

            Swal.fire({
              icon: 'info',
              title: 'Sin cambios!!!',
              showConfirmButton: false,
              timer: 4000
          })
      }else{

            this.misTecnologias[item].nombre=this.formTecnologiaEdit.value.nombreTecnologia;
            this.misTecnologias[item].nivelId=this.formTecnologiaEdit.value.nivel;

        let tecnologia: Tecnologia =  {
          "id": this.misTecnologias[item].id,
          "nombre": this.misTecnologias[item].nombre, 
          "nivelId": this.misTecnologias[item].nivelId
        };

        Swal.fire({
          icon: 'question',
          iconHtml: '<i class="bi bi-pencil-fill"></i>',
          title: 'Se editó la tecnología: "'+ this.misTecnologias[item].nombre + '"',
          showConfirmButton: false,
          timer: 4000
        })

        this.tecnologiaService.editarTecnologia(tecnologia).subscribe(
          data => {
            setTimeout(function(){
              location.reload();
              }, 1000);
          }
        );
      }
  }

  eliminarTecnologia(indice: number){
    this.closebuttonEliminarTecnologia.nativeElement.click();
      Swal.fire({
        icon: 'error',
        iconHtml: '<i class="bi bi-trash-fill"></i>',
        title: 'Se eliminó la tecnología: "'+ this.misTecnologias[indice].nombre + '"',
        showConfirmButton: false,
        timer: 4000
      })

    this.tecnologiaService.borrarTecnologia(this.misTecnologias[indice].id).subscribe(
      data => {
        setTimeout(function(){
          location.reload();
          }, 1000);
      }
    );
    
  }

  nombreTecnologiaSelect: string = '';
  nivelSelect: number = 1;
  //auxIndex: number = 0; //ya se definió para habilidades un auxiliar
  mostrarTecnologia(item: number){
    this.auxIndex = item;
    this.nombreTecnologiaSelect= this.misTecnologias[this.auxIndex].nombre;
    this.nivelSelect= this.misTecnologias[this.auxIndex].nivelId;

    //La búsqueda la dejo comentada porque opté por hacerla con typescript 
      //Pero se puede probar que funciona comentando las lineas de arriba  de la función y descomentando estas:
      /*
      this.habilidadService.buscarHabilidad(this.misHabilidades[item].id).subscribe(
        data => {
          this.auxIndex = item;
          this.nombreTecnologiaSelect = data.nombre;
          this.nivelSelect = data.nivelId;
        }
      )*/
   
  } 

}
