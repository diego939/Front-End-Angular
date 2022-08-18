import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  experienciaURL = 'https://almirondiegodavidbackendap.herokuapp.com/experiencia/';

  constructor(private http: HttpClient) { }

  public mostrarExperiencia(): Observable<any>{
    return this.http.get(this.experienciaURL+'ver');
  }

  public editarExperiencia(experiencia: Experiencia): Observable<any>{
    return this.http.put<any>(this.experienciaURL+'editar',experiencia);
  }

  public crearExperiencia(experiencia: Experiencia): Observable<any> {
    return this.http.post<any>(this.experienciaURL + 'new', experiencia);
  }

  public borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(this.experienciaURL + `delete/${id}`);
  }

  public buscarExperiencia(id: number): Observable<any> {
    return this.http.get<any>(this.experienciaURL + `buscar/${id}`);
  }

}
