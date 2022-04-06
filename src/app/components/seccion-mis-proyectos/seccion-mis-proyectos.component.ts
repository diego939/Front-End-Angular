import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";

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
      nombreProyecto: '',
      descripcionProyecto: ''
   })

   this.formProyectoAdd= this.formBuilder.group({
    nombreProyecto: '',
    descripcionProyecto: ''
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

  editarProyecto(item:number){
    this.closebuttonEditarProyecto.nativeElement.click();
    this.miPortfolio.MisProyectos[item].nombreProyecto=this.formProyectoEdit.value.nombreProyecto;
    this.miPortfolio.MisProyectos[item].descripcionProyecto=this.formProyectoEdit.value.descripcionProyecto;
    alert('Se editó el proyecto: "'+ this.miPortfolio.MisProyectos[item].nombreProyecto + '"');
  }

  nombreProyectoSelect: string = '';
  descripcionProyectoSelect: string = '';
  auxIndex: number = 0;
  mostrarProyecto(item: number){
    this.auxIndex = item;
    this.nombreProyectoSelect= this.miPortfolio.MisProyectos[this.auxIndex].nombreProyecto;
    this.descripcionProyectoSelect=this.miPortfolio.MisProyectos[this.auxIndex].descripcionProyecto;
  } 


  nombreDeProyecto: string = "";
  descripcionDeProyecto: string = "";
  agregarProyecto(){

    this.closebuttonAddProyecto.nativeElement.click();

    this.nombreDeProyecto = this.formProyectoAdd.value.nombreProyecto;
    this.descripcionDeProyecto= this.formProyectoAdd.value.descripcionProyecto;

    this.miPortfolio.MisProyectos.push({nombreProyecto: this.nombreDeProyecto, descripcionProyecto: this.descripcionDeProyecto});
    alert('Se agregó un nuevo proyecto a tu lista');
  }

  eliminarProyecto(indice: number){
    this.closebuttonEliminarProyecto.nativeElement.click();
    alert('Se eliminó el proyecto: "'+ this.miPortfolio.MisProyectos[indice].nombreProyecto + '"');
    this.miPortfolio.MisProyectos.splice(indice, 1);
  }

}
