import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instituto } from 'src/app/model/instituto';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  institutoURL = 'https://almirondiegodavidbackendap.herokuapp.com/instituto/';

  constructor(private http: HttpClient) { }

  public mostrarInstituto(): Observable<any>{
    return this.http.get(this.institutoURL+'ver');
  }

  public editarInstituto(instituto: Instituto): Observable<any>{
    return this.http.put<any>(this.institutoURL+'editar',instituto);
  }

  public crearInstituto(instituto: Instituto): Observable<any> {
    return this.http.post<any>(this.institutoURL + 'new', instituto);
  }

  public borrarInstituto(id: number): Observable<any> {
    return this.http.delete<any>(this.institutoURL + `delete/${id}`);
  }

  public buscarInstituto(id: number): Observable<any> {
    return this.http.get<any>(this.institutoURL + `buscar/${id}`);
  }
  
}
