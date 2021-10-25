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
  fechaActual = `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`

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
        
    pdf.add(new Table([
      [new Cell(new Txt('AÑO DE MATRICULA: ').alignment('right').bold().end).end,new Cell(new Txt(this.anio).alignment('left').end).end,new Cell(new Txt('FECHA DE MATRICULA: ').alignment('right').bold().end).end,new Cell(new Txt(this.fechaActual).alignment('left').end).end]
    ]).widths([ 200,50,140,70]).layout('noBorders').end);

    pdf.add(new Table([
      [' ',' ',' ',' ',' '],
      [new Cell(new Txt('DATOS DEL ESTUDIANTE').alignment('center').bold().end).colSpan(5).fillColor('gray').end,' ',' ',' ',' '],
      [new Cell(new Txt('No. Identidad').alignment('left').bold().end).end,new Cell(new Txt('0801199619360').alignment('left').bold().end).end,' ',' ',' '],
      [new Cell(new Txt('Nombre').alignment('left').bold().end).end,new Cell(new Txt('JORGE RAUL AGUILERA DURON').alignment('left').bold().end).end, new Cell(new Txt('FOTO').alignment('right').bold().end).end,' ',' '],
      [new Cell(new Txt('Fecha de nacimiento').alignment('left').bold().end).end,new Cell(new Txt('19/08/1996').alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Edad').alignment('left').bold().end).end,new Cell(new Txt('25').alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Sexo').alignment('left').bold().end).end,new Cell(new Txt('M').alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Nacionalidad').alignment('left').bold().end).end,new Cell(new Txt('HONDUREÑA').alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Dirección').alignment('left').bold().end).end,new Cell(new Txt('Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptas eaque commodi, nihil et minus reprehenderit perspiciatis provident aperiam optio a numquam dolore nesciunt necessitatibus quae, eveniet inventore incidunt! Voluptatibus!').alignment('justify').end).colSpan(4).end,' ',' ',' ']
    ]).widths([150,200,'*','*',10]).layout('noBorders').end)

    pdf.add(new Table([
      [' ',' ',' ',' '],
      [new Cell(new Txt('DATOS FAMILIARES').alignment('center').bold().end).colSpan(4).fillColor('gray').end,' ',' ',' '],
      [' ',' ',' ',' '],
      [' ',' ',' ',' ']
      
    ]).widths(['*','*','*','*']).end)


    pdf.create().open();

  }


}
