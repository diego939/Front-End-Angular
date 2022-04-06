import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";


@Component({
  selector: 'app-seccion-a-cerca-de',
  templateUrl: './seccion-a-cerca-de.component.html',
  styleUrls: ['./seccion-a-cerca-de.component.css']
})

export class SeccionACercaDeComponent implements OnInit {
  
  @ViewChild('closebutton') closebutton: any;

  form: FormGroup;

  miPortfolio: any;

  logueado: any;

  constructor(private datosPortfolio: PortfolioService, private formBuilder: FormBuilder,private authService: AuthService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });

    this.form= this.formBuilder.group({
      sobre_mi: '',
   })

   this.logueado = this.authService;
  }

  ngOnInit(): void {
  }
  
  editarInformacion(item:number){
    this.miPortfolio.Persona[item].sobre_mi=this.form.value.sobre_mi;

  }

}
