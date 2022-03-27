import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  miPortfolio: any;
  

  constructor(private datosPortfolio: PortfolioService) { 
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

  ngOnInit(): void {
  }
  // variables y funciones a modo de prueba
  /*titulos: Array<{ instituto: string, titulo: string }> = [
    {instituto: 'UTN-FBRA cursos a distancia', titulo: 'Desarrollo Web'},
    {instituto: 'Educacion IT', titulo: 'Desarrollo fullstack con java'},
    {instituto: 'UNNE - Facultad de Ciencias Exactas ', titulo: 'Licenciado en Sistemas de información'}
  ];

  experiencias: Array<{ puesto: string, empresa: string, descripcion: string, anioIngreso: string, anioEgreso: string}> = [
    { puesto: 'Freelance full stack developer', 
      empresa: 'Bruno Gas', 
      descripcion: 'Se desarrolló una aplicación web que administre las ventas de una tienda de artículos de gas. controlando el stock y realice pedidos de productos a través de la web. El proyecto fue realizado en el framework Codeigniter, con lenguajes JavaScript y PHP para el bak end', 
      anioIngreso: 'ene 2020', 
      anioEgreso: 'jul 2020', },

    { puesto: 'Operador Informático', 
      empresa: 'Soluciones PC', 
      descripcion: 'Instalación de sistemas operativos, backup y mantenimiento de PC. ', 
      anioIngreso: 'dic 2018', 
      anioEgreso: 'jul 2019', }
  ];


  certificados: Array<{ nombre: string, foto: string }> = [
    {nombre: 'Argentina Programa Yo Programo', foto: 'argentina_programa_octubre_diciembre_2021-1.png'},
    {nombre: 'Bases De Datos SQL', foto: 'CertificacionBaseDeDatos-1.png'},
    {nombre: 'Java Hibernate', foto: 'certificado Java Hibernate-1.png'},
    {nombre: 'Desarrollo fullstack con Java', foto: 'CertificadoDigitalers2021-1.png'},
    {nombre: 'Git', foto: 'certificadoGit-1.png'},
    {nombre: 'Desarrollo Web', foto: 'CertificadoUTN-1.png'},
    {nombre: 'Bases De Datos Oracle', foto: 'Diego David Almirón-Oracle-1.png'},
    {nombre: 'Seguridad Informática', foto: 'Diego-David Almirón-Seguridad Informática-1.png'},
    {nombre: 'Fundamentos Web Html', foto: 'Fundamentos Web certificado-1.png'},
    {nombre: 'Java Para no Programadores', foto: 'Java para no programadores certificado-1.png'},
    {nombre: 'Java Spring boot', foto: 'Java Spring certificado-1.png'},
    {nombre: 'Java Standard Web Programming', foto: 'Java Standard Web Programming, J2SE Certificado-1.png'},
    {nombre: 'Javascript desde cero', foto: 'Javascript desde cero certificado-1.png'},
    {nombre: 'ReactJS', foto: 'ReactJS Certificado-1.png'}
  ];

  editarTitulo(info: number){
    this.titulos[info].instituto = prompt('Nombre del instituto', this.titulos[info].instituto)+'';
    this.titulos[info].titulo = prompt('Titulo', this.titulos[info].titulo)+'';
  }
  
  
  eliminarTitulo(indice: number){
    alert('Se eliminó el Título: "'+ this.titulos[indice].titulo + '"');
    this.titulos.splice(indice, 1);
  }

  agregarTitulo(){
    let nombreInstituto: string = "";
    let tituloInstituto: string = "";
    nombreInstituto = prompt('Nombre del instituto')+'';
    tituloInstituto = prompt('Titulo')+'';
 

    this.titulos.push({instituto: nombreInstituto, titulo: tituloInstituto});
    alert('Se agregó un nuevo Instituto a tu lista');
  }


  fotoSelect: string = '';
  nombreSelect: string = '';
  mostrarCertificado(indice: number){
    this.fotoSelect =  this.certificados[indice].foto;
    this.nombreSelect = this.certificados[indice].nombre;
  }*/

  fotoSelect: string = '';
  nombreSelect: string = '';
  mostrarCertificado(indice: number){
    this.fotoSelect =  this.miPortfolio.Certificados[indice].foto;
    this.nombreSelect = this.miPortfolio.Certificados[indice].nombre;
  }

}
