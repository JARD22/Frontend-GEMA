import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styles: [
  ]
})
export class ListaPersonasComponent implements OnInit {

  constructor(private personaService:PersonasService) {
  
   }


  public listaPersonas:any[]=[]
  desde:number=0

  ngOnInit(): void {
  
    this.cargarLista();
  }

  cargarLista(){
    this.personaService.listaPersonas(this.desde).subscribe((x:any)=>{
      this.listaPersonas=x.personas
    
    })
  }

  cambiarPagina(valor){
    this.desde+=valor
   
    if(this.desde<0){
      this.desde=0

    }else if(this.desde >=this.listaPersonas[0].total){
      this.desde -= valor
    }
    
    this.cargarLista();
  }
}
