import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  anios:any[]=[this.anioActual,this.siguienteAnio]

  constructor(private fb:FormBuilder,
              private cursosSecciones:CursosSeccionesService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.anios);
    this.route.params.subscribe(x=>console.log(x.id))
  }

  cargarSecciones(){

  }

}
