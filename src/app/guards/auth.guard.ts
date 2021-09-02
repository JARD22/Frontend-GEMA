import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UsuarioService } from '../@admin/services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService:UsuarioService,
                private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.usuarioService.renovarToken()
            .pipe(
              tap(autenticado=>{
                console.log(autenticado)
                if (!autenticado) {
                  this.router.navigateByUrl('/login')
                } 
              })
            )
  }
  
}
