import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from '../../servicios/experiencia.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenService } from 'src/app/servicios/token.service';
import { Experiencia } from '../../model/experiencia';
import { InstitutoService } from 'src/app/servicios/instituto.service';
import { Instituto } from "src/app/model/instituto";
import { CertificadoService } from 'src/app/servicios/certificado.service';
import { Certificado} from "src/app/model/certificado";

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  @ViewChild('closebuttonEditarInstituto') closebuttonEditarInstituto: any;
  @ViewChild('closebuttonAddInstituto') closebuttonAddInstituto: any;
  @ViewChild('closebuttonEliminarInstituto') closebuttonEliminarInstituto: any;
  @ViewChild('closebuttonEditarExperiencia') closebuttonEditarExperiencia: any;
  @ViewChild('closebuttonAddExperiencia') closebuttonAddExperiencia: any;
  @ViewChild('closebuttonEliminarExperiencia') closebuttonEliminarExperiencia: any;
  @ViewChild('closebuttonEditarCertificado') closebuttonEditarCertificado: any;
  @ViewChild('closebuttonAddCertificado') closebuttonAddCertificado: any;
  @ViewChild('closebuttonEliminarCertificado') closebuttonEliminarCertificado: any;

  form1edit: FormGroup;
  
  form1add: FormGroup;

  form1delete: FormGroup;

  form2edit: FormGroup;
  
  form2add: FormGroup;

  form2delete: FormGroup;

  form3edit: FormGroup;
  
  form3add: FormGroup;

  form3delete: FormGroup;

  misExperiencias: any;

  misTitulos: any;

  misCertificados: any;


  valoresAceptadosURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  mensajeImagenExperienciaURL = '';

  mensajeEditImagenExperienciaURL = '';

  mensajeImagenInstitutoURL = '';

  mensajeImagenInstitutoEditURL = '';

  mensajeCertificadoURL = '';

  mensajeCertificadoEditURL = '';

  constructor(
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private experienciaService: ExperienciaService,
        private institutoService: InstitutoService,
        private certificadoService: CertificadoService,
        private router: Router
        ) { 



        this.form1edit= this.formBuilder.group({
          instituto: ['', [Validators.required]],
          titulo: ['', [Validators.required]],
          anioIngreso: ['', [Validators.required]],
          anioEgreso: '',
          imageInstituto: ['', [Validators.required]]
      })

      this.form1add= this.formBuilder.group({
        instituto: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        anioIngreso: ['', [Validators.required]],
        anioEgreso: '',
        imageInstituto: ['', [Validators.required]]
      })

      this.form1delete= this.formBuilder.group({
        instituto: '',
        titulo: ''
    })

      this.form2edit= this.formBuilder.group({
        puesto: ['', [Validators.required]],
        empresa: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        anioIngreso: ['', [Validators.required]],
        anioEgreso: '',
        imageExperiencia: ['', [Validators.required]]
    })

    this.form2add= this.formBuilder.group({
      puesto: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      anioIngreso: ['', [Validators.required]],
      anioEgreso: '',
      imageExperiencia: ['', [Validators.required]]
      })

      this.form2delete= this.formBuilder.group({
        puesto: '',
        empresa: '',
        descripcion: '',
        anioIngreso: '',
        anioEgreso:''
      })

      this.form3add = this.formBuilder.group(
        {
          nombre: ['', [Validators.required]],
          imagen: ['', [Validators.required]]
        }
      )

      this.form3edit = this.formBuilder.group(
        {
          nombre: ['', [Validators.required]],
          imagen: ['', [Validators.required]]
        }
      )

      this.form3delete = this.formBuilder.group(
        {
          nombre: ['', [Validators.required]],
          imagen: ['', [Validators.required]]
        }
      )
  }

  ngOnInit(): void {

    this.experienciaService.mostrarExperiencia().subscribe(data => {
      this.misExperiencias = data;
    });

    this.institutoService.mostrarInstituto().subscribe(data => {
      this.misTitulos = data;
    });

    this.certificadoService.mostrarCertificado().subscribe(data => {
      this.misCertificados = data;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

  }



  //FUNCIONES PARA LOS CERTIFICADOS ***************************************************************************

  //Funcion para mostrar certificados

  verCertificado(index: number){
    Swal.fire({
      title: this.misCertificados[index].nombre,
      imageUrl: this.misCertificados[index].imagen,
      imageAlt: 'Custom image',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: '#dc3545',
      cancelButtonText: "Cerrar",
    })
  }

  //fUNCIONES PARA AGREGAR CERTIFICADOS

  //Getters para certificados

  get Nombre(){
    return this.form3add.get("nombre");
   }

  get Imagen(){
    return this.form3add.get("imagen");
   }
   
   certificadoImageValid(){
    if (this.form3add.value.imagen.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

   enviarCertificadoAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form3add.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      
      if(this.certificadoImageValid()){
        //si la URL tiene formato valido pasa a controlar las fechas
        this.agregarCertificado();
        this.mensajeCertificadoURL = '';
      }else
      if(!this.certificadoImageValid()){
        this.mensajeCertificadoURL = "URL inválida. Iintroduzca una URL válida";
      }
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form3add.markAllAsTouched(); 
    }
 
  
  }

  nombreCertificado: string = "";
  imagenCertificado: string = "";
  agregarCertificado(){
    this.closebuttonAddCertificado.nativeElement.click();

    this.nombreCertificado = this.form3add.value.nombre;
    this.imagenCertificado = this.form3add.value.imagen;


      let certificado: Certificado =  {
        "nombre": this.nombreCertificado, 
        "imagen": this.imagenCertificado
      };

      this.certificadoService.crearCertificado(certificado).subscribe(
        data => {
          //this.router.navigate(['/']);
        }
      );

      setTimeout(function(){
        location.href ='/';
      }, 1000);

    Swal.fire({
      icon: 'success',
      title: 'Se agregó el certificado: "'+ this.nombreCertificado + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }

  // Función para mostrar cerificado

  fotoSelect: string = '';
  nombreSelect: string = '';
  mostrarCertificado(indice: number){
    this.auxIndex = indice;
    this.fotoSelect =  this.misCertificados[this.auxIndex].imagen;
    this.nombreSelect = this.misCertificados[this.auxIndex].nombre;
    
  }

  // Funciones para editar certificado

  get NombreEdit(){
    return this.form3edit.get("nombre");
   }

   get ImagenEdit(){
    return this.form3edit.get("imagen");
   }

   cerificadoImageValidEdit(){
    if (this.form3edit.value.imagen.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

  enviarCertificadoEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form3edit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra

      if(this.cerificadoImageValidEdit()){
        //si la URL tiene formato valido pasa a edtar cerificado
        this.editarCerificado(item);
        this.mensajeCertificadoEditURL = '';
      }else
      if(!this.cerificadoImageValidEdit()){
        this.mensajeCertificadoEditURL = "URL inválida. Iintroduzca una URL válida";
      }

    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form1edit.markAllAsTouched(); 
    }
  }

  // Edita el certificado

  editarCerificado(item: number){
    this.closebuttonEditarCertificado.nativeElement.click();
    if(
      this.misCertificados[item].nombre == this.form3edit.value.nombre
      && this.misCertificados[item].imagen == this.form3edit.value.imagen
      ){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{

            //this.misCertificados[item].nombre = this.form3edit.value.nombre;
            //this.misCertificados[item].imagen = this.form3edit.value.imagen;

            let certificado: Certificado =  {
              "id": this.misCertificados[item].id,
              "nombre": this.form3edit.value.nombre, 
              "imagen": this.form3edit.value.imagen
            };

            this.certificadoService.editarCertificado(certificado).subscribe(
              data => {
                this.router.navigate(['/']);
                
              }
            );

            setTimeout(function(){
              location.href ='/';
          }, 1000);

            Swal.fire({
              icon: 'question',
              iconHtml: '<i class="bi bi-pencil-fill"></i>',
              title: 'Se editó: "'+ this.misCertificados[item].nombre + '"',
              showConfirmButton: false,
              timer: 4000
            })
    }
  }

  //Funcion para eliminar certificado

  eliminarCertificado(indice: number){

    this.closebuttonEliminarCertificado.nativeElement.click();
      Swal.fire({
        icon: 'error',
        iconHtml: '<i class="bi bi-trash-fill"></i>',
        title: 'Se eliminó el Certificado: "'+ this.misCertificados[indice].nombre + '"',
        showConfirmButton: false,
        timer: 4000
        })

    this.certificadoService.borrarCertificado(this.misCertificados[indice].id).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );

    setTimeout(function(){
      location.href ='/';
      }, 1000);
  }

  // FUNCIONES PARA LOS INSTITUTOS O CENTROS EDUCATIVOS ********************************************************************************+

  //Getters de Agregar institución

  get Titulo(){
    return this.form1add.get("titulo");
   }

   get Instituto(){
    return this.form1add.get("instituto");
   }

   get AnioIngresoI(){
    return this.form1add.get("anioIngreso");
   }

   get AnioEgresoI(){
    return this.form1add.get("anioEgreso");
   }

   get ImageInstituto(){
    return this.form1add.get("imageInstituto");
   }

   institutoImageValid(){
    if (this.form1add.value.imageInstituto.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

   
  visualizarInstituto(index: number){
    Swal.fire({
      title: this.misTitulos[index].instituto,
      imageUrl: this.misTitulos[index].imageInstituto,
      html: '<h6>'+this.misTitulos[index].titulo+'</h6>'
            +'<p class="text-primary">('+this.misTitulos[index].anioIngreso +') - ('+this.misTitulos[index].anioEgreso+')</p>',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: '#dc3545',
      cancelButtonText: "Cerrar",
    })
}

   enviarTituloAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form1add.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      if(this.institutoImageValid()){
        //si la URL tiene formato valido pasa a controlar las fechas
        this.controlarFechaTituloAdd();
        this.mensajeImagenInstitutoURL = '';
      }else
      if(!this.institutoImageValid()){
        this.mensajeImagenInstitutoURL = "URL inválida. Iintroduzca una URL válida";
      }
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form1add.markAllAsTouched(); 
    }
  }

  controlarFechaTituloAdd(){
    if(this.form1add.value.anioIngreso <= this.form1add.value.anioEgreso || this.form1add.value.anioEgreso === ''){
      //Si la fecha de ingreso es menor o igual a la de egreso va a pasar al siguiente if
      //Tengo que convertir el formato de fecha actual a yyyy-mm-dd con fechaActual.toISOString().split('T')[0]
      if(this.form1add.value.anioIngreso > this.fechaActual.toISOString().split('T')[0]){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de ingreso no pueden superar a la fecha actual',
          confirmButtonColor: '#0d6efd',
        })
      }else{
        if(this.form1add.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
            confirmButtonColor: '#0d6efd',
          })
        }else{
          //Si las fechas no superan a la fecha actual va agregar correctamente
          this.agregarTitulo();
        }
      }
        
    }else{
      //Si la fecha de ingreso es mayor a la de egreso va a tirar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de ingreso no puede ser anterior a la fecha de egreso',
        confirmButtonColor: '#0d6efd',
      })
    }
  }


  nombreInstituto: string = "";
  tituloInstituto: string = "";
  anioIngresoInstituto: string = "";
  anioEgresoInstituto: string = "";
  imagenInstituto: string = "";
  agregarTitulo(){

    this.closebuttonAddInstituto.nativeElement.click();

    this.nombreInstituto = this.form1add.value.instituto;
    this.tituloInstituto = this.form1add.value.titulo;
    this.anioIngresoInstituto = this.form1add.value.anioIngreso;
    this.anioEgresoInstituto = this.form1add.value.anioEgreso;
    this.imagenInstituto = this.form1add.value.imageInstituto;


      let instituto: Instituto =  {
        "instituto": this.nombreInstituto, 
        "titulo": this.tituloInstituto, 
        "anioIngreso": this.anioIngresoInstituto , 
        "anioEgreso": this.anioEgresoInstituto, 
        "imageInstituto": this.imagenInstituto
      };

      this.institutoService.crearInstituto(instituto).subscribe(
        data => {
          //this.router.navigate(['/']);
        }
      );

      setTimeout(function(){
        location.href ='/';
      }, 1000);

    Swal.fire({
      icon: 'success',
      title: 'Se agregó la institución: "'+ this.nombreInstituto + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }



  
  //Funciones para editar institución

  //Getters para editar institución

  get TituloEdit(){
    return this.form1edit.get("titulo");
   }

   get InstitutoEdit(){
    return this.form1edit.get("instituto");
   }

   get AnioIngresoIEdit(){
    return this.form1edit.get("anioIngreso");
   }

   get AnioEgresoIEdit(){
    return this.form1edit.get("anioEgreso");
   }

   get ImageInstitutoEdit(){
    return this.form1edit.get("imageInstituto");
   }

   institutoImageValidEdit(){
    if (this.form1edit.value.imageInstituto.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

   enviarTituloEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form1edit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      //this.editarTitulo(item);

      if(this.institutoImageValidEdit()){
        //si la URL tiene formato valido pasa a controlar las fechas
        this.controlarFechasTituloEdit(item);
        this.mensajeImagenInstitutoEditURL = '';
      }else
      if(!this.institutoImageValidEdit()){
        this.mensajeImagenInstitutoEditURL = "URL inválida. Iintroduzca una URL válida";
      }

    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form1edit.markAllAsTouched(); 
    }
  }

  controlarFechasTituloEdit(item: number){
    if(this.form1edit.value.anioIngreso <= this.form1edit.value.anioEgreso || this.form1edit.value.anioEgreso === ''){
       //Si la fecha de ingreso es menor o igual a la de egreso va a pasar al siguiente if
      //Tengo que convertir el formato de fecha actual a yyyy-mm-dd con fechaActual.toISOString().split('T')[0]
      if(this.form1edit.value.anioIngreso > this.fechaActual.toISOString().split('T')[0]){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de ingreso no pueden superar a la fecha actual',
          confirmButtonColor: '#0d6efd',
        })
      }else{
        if(this.form1edit.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
            confirmButtonColor: '#0d6efd',
          })
        }else{
          //Si las fechas no superan a la fecha actual va agregar correctamente
          this.editarTitulo(item);
        }
      }
        
    }else{
      //Si la fecha de ingreso es mayor a la de egreso va a tirar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de ingreso no puede ser anterior a la fecha de egreso',
        confirmButtonColor: '#0d6efd',
      })
    }
  }

  


  
  editarTitulo(item:number){
    this.closebuttonEditarInstituto.nativeElement.click();
    if(this.misTitulos[item].instituto == this.form1edit.value.instituto
      && this.misTitulos[item].titulo == this.form1edit.value.titulo
      && this.misTitulos[item].anioIngreso == this.form1edit.value.anioIngreso
      && this.misTitulos[item].anioEgreso == this.form1edit.value.anioEgreso
      && this.misTitulos[item].imageInstituto == this.form1edit.value.imageInstituto
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
            title: 'Se editó: "'+ this.misTitulos[item].instituto + '"',
            showConfirmButton: false,
            timer: 4000
            })

            this.misTitulos[item].instituto = this.form1edit.value.instituto;
            this.misTitulos[item].titulo = this.form1edit.value.titulo;
            this.misTitulos[item].anioIngreso = this.form1edit.value.anioIngreso;
            this.misTitulos[item].anioEgreso = this.form1edit.value.anioEgreso;
            this.misTitulos[item].imageInstituto = this.form1edit.value.imageInstituto;

            let instituto: Instituto =  {
              "id": this.misTitulos[item].id,
              "instituto": this.misTitulos[item].instituto, 
              "titulo": this.misTitulos[item].titulo, 
              "anioIngreso": this.misTitulos[item].anioIngreso, 
              "anioEgreso": this.misTitulos[item].anioEgreso, 
              "imageInstituto": this.misTitulos[item].imageInstituto
            };

            this.institutoService.editarInstituto(instituto).subscribe(
              data => {
                //this.router.navigate(['/']);
              }
            );

            setTimeout(function(){
              location.href ='/';
          }, 1000);

            Swal.fire({
              icon: 'question',
              iconHtml: '<i class="bi bi-pencil-fill"></i>',
              title: 'Cambios Guardados!!!',
              showConfirmButton: false,
              timer: 4000
            })
    }
  }

  // Funciones para mostrar institución

  nombreInstitutoSelect: string = '';
  tituloInstitutoSelect: string = '';
  anioIngresoInstitutoSelect: string = '';
  anioEgresoInstitutoSelect: string = '';
  imagenInstitutoSelect: string = '';
  auxIndex: number = 0;
  mostrarTitulo(item: number){
    this.auxIndex = item;
    this.nombreInstitutoSelect= this.misTitulos[this.auxIndex].instituto;
    this.tituloInstitutoSelect=this.misTitulos[this.auxIndex].titulo;
    this.anioIngresoInstitutoSelect=this.misTitulos[this.auxIndex].anioIngreso;
    this.anioEgresoInstitutoSelect=this.misTitulos[this.auxIndex].anioEgreso;
    this.imagenInstitutoSelect=this.misTitulos[this.auxIndex].imageInstituto;
  } 

// Funciones para eliminar institución

  eliminarTitulo(indice: number){
    this.closebuttonEliminarInstituto.nativeElement.click();
      Swal.fire({
        icon: 'error',
        iconHtml: '<i class="bi bi-trash-fill"></i>',
        title: 'Se eliminó el Centro educativo: "'+ this.misTitulos[indice].instituto + '"',
        showConfirmButton: false,
        timer: 4000
        })
    //this.misTitulos.splice(indice, 1);
    this.institutoService.borrarInstituto(this.misTitulos[indice].id).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );

    setTimeout(function(){
      location.href ='/';
      }, 1000);
  }

  // FUNCIONES DEL AREA EXPERIENCIA *************************************************************************


  // Funciones para agregar Experiencia

  //getters de experiencia add 


    get Puesto(){
      return this.form2add.get("puesto");
     }
  
     get Empresa(){
      return this.form2add.get("empresa");
     }
  
     get Descripcion(){
      return this.form2add.get("descripcion");
     }
  
     get AnioIngreso(){
      return this.form2add.get("anioIngreso");
     }
  
     get AnioEgreso(){
      return this.form2add.get("anioEgreso");
     }

     get ImageExperiencia(){
      return this.form2add.get("imageExperiencia");
     }

     experienciaImageValid(){
      if (this.form2add.value.imageExperiencia.match(this.valoresAceptadosURL)){
        //Es URL
        return true;
      } else {
        //No es URL
        return false;
      }
    }



  enviarExperienciaAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form2add.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      if(this.experienciaImageValid()){
        //si la URL tiene formato valido pasa a controlar las fechas
        this.controlarFechasAdd();
        this.mensajeImagenExperienciaURL = '';
      }else
      if(!this.experienciaImageValid()){
        this.mensajeImagenExperienciaURL = "URL inválida. Iintroduzca una URL válida";
      }
      
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form2add.markAllAsTouched(); 
    }
  }

  fechaActual = new Date();
  controlarFechasAdd(){
    if(this.form2add.value.anioIngreso <= this.form2add.value.anioEgreso || this.form2add.value.anioEgreso === ''){
      //Si la fecha de ingreso es menor o igual a la de egreso va a pasar al siguiente if
      //Tengo que convertir el formato de fecha actual a yyyy-mm-dd con fechaActual.toISOString().split('T')[0]
      if(this.form2add.value.anioIngreso > this.fechaActual.toISOString().split('T')[0]){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de ingreso no pueden superar a la fecha actual',
          confirmButtonColor: '#0d6efd',
        })
      }else{
        if(this.form2add.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
            confirmButtonColor: '#0d6efd',
          })
        }else{
          //Si las fechas no superan a la fecha actual va agregar correctamente
          this.agregarExperiencia();
        }
      }
        
    }else{
      //Si la fecha de ingreso es mayor a la de egreso va a tirar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de ingreso no puede ser anterior a la fecha de egreso',
        confirmButtonColor: '#0d6efd',
      })
    }
  }

  //Función para agregar experiencia

  puestoExperiencia: string = '';
  empresaExperiencia: string = '';
  descripcionExperiencia: string = '';
  anioIngresoExperiencia: string = '';
  anioEgresoExperiencia: string = '';
  imagenExperiencia: string = '';
  agregarExperiencia(){
    this.closebuttonAddExperiencia.nativeElement.click();

    this.puestoExperiencia = this.form2add.value.puesto;
    this.empresaExperiencia = this.form2add.value.empresa;
    this.descripcionExperiencia = this.form2add.value.descripcion;
    this.anioIngresoExperiencia = this.form2add.value.anioIngreso;
    this.anioEgresoExperiencia = this.form2add.value.anioEgreso;
    this.imagenExperiencia = this.form2add.value.imageExperiencia;

    let experiencia: Experiencia =  {
                              "puesto": this.puestoExperiencia, 
                              "empresa": this.empresaExperiencia, 
                              "descripcion": this.descripcionExperiencia, 
                              "anioIngreso": this.anioIngresoExperiencia , 
                              "anioEgreso": this.anioEgresoExperiencia, 
                              "imageExperiencia": this.imagenExperiencia
                            };

                            this.experienciaService.crearExperiencia(experiencia).subscribe(
                              data => {
                                //this.router.navigate(['/']);
                              }
                            );

                            setTimeout(function(){
                              location.href ='/';
                           }, 1000);
    Swal.fire({
      icon: 'success',
      title: 'Se agregó nueva Experiencia: "'+ this.puestoExperiencia + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }



  // Funciones para Editar Experiencia

  //getters de experiencia add 


  get PuestoEdit(){
    return this.form2edit.get("puesto");
   }

   get EmpresaEdit(){
    return this.form2edit.get("empresa");
   }

   get DescripcionEdit(){
    return this.form2edit.get("descripcion");
   }

   get AnioIngresoEdit(){
    return this.form2edit.get("anioIngreso");
   }

   get AnioEgresoEdit(){
    return this.form2edit.get("anioEgreso");
   }

   get ImageExperienciaEdit(){
    return this.form2edit.get("imageExperiencia");
   }

   experienciaEditImageValid(){
    if (this.form2edit.value.imageExperiencia.match(this.valoresAceptadosURL)){
      //Es URL
      return true;
    } else {
      //No es URL
      return false;
    }
  }

   

   // funciones para editar experiencia

   enviarExperienciaEdit(event: Event, item:number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form2edit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      if(this.experienciaEditImageValid()){
        //si la URL tiene formato valido pasa a controlar las fechas
        this.controlarFechasEdit(item);
        this.mensajeEditImagenExperienciaURL = '';
      }else
      if(!this.experienciaEditImageValid()){
        this.mensajeEditImagenExperienciaURL = "URL inválida. Iintroduzca una URL válida";
      }
      
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form2edit.markAllAsTouched(); 
    }
  }

  controlarFechasEdit(item: number){
    if(this.form2edit.value.anioIngreso <= this.form2edit.value.anioEgreso || this.form2edit.value.anioEgreso === ''){
       //Si la fecha de ingreso es menor o igual a la de egreso va a pasar al siguiente if
      //Tengo que convertir el formato de fecha actual a yyyy-mm-dd con fechaActual.toISOString().split('T')[0]
      if(this.form2edit.value.anioIngreso > this.fechaActual.toISOString().split('T')[0]){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de ingreso no pueden superar a la fecha actual',
          confirmButtonColor: '#0d6efd',
        })
      }else{
        if(this.form2edit.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
            confirmButtonColor: '#0d6efd',
          })
        }else{
          //Si las fechas no superan a la fecha actual va agregar correctamente
          this.editarExperiencia(item);
        }
      }
        
    }else{
      //Si la fecha de ingreso es mayor a la de egreso va a tirar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de ingreso no puede ser anterior a la fecha de egreso',
        confirmButtonColor: '#0d6efd',
      })
    }
  }

  editarExperiencia(item:number){
    this.closebuttonEditarExperiencia.nativeElement.click();
    if(this.misExperiencias[item].puesto==this.form2edit.value.puesto
      && this.misExperiencias[item].empresa==this.form2edit.value.empresa
      && this.misExperiencias[item].descripcion==this.form2edit.value.descripcion
      && this.misExperiencias[item].anioIngreso==this.form2edit.value.anioIngreso
      && this.misExperiencias[item].anioEgreso==this.form2edit.value.anioEgreso
      && this.misExperiencias[item].imageExperiencia==this.form2edit.value.imageExperiencia
      ){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{
      this.misExperiencias[item].puesto=this.form2edit.value.puesto;
      this.misExperiencias[item].empresa=this.form2edit.value.empresa;
      this.misExperiencias[item].descripcion=this.form2edit.value.descripcion;
      this.misExperiencias[item].anioIngreso=this.form2edit.value.anioIngreso;
      this.misExperiencias[item].anioEgreso=this.form2edit.value.anioEgreso;
      this.misExperiencias[item].imageExperiencia=this.form2edit.value.imageExperiencia;

      let experiencia: Experiencia =  {
        "id": this.misExperiencias[item].id,
        "puesto": this.misExperiencias[item].puesto, 
        "empresa": this.misExperiencias[item].empresa, 
        "descripcion": this.misExperiencias[item].descripcion, 
        "anioIngreso": this.misExperiencias[item].anioIngreso, 
        "anioEgreso": this.misExperiencias[item].anioEgreso, 
        "imageExperiencia": this.misExperiencias[item].imageExperiencia
      };

      this.experienciaService.editarExperiencia(experiencia).subscribe(
        data => {
          //this.router.navigate(['/']);
        }
      );

      setTimeout(function(){
        location.href ='/';
     }, 1000);

      Swal.fire({
        icon: 'question',
        iconHtml: '<i class="bi bi-pencil-fill"></i>',
        title: 'Cambios Guardados!!!',
        showConfirmButton: false,
        timer: 4000
      })



    }
  }

  // Funciones para Eliminar Experiencia

  eliminarExperiencia(indice: number){
    this.closebuttonEliminarExperiencia.nativeElement.click();
    Swal.fire({
      icon: 'error',
      iconHtml: '<i class="bi bi-trash-fill"></i>',
      title: 'Se eliminó la experiencia: "'+ this.misExperiencias[indice].puesto + '"',
      showConfirmButton: false,
      timer: 4000
    })
    //this.misExperiencias.splice(indice, 1);

    this.experienciaService.borrarExperiencia(this.misExperiencias[indice].id).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );

    setTimeout(function(){
      location.href ='/';
   }, 1000);

  }

  // Funciones para Mostrar Experiencia

  puestoExperienciaSelect: string = '';
  empresaExperienciaSelect: string = '';
  descripcionExperienciaSelect: string = '';
  anioIngresoExperienciaSelect: string = '';
  anioEgresoExperienciaSelect: string = '';
  imageExperienciaSelect: string = '';
  //auxIndex: number = 0; //ya se definió un auxiliar arriba
  mostrarExperiencia(item: number){
    this.auxIndex = item;
    this.puestoExperienciaSelect= this.misExperiencias[this.auxIndex].puesto;
    this.empresaExperienciaSelect= this.misExperiencias[this.auxIndex].empresa;
    this.descripcionExperienciaSelect= this.misExperiencias[this.auxIndex].descripcion;
    this.anioIngresoExperienciaSelect= this.misExperiencias[this.auxIndex].anioIngreso;
    this.anioEgresoExperienciaSelect= this.misExperiencias[this.auxIndex].anioEgreso;
    this.imageExperienciaSelect= this.misExperiencias[this.auxIndex].imageExperiencia;
  }

}
