import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Persona } from '../modelos/persona';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  personaURL = 'http://localhost:8080/persona/';

constructor(private httpClient: HttpClient) { }

public datos(): Observable<Persona[]> {
  return this.httpClient.get<Persona[]>(this.personaURL + 'datos', cabecera);
}


public obtenerPersona (id: number): Observable <any>{
  return this.httpClient.get<any>(this.personaURL + '${id}');
}

public editar(persona: Persona): Observable<any> {
  return this.httpClient.put<any>(this.personaURL + 'editar', persona, cabecera);
}

}
