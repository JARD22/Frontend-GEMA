import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonasService } from '../../services/personas.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: [
  ]
})
export class PersonaComponent implements OnInit {

  public cod_tipo_persona:number
  public formEnviado = false;
  public uid:string;

  public usuarioForm:FormGroup;
  public familiarForm:FormGroup;
  public alumnoForm:FormGroup;

  telefonosUsuario:FormArray;
  telefonosFamiliar:FormArray;


  constructor( private route:ActivatedRoute,private fb:FormBuilder,
              private personaService:PersonasService) { 

//======================================USUARIO==========================================================
this.usuarioForm= this.fb.group({
  cod_tipo_persona:[this.cod_tipo_persona,[Validators.required]],
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

//=========================================ALUMNO=============================================================

this.alumnoForm=this.fb.group({
  cod_tipo_persona:[this.cod_tipo_persona,[Validators.required]],
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

    
    //======================================ENCARGADO==========================================================              
    this.familiarForm= this.fb.group({
      uid:['',[Validators.required]],
      dni:['',[Validators.required,Validators.minLength(13),Validators.pattern("^[0-9]{13}$")]],
      primer_nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      primer_apellido:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      segundo_nombre:['',[Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      segundo_apellido:['',[Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      encargado:[false],
      ocupacion:['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,50}$")]],
      lugar_trabajo:['',[Validators.required,Validators.minLength(4),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
      escolaridad:['',[Validators.required,Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      nacionalidad:['',[Validators.required,Validators.minLength(6),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,25}$")]],
      sexo:['',[Validators.required,Validators.minLength(1)]],
      fecha_nacimiento:['',Validators.required],
      direccion:['',[Validators.required,Validators.maxLength(250),Validators.pattern('^[ A-Z a-z 0-9 . _ % + - , ; # ÁÉÍÓÚáéíóúÑñ()]{2,250}$')]],
      telefonosFamiliar:this.fb.array([])
    });
    
    
    //======================================FIN ENCARGADO==========================================================              
    this.route.params.subscribe( x=>  this.cargarDatos(x.uid));
        
    
    this.route.queryParams.subscribe(x=>this.cod_tipo_persona=x.tipo)

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
      cod_telefono:['0'],
      telefono:['',Validators.required],
      cod_tipo_telefono:['',Validators.required],
      whatsapp:[false],
      emergencia:[false]
    });
  };

  eliminarTelefonoF(i:number){
    this.telefonosFamiliar = this.familiarForm.get('telefonosFamiliar') as FormArray;
    this.telefonosFamiliar.removeAt(i);
    //SI LA CANTIDAD DE CONTROLES ES 0 SE AGREGA 1 PARA LA VALIDACION DEL FORMULARIO
  if(this.telefonosFamiliar.length==0){
    this.telefonosFamiliar.push(this.crearTelefonoF());
  };
  
  }
  //==========================================================================================================================================
  //                     FIN TELEFONOS USUARIO
  //==========================================================================================================================================
  
  grupoNoValido(campo:string):boolean{
    if (this.alumnoForm.get(campo).value ==this.alumnoForm.get('dni').value && this.alumnoForm.get('dni').dirty) {
      return true
    }else{
      return false
    }
  }

 cargarDatos(uid:string){
  this.personaService.personaPorId(uid).subscribe((resp:any)=>{
    
    if (this.cod_tipo_persona==1 ||this.cod_tipo_persona==2 || this.cod_tipo_persona==3) {
      
          this.familiarForm.patchValue({'uid':uid});    
          this.familiarForm.patchValue({'cod_tipo_persona': resp.persona[0].cod_tipo_persona});
          this.familiarForm.patchValue({'dni':resp.persona[0].out_dni});
          this.familiarForm.patchValue({'primer_nombre':resp.persona[0].out_primer_nombre});
          this.familiarForm.patchValue({'primer_apellido':resp.persona[0].out_primer_apellido});
          this.familiarForm.patchValue({'segundo_nombre':resp.persona[0].out_segundo_nombre});
          this.familiarForm.patchValue({'segundo_apellido':resp.persona[0].out_segundo_apellido});
          this.familiarForm.patchValue({'encargado':resp.persona[0].out_encargado});
          this.familiarForm.patchValue({'ocupacion':resp.persona[0].out_ocupacion});
          this.familiarForm.patchValue({'lugar_trabajo':resp.persona[0].out_lugar_trabajo});
          this.familiarForm.patchValue({'escolaridad':resp.persona[0].out_escolaridad});
          this.familiarForm.patchValue({'nacionalidad':resp.persona[0].out_nacionalidad});
          this.familiarForm.patchValue({'sexo':resp.persona[0].out_sexo});
          this.familiarForm.patchValue({'fecha_nacimiento':resp.persona[0].out_fec_nacimiento});
          this.familiarForm.patchValue({'direccion':resp.persona[0].out_direccion});
          this.familiarForm.setControl('telefonosFamiliar',this.setTelefonos(resp.persona[0].out_telefonos))
    
    } else if(this.cod_tipo_persona==4){
      
    }else{

    }
    
  })
}

setTelefonos(telefonos:any[]):FormArray{
const formArray = new FormArray([])

telefonos.forEach(x=>{
    formArray.push(this.fb.group({
      cod_telefono:[x.cod_telefono],
      telefono:[x.telefono,Validators.required],
      cod_tipo_telefono:[x.cod_tipo_telefono,Validators.required],
      whatsapp:[x.whatsapp],
      emergencia:[x.emergencia]      
    }));
  })
  return formArray
}

enviarFormulario(){
  this.formEnviado=true

  if (this.cod_tipo_persona==5) {    
    if (this.usuarioForm.valid) {
      // this.personaService.PersonaUsuario(this.usuarioForm.value).subscribe(
      //   (resp:any)=>{
      //     Swal.fire({
      //       title: 'Hecho',
      //       icon: 'success',
      //       text: resp.msg
      //     });
      //   },(error:any)=>{
      //     Swal.fire({
      //       title: 'Error',
      //       icon: 'error',
      //       text: error.error.msg
      //     });
      //   }
      // )
    }
  } else if(this.cod_tipo_persona==4 && this.alumnoForm.valid) {
    // this.personaService.personaAlumno(this.alumnoForm.value).subscribe(
    //   (resp:any)=>{
    //     Swal.fire({
    //       title: 'Hecho',
    //       icon: 'success',
    //       text: resp.msg
    //     });
    //   },(error:any)=>{
    //     Swal.fire({
    //       title: 'Error',
    //       icon: 'error',
    //       text: error.error.msg
    //     });
    //   }
    // )
  }else{
    if (this.familiarForm.valid) {
      this.personaService.actualizarFamiliar(this.familiarForm.value).subscribe(
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



}
