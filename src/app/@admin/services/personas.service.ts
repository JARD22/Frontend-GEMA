import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PantallasRolComponent } from '../pages/pantallas-rol/pantallas-rol.component';
import { Observable } from 'rxjs';
import { PersonaComponent } from '../pages/persona/persona.component';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

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


  listaTipoPersonas(){
    return this.http.get(`${this.url}/personas/tipo-persona`,this.headers);
  }

  PersonaUsuario(formData){
    console.log(formData)
    return this.http.post(`${this.url}/personas/usuario`,formData,this.headers)
  }

  personaFamiliar(formData){
    return this.http.post(`${this.url}/personas/familiar`,formData,this.headers)
  }

  personaAlumno(formData){
    return this.http.post(`${this.url}/personas/alumno`,formData,this.headers)
  }

  listaPersonas(offset:number){
    return this.http.get(`${this.url}/personas/${offset}`,this.headers)
  }

  personaPorId(uid:string){
    return this.http.get(`${this.url}/personas/persona-id/${uid}`,this.headers);
  }

  actualizarFamiliar(formData){
    return this.http.patch(`${this.url}/personas/actualizar-familiar`,formData,this.headers);
  }

}
