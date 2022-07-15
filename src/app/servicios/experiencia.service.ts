import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Experiencia } from '../modelos/experiencia';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

experienciaURL = 'http://localhost:8080/experiencia/'

constructor(private httpClient: HttpClient) { }

public lista(): Observable<Experiencia[]> {
  return this.httpClient.get<Experiencia[]>(this.experienciaURL + 'lista', cabecera);
}


public obtenerExperiencia (id: number): Observable <Experiencia>{
  return this.httpClient.get<Experiencia>(this.experienciaURL + '${id}');
}

public crear(experiencia: Experiencia): Observable<Experiencia> {
  return this.httpClient.post<Experiencia>(this.experienciaURL + 'nueva', experiencia, cabecera);
}

public editar(experiencia: Experiencia): Observable<Experiencia> {
  return this.httpClient.put<Experiencia>(this.experienciaURL + 'editar', experiencia, cabecera);
}

public borrar(id: number): Observable<any> {
  return this.httpClient.delete<any>(this.experienciaURL + `borrar/${id}`, cabecera);
}
}
