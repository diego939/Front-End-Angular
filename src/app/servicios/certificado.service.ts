import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificado } from 'src/app/model/certificado';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  certificadoURL = 'https://almirondiegodavidbackendap.herokuapp.com/certificado/';
  //certificadoURL = 'http://localhost:8080/certificado/';

  constructor(private http: HttpClient) { }

  public mostrarCertificado(): Observable<any>{
    return this.http.get(this.certificadoURL+'ver');
  }

  public editarCertificado(certificado: Certificado): Observable<any>{
    return this.http.put<any>(this.certificadoURL+'editar',certificado);
  }

  public crearCertificado(certificado: Certificado): Observable<any> {
    return this.http.post<any>(this.certificadoURL + 'new', certificado);
  }

  public borrarCertificado(id: number): Observable<any> {
    return this.http.delete<any>(this.certificadoURL + `delete/${id}`);
  }

  public buscarCertificado(id: number): Observable<any> {
    return this.http.get<any>(this.certificadoURL + `buscar/${id}`);
  }

}
