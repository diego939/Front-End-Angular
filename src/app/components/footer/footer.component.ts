import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Persona } from '../../model/persona';
import { DireccionService } from "src/app/servicios/direccion.service";
import { Direccion } from "src/app/model/direccion";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  miDireccion: any;

  miContacto: any;

  constructor(private datosDeContacto: PortfolioService, private datosDireccion: DireccionService) { }

  ngOnInit(): void {
    this.datosDeContacto.mostrarPersona().subscribe(data => {
      this.miContacto = data;
    });

    this.datosDireccion.mostrarDireccion().subscribe(data => {
      this.miDireccion = data;
    });
    
  }

}
