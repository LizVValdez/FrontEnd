import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Encabezado } from '../modelos/encabezado';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EncabezadoService {
  encabezadoURL = 'http://localhost:8080/encabezado/';


  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Encabezado[]> {
    return this.httpClient.get<Encabezado[]>(this.encabezadoURL + 'lista', cabecera);
  }

  public obtenerEducacion (id: number): Observable <Encabezado>{
    return this.httpClient.get<any>(this.encabezadoURL + '${id}');

  }

  public crear(encabezado: Encabezado): Observable<any> {
    return this.httpClient.post<any>(this.encabezadoURL + 'nuevo', encabezado, cabecera);
  }

  public editar(encabezado: Encabezado, id: number): Observable<any> {
    return this.httpClient.put<any>(this.encabezadoURL + `editar/${id}`, encabezado, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.encabezadoURL + `borrar/${id}`, cabecera);
  }

}
