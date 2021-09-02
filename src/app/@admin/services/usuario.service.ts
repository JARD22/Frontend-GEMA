import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../models/interfaces/login-form.interface';
import {map, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private base_url:string = environment.url;
  constructor(private http:HttpClient) { 

      }

 login(formData:LoginForm){
  return this.http.post(`${this.base_url}/login/`,formData)
  .pipe(
    tap((resp:any)=>{
      sessionStorage.setItem('auth',resp.token)
    })
    
  )
 }  
 
 renovarToken():Observable<boolean>{
   const token = sessionStorage.getItem('auth')||''

   return this.http.get(`${this.base_url}/login/renovar`,{headers:{'x-token':token}})
            .pipe(
              tap((resp:any)=>{
                sessionStorage.setItem('auth',resp.token)
              }),
              map(resp=>true)
            )
            
 }

}
