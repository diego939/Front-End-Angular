import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TokenService } from 'src/app/servicios/token.service';
import { Persona } from '../../model/persona';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-seccion-a-cerca-de',
  templateUrl: './seccion-a-cerca-de.component.html',
  styleUrls: ['./seccion-a-cerca-de.component.css']
})

export class SeccionACercaDeComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('llamarModalacercaDe') llamarModalacercaDe: any;

  form: FormGroup;

  miPortfolio: any;

  constructor(
    private datosPortfolio: PortfolioService, 
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router
    ) { 

    this.form= this.formBuilder.group({
      sobreMi: ['', [Validators.required, Validators.minLength(40)]],
   })

  }

  ngOnInit(): void {
    
    this.datosPortfolio.mostrarPersona().subscribe(data => {
      this.miPortfolio = data;
    });


    if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
    }
  }

  get SobreMi(){
    return this.form.get("sobreMi");
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
    //Si no se realiza ninguna modificación mostrará una alerta Sin cambios
    if( this.miPortfolio[item].sobreMi==this.form.value.sobreMi){
      this.sincambios()
    }else{
      this.cambios()
    //Se prepara el objeto Persona para editar
    let persona1: Persona = {
      "id": this.miPortfolio[item].id,
      "nombres": this.miPortfolio[item].nombres,
			"apellido": this.miPortfolio[item].apellido,
			"nacionalidad": this.miPortfolio[item].nacionalidad,
			//"pais": this.miPortfolio[item].pais,
      //"provincia": this.miPortfolio[item].provincia,
      //"localidad": this.miPortfolio[item].localidad,
			"email": this.miPortfolio[item].email,
			"celular": this.miPortfolio[item].celular,
			"sobreMi": this.form.value.sobreMi,
      "ocupacion": this.miPortfolio[item].ocupacion,
			"imagePortada": this.miPortfolio[item].imagePortada,
			"imagePerfil": this.miPortfolio[item].imagePerfil
    }
    //Invocamos a Editar para hacer la edición
    this.datosPortfolio.editarPersona(persona1).subscribe(
      data => {
        //this.router.navigate(['/']);
      }
    );
    //Se refresca el sitio para ver los cambios
          setTimeout(function(){
            location.href ='/';
          }, 1000);

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
