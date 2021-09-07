import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-nueva-persona',
  templateUrl: './nueva-persona.component.html',
  styles: [
  ]
})
export class NuevaPersonaComponent implements OnInit {


       public usuarioForm:FormGroup;
       public familiarForm:FormGroup;
       
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
                  dni:['',[Validators.required,Validators.minLength(13)]],
                  primer_nombre:['',[Validators.required,Validators.minLength(3)]],
                  primer_apellido:['',[Validators.required,Validators.minLength(3)]],
                  segundo_nombre:[''],
                  segundo_apellido:[''],
                  nacionalidad:['',[Validators.required,Validators.minLength(6)]],
                  sexo:['',[Validators.required,Validators.minLength(1)]],
                  fecha_nacimiento:['',[Validators.required]],
                  correo:['',[Validators.required,Validators.minLength(3)]],//PENDIENTE DE PATRON
                  direccion:['',[Validators.required,Validators.maxLength(250)]],
                  telefonosUsuario:this.fb.array([])
                });

                this.agregartelefonoUsr();

//======================================FIN USUARIO==========================================================                

//======================================ENCARGADO==========================================================              
              this.familiarForm= this.fb.group({
                cod_tipo_persona:[this.cod_tipo_persona.value,[Validators.required]],
                dni:['0000000000016',[Validators.required,Validators.minLength(13)]],
                primer_nombre:['NOMBRE1_TESTF2',[Validators.required,Validators.minLength(3)]],
                primer_apellido:['APELLIDO1_TESTF2',[Validators.required,Validators.minLength(3)]],
                segundo_nombre:[''],
                segundo_apellido:[''],
                encargado:[''],
                ocupacion:['PROGRAMADOR',Validators.required],
                lugar_trabajo:['CASA',[Validators.required,Validators.minLength(4)]],
                escolaridad:['UNIVERSIDAD',Validators.required],
                nacionalidad:['HONDURENA',[Validators.required,Validators.minLength(6)]],
                sexo:['M',[Validators.required,Validators.minLength(1)]],
                fecha_nacimiento:['',[Validators.required]],
                direccion:['DIRECCION1_TESTF2',[Validators.required,Validators.maxLength(250)]],
                crear_grupo:[''],
                grupo:[''],
                telefonosFamiliar:this.fb.array([])
              });

                 this.agregartelefonoF();
//======================================FIN ENCARGADO==========================================================              


}


   ngOnInit(): void {

     this.personasService.listaTipoPersonas().subscribe(
       (resp:any)=>{
              this.listaTipoPersona=resp.tipo_personas
       }
     );
     this.crearGrupo()

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
      whatsapp:[''],
      emergencia:['']
    });
  };

  eliminarTelefonoF(i:number){
    this.telefonosFamiliar.removeAt(i);
    //SI LA CANTIDAD DE CONTROLES ES 0 SE AGREGA 1 PARA LA VALIDACION DEL FORMULARIO
  if(this.telefonosFamiliar.length==0){
    this.telefonosFamiliar.push(this.crearTelefonoF());
  };
  
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
  

enviarFormulario(){
  this.formEnviado=true

  if (this.cod_tipo_persona==5) {    
    if (this.usuarioForm.valid) {
      this.personasService.PersonaUsuario(this.usuarioForm.value).subscribe(
        (resp:any)=>{
          console.log(resp)
        }
      )
    }
  } else if(this.cod_tipo_persona==4) {
    console.log('formulario de alumno')
  }else{
    if (this.familiarForm.valid) {
      this.personasService.personaFamiliar(this.familiarForm.value).subscribe(
        (resp:any)=>{
          console.log(resp)
        }
      )
    }
  }

}

  encargadoForm:FormGroup = this.fb.group({});
  padreForm:FormGroup = this.fb.group({});
  madreForm:FormGroup = this.fb.group({});
  alumnoForm:FormGroup = this.fb.group({});


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
    }
   

}
