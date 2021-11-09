import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Table, Cell} from "pdfmake-wrapper";
import { MatriculaService } from '../../services/matricula.service';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { ReportesService } from '../../services/reportes.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
  ]
})


export class ReportesComponent implements OnInit {

  date = new Date();
  cursos:any[]=[];
  curso:number;
  Anios:any[]=[`${this.date.getFullYear()}`,`${this.date.getFullYear()+1}`]
  secciones:any[]=[];
  anio:any;
  cursoBloqueado:boolean=false
  seccion:any;
  cursoNombre:any;
  seccionNombre:any;
  directorio:any;
  

  constructor(private matriculaService:MatriculaService,
              private cursosService:CursosSeccionesService,
              private reportesService:ReportesService){

  }


  ngOnInit():void{
    this.cargarCursos();
  }

  cargarCursos(){
    this.matriculaService.listaCursos().subscribe((resp:any)=>{
      this.cursos = resp.cursos
    });
  }


asignarAnio(c){
this.anio=c
if (!c) {
  this.cursoBloqueado=false
}
this.cursoBloqueado=true
}

asignarCurso(c){
this.curso=c
this.cursoNombre = this.cursos.find(c=>c.out_cod_curso==this.curso).out_nombre
console.log(this.cursoNombre)
this.cargarSecciones()
}

cargarSecciones(){
      this.cursosService.listaSecciones(this.curso,this.anio).subscribe((resp:any)=>{    
      this.secciones= resp.secciones
        console.log(this.secciones)
      });
     }
  
asignarSeccion(s){
  if (s) {
    this.seccionNombre= this.secciones.find(v=>v.out_cod_seccion==s).out_nombre
  
this.reportesService.directorio(this.anio,this.curso,s).subscribe((resp:any)=>{
  this.directorio =resp.data
  console.log(this.directorio)
})
  }else{
    return
  }
}

async generarPDF(){
  let pdf= new PdfMakeWrapper();

  //TAMAÑO OFICIO

  pdf.pageSize('LEGAL')

  pdf.info({
    title: `DIRECTORIO TELEFÓNICO`,
    author: 'GEMA',
    subject: 'DIRECTORIO TELEFÓNICO'
  });

  pdf.add( new Table([
    [new Cell(await new Img('../../../../assets/images/logo_agz.png').build()).alignment('left').rowSpan(3).end,' ',' '],
    [' ',new Cell(new Txt('CENTRO EDUCATIVO NO GUBERNAMENTAL ALFONSO GUILLEN ZELAYA').alignment('center').bold().end).end, ' '],
    ['',new Cell(new Txt('DIRECTORIO TELEFÓNICO').alignment('center').end).end, ' ']
  ]).widths([40,'*',10]).layout('noBorders').end);
       
  pdf.add(
    new Table([
      [''],
      [new Cell(new Txt(this.cursoNombre).bold().alignment('center').end).end],
      [new Cell(new Txt(`Seccion: ${this.seccionNombre}`).bold().end).end],
      ['']
    ]).widths(['*']).layout('noBorders').end
  )

pdf.add(new Table([
  [new Cell(new Txt(`N.`).fontSize(11).bold().end).rowSpan(2).end,new Cell(new Txt(`Nombre Alumno(a)`).fontSize(11).alignment('center').bold().end).rowSpan(2).end,new Cell(new Txt('Telefonos').fontSize(11).alignment('center').bold().end).colSpan(2).end,''],
  ['','',new Cell(new Txt('Whatsapp').alignment('center').end).end,new Cell(new Txt('Otros').alignment('center').end).end]
]).widths([12,200,140,140]).end)

for (let i = 0; i < this.directorio.length; i++) {

    let whatsapp = this.directorio[i].out_whatsapp.map(w=>w.telefonos)
    let otros = this.directorio[i].out_telefonos.map(w=>w.telefonos)

  pdf.add(new Table([
    [new Cell(new Txt(`${i+1}`).fontSize(11).bold().end).end,new Cell(new Txt(`${this.directorio[i].out_nombre}`).fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(`${whatsapp.toString()}`).fontSize(11).alignment('center').end).end,new Cell(new Txt(`${otros.toString()}`).fontSize(11).alignment('center').end).end]
  ]).widths([12,200,140,140]).end)

whatsapp=[]
otros=[]
  
}
  

  pdf.create().open();
}


  }


  
  


