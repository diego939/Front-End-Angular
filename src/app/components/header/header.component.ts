import { Component, getNgModuleById, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { __values } from 'tslib';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('guardarcambios') guardarcambios: any;

  form: FormGroup;

  miPortfolio: any;

  logueado: any;

  valoresAceptadosNum = /^[0-9]+$/;

  mensajeNum = '';

  ValoresAceptadosMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  mensajeMail = '';

  fileName = '';

  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService, private http: HttpClient) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data.Persona;

    });

    this.form= this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      ocupacion: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      celular:['', [Validators.required]],
      image_portada:'',
   })

   this.logueado = this.authService;
  }

  ngOnInit(): void {
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

   get Localidad(){
    return this.form.get("localidad");
   }

   get Provincia(){
    return this.form.get("provincia");
   }

   get Pais(){
    return this.form.get("pais");
   }

   get Mail(){
    return this.form.get("mail");
   }

   get Celular(){
    return this.form.get("celular");
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
        if (this.form.value.mail.match(this.ValoresAceptadosMail)){
          //Es mail
          return true;
      } else {
          //No es mail
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

  editarNombre(item:number){
    this.miPortfolio.Persona[item].nombres = prompt('Nombres:',this.miPortfolio.Persona[item].nombres)+'';
    this.miPortfolio.Persona[item].apellido = prompt('apellido',this.miPortfolio.Persona[item].apellido)+'';
  }

  modificarDatos(item:number) {

        this.closebutton.nativeElement.click();
        
        if( this.miPortfolio[item].nombres==this.form.value.nombres
          && this.miPortfolio[item].apellido==this.form.value.apellido
          && this.miPortfolio[item].ocupacion==this.form.value.ocupacion
          &&this.miPortfolio[item].localidad==this.form.value.localidad
          &&this.miPortfolio[item].provincia==this.form.value.provincia
          &&this.miPortfolio[item].pais==this.form.value.pais
          &&this.miPortfolio[item].mail==this.form.value.mail
          &&this.miPortfolio[item].celular==this.form.value.celular
          ){
          this.sincambios()
        }else{
          this.cambios()
        this.miPortfolio[item].nombres=this.form.value.nombres;
        this.miPortfolio[item].apellido=this.form.value.apellido;
        this.miPortfolio[item].ocupacion=this.form.value.ocupacion;
        this.miPortfolio[item].localidad=this.form.value.localidad;
        this.miPortfolio[item].provincia=this.form.value.provincia;
        this.miPortfolio[item].pais=this.form.value.pais;
        this.miPortfolio[item].mail=this.form.value.mail;
        this.miPortfolio[item].celular=this.form.value.celular;
        }
  }

  cambios(){
    
    Swal.fire({
      icon: 'success',
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



modificarPortada(item: number){
  this.miPortfolio[item].image_portada='portada.jpg';
  //this.closebutton.nativeElement.click();
}

modificarPerfil(item: number){
  this.miPortfolio[item].image_perfil='avatar.jpg';
  //this.closebutton.nativeElement.click();
}


cambiarFotoPerfil(index: number){
  Swal.fire({
    title: 'Cambiar Perfil',
    imageUrl: '../../../assets/'+this.miPortfolio[index].image_perfil,
    input: 'file',
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: 'Custom image',
    showCancelButton: true,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#dc3545',
    confirmButtonText: "Editar",
    cancelButtonText: "Cancelar",
  }).then(resultado => {
    if (resultado.value) {
        // Hicieron click en "Editar"
        this.modificarPerfil(index);
    } else {
        // Hicieron click en "Cancelar"
        this.sincambios();
    }
});
}

cambiarFotoPortada(index: number){
  Swal.fire({
    title: 'Cambiar Portada',
    imageUrl: '../../../assets/'+this.miPortfolio[index].image_portada,
    input: 'file',
    imageWidth: 500,
    imageHeight: 200,
    imageAlt: 'Custom image',
    showCancelButton: true,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#dc3545',
    confirmButtonText: "Editar",
    cancelButtonText: "Cancelar",
  }).then(resultado => {
    if (resultado.value) {
        // Hicieron click en "Editar"
        //this.modificarPortada(index,Swal.getInput()?.value.slice(12));
        //let nombre =  Swal.getInput()?.value.slice(12).valueOf();
        //alert(nombre)
        this.modificarPortada(index)
    } else {
        // Hicieron click en "Cancelar"
        this.sincambios();
    }
});

}




}
