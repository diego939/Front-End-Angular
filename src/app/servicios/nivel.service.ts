import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivel } from 'src/app/model/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  nivelURL = 'http://localhost:8080/nivel/';

  constructor(private http: HttpClient) { }

  public mostrarNivel(): Observable<any>{
    return this.http.get(this.nivelURL+'ver');
  }

  public editarNivel(nivel: Nivel): Observable<any>{
    return this.http.put<any>(this.nivelURL+'editar',nivel);
  }

  public crearNivel(nivel: Nivel): Observable<any> {
    return this.http.post<any>(this.nivelURL + 'new', nivel);
  }

  public borrarNivel(id: number): Observable<any> {
    return this.http.delete<any>(this.nivelURL + `delete/${id}`);
  }

  public buscarNivel(id: number): Observable<any> {
    return this.http.get<any>(this.nivelURL + `buscar/${id}`);
  }
}
