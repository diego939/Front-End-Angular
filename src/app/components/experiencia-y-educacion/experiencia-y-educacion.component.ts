import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  @ViewChild('closebuttonEditarInstituto') closebuttonEditarInstituto: any;
  @ViewChild('closebuttonAddInstituto') closebuttonAddInstituto: any;
  @ViewChild('closebuttonEliminarInstituto') closebuttonEliminarInstituto: any;
  @ViewChild('closebuttonEditarExperiencia') closebuttonEditarExperiencia: any;
  @ViewChild('closebuttonAddExperiencia') closebuttonAddExperiencia: any;
  @ViewChild('closebuttonEliminarExperiencia') closebuttonEliminarExperiencia: any;

  form1edit: FormGroup;
  
  form1add: FormGroup;

  form1delete: FormGroup;

  form2edit: FormGroup;
  
  form2add: FormGroup;

  form2delete: FormGroup;

  miPortfolio: any;

  logueado: any;
  

  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });

    this.form1edit= this.formBuilder.group({
      instituto: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
   })

   this.form1add= this.formBuilder.group({
    instituto: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
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
 })

 this.form2add= this.formBuilder.group({
  puesto: ['', [Validators.required]],
  empresa: ['', [Validators.required]],
  descripcion: ['', [Validators.required]],
  anioIngreso: ['', [Validators.required]],
  anioEgreso: '',
  })

  this.form2delete= this.formBuilder.group({
    puesto: '',
    empresa: '',
    descripcion: '',
    anioIngreso: '',
    anioEgreso:''
 })



   this.logueado = this.authService;
  }

  ngOnInit(): void {
  }


   
  // variables y funciones a modo de prueba
  /*titulos: Array<{ instituto: string, titulo: string }> = [
    {instituto: 'UTN-FBRA cursos a distancia', titulo: 'Desarrollo Web'},
    {instituto: 'Educacion IT', titulo: 'Desarrollo fullstack con java'},
    {instituto: 'UNNE - Facultad de Ciencias Exactas ', titulo: 'Licenciado en Sistemas de información'}
  ];

  experiencias: Array<{ puesto: string, empresa: string, descripcion: string, anioIngreso: string, anioEgreso: string}> = [
    { puesto: 'Freelance full stack developer', 
      empresa: 'Bruno Gas', 
      descripcion: 'Se desarrolló una aplicación web que administre las ventas de una tienda de artículos de gas. controlando el stock y realice pedidos de productos a través de la web. El proyecto fue realizado en el framework Codeigniter, con lenguajes JavaScript y PHP para el bak end', 
      anioIngreso: 'ene 2020', 
      anioEgreso: 'jul 2020', },

    { puesto: 'Operador Informático', 
      empresa: 'Soluciones PC', 
      descripcion: 'Instalación de sistemas operativos, backup y mantenimiento de PC. ', 
      anioIngreso: 'dic 2018', 
      anioEgreso: 'jul 2019', }
  ];


  certificados: Array<{ nombre: string, foto: string }> = [
    {nombre: 'Argentina Programa Yo Programo', foto: 'argentina_programa_octubre_diciembre_2021-1.png'},
    {nombre: 'Bases De Datos SQL', foto: 'CertificacionBaseDeDatos-1.png'},
    {nombre: 'Java Hibernate', foto: 'certificado Java Hibernate-1.png'},
    {nombre: 'Desarrollo fullstack con Java', foto: 'CertificadoDigitalers2021-1.png'},
    {nombre: 'Git', foto: 'certificadoGit-1.png'},
    {nombre: 'Desarrollo Web', foto: 'CertificadoUTN-1.png'},
    {nombre: 'Bases De Datos Oracle', foto: 'Diego David Almirón-Oracle-1.png'},
    {nombre: 'Seguridad Informática', foto: 'Diego-David Almirón-Seguridad Informática-1.png'},
    {nombre: 'Fundamentos Web Html', foto: 'Fundamentos Web certificado-1.png'},
    {nombre: 'Java Para no Programadores', foto: 'Java para no programadores certificado-1.png'},
    {nombre: 'Java Spring boot', foto: 'Java Spring certificado-1.png'},
    {nombre: 'Java Standard Web Programming', foto: 'Java Standard Web Programming, J2SE Certificado-1.png'},
    {nombre: 'Javascript desde cero', foto: 'Javascript desde cero certificado-1.png'},
    {nombre: 'ReactJS', foto: 'ReactJS Certificado-1.png'}
  ];

  editarTitulo(info: number){
    this.titulos[info].instituto = prompt('Nombre del instituto', this.titulos[info].instituto)+'';
    this.titulos[info].titulo = prompt('Titulo', this.titulos[info].titulo)+'';
  }
  
  
  eliminarTitulo(indice: number){
    alert('Se eliminó el Título: "'+ this.titulos[indice].titulo + '"');
    this.titulos.splice(indice, 1);
  }

  agregarTitulo(){
    let nombreInstituto: string = "";
    let tituloInstituto: string = "";
    nombreInstituto = prompt('Nombre del instituto')+'';
    tituloInstituto = prompt('Titulo')+'';
 

    this.titulos.push({instituto: nombreInstituto, titulo: tituloInstituto});
    alert('Se agregó un nuevo Instituto a tu lista');
  }


  fotoSelect: string = '';
  nombreSelect: string = '';
  mostrarCertificado(indice: number){
    this.fotoSelect =  this.certificados[indice].foto;
    this.nombreSelect = this.certificados[indice].nombre;
  }*/

  //Funcion para mostrar certificados
  
  fotoSelect: string = '';
  nombreSelect: string = '';
  mostrarCertificado(indice: number){
    this.fotoSelect =  this.miPortfolio.Certificados[indice].foto;
    this.nombreSelect = this.miPortfolio.Certificados[indice].nombre;
  }

  // Funciones para agregar Titulos

  //Getters de Agregar Titulos

  get Titulo(){
    return this.form1add.get("titulo");
   }

   get Instituto(){
    return this.form1add.get("instituto");
   }

   enviarTituloAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form1add.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.agregarTitulo();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form1add.markAllAsTouched(); 
    }
  }


   //Función para el agregado de titulos

  nombreInstituto: string = "";
  tituloInstituto: string = "";
  agregarTitulo(){

    this.closebuttonAddInstituto.nativeElement.click();

    this.nombreInstituto = this.form1add.value.instituto;
    this.tituloInstituto = this.form1add.value.titulo;

    this.miPortfolio.Titulos.push({instituto: this.nombreInstituto, titulo: this.tituloInstituto});
    Swal.fire({
      icon: 'success',
      title: 'Se agregó la institución: "'+ this.nombreInstituto + '"',
      showConfirmButton: false,
      timer: 4000
    })
  }

  
  //Funciones para editar titulos

  //Getters para editar titulos

  get TituloEdit(){
    return this.form1edit.get("titulo");
   }

   get InstitutoEdit(){
    return this.form1edit.get("instituto");
   }

   enviarTituloEdit(event: Event, item: number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form1edit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.editarTitulo(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form1edit.markAllAsTouched(); 
    }
  }


  
  editarTitulo(item:number){
    this.closebuttonEditarInstituto.nativeElement.click();
    if(this.miPortfolio.Titulos[item].instituto==this.form1edit.value.instituto
      && this.miPortfolio.Titulos[item].titulo==this.form1edit.value.titulo){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Se editó: "'+ this.miPortfolio.Titulos[item].instituto + '"',
        showConfirmButton: false,
        timer: 4000
    })
    this.miPortfolio.Titulos[item].instituto=this.form1edit.value.instituto;
    this.miPortfolio.Titulos[item].titulo=this.form1edit.value.titulo;
    }
  }

  nombreInstitutoSelect: string = '';
  tituloInstitutoSelect: string = '';
  auxIndex: number = 0;
  mostrarTitulo(item: number){
    this.auxIndex = item;
    this.nombreInstitutoSelect= this.miPortfolio.Titulos[this.auxIndex].instituto;
    this.tituloInstitutoSelect=this.miPortfolio.Titulos[this.auxIndex].titulo;
  } 



  eliminarTitulo(indice: number){
    this.closebuttonEliminarInstituto.nativeElement.click();
    Swal.fire({
      icon: 'success',
      title: 'Se eliminó el Centro educativo: "'+ this.miPortfolio.Titulos[indice].instituto + '"',
      showConfirmButton: false,
      timer: 4000
  })
    this.miPortfolio.Titulos.splice(indice, 1);
  }

  // FUNCIONES DEL AREA EXPERIENCIA


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

  enviarExperienciaAdd(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form2add.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.controlarFechasAdd();
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
        })
      }else{
        if(this.form2add.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
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
      })
    }
  }

  //Función para agregar experiencia

  puestoExperiencia: string = '';
  empresaExperiencia: string = '';
  descripcionExperiencia: string = '';
  anioIngresoExperiencia: string = '';
  anioEgresoExperiencia: string = '';
  agregarExperiencia(){
    this.closebuttonAddExperiencia.nativeElement.click();

    this.puestoExperiencia = this.form2add.value.puesto;
    this.empresaExperiencia = this.form2add.value.empresa;
    this.descripcionExperiencia = this.form2add.value.descripcion;
    this.anioIngresoExperiencia = this.form2add.value.anioIngreso;
    this.anioEgresoExperiencia = this.form2add.value.anioEgreso;

    this.miPortfolio.Experiencias.push({puesto: this.puestoExperiencia, empresa: this.empresaExperiencia, descripcion: this.descripcionExperiencia, anioIngreso: this.anioIngresoExperiencia , anioEgreso: this.anioEgresoExperiencia});
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

   // funciones para editar experiencia

   enviarExperienciaEdit(event: Event, item:number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form2edit.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.controlarFechasEdit(item);
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form2edit.markAllAsTouched(); 
    }
  }

  controlarFechasEdit(item: number){
    if(this.form2edit.value.anioIngreso <= this.form2edit.value.anioEgreso || this.form2edit.value.anioEgreso === ''){
       //Si la fecha de ingreso es menor o igual a la de egreso va a pasar al siguiente if
      //Tengo que convertir el formato de fecha actual a yyyy-mm-dd con fechaActual.toISOString().split('T')[0]
      if(this.form1edit.value.anioIngreso > this.fechaActual.toISOString().split('T')[0]){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de ingreso no pueden superar a la fecha actual',
        })
      }else{
        if(this.form2edit.value.anioEgreso > this.fechaActual.toISOString().split('T')[0]){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La fecha de egreso no pueden superar a la fecha actual',
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
      })
    }
  }

  editarExperiencia(item:number){
    this.closebuttonEditarExperiencia.nativeElement.click();
    if(this.miPortfolio.Experiencias[item].puesto==this.form2edit.value.puesto
      && this.miPortfolio.Experiencias[item].empresa==this.form2edit.value.empresa
      && this.miPortfolio.Experiencias[item].descripcion==this.form2edit.value.descripcion
      && this.miPortfolio.Experiencias[item].anioIngreso==this.form2edit.value.anioIngreso
      &&this.miPortfolio.Experiencias[item].anioEgreso==this.form2edit.value.anioEgreso){
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios!!!',
          showConfirmButton: false,
          timer: 4000
    })
    }else{
      this.miPortfolio.Experiencias[item].puesto=this.form2edit.value.puesto;
      this.miPortfolio.Experiencias[item].empresa=this.form2edit.value.empresa;
      this.miPortfolio.Experiencias[item].descripcion=this.form2edit.value.descripcion;
      this.miPortfolio.Experiencias[item].anioIngreso=this.form2edit.value.anioIngreso;
      this.miPortfolio.Experiencias[item].anioEgreso=this.form2edit.value.anioEgreso;
      Swal.fire({
        icon: 'success',
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
      icon: 'success',
      title: 'Se eliminó la experiencia: "'+ this.miPortfolio.Experiencias[indice].puesto + '"',
      showConfirmButton: false,
      timer: 4000
    })
    this.miPortfolio.Experiencias.splice(indice, 1);
  }

  // Funciones para Mostrar Experiencia

  puestoExperienciaSelect: string = '';
  empresaExperienciaSelect: string = '';
  descripcionExperienciaSelect: string = '';
  anioIngresoExperienciaSelect: string = '';
  anioEgresoExperienciaSelect: string = '';
  //auxIndex: number = 0; //ya se definió un auxiliar arriba
  mostrarExperiencia(item: number){
    this.auxIndex = item;
    this.puestoExperienciaSelect= this.miPortfolio.Experiencias[this.auxIndex].puesto;
    this.empresaExperienciaSelect= this.miPortfolio.Experiencias[this.auxIndex].empresa;
    this.descripcionExperienciaSelect= this.miPortfolio.Experiencias[this.auxIndex].descripcion;
    this.anioIngresoExperienciaSelect= this.miPortfolio.Experiencias[this.auxIndex].anioIngreso;
    this.anioEgresoExperienciaSelect= this.miPortfolio.Experiencias[this.auxIndex].anioEgreso;
  }

}
