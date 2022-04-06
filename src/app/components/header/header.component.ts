import { Component, getNgModuleById, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
      nombres: '',
      apellido: '',
      ocupacion: '',
      localidad: '',
      provincia: '',
      pais: '',
      mail: '',
      celular:''
   })

   this.logueado = this.authService;
  }

  ngOnInit(): void {
  }

  editarNombre(item:number){
    this.miPortfolio.Persona[item].nombres = prompt('Nombres:',this.miPortfolio.Persona[item].nombres)+'';
    this.miPortfolio.Persona[item].apellido = prompt('apellido',this.miPortfolio.Persona[item].apellido)+'';
  }

  modificarDatos(item:number) {

        this.closebutton.nativeElement.click();
        this.miPortfolio.Persona[item].nombres=this.form.value.nombres;
        this.miPortfolio.Persona[item].apellido=this.form.value.apellido;
        this.miPortfolio.Persona[item].ocupacion=this.form.value.ocupacion;
        this.miPortfolio.Persona[item].localidad=this.form.value.localidad;
        this.miPortfolio.Persona[item].provincia=this.form.value.provincia;
        this.miPortfolio.Persona[item].pais=this.form.value.pais;
        this.miPortfolio.Persona[item].mail=this.form.value.mail;
        this.miPortfolio.Persona[item].celular=this.form.value.celular;
  }

  

}
