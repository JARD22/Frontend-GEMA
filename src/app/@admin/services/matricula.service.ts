import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

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


  constructor(private http: HttpClient) { 
  }


  tiposMatricula(){
    return this.http.get(`${this.url}/matricula/tipos-matricula`)
  }

  listaCursos(){
    return this.http.get(`${this.url}/matricula/cursos`)
  }

  datosAlumno(dni){
    return this.http.get(`${this.url}/matricula/datos-alumno/${dni}`,this.headers)
  }

  datosParentesco(dni){
    return this.http.get(`${this.url}/matricula/datos-parentesco/${dni}`,this.headers)
  }

  nuevaMatricula(formData:any){
   return this.http.post(`${this.url}/matricula/nueva-matricula`,formData,this.headers)
  }

  metricas(anio:any){
    return this.http.get(`${this.url}/matricula/metricas/${anio}`,this.headers)
  }

}
