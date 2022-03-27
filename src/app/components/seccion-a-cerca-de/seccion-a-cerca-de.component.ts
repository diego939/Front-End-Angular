import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-seccion-a-cerca-de',
  templateUrl: './seccion-a-cerca-de.component.html',
  styleUrls: ['./seccion-a-cerca-de.component.css']
})
export class SeccionACercaDeComponent implements OnInit {
  
  miPortfolio: any;

  constructor(private datosPortfolio: PortfolioService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

  ngOnInit(): void {
  }

  editarInformacion(){
    this.miPortfolio.Persona.sobre_mi = this.miPortfolio.Persona.sobre_mi;

  }

}
