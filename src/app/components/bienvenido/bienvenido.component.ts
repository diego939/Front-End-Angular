import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  //Este componente unicamente se utilizó para hacer una prueba pero no cumple ninguna función en el sistema
  saludo: string = 'Bienvenido.....!!!';

  constructor() { }

  ngOnInit(): void {
  }

}
