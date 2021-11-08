import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginForm } from '../../models/interfaces/login-form.interface';
import {map, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuarioS } from '../../models/interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

public usuario:UsuarioS;


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
  private base_url:string = environment.url;
  constructor(private http:HttpClient) { 

      }



  // Recibe un    
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

                const {id,correo,nombre,intentos}=resp.userObj
                this.usuario = new Usuario(id,correo,nombre,intentos)
              }),
              map(resp=>true)
            )
            
 }

 listaUsuarios(offset:number){
  return this.http.get(`${this.base_url}/usuarios/lista/${offset}`,this.headers)
 }

listaEstados(){
  return  this.http.get(`${this.base_url}/usuarios/estados`,this.headers)
}

activarUsuario(formData){
  return  this.http.post(`${this.base_url}/usuarios/activar-usuario`,formData,this.headers)
}

recuperarContrasena(correo){
  return this.http.post(`${this.base_url}/usuarios/recuperar-contrasena`,correo)
}

cambiarPwd(formData:any){
return this.http.post(`${this.base_url}/usuarios/actualizar-contrasena`,formData,this.headers)
}
};
