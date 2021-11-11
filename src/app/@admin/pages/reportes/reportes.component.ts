import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Table, Cell} from "pdfmake-wrapper";
import { MatriculaService } from '../../services/matricula.service';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { ReportesService } from '../../services/reportes.service';
import { map, tap } from 'rxjs/operators';


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
  nombres:any;
  numeros:any;
  matricula:any[]=[];
  nuevo:number=0;
  reingreso:number=0;
  datosCargados:boolean=false;
  totalesTipo:any;
  grupos:any[]=[];
  numerosT:any[]=[]; 
  

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

      });
     }
  
asignarSeccion(s){
  if (s) {
    this.seccionNombre= this.secciones.find(v=>v.out_cod_seccion==s).out_nombre
  
this.reportesService.directorio(this.anio,this.curso,s).subscribe((resp:any)=>{
  this.nombres =resp.nombres
  this.numeros=resp.numeros

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
  [new Cell(new Txt(`N.`).fontSize(11).bold().end).end,
  new Cell(new Txt(`Nombre Alumno(a)`).fontSize(11).alignment('center').bold().end).end,
  new Cell(new Txt('Telefonos').fontSize(11).alignment('center').bold().end).colSpan(2).end,''],
]).widths([12,240,140,100]).end)

for (let i = 0; i < this.nombres.length; i++) {

let numeros=[]

 this.numeros.map(x=>x.out_telefono_grupo==this.nombres[i].out_grupo? x.out_telefonos.forEach(x =>numeros.push(x.telefono)):x)
  
  pdf.add(new Table([
    [new Cell(new Txt(`${i+1}`).fontSize(10).end).end,new Cell(new Txt(`${this.nombres[i].out_nombre}`).fontSize(11).alignment('left').end).end,
    new Cell(new Txt(`${numeros.toString()}`).fontSize(10).alignment('center').end).colSpan(2).end,
  ]
  ]).widths([12,240,140,100]).end)
  numeros=[]

  
}
  pdf.create().open();
}


async generarPDFMatricula(){
  let pdf= new PdfMakeWrapper();

  pdf.pageSize('LEGAL')
  pdf.pageOrientation('landscape');

  pdf.info({
    title: `MATRICULA DIARIA`,
    author: 'GEMA',
    subject: 'MATRICULA DIARIA'
  });

  pdf.add( new Table([
    [new Cell(await new Img('../../../../assets/images/logo_agz.png').build()).alignment('left').rowSpan(3).end,' ',' '],
    [' ',new Cell(new Txt('CENTRO EDUCATIVO NO GUBERNAMENTAL ALFONSO GUILLEN ZELAYA').alignment('center').bold().end).end, ' '],
    ['',new Cell(new Txt('REPORTE MATRICULA').alignment('center').end).end, ' ']
  ]).widths([40,'*',10]).layout('noBorders').end);
       

  pdf.add(new Table([
    [new Cell(new Txt('Nombre Alumo(a)').alignment('center').bold().end).end,
    new Cell(new Txt('Grupo Familiar').alignment('center').bold().end).end,
    new Cell(new Txt('Institución Anterior').alignment('center').bold().end).end,
    new Cell(new Txt('Grado/Curso').alignment('center').bold().end).end,
    new Cell(new Txt('Tipo').alignment('center').bold().end).end,
    new Cell(new Txt('Fecha').alignment('center').bold().end).end]
  ]).widths([250,100,200,100,100,90]).end)


  for (let i = 0; i < this.matricula.length; i++) {
    pdf.add(new Table([
      [new Cell(new Txt(`${this.matricula[i].nombre_alumno}`).fontSize(10).alignment('left').end).end,
      new Cell(new Txt(`${this.matricula[i].codigo_grupo}`).fontSize(10).alignment('center').end).end,
      new Cell(new Txt(`${this.matricula[i].colegio_anterior}`).fontSize(10).alignment('center').end).end,
      new Cell(new Txt(`${this.matricula[i].curso_matricula}`).fontSize(10).alignment('center').end).end,
      new Cell(new Txt(`${this.matricula[i].tipo_matricula}`).fontSize(10).alignment('center').end).end,
      new Cell(new Txt(`${this.formatDate(this.matricula[i].fecha_matricula)}`).fontSize(10).alignment('center').end).end]
    ]).widths([250,100,200,100,100,90]).end)    
  }

pdf.add(new Table([
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('Grupos Familiares').alignment('center').bold().end).fillColor('gray').colSpan(2).end,''],
  [new Cell(new Txt('Grupo').alignment('left').bold().end).fillColor('gray').end,new Cell(new Txt('Total Matriculado').alignment('left').bold().end).fillColor('gray').end],
]).widths([300,300]).end)

for (let i = 0; i < this.grupos.length; i++) {
  if (this.grupos[i][1]>1) {
    pdf.add(new Table([
      [new Cell(new Txt(`${this.grupos[i][0]}`).alignment('left').end).end,new Cell(new Txt(`${this.grupos[i][1]}`).alignment('left').end).end],
    ]).widths([300,300]).end)
  }
  
}


pdf.add(new Table([
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('').end).colSpan(2).border([false,false,false,false]).end,''],
  [new Cell(new Txt('RESUMEN').alignment('center').bold().end).fillColor('gray').colSpan(2).end,''],
  [new Cell(new Txt('Tipo Matricula').alignment('left').bold().end).fillColor('gray').end,new Cell(new Txt('Total').alignment('left').bold().end).fillColor('gray').end],
  [new Cell(new Txt('Jardín').alignment('left').bold().end).end,new Cell(new Txt(`${this.totalesTipo.JARDÍN}`).alignment('left').end).end],
  [new Cell(new Txt('Escuela').alignment('left').bold().end).end,new Cell(new Txt(`${this.totalesTipo.ESCUELA}`).alignment('left').end).end],
  [new Cell(new Txt('Colegio').alignment('left').bold().end).end,new Cell(new Txt(`${this.totalesTipo.COLEGIO}`).alignment('left').end).end],
  [new Cell(new Txt('TOTAL REINGRESO').alignment('left').bold().end).fillColor('gray').end,new Cell(new Txt(`${this.reingreso}`).alignment('left').end).end],
  [new Cell(new Txt('TOTAL NUEVO INGRESO').alignment('left').bold().end).fillColor('gray').end,new Cell(new Txt(`${this.nuevo}`).alignment('left').end).end]
]).widths([300,300]).end);



  pdf.create().open();
}

 matriculaDiaria(){
  this.reportesService.matriculaDiaria('2022').subscribe(async(resp:any)=>{
   this.matricula=resp.data
    
  let totalesTipo= await this.contarOcurrenciasTipoMatricula(this.matricula)
  let AlmnGrupo= await this.contarOcurrenciasGrupo(this.matricula)
  let gruposF = Object.entries(AlmnGrupo)    

  this.grupos=gruposF;
  for (let i = 0; i < this.matricula.length; i++) {
  
    if (this.matricula[i].colegio_anterior==='CENG ALFONSO GUILLEN ZELAYA') {
     this.reingreso++
   }else{
     this.nuevo++
    }
  }

this.totalesTipo =totalesTipo  
this.datosCargados=true
  }


  )}
  


  contarOcurrenciasTipoMatricula(datos) {
    if (!Array.isArray(datos)) {
        throw TypeError('El argumento debe ser un arreglo.');
    }

    return new Promise((resolve,reject)=>{
      let data = datos.reduce((a, d) => (a[d.tipo_matricula] ? a[d.tipo_matricula] += 1 : a[d.tipo_matricula] = 1, a), {});
      resolve(data)
    }) 
}


contarOcurrenciasGrupo(datos) {
  
  if (!Array.isArray(datos)) {
      throw TypeError('El argumento debe ser un arreglo.');
  }

  return new Promise((resolve,reject)=>{
    let data = datos.reduce((a, d) => (a[d.codigo_grupo] ? a[d.codigo_grupo] += 1 : a[d.codigo_grupo] = 1, a), {});
    resolve(data)
  }) 
}

 formatDate(fecha):string{
    let fws = fecha.split('T')
    let f = fws[fws.length-2]
    return f  
  }

}

