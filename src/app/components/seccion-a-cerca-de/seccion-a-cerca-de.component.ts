import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-seccion-a-cerca-de',
  templateUrl: './seccion-a-cerca-de.component.html',
  styleUrls: ['./seccion-a-cerca-de.component.css']
})

export class SeccionACercaDeComponent implements OnInit {
  
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('llamarModalacercaDe') llamarModalacercaDe: any;

  form: FormGroup;

  miPortfolio: any;

  logueado: any;


  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 

    this.form= this.formBuilder.group({
      sobre_mi: ['', [Validators.required, Validators.minLength(40)]],
   })

  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data.Persona);
      this.miPortfolio = data.Persona;
    });

    this.logueado = this.authService;
  }

  get SobreMi(){
    return this.form.get("sobre_mi");
   }

   get SobreMiValid(){
    return this.SobreMi?.touched && !this.SobreMi?.valid;
  }


   sobreMiEnviar(event: Event, item:number){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
        this.editarInformacion(item);

    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
      this.llamarModalacercaDe.nativeElement.click();
    }
 
  }
  
  editarInformacion(item:number){

    if( this.miPortfolio[item].sobre_mi==this.form.value.sobre_mi){
      this.sincambios()
    }else{
      this.cambios()
    this.miPortfolio[item].sobre_mi=this.form.value.sobre_mi;
    }
  }

  sincambios(){
    
    Swal.fire({
      icon: 'info',
      title: 'Sin cambios!!!',
      showConfirmButton: false,
      timer: 4000
})
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

}
