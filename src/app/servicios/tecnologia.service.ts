import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnologia } from 'src/app/model/tecnologia';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  tecnologiaURL = 'http://localhost:8080/tecnologia/';

  constructor(private http: HttpClient) { }

  public mostrarTecnologia(): Observable<any>{
    return this.http.get(this.tecnologiaURL+'ver');
  }

  public editarTecnologia(tecnologia: Tecnologia): Observable<any>{
    return this.http.put<any>(this.tecnologiaURL+'editar',tecnologia);
  }

  public crearTecnologia(tecnologia: Tecnologia): Observable<any> {
    return this.http.post<any>(this.tecnologiaURL + 'new', tecnologia);
  }

  public borrarTecnologia(id: number): Observable<any> {
    return this.http.delete<any>(this.tecnologiaURL + `delete/${id}`);
  }

  public buscarTecnologia(id: number): Observable<any> {
    return this.http.get<any>(this.tecnologiaURL + `buscar/${id}`);
  }
}
