import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";

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
      nombreHabilidad: '',
      progreso: ''
   })

   this.formHabilidadAdd= this.formBuilder.group({
    nombreHabilidad: '',
    progreso: ''
    })

  this.formHabilidadDelete= this.formBuilder.group({
    nombreHabilidad: '',
    progreso: ''
  })

  this.formTecnologiaEdit= this.formBuilder.group({
    nombreTecnologia: '',
    nivel: ''
  })

  this.formTecnologiaAadd= this.formBuilder.group({
    nombreTecnologia: '',
    nivel: ''
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

  editarHabilidad(item:number){
    this.closebuttonEditarHabilidad.nativeElement.click();
    this.miPortfolio.HabilidadesBlandas[item].nombreDeHabilidad=this.formHabilidadEdit.value.nombreHabilidad;
    this.miPortfolio.HabilidadesBlandas[item].progreso=this.formHabilidadEdit.value.progreso;
    alert('Se editó la habilidad: "'+ this.miPortfolio.HabilidadesBlandas[item].nombreHabilidad + '"');
  }

  nombreHabilidadSelect: string = '';
  progresoSelect: string = '';
  auxIndex: number = 0;
  mostrarHabilidad(item: number){
    this.auxIndex = item;
    this.nombreHabilidadSelect= this.miPortfolio.HabilidadesBlandas[this.auxIndex].nombreHabilidad;
    this.progresoSelect=this.miPortfolio.HabilidadesBlandas[this.auxIndex].progreso;
  } 


  nombreDeHabilidad: string = "";
  progresoDeHabilidad: string = "";
  agregarHabilidad(){

    this.closebuttonAddHabilidad.nativeElement.click();

    this.nombreDeHabilidad = this.formHabilidadAdd.value.nombreHabilidad;
    this.progresoDeHabilidad= this.formHabilidadAdd.value.progreso;

    this.miPortfolio.HabilidadesBlandas.push({nombreHabilidad: this.nombreDeHabilidad, progreso: this.progresoDeHabilidad});
    alert('Se agregó una nueva habilidad a tu lista');
  }

  eliminarHabilidad(indice: number){
    this.closebuttonEliminarHabilidad.nativeElement.click();
    alert('Se eliminó la habilidad: "'+ this.miPortfolio.HabilidadesBlandas[indice].nombreHabilidad + '"');
    this.miPortfolio.HabilidadesBlandas.splice(indice, 1);
  }

  // CRUD DE TECNOLOGÍAS

  editarTecnologia(item:number){
    this.closebuttonEditarTecnologia.nativeElement.click();
    this.miPortfolio.MisTecnologias[item].nombreTecnologia=this.formTecnologiaEdit.value.nombreTecnologia;
    this.miPortfolio.MisTecnologias[item].nivel=this.formTecnologiaEdit.value.nivel;
    alert('Se editó la tecnología: "'+ this.miPortfolio.MisTecnologias[item].nombreTecnologia + '"');
  }

  nombreTecnologiaSelect: string = '';
  nivelSelect: string = '';
  //auxIndex: number = 0; //ya se definió para habilidades un auxiliar
  mostrarTecnologia(item: number){
    this.auxIndex = item;
    this.nombreTecnologiaSelect= this.miPortfolio.MisTecnologias[this.auxIndex].nombreTecnologia;
    this.nivelSelect=this.miPortfolio.MisTecnologias[this.auxIndex].nivel;
  } 


  nombreDeTecnologia: string = "";
  nivelDeTecnologia: string = "";
  agregarTecnologia(){

    this.closebuttonAddTecnologia.nativeElement.click();

    this.nombreDeTecnologia = this.formTecnologiaAadd.value.nombreTecnologia;
    this.nivelDeTecnologia = this.formTecnologiaAadd.value.nivel;

    this.miPortfolio.MisTecnologias.push({nombreTecnologia: this.nombreDeTecnologia, nivel: this.nivelDeTecnologia});
    alert('Se agregó una nueva tecnología a tu lista');
  }

  eliminarTecnologia(indice: number){
    this.closebuttonEliminarTecnologia.nativeElement.click();
    alert('Se eliminó la tecnología: "'+ this.miPortfolio.MisTecnologias[indice].nombreTecnologia+ '"');
    this.miPortfolio.MisTecnologias.splice(indice, 1);
  }

}
