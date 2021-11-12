import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  date = new Date()
  metricas:any;
  AniosMatricula:any[]=[`${this.date.getFullYear()}`,`${this.date.getFullYear()+1}`]
  lista_doc:any;
  docForm:FormGroup;
  alumno:any;
  formEnviado:boolean=false;
  tipo_matricula:any;
  desde:number=0;
  anio:string=`${this.date.getFullYear()+1}`;
  cod_tipo:number=1;
  filtrosForm:FormGroup;
  data:boolean=false;
  lista_doc_b:any[]=[];
  botones:boolean=true;


  constructor(private matriculaService:MatriculaService,
              private fb:FormBuilder) {

                this.tipoMatricula()

                this.filtrosForm= this.fb.group({
                  aniof:[`${this.date.getFullYear()+1}`],
                  cod_tipo:[1]
                });                
               }




 ngOnInit() {

  this.docForm = this.fb.group({
    cod_matricula:['',[Validators.required]],
    doc_pendiente:[false,Validators.required],
    desc_doc:['']
  });


this.cargarData(this.anio,this.cod_tipo,this.desde)
this.cambios()


  }

  tipoMatricula(){
  this.matriculaService.tiposMatricula().subscribe((resp:any)=>{
  this.tipo_matricula=resp.tipos
  })
  }

 filtros(){
  this.anio=  this.filtrosForm.get('aniof').value
  this.cod_tipo=  this.filtrosForm.get('cod_tipo').value
  this.cargarData(this.anio,this.cod_tipo,this.desde)
}

cargarData(anio,tipo,offset){
  this.matriculaService.metricas(anio,tipo,offset).subscribe((resp:any)=>{
  
    this.metricas =  resp.metricas;
    this.lista_doc=  resp.data
    this.lista_doc_b=[...this.lista_doc]
    this.data=true
  
  },(error:any)=>{
    Swal.fire('Advertencia',error.error.msg,'warning');
    this.data=false
  });
}

  asignarDatos(id){
    this.alumno = this.lista_doc.find(d=>d.out_cod_matricula ==id)
    this.docForm.patchValue({
      'cod_matricula':this.alumno.out_cod_matricula,
      'doc_pendiente':this.alumno.out_doc_pendiente,
      'desc_doc':this.alumno.out_descripcion
    });

  }


  cambios(){
    this.docForm.get('doc_pendiente').valueChanges.subscribe(
      x=>{
        if (x==false) {
          this.docForm.patchValue({'desc_doc':''});
          this.docForm.get('desc_doc').disable()
        }else{
          this.docForm.get('desc_doc').setValidators([Validators.required,Validators.minLength(5)])
          this.docForm.get('desc_doc').updateValueAndValidity();
          this.docForm.get('desc_doc').enable()
        }
      }
    )
  }

  enviarForm(){
    this.formEnviado=true

if (this.docForm.valid && this.formEnviado) {
  this.matriculaService.actualizarDoc(this.docForm.value).subscribe((resp:any)=>{
    Swal.fire('Hecho',resp.msg,'success')
    this.formEnviado=false

    this.cargarData(this.anio,this.cod_tipo,this.desde);
  },(error:any)=>{
    Swal.fire('Error',error.error.msg,'error')
    this.formEnviado=false
  })

}

  }

  campoNoValido(campo:string):boolean{
    if (this.docForm.get(campo).invalid && this.formEnviado){ 
    return true
    }else{
      return false
    }
  }


 cambiarPagina(valor:number){
    this.desde+=valor
   
    if(this.desde<0){
      this.desde=0

    }else if(this.desde >=this.lista_doc[0].out_total){
      this.desde -= valor
    }
    
    this.cargarData(this.anio,this.cod_tipo,this.desde);
  }


buscarPorDni(dni){
 
  if (dni.length==13) {
    this.matriculaService.docDNI(this.anio,this.cod_tipo,dni).subscribe((resp:any)=>{
      this.lista_doc= resp.data
      this.botones=false
    },(error:any)=>{Swal.fire('Advertencia',error.error.msg,'warning')})
  } else {
    this.lista_doc=this.lista_doc_b
    this.botones=true
  }

}
}
