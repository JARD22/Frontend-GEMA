import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nueva-persona',
  templateUrl: './nueva-persona.component.html',
  styles: [
  ]
})
export class NuevaPersonaComponent implements OnInit {


       public usuarioForm:FormGroup;
       public familiarForm:FormGroup;
       public alumnoForm:FormGroup;
       
       listaTipoPersona:[]=[];
       public disabled:boolean=false;
       
      public cod_tipo_persona:any='';
       telefonosUsuario:FormArray;
       telefonosFamiliar:FormArray;
      
       formEnviado:boolean=false;

  constructor(private personasService:PersonasService,
              private fb:FormBuilder) { 

                
              
//======================================USUARIO==========================================================
                this.usuarioForm= this.fb.group({
                  cod_tipo_persona:[this.cod_tipo_persona.value,[Validators.required]],
                  dni:['',[Validators.required,Validators.minLength(13),Validators.pattern("^[0-9]{13}$")]],
                  primer_nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                  primer_apellido:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                  segundo_nombre:['',[Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                  segundo_apellido:['',[Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                  nacionalidad:['',[Validators.required,Validators.minLength(6),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                  sexo:['',[Validators.required,Validators.minLength(1)]],
                  fecha_nacimiento:['',[Validators.required]],
                  correo:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.minLength(3)]],
                  direccion:['',[Validators.required,Validators.maxLength(250),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
                  telefonosUsuario:this.fb.array([])
                });

                this.agregartelefonoUsr();

//======================================FIN USUARIO==========================================================                

//======================================ENCARGADO==========================================================              
              this.familiarForm= this.fb.group({
                cod_tipo_persona:[this.cod_tipo_persona.value,[Validators.required]],
                dni:['',[Validators.required,Validators.minLength(13),Validators.pattern("^[0-9]{13}$")]],
                primer_nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                primer_apellido:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                segundo_nombre:['',[Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                segundo_apellido:['',[Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                encargado:[false],
                ocupacion:['',Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,50}$")],
                lugar_trabajo:['',[Validators.required,Validators.minLength(4),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
                escolaridad:['',[Validators.required,Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                nacionalidad:['',[Validators.required,Validators.minLength(6),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
                sexo:['',[Validators.required,Validators.minLength(1)]],
                fecha_nacimiento:['',[Validators.required]],
                direccion:['',[Validators.required,Validators.maxLength(250),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
                crear_grupo:[false],
                grupo:[''],
                telefonosFamiliar:this.fb.array([])
              });

                 this.agregartelefonoF();
//======================================FIN ENCARGADO==========================================================              


//=========================================ALUMNO=============================================================

                this.alumnoForm=this.fb.group({
  cod_tipo_persona:[this.cod_tipo_persona.value,[Validators.required]],
  dni:['',[Validators.required,Validators.minLength(13)]],
  primer_nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
  primer_apellido:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
  segundo_nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
  segundo_apellido:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
  nacionalidad:['',[Validators.required,Validators.minLength(6),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
  sexo:['',[Validators.required,Validators.minLength(1)]],
  fecha_nacimiento:['',[Validators.required]],
  direccion:['',[Validators.required,Validators.maxLength(250),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
  grupo:['',[Validators.required,Validators.maxLength(13)]],
  enfermedad:['',[Validators.required,Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
  vive_con:['',Validators.required]
                })
//=========================================FIN ALUMNO=========================================================

}
   ngOnInit(): void {


     this.personasService.listaTipoPersonas().subscribe(
       (resp:any)=>{
              this.listaTipoPersona=resp.tipo_personas
       }
     );
     this.crearGrupo()
    this.asignarValores()

 
   }            

  //==========================================================================================================================================
  //                      TELEFONOS USUARIO
  //==========================================================================================================================================
  
  //NUEVO FORMGROUP DE TELEFONOS PARA USUARIO
  get telUsrControls(){
    return this.usuarioForm.get('telefonosUsuario')['controls'];
  };

  agregartelefonoUsr():void{
    this.telefonosUsuario = this.usuarioForm.get('telefonosUsuario') as FormArray;
    this.telefonosUsuario.push(this.crearTelefonoUsr());
  };

  crearTelefonoUsr():FormGroup{
    return this.fb.group({
      telefono:['',Validators.required],
      cod_tipo_telefono:['',Validators.required]
    });
  };

  eliminarTelefonoUsr(i:number){
    this.telefonosUsuario.removeAt(i);
    //SI LA CANTIDAD DE CONTROLES ES 0 SE AGREGA 1 PARA LA VALIDACION DEL FORMULARIO
  if(this.telefonosUsuario.length==0){
    this.telefonosUsuario.push(this.crearTelefonoUsr());
  };
  
  }

  campoNoValidoU(campo:string):boolean{
    if (this.usuarioForm.get(campo).invalid && this.formEnviado){
    return true
    }else{
      return false
    }

  }  
 
  campoNoValidoA(campo:string):boolean{
    if (this.alumnoForm.get(campo).invalid && this.formEnviado){ 
    return true
    }else{
      return false
    }

    
  }  
  campoNoValidoF(campo:string):boolean{
   
    if (this.familiarForm.get(campo).invalid && this.formEnviado){
    return true
    }else{
      return false
    }

  }  

  
  //==========================================================================================================================================
  //                     FIN TELEFONOS USUARIO
  //==========================================================================================================================================
  


  //==========================================================================================================================================
  //                      TELEFONOS FAMILIAR
  //==========================================================================================================================================
  
    get telFmlControls(){
    return this.familiarForm.get('telefonosFamiliar')['controls'];
  };

  agregartelefonoF():void{
    this.telefonosFamiliar = this.familiarForm.get('telefonosFamiliar') as FormArray;
    this.telefonosFamiliar.push(this.crearTelefonoF());
  };

  crearTelefonoF():FormGroup{
    return this.fb.group({
      telefono:['',Validators.required],
      cod_tipo_telefono:['',Validators.required],
      whatsapp:[false],
      emergencia:[false]
    });
  };

  eliminarTelefonoF(i:number){
    this.telefonosFamiliar.removeAt(i);
    //SI LA CANTIDAD DE CONTROLES ES 0 SE AGREGA 1 PARA LA VALIDACION DEL FORMULARIO
  if(this.telefonosFamiliar.length==0){
    this.telefonosFamiliar.push(this.crearTelefonoF());
  };
  
  }

 
  //==========================================================================================================================================
  //                     FIN TELEFONOS USUARIO
  //==========================================================================================================================================
  

enviarFormulario(){
  this.formEnviado=true

  if (this.cod_tipo_persona.value==5) {    
    if (this.usuarioForm.valid) {
      this.personasService.PersonaUsuario(this.usuarioForm.value).subscribe(
        (resp:any)=>{
          Swal.fire({
            title: 'Hecho',
            icon: 'success',
            text: resp.msg
          });
        },(error:any)=>{
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.error.msg
          });
        }
      )
    }
  } else if(this.cod_tipo_persona.value==4 && this.alumnoForm.valid) {
    this.personasService.personaAlumno(this.alumnoForm.value).subscribe(
      (resp:any)=>{
        Swal.fire({
          title: 'Hecho',
          icon: 'success',
          text: resp.msg
        });
      },(error:any)=>{
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.msg
        });
      }
    )
  }else{
    if (this.familiarForm.valid) {
      this.personasService.personaFamiliar(this.familiarForm.value).subscribe(
        (resp:any)=>{
          Swal.fire({
            title: 'Hecho',
            icon: 'success',
            text: resp.msg
          });
        },(error:any)=>{
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.error.msg
          });
        }
      )
    }
  }

}

//REINICIA EL VALOR DEL CAMPO GRUPO SI ACTIVA CREAR GRUPO FAMILIAR
  crearGrupo(){
  
   this.familiarForm.get('crear_grupo').valueChanges.subscribe(x=>{
      if (x) {
        this.familiarForm.controls['grupo'].disable()
        this.familiarForm.patchValue({'grupo': ''})
      }else{
        this.familiarForm.controls['grupo'].enable()
        
      }
    } )
  }

  tipoPersona(){
    this.cod_tipo_persona = document.getElementById('tipoPersona')

    if (this.cod_tipo_persona.value!=5 || this.cod_tipo_persona.value!=4) {
      this.familiarForm.patchValue({'cod_tipo_persona':this.cod_tipo_persona.value})
    }
    if(this.cod_tipo_persona.value==5){
      this.usuarioForm.patchValue({'cod_tipo_persona':this.cod_tipo_persona.value})
    }
    
    if(this.cod_tipo_persona.value==4){
      this.alumnoForm.patchValue({'cod_tipo_persona':this.cod_tipo_persona.value})
    }
    
    }
   
asignarValores(){
  this.familiarForm.get('cod_tipo_persona').valueChanges.subscribe(n=>{
    //Asignando sexo segun numero de persona
    if (n==1) {
      this.familiarForm.patchValue({'sexo':'M'})
      this.familiarForm.patchValue({'encargado':false})
    }
    if (n==2) {
      this.familiarForm.patchValue({'sexo':'F'})
      this.familiarForm.patchValue({'encargado':false})
    }

    //asignando encargado 
    if (n==3) {
      this.familiarForm.patchValue({'encargado':true})
      this.familiarForm.patchValue({'sexo':''})
    }
  }) 
}

validarGrupo(campo:string):boolean{
  let grupo = this.familiarForm.get(campo).value
  let crear = this.familiarForm.get('crear_grupo').value
  if (grupo.length==0  && crear==false && this.formEnviado){
    return true
    }else{
      return false
    }
}

grupoNoValido(campo:string):boolean{
  if (this.alumnoForm.get(campo).value ==this.alumnoForm.get('dni').value && this.alumnoForm.get('dni').dirty) {
    return true
  }else{
    return false
  }
}
}
