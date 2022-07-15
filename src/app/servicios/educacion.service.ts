import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Educacion } from '../modelos/educacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EducacionService {
  educacionURL = 'http://localhost:8080/educacion/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.educacionURL + 'lista', cabecera);
  }
  public obtenerEducacion (id: number): Observable <Educacion>{
    return this.httpClient.get<Educacion>(this.educacionURL + '${id}');
  
  }

  public crear(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.post<Educacion>(this.educacionURL + 'nueva', educacion, cabecera);
  }

  public editar(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.put<Educacion>(this.educacionURL + 'editar', educacion, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.educacionURL + `borrar/${id}`, cabecera);
  }

}
