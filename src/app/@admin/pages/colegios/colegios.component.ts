import { Component, OnInit } from '@angular/core';
import { ColegiosService } from '../../services/colegios.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styles: [
  ]
})
export class ColegiosComponent implements OnInit {

  
  listaColegios:any[]=[];
  desde:number=0;
  formEnviado=false;
  colegioForm:FormGroup;
  colegiosAnteriores:any[]=[]


  constructor(private colegioService:ColegiosService,
              private fb:FormBuilder) { }


  ngOnInit(): void {
    this.cargarColegios();

    this.colegioForm= this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5),Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{2,25}$")]],
      estado:['',[Validators.required]],
    });
    
  }


  cargarColegios(){
    this.colegioService.listaColegios().subscribe((resp:any)=>{
      this.listaColegios= resp.colegios
      this.colegiosAnteriores = [...this.listaColegios];
    });
  }

  cargarDatosColegio(id){

    console.log(this.listaColegios[id])
   this.colegioForm.addControl('cod_colegio', new FormControl(''))
   this.colegioForm.patchValue({'cod_colegio':this.listaColegios[id].out_cod_coledio})
   this.colegioForm.patchValue({'nombre':this.listaColegios[id].out_nombre})
   this.colegioForm.patchValue({'estado':this.listaColegios[id].out_estado})
  
  }

  cambiarPagina(valor){
    console.log(valor)
    this.desde+=valor
  
    if(this.desde<0){
      this.desde=0

    }else if(this.desde >=this.listaColegios[0].out_total){
      this.desde -= valor
    }
    
    this.cargarColegios();
  }

  nuevoColegio(){
    this.formEnviado=true
    if (this.colegioForm.valid && this.formEnviado) {
      this.colegioService.nuevoColegio(this.colegioForm.value).subscribe((resp:any)=>{
        Swal.fire('Hecho',resp.msg,'success');
        this.cargarColegios();
        this.resetForm();
        this.formEnviado=false;
      },(error:any)=>{ Swal.fire('Error',error.error.msg,'error');})
    }
 

  }

  actualizarColegio(){
    this.formEnviado=true
    if (this.colegioForm.valid && this.formEnviado) {
      this.colegioService.actualizarColegio(this.colegioForm.value).subscribe((resp:any)=>{
        Swal.fire('Hecho',resp.msg,'success');
        this.cargarColegios();
        this.resetForm();
        this.formEnviado=false;
      },(error:any)=>{ 
        console.log(error)
        Swal.fire('Error',error.error.msg,'error');})
    }
  }

  resetForm(){
    this.colegioForm.reset();
  }

  campoNoValido(campo:string):boolean{
    if (this.colegioForm.get(campo).invalid && this.formEnviado){
    return true
    }else{
      return false
    }

  }  

  buscarColegio(e){
    

  

    if(e.length>0){
      this.colegioService.buscarColegio(e).subscribe((resp:any)=>{
       this.listaColegios= resp.colegios
      },(error:any)=>{Swal.fire('Error',error.error.msg,'error')})
    }else{
      this.listaColegios= [...this.colegiosAnteriores]
    return 
  }
  }
}
