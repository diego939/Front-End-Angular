import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-a-cerca-de',
  templateUrl: './seccion-a-cerca-de.component.html',
  styleUrls: ['./seccion-a-cerca-de.component.css']
})
export class SeccionACercaDeComponent implements OnInit {
  infoUsuario: string = "Hola, mi nombre es Diego David Almirón, soy argentino, vivo en la ciudad de Corrientes. Estoy capacitandome en el mundo IT que es lo que más me gusta, la programación es algo que me llamó mucho la atención en cómo podemos resolver problemas y diseñar sistemas de una amplia variedad de maneras y por eso estoy acá buscando seguir teniendo conocimientos a cerca de este mundo tecnológico que es muy cambiante y a la vez hermoso. En este perfil describiré mis habilidades que adquirí a lo largo de los años, mis estudios realizados, también las tecnologías y los lenguajes tanto de back end cómo frond end y mis niveles de manejo en ellos, cómo así también habilidades blandas que son muy importantes para el trabajo en equipo e fundamentales para los entornos de desarrollo de las empresas, también detallaré los diferentes proyectos que desarrollé en la programación. Este apartado fue creado con el fin de obtener una certificación de desarrollador fullstack junior de la segunda etapa del plan Argentina programa (Yo Programo) que consiste en desarrollar un Portafolio web para que tengamos una carta de presentción que nos ayudará a actualizar nuestro perfil profesional. Desde ya muchas gracias por haber entrado a ver mi humilde perfil, saludos cordiales...";
  
  constructor() { }

  ngOnInit(): void {
  }

  editarInformacion(){
    this.infoUsuario = this.infoUsuario;

  }

}
