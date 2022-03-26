import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreUsuario: string = "Diego Almirón";
  localidad: string = "Corrientes";
  provincia: string = "Corrientes"
  pais : string = "Argentina";
  correo: string = "diegoalmiron@gmail.com";
  celular: string = "3794315483";

  constructor() { }

  ngOnInit(): void {
  }

  editarNombre():void{
    this.nombreUsuario = prompt('ingrese nombre de usuario', this.nombreUsuario)+'';
  }

  editarRegion():void{
    this.pais = prompt('ingrese nuevo pais', this.pais)+'';
    this.localidad = prompt('ingrese nueva provincia', this.localidad)+'';
  }

  editarMisDatos(m_localidad:string, m_pais:string, m_correo: string){
    this.pais = m_pais;
    this.correo = m_correo;
    this.localidad = m_localidad;
  }

}
