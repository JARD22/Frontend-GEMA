import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {

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



  constructor(private http:HttpClient) {}

listaColegios(){
  return this.http.get(`${this.url}/colegios/lista-colegios/0`,this.headers)
}

nuevoColegio(formData){
return this.http.post(`${this.url}/colegios/nuevo-colegio`,formData,this.headers)
}


actualizarColegio(formData){
  return this.http.patch(`${this.url}/colegios/actualizar-colegio`,formData,this.headers)
}

buscarColegio(termino){
  return this.http.get(`${this.url}/colegios/busqueda/${termino}`)
}


}
