import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionesComponent } from '../secciones/secciones.component';

@Component({
  selector: 'app-nueva-matricula',
  templateUrl: './nueva-matricula.component.html',
  styles: [
  ]
})
export class NuevaMatriculaComponent implements OnInit {


  date = new Date()
  AniosMatricula:any[]=[`${this.date.getFullYear()}`,`${this.date.getFullYear()+1}`]
  tiposMatricula:any[]=[];
  cursos:any[]=[];
  secciones:any[]=[];
  matriculaForm:FormGroup;
  anio;
  cod_curso;


  constructor(private matriculaService:MatriculaService,
              private cursosService:CursosSeccionesService,
              private fb:FormBuilder) {}

  ngOnInit(): void {

    this.matriculaForm=this.fb.group({
      cod_tipo_matricula:['',[Validators.required]],
      anio:['',[Validators.required]],
      curso:[''],
      sede:[''],
      seccion:[''],
      id_alumno:['',[Validators.required]],
      id_encargado:['',[Validators.required]],
      doc_pendiente:[false],
      desc_doc:['',[Validators.pattern('[]')]]
    });


    this.matriculaService.tiposMatricula().subscribe((resp:any)=>{
      this.tiposMatricula=resp.tipos
    });

    this.matriculaService.listaCursos().subscribe((resp:any)=>{
      this.cursos = resp.cursos
    });

    this.matriculaForm.get('curso').valueChanges.subscribe(v=>this.cod_curso=v);
    this.matriculaForm.get('anio').valueChanges.subscribe(a=>this.anio=a);
  }



}
