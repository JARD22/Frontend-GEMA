import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
//======================================ENCARGADO==========================================================              
this.familiarForm= this.fb.group({
  cod_tipo_persona:[this.cod_tipo_persona,[Validators.required]],
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
    this.route.queryParams.subscribe(x=>this.cod_tipo_persona=x.tipo)

    this.route.params.subscribe(x=>this.cargarDatos(x.uid));
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
  
  grupoNoValido(campo:string):boolean{
    if (this.alumnoForm.get(campo).value ==this.alumnoForm.get('dni').value && this.alumnoForm.get('dni').dirty) {
      return true
    }else{
      return false
    }
  }

cargarDatos(uid:string){
  this.personaService.personaPorId(uid).subscribe((resp:any)=>{
    console.log(resp)
  })
}


}
