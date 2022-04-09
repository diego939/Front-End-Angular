import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  saludo: string = 'Bienvenido.....!!!';

  constructor() { }

  ngOnInit(): void {
  }

}
