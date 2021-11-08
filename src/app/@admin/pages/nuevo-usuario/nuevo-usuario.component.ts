import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {
  desde:number=0
  listaUsuarios:any[]=[];
  listaEstados:any[]=[];
  usuarioForm:FormGroup;
  usuario:any;

  constructor(private usuarioService:UsuarioService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.cargarLista()
    this.cargarEstados()


    this.usuarioForm = this.fb.group({
      cod_usuario:['',Validators.required],
      nombre:[''],
      cod_estado:['',Validators.required],
      correo:['',Validators.required]
    })
  }

  cargarLista(){
    this.usuarioService.listaUsuarios(0).subscribe((resp:any)=>{
      this.listaUsuarios= resp.usuarios
    })
  }

  cambiarPagina(valor){
    this.desde+=valor
   
    if(this.desde<0){
      this.desde=0

    }else if(this.desde >=this.listaUsuarios[0].out_total){
      this.desde -= valor
    }
    this.cargarLista();
  }

  cargarEstados(){
    this.usuarioService.listaEstados().subscribe((resp:any)=>{
      this.listaEstados=resp.estados
    })
  }

  asignarDatos(id){

   this.usuario= this.listaUsuarios.find(u=>u.out_cod_usuario==id);
    this.usuarioForm.patchValue({'nombre':this.usuario.out_nombre})
    this.usuarioForm.patchValue({'cod_estado':this.usuario.out_cod_estado})
    this.usuarioForm.patchValue({'cod_usuario':this.usuario.out_cod_usuario})
    this.usuarioForm.patchValue({'correo':this.usuario.out_correo})
    
  }

  enviarForm(){
    if (this.usuarioForm.valid && !this.usuario.out_primer_ingreso) {
     this.usuarioService.activarUsuario(this.usuarioForm.value).subscribe((resp:any)=>{
       Swal.fire('Hecho',resp.msg,'success')
       this.cargarLista()
     },(error:any)=>{Swal.fire('Error',error.error.msg,'error')})
    }else{
     
    }

  }

  // buscarPorTermino(termino){
 
  //   if (termino.length==0) {
  //     this.botones=true
  //     return
  //   }
  //   this.personaService.busquedaPersona(termino).subscribe(
  //     (resp:any)=>{
  //       this.listaPersonas=resp.persona
  //       this.botones=false
  //     }
     
  //   )
  // }
}
