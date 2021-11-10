import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }


  private url = environment.url

  get token():string{
    return sessionStorage.getItem('auth')
      }
      //HEADERS OPTIONS
      headerOptions: any = null;
    
      get headers(){
        return {headers:{
          'x-token': this.token
        }}
      }

  directorio(anio,curso,seccion){
    return this.http.get(`${this.url}/reportes/directorio/${anio}/${curso}/${seccion}`)
  }


  matriculaDiaria(anio){
    return this.http.get(`${this.url}/reportes/matricula-diaria/${anio}`)
  }



}
