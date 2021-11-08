import { Component, OnInit } from '@angular/core';
import { UsuarioS } from 'src/app/models/interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion-cuenta',
  templateUrl: './configuracion-cuenta.component.html',
  styles: [
  ]
})
export class ConfiguracionCuentaComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
              private fb:FormBuilder,
              private router:Router) { }

  usuario:UsuarioS;
  formEnviado:boolean=false;
  contrasenaIncorrecta:boolean=false;

  ngOnInit(): void {
    this.usuario=this.usuarioService.usuario
  }

  public cambioPassForm= this.fb.group({
    contrasenaNueva:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$"),Validators.maxLength(25),Validators.minLength(8)]],
    contrasenaAnterior:['',[Validators.required,Validators.maxLength(25),Validators.minLength(4)]],
    confirmarContrasena:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$"),Validators.maxLength(25),Validators.minLength(8)]]
  });



  cambioPwd(){

      this.formEnviado=true
      
      const password1:string= this.cambioPassForm.get('contrasenaNueva').value
      const password2:string= this.cambioPassForm.get('confirmarContrasena').value
  
      if((password1===password2) && this.cambioPassForm.valid){
        this.usuarioService.cambiarPwd(this.cambioPassForm.value).subscribe(
          (resp:any)=>{
            Swal.fire({
              icon:'success',
              title:'Hecho',
              text:resp.msg,
              timer: 3000
            });
            this.formEnviado=false;
           
            this.cambioPassForm.reset();
          },(error:any)=>{
            console.log(error);
            Swal.fire({
              icon:'error',
              title: "Error",
              text: error.error.msg
            });
            this.formEnviado=false;
          this.contrasenaIncorrecta=true
          }
        )
      } else {
        console.log(this.cambioPassForm.value)
        // Swal.fire({
        //   icon:'warning',
        //   title: "Cuidado",
        //   text: 'Formulario no válido'
        // });
        this.formEnviado=false;
      }
    } 

    contrasenasNoValidas():boolean{
      let password1= this.cambioPassForm.get('contrasenaNueva').value
      let password2= this.cambioPassForm.get('confirmarContrasena').value
      
      if(this.cambioPassForm.get('confirmarContrasena').dirty && (password1!=password2)){
        return true
      }else{
        return false
      }
    }
  

}

