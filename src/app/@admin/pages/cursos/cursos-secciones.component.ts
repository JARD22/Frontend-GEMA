import { Component, OnInit } from '@angular/core';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-secciones',
  templateUrl: './cursos-secciones.component.html',
  styles: [
  ]
})
export class CursosSeccionesComponent implements OnInit {

  desde:number=0
  public botones =true
  listaCursos:any[]=[]
  public cursoForm:FormGroup;
  public cod_curso;
  public formEnviado:boolean =false;
  
  
  constructor(private cursosService:CursosSeccionesService,
              private fb:FormBuilder) { }


  ngOnInit(): void {

this.cursoForm= this.fb.group({
  nombre:['',[Validators.required]],
  descripcion:['',[Validators.required]],
  estado:[true,[Validators.required]]
})  

this.cargarCursos()
  }


nuevoCurso(){
this.formEnviado=true
if (this.cursoForm.valid && this.formEnviado) {
  this.cursosService.nuevoCurso(this.cursoForm.value).subscribe((resp:any)=>{
    Swal.fire('Hecho',resp.msg,'success');
    this.cargarCursos();
    this.cursoForm.reset();
    this.formEnviado=false
  },(error:any)=>Swal.fire('Error',error.error.msg,'error'))
}
}


actualizarCurso(){
this.formEnviado=true
if ( this.cursoForm.valid &&  this.formEnviado) {
 this.cursosService.actualizarCurso(this.cursoForm.value).subscribe((resp:any)=>{
   Swal.fire('Hecho',resp.msg,'success')
   this.cargarCursos();
 },(error:any)=>Swal.fire('Error',error.error.msg,'error'))  
}
};

cargarDatosCurso(id){
 

  this.cursoForm.addControl('cod_curso', new FormControl(this.listaCursos[id].out_cod_curso))
 
 this.cursoForm.patchValue({'nombre':this.listaCursos[id].out_nombre})
 this.cursoForm.patchValue({'descripcion':this.listaCursos[id].out_descripcion})
 this.cursoForm.patchValue({'estado':this.listaCursos[id].out_estado})

}

  cargarCursos(){
    this.cursosService.listaCursos(this.desde).subscribe((resp:any)=>{
     this.listaCursos = resp.cursos
    })
  }

buscarCurso(termino){
//TODO: corregir la busqueda de cursos (y de personas tambien )
  if (termino.length>0) {
    this.cursosService.buscarCurso(termino).subscribe((resp:any)=>{
      this.listaCursos=resp.cursos
    })
  }
}

  cambiarPagina(valor){
    this.desde+=valor
  
    if(this.desde<0){
      this.desde=0

    }else if(this.desde >=this.listaCursos[0].out_total){
      this.desde -= valor
    }
    
    this.cargarCursos();
  }

resetForm(){
  this.cursoForm.reset();
}

}
