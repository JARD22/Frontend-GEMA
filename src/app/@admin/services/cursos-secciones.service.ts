import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CursosSeccionesService {

  
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

  constructor(private http:HttpClient) { }


 listaCursos(offset){
   return this.http.get(`${this.url}/cursos/lista-cursos/${offset}`,this.headers);
 } 

 nuevoCurso(formData){
   return this.http.post(`${this.url}/cursos/nuevo-curso`,formData,this.headers)
 }

 actualizarCurso(formData){
   return this.http.patch(`${this.url}/cursos/actualizar-curso`,formData,this.headers)
 }

 buscarCurso(termino){
   return this.http.get(`${this.url}/cursos/buscar-curso/${termino}`,this.headers)
 }

listaSecciones(curso,anio){
  return this.http.get(`${this.url}/cursos/secciones/${curso}/${anio}`,this.headers)
}

}
