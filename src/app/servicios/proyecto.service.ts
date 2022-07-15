import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Proyecto } from '../modelos/proyecto';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectoURL = 'http://localhost:8080/proyecto/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.proyectoURL + 'lista', cabecera);
  }
  public obtenerProyecto (id: number): Observable <Proyecto>{
    return this.httpClient.get<any>(this.proyectoURL + '${id}');
  }
  
  public crear(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.proyectoURL + 'nuevo', proyecto, cabecera);
  }

  public editar(proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any>(this.proyectoURL +'editar', proyecto, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyectoURL + `borrar/${id}`, cabecera);
  }

}
