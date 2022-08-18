import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidad } from 'src/app/model/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habilidadURL = 'https://almirondiegodavidbackendap.herokuapp.com/habilidad/';

  constructor(private http: HttpClient) { }

  public mostrarHabilidad(): Observable<any>{
    return this.http.get(this.habilidadURL+'ver');
  }

  public editarHabilidad(habilidad: Habilidad): Observable<any>{
    return this.http.put<any>(this.habilidadURL+'editar',habilidad);
  }

  public crearHabilidad(habilidad: Habilidad): Observable<any> {
    return this.http.post<any>(this.habilidadURL + 'new', habilidad);
  }

  public borrarHabilidad(id: number): Observable<any> {
    return this.http.delete<any>(this.habilidadURL + `delete/${id}`);
  }

  public buscarHabilidad(id: number): Observable<any> {
    return this.http.get<any>(this.habilidadURL + `buscar/${id}`);
  }
}
