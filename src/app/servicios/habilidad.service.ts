import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Habilidad } from '../modelos/habilidad';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  habilidadURL = 'http://localhost:8080/habilidad/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Habilidad[]> {
    return this.httpClient.get<Habilidad[]>(this.habilidadURL + 'lista', cabecera);
  }

  public obtenerHabilidad (id: number): Observable <any>{
    return this.httpClient.get<any>(this.habilidadURL + '${id}');
  }

  public crear(habilidad: Habilidad): Observable<any> {
    return this.httpClient.post<any>(this.habilidadURL + 'nueva', habilidad, cabecera);
  }

  public editar(habilidad: Habilidad): Observable<any> {
    return this.httpClient.put<any>(this.habilidadURL + 'editar', habilidad, cabecera);
  }
  
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.habilidadURL + `borrar/${id}`, cabecera);
  }

}
