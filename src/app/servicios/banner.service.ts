import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Banner } from '../modelos/banner';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class BannerService {
  BannerURL = 'http://localhost:8080/banner/';


  constructor(private httpClient: HttpClient) { }

  public cargar(): Observable<Banner[]> {
    return this.httpClient.get<Banner[]>(this.BannerURL + 'cargar', cabecera);
  }

  public editar(banner: Banner): Observable<any> {
    return this.httpClient.put<any>(this.BannerURL + `editar`, banner, cabecera);
  }

}
