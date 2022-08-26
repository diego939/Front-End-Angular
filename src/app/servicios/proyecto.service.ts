import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectoURL = 'https://almirondiegodavidbackendap.herokuapp.com/proyecto/';
  //proyectoURL = 'http://localhost:8080/proyecto/';

  constructor(private http: HttpClient) { }

  public mostrarProyecto(): Observable<any>{
    return this.http.get(this.proyectoURL+'ver');
  }

  public editarProyecto(proyecto: Proyecto): Observable<any>{
    return this.http.put<any>(this.proyectoURL+'editar',proyecto);
  }

  public crearProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>(this.proyectoURL + 'new', proyecto);
  }

  public borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(this.proyectoURL + `delete/${id}`);
  }

  public buscarProyecto(id: number): Observable<any> {
    return this.http.get<any>(this.proyectoURL + `buscar/${id}`);
  }
}
