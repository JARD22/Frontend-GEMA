import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfMakeWrapper, Txt, Img, Table, Cell } from "pdfmake-wrapper";


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
  estudios= false;
  retrasada = false;


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
      desc_doc:['',[Validators.pattern('[]')]],
      condicionado:[false,[Validators.required]],
      motivo:[''],
      materia_retrasada:[''],
      curso_retrasada:[''],
      procedencia:['',[Validators.required]],
      fecha_procedencia:['',[Validators.required]]
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


  mostrarCampos(campo){
      if (campo=='retrasada') {
        this.retrasada= !this.retrasada
        
      }else{
        this.estudios = !this.estudios
       
      }
  }

  async generarPDF(){

    let pdf= new PdfMakeWrapper();

    //TAMAÑO OFICIO

    pdf.pageSize('LEGAL')

    pdf.info({
      title: `FICHA DE MATRICULA`,
      author: 'GEMA',
      subject: 'FICHA DE MATRICULA'
    });

    pdf.add( new Table([
      [new Cell(await new Img('../../../../assets/images/logo_agz.png').build()).alignment('left').rowSpan(3).end,' ',' '],
      [' ',new Cell(new Txt('CENTRO EDUCATIVO NO GUBERNAMENTAL ALFONSO GUILLEN ZELAYA').alignment('center').bold().end).end, ' '],
      ['',new Cell(new Txt('FICHA DE MATRICULA').alignment('center').end).end, ' ']
    ]).widths([40,'*',10]).layout('noBorders').end);



    pdf.create().open();

  }


}
