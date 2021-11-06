import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../@admin/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(private usuarioService:UsuarioService,
              private fb:FormBuilder,
              private router:Router) { }

  loginForm:FormGroup = this.fb.group({
    usuario:[''||localStorage.getItem('correo'),[Validators.required,Validators.email]],
    contrasena:['',Validators.required],
    recordarme:[false]
  });

login(){
this.usuarioService.login(this.loginForm.value).subscribe((resp:any)=>{
  if (this.loginForm.get('recordarme').value){
    localStorage.setItem('correo',this.loginForm.get('usuario').value)
  }else{
    localStorage.removeItem('correo')
  }
  this.router.navigateByUrl('admin')
},(error:any)=>{Swal.fire('Error',error.error.msg,'error')})
}  
  

}
