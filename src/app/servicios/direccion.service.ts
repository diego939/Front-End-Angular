import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direccion } from 'src/app/model/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  direccionURL = 'https://almirondiegodavidbackendap.herokuapp.com/direccion/';

  constructor(private http: HttpClient) { }

  public mostrarDireccion(): Observable<any>{
    return this.http.get(this.direccionURL+'lista');
  }

  public editarDireccion(nivel: Direccion): Observable<any>{
    return this.http.put<any>(this.direccionURL+'editar',nivel);
  }

  //Aunque no lo uso lo defino para poder probar todos las peticiones
  public crearDireccion(nivel: Direccion): Observable<any> {
    return this.http.post<any>(this.direccionURL + 'new', nivel);
  }

  //Aunque no lo uso lo defino para poder probar todos las peticiones
  public borrarDireccion(id: number): Observable<any> {
    return this.http.delete<any>(this.direccionURL + `delete/${id}`);
  }

  //Aunque no lo uso lo defino para poder probar todos las peticiones
  public buscarDireccion(id: number): Observable<any> {
    return this.http.get<any>(this.direccionURL + `buscar/${id}`);
  }
}
