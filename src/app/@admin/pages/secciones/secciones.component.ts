import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styles: [
  ]
})
export class SeccionesComponent implements OnInit {


  anioActual= new Date().getFullYear()
  siguienteAnio= new Date().getFullYear()+1
  anioSeleccionado:any;
  cod_curso;
  seccionForm:FormGroup;
  unirSeccion:FormGroup;
  formEnviado:boolean=false;
  actualizar:boolean=false;
  listaSecciones:any[]=[];
  accion:boolean=false;
 
  
  anios:any[]=[this.anioActual,this.siguienteAnio]

  constructor(private fb:FormBuilder,
              private cursosSecciones:CursosSeccionesService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(x=>this.cod_curso=x.id)
    
          this.seccionForm= this.fb.group({
            cod_curso:[this.cod_curso,Validators.required],
            nombre:['',[Validators.required,Validators.minLength(1),Validators.min(1),Validators.pattern('[aA-zZ]')]],
            cupos:['',[Validators.required,Validators.min(35)]],
            anio:[this.anioSeleccionado,Validators.required],
            estado:[true,Validators.required],
            cod_seccion:['']
          });

          this.unirSeccion = this.fb.group({
            nombre:['U',[Validators.required,Validators.maxLength(1),Validators.pattern('[aA-zZ]')]],
            seccion1:['',Validators.required],
            seccion2:['',Validators.required],
            anio:[this.anioSeleccionado,Validators.required]
          })      
  }

  
enviarForm(){
 this.formEnviado=true

 //SE VUELVE A ESTABLECER EL CURSO Y EL ANIO


  if (this.seccionForm.valid && this.formEnviado && this.actualizar==false) {

    this.cursosSecciones.nuevaSeccion(this.seccionForm.value).subscribe(
      (resp:any)=>{
        Swal.fire('Hecho',resp.msg,'success')
        this.cargarSecciones();
        this.formEnviado=false;
      },(error:any)=>{Swal.fire('Error',error.error.msg,'error')}
    )
    //ACTUALIZAR SECCION
  }else if(this.seccionForm.valid && this.formEnviado && this.actualizar==true){

    this.cursosSecciones.actualizarSeccion(this.seccionForm.value).subscribe(
      (resp:any)=>{
        Swal.fire('Hecho',resp.msg,'success')
        this.cargarSecciones();
        this.formEnviado=false;  
      },
      (error:any)=>{Swal.fire('Error',error.error.msg,'error')}
    )
  }
}
  seleccionAnio(e){
    if (e) {
      this.anioSeleccionado= e;
      this.seccionForm.patchValue({'anio':e})
      this.unirSeccion.patchValue({'anio':e})
      this.cargarSecciones()
    }else{
      return
    }
    
    
  }

  actualizarSeccion(seccion){
    this.actualizar=true;
    
this.seccionForm.setValidators(Validators.required);
this.seccionForm.updateValueAndValidity();
this.seccionForm.patchValue({'cod_seccion':seccion.out_cod_seccion})
this.seccionForm.patchValue({'nombre':seccion.out_nombre})
this.seccionForm.patchValue({'cupos':seccion.out_cupos})
this.seccionForm.patchValue({'anio':seccion.out_anio})
this.seccionForm.patchValue({'estado':seccion.out_estado})
  }


  resetForm(){
    
 this.actualizar=false;
 this.seccionForm.reset();
 this.seccionForm.patchValue({'cod_curso':this.cod_curso})
 this.seccionForm.patchValue({'anio':this.anioSeleccionado})
  }
  cargarSecciones(){
    this.cursosSecciones.listaSecciones(this.cod_curso,this.anioSeleccionado).subscribe(
      (resp:any)=>{
        this.listaSecciones=resp.secciones
      }
    )
  }

  campoNoValido(campo:string):boolean{
      if (this.seccionForm.get(campo).invalid && this.formEnviado){
    return true
    }else{
      return false
    }
  }  

  validarSecciones():boolean{
  
    if (this.unirSeccion.get('seccion1').value==this.unirSeccion.get('seccion2').value && this.unirSeccion.touched){
      this.accion=true
      return true
    }else {
      this.accion=false
      return false
    }
  }

  nombreValido(campo:string){
    if(this.unirSeccion.get(campo).invalid && this.formEnviado){
      return true
    }else{
      return false
    }
  }

  unirSecciones(){
    this.formEnviado=true

   if (this.unirSeccion.valid && this.formEnviado) {
    Swal.fire({
      title: 'Esta acción no se puede deshacer, ¿continuar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.unirSeccion.valid && this.formEnviado) {
          this.cursosSecciones.unirSecciones(this.unirSeccion.value).subscribe(
            (resp:any)=>{
              Swal.fire('Hecho',resp.msg,'success')
              this.formEnviado=false
              this.cargarSecciones()
            },
            (error:any)=>{Swal.fire('Error',error.error.msg,'error')}
          )
        }
      } else if (result.isDenied) {
        Swal.fire('Acción cancelada', '', 'info')
      }
    })
   }else{
   return
   }

   

  }
}
