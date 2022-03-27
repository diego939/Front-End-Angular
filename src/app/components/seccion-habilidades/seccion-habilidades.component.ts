import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-seccion-habilidades',
  templateUrl: './seccion-habilidades.component.html',
  styleUrls: ['./seccion-habilidades.component.css']
})
export class SeccionHabilidadesComponent implements OnInit {


  opciones = ['regular','básico','bueno','muy bueno','excelente'];

  miPortfolio: any;

  constructor(private datosPortfolio: PortfolioService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
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

}
