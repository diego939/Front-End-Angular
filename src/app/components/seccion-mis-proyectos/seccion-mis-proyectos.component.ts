import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-seccion-mis-proyectos',
  templateUrl: './seccion-mis-proyectos.component.html',
  styleUrls: ['./seccion-mis-proyectos.component.css']
})
export class SeccionMisProyectosComponent implements OnInit {

  miPortfolio: any;

  constructor(private datosPortfolio: PortfolioService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

  ngOnInit(): void {
  }

}
