import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { CursosSeccionesService } from '../../services/cursos-secciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfMakeWrapper, Txt, Img, Table, Cell} from "pdfmake-wrapper";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nueva-matricula',
  templateUrl: './nueva-matricula.component.html',
  styles: [
  ]
})
export class NuevaMatriculaComponent implements OnInit {

//DATOS ESTATICOS DE LA FICHA
  date = new Date()
  AniosMatricula:any[]=[`${this.date.getFullYear()}`,`${this.date.getFullYear()+1}`]
  tiposMatricula:any[]=[];
  sedes:any[]=[{id:1,nombre:'JACINTO ZELAYA LOZANO'},{id:2,nombre:'SAN JOSÉ DEL PEDREGAL'}]
  sede:any='';
  fechaActual = `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`

  //CURSOS Y SECCIONES
  cursos:any[]=[];
  curso:any='';

  secciones:any[]=[];
  seccion:any='';

  //FORMULARIO
  matriculaForm:FormGroup;
  formEnviado:boolean=false;
  
  //DATOS ESTATICOS DE LA FICHA
  anio;
  cod_curso;

  retrasada:boolean= false;
  curso_retrasada;

  //DATOS BASE
  datos_alumno:any;
  datos_parentesco:any;
  encargado:any;

  //MENSAJES DE ERROR EN CASO DE NO EXISTIR LA DATA CORRESPONDIENTE A LOS DNI DE ALUMNO Y ENCARGADO
  error_dni_encargado:boolean=false;
  error_dni_alumno_msg:string='';
  error_dni_alumno:boolean=false;

  constructor(private matriculaService:MatriculaService,
              private cursosService:CursosSeccionesService,
              private fb:FormBuilder) {}

  ngOnInit(): void {
      this.matriculaForm=this.fb.group({
      cod_tipo_matricula:['',[Validators.required]],
      anio:['',[Validators.required]],
      curso:['',[Validators.required]],
      cod_alumno:['',[Validators.required]],
      cod_grupo:['',[Validators.required]],
      sede:['',[Validators.required]],
      seccion:['',Validators.required],
      id_alumno:['',[Validators.required]],
      nombre_alumno:[{disabled:true,value:''}],
      id_encargado:['',[Validators.required]],
      nombre_encargado:[{disabled:true,value:''}],
      doc_pendiente:[false],
      desc_doc:[{disabled:true,value:''}],
      condicionado:[false],
      motivo:[{disabled:true,value:''}],
      materia_retrasada_chk:[false],
      materia_retrasada:[''],
      curso_retrasada:[9],
      colegio_procedencia:['',[Validators.required,Validators.pattern("^[A-Za-záéíóúÁÉÍÓÚñÑ ]{2,50}$")]],
      curso_procedencia:['',[Validators.required]],
      fecha_procedencia:['',Validators.required]
    });


    this.matriculaService.tiposMatricula().subscribe((resp:any)=>{
      this.tiposMatricula=resp.tipos
    });

  /**CARGANDO LAS FUNICIONES QUE OBSERVAN EL COMPORTAMIENTO DEL FORMULARIO(VISTA) PARA ASIGNAR Y RETIRAR VALIDADORES
   * AL FORMULARIO REACTIVO
   */
    this.cargarCursos()
    this.bloquearCampos()
    this.cargarSecciones()
    this.mostrarCampos()

    this.matriculaForm.get('curso').valueChanges.subscribe(v=>this.cod_curso=v);
    this.matriculaForm.get('anio').valueChanges.subscribe(a=>this.anio=a);
    
  }


//CAMPOS DINAMICOS EN EL PDF
bloquearCampos(){
  //ACTUALIZAR VALIDADORES DE FORMULARIO CON ACTIVACION DE CAMPOS
  this.matriculaForm.get('condicionado').valueChanges.subscribe(v=>{
    
    this.cambiarValidadores('condicionado','motivo')
    });
    this.matriculaForm.get('doc_pendiente').valueChanges.subscribe(v=>{
      
      this.cambiarValidadores('doc_pendiente','desc_doc')
    });

}

//CAMBIANDO VALIDADORES DE LOS CONTROLES OPCIONALES
cambiarValidadores(campo:string,campoValidar:string){
  if (this.matriculaForm.get(campo).value===true) {
    
    this.matriculaForm.controls[campoValidar].enable()
    this.matriculaForm.get(campoValidar).setValidators([Validators.required,Validators.minLength(5)]);   
  }else{
    this.matriculaForm.controls[campoValidar].disable()
    this.matriculaForm.patchValue({campoValidar:''})
    this.matriculaForm.get(campoValidar).clearValidators();
  }
  this.matriculaForm.get(campoValidar).updateValueAndValidity();
}

cargarCursos(){
  this.matriculaService.listaCursos().subscribe((resp:any)=>{
    this.cursos = resp.cursos
  });
}

asignarSeccion(){

  this.seccion = this.secciones.find(s=>s.out_cod_seccion==this.matriculaForm.get('seccion').value).out_nombre
}

/**LLAMA A UN SERVICIO PARA RELLENAR LOS DATOS DEL OBJETO ALUMNO Y MOSTRARLOS EN EL PDF */
asignarDatosAlumno(dni){
  if (dni.length>=12) {


   /**
    * ================================================DATOS ALUMNO=================================================
    */
    this.matriculaService.datosAlumno(dni).subscribe((resp:any)=>{
      this.error_dni_alumno=false
      this.datos_alumno=resp.data
      
      this.matriculaForm.patchValue({'cod_alumno':this.datos_alumno[0].out_cod_alumno})
      this.matriculaForm.patchValue({'cod_grupo':this.datos_alumno[0].out_cod_grupo})

      if (resp.data && dni.length==13) {
        this.matriculaForm.patchValue({'nombre_alumno':this.datos_alumno[0].out_nombre})
      }else{
        this.matriculaForm.patchValue({'nombre_alumno':''})
      }
 /**
    * =============================================FIN DATOS ALUMNO=================================================
    */

  /**
    * ================================================DATOS PARENTESCO=================================================
    */
 this.matriculaService.datosParentesco(dni).subscribe((resp:any)=>{
    this.datos_parentesco = resp.data

 },(error:any)=>{console.log(error.error.msg)})
   /**
    * ==============================================FINAL DATOS ALUMNO=================================================
    */

    },(error:any)=>{
      this.error_dni_alumno=true
      this.error_dni_alumno_msg=error.error.msg
    })
  } else {
    return
  }
}

/**ASIGNA UNA SEDE DEL ARREGLO ESTABLECIDO PARA RELLENAR EL PDF */
asignarSede(){
  this.sede = this.sedes.find(s=>s.id==this.matriculaForm.get('sede').value).nombre
}

/**LLENA EL ARREGLO DE SECCIONES DE UN CURSO Y ANIO ESCOGIDO CON ANTERIORIDAD */
cargarSecciones(){
  this.matriculaForm.get('curso').valueChanges.subscribe(c=>{
    this.curso= this.cursos.find(x=>x.out_cod_curso==c).out_nombre;
    this.cursosService.listaSecciones(c,this.anio).subscribe((resp:any)=>{    
    this.secciones= resp.secciones
    })
  })

}

/**MOSTRAR Y OCULAR CAMPOS EN LA VISTA DE CLIENTE */
mostrarCampos(){
this.matriculaForm.get('curso_retrasada').valueChanges.subscribe(c=>{
  this.curso_retrasada= this.cursos.find(x=>x.out_cod_curso==c).out_nombre
})

   this.matriculaForm.get('materia_retrasada_chk').valueChanges.subscribe(v=>{
     
     if (v==true) {
       this.retrasada=true
       //ASIGNANDO VALIDADORES PARA CAMPOS DINÁMICOS
       this.matriculaForm.get('materia_retrasada').setValidators([Validators.required,Validators.minLength(6)])
       this.matriculaForm.get('curso_retrasada').setValidators([Validators.required])
       this.matriculaForm.get('materia_retrasada').updateValueAndValidity()
       this.matriculaForm.get('curso_retrasada').updateValueAndValidity()
     }else{
      this.retrasada=false
      //LIMPIANDO VALIDADORES
      this.matriculaForm.patchValue({'materia_retrasada':''});
      this.matriculaForm.patchValue({'curso_retrasada':''});
      this.matriculaForm.get('materia_retrasada').clearValidators();
      this.matriculaForm.get('curso_retrasada').clearValidators();  
      this.matriculaForm.get('materia_retrasada').updateValueAndValidity()
       this.matriculaForm.get('curso_retrasada').updateValueAndValidity()
     }
   })

  }

  /**SELECCIONA UN ENCARGADO DEL ARREGLO LLENADO EN LA CONSULTA DE DATOS DE ALUMNO POR DNI */
asginarEncargado(dni){
  if (dni.length>=13) {
    this.encargado = this.datos_parentesco.find(e=>e.out_dni==dni)
    if (this.encargado!=undefined) {
      this.matriculaForm.patchValue({'nombre_encargado':this.encargado.out_nombre})
    }
    this.error_dni_encargado=false;
    if (this.encargado==undefined) {
      this.error_dni_encargado=true;
    }
  }
}
/**GENERACION PDF CON CONTEDINO VARIABLE */
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
      [new Cell(new Txt('No. Identidad').alignment('left').fontSize(11).bold().end).end,new Cell(new Txt(this.matriculaForm.get('id_alumno').value).fontSize(11).alignment('left').bold().end).end,' ',' ',' '],
      [new Cell(new Txt('Nombre').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(this.datos_alumno[0].out_nombre).fontSize(11).alignment('left').bold().end).end, new Cell(new Txt('FOTO').alignment('right').bold().end).end,' ',' '],
      [new Cell(new Txt('Fecha de nacimiento').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(this.formatDate(this.datos_alumno[0].out_fec_nacimiento)).fontSize(11).alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Edad').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(`${this.calcularEdad(this.formatDate(this.datos_alumno[0].out_fec_nacimiento))}`).fontSize(11).alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Sexo').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(this.datos_alumno[0].out_sexo).fontSize(11).alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Nacionalidad').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(this.datos_alumno[0].out_nacionalidad).fontSize(11).alignment('left').end).end,' ',' ',' '],
      [new Cell(new Txt('Dirección').fontSize(11).alignment('left').bold().end).end,new Cell(new Txt(this.datos_alumno[0].out_direccion).fontSize(11).alignment('justify').end).colSpan(4).end,' ',' ',' ']
    ]).widths([150,200,'*','*',10]).layout('noBorders').end)

    pdf.add(new Table([
      [' ',' ',' ',' '],
      [new Cell(new Txt('DATOS FAMILIARES').alignment('center').bold().end).colSpan(4).fillColor('gray').end,' ',' ',' '],
      [new Cell(new Txt('Nombre').bold().alignment('center').end).end,new Cell(new Txt('Parentesco').bold().alignment('center').end).end,new Cell(new Txt('Lugar de trabajo').bold().alignment('center').end).end,new Cell(new Txt('Teléfonos').bold().alignment('left').end).end]
    ]).widths([200,63,190,'*']).layout('noBorders').end)

    for (let i = 0; i < this.datos_parentesco.length; i++) {
     pdf.add(new Table([
      [new Cell(new Txt(this.datos_parentesco[i].out_nombre).alignment('left').fontSize(10).end).end,new Cell(new Txt(this.datos_parentesco[i].out_tipo).alignment('left').fontSize(10).end).end,new Cell(new Txt(this.datos_parentesco[i].out_lugar).alignment('left').fontSize(10).end).end,new Cell(new Txt(this.datos_parentesco[i].out_telefonos[0].telefono).alignment('left').fontSize(10).end).end]
     ]).widths([200,63,190,'*']).layout('noBorders').end)
      
    }

    pdf.add(new Table([
      [' ',' ',' '],
      [new Cell(new Txt('DATOS DE MATRICULA').bold().alignment('center').end).colSpan(3).fillColor('gray').end,'',''],
      [new Cell(new Txt('Curso').bold().alignment('center').end).end,new Cell(new Txt('Sección').bold().alignment('center').end).end,new Cell(new Txt('Sede').bold().alignment('center').end).end],
      [new Cell(new Txt(this.curso).alignment('left').fontSize(11).end).end,new Cell(new Txt(this.seccion).alignment('center').fontSize(11).end).end,new Cell(new Txt(this.sede).alignment('center').fontSize(11).end).end],
    ]).widths(['*',45,150]).layout('noBorders').end)

pdf.add(new Table([
  [new Cell(new Txt('DATOS ADICIONALES').bold().alignment('center').end).colSpan(3).fillColor('gray').end,' ',' '],
]).widths(['*','*','*']).layout('noBorders').end);

pdf.add(new Table([
  [' ',' ',' '],
  [new Cell(new Txt('ESTUDIOS REALIZADOS').bold().alignment('left').end).colSpan(3).end,'',''],
  [new Cell(new Txt('Instituto').bold().alignment('center').end).end,new Cell(new Txt('Curso').bold().alignment('center').end).end,new Cell(new Txt('Año').bold().alignment('center').end).end],
  [' ',' ',' ']
]).widths(['*','*',45]).layout('noBorders').end);

if (this.matriculaForm.get('materia_retrasada_chk').value==true) {
  
  pdf.add(new Table([
    [' ',' '],
    [new Cell(new Txt('MATERIA RETRASADA').bold().alignment('left').end).colSpan(2).end,''],
    [new Cell(new Txt(this.matriculaForm.get('materia_retrasada').value).fontSize(11).alignment('center').end).end,new Cell(new Txt(this.curso_retrasada).fontSize(11).alignment('left').end).end],
  ]).widths([150,'*']).layout('noBorders').end);
}

if (this.matriculaForm.get('condicionado').value==true) {
  pdf.add(new Table([
    [' ',' '],
    [new Cell(new Txt('CONDICIONADO').bold().alignment('left').end).colSpan(2).end,''],
    ['',new Cell(new Txt(this.matriculaForm.get('motivo').value).fontSize(11).alignment('justify').end).rowSpan(3).end],
    [new Cell(new Txt('Motivo').bold().alignment('center').end).end,''],
    ['','']
  ]).widths([150,'*']).layout('noBorders').end);
}

if (this.matriculaForm.get('doc_pendiente').value==true) {
  pdf.add(new Table([
    [' ',' '],
    [new Cell(new Txt('DOCUMENTACIÓN PENDIENTE').bold().alignment('left').end).colSpan(2).end,''],
    ['',new Cell(new Txt(this.matriculaForm.get('desc_doc').value).fontSize(11).alignment('justify').end).rowSpan(3).end],
    [new Cell(new Txt('Descipción').bold().alignment('center').end).end,''],
    ['','']
  ]).widths([150,'*']).layout('noBorders').end);
}

/**
 * COMIENZO PAGINA 2
 */
 pdf.add( new Table([
  [new Cell(await new Img('../../../../assets/images/logo_agz.png').build()).alignment('left').rowSpan(3).end,' ',' '],
  [' ',new Cell(new Txt('CENTRO EDUCATIVO NO GUBERNAMENTAL ALFONSO GUILLEN ZELAYA').alignment('center').bold().end).end, ' '],
  ['','','']
]).widths([40,'*',10]).layout('noBorders').pageBreak('before').end);
    

pdf.add(new Table([
  [' ',new Cell(new Txt('Estimado Padre/Madre o Encargado de familia').alignment('left').fontSize(10).end).colSpan(2).end,''],
  ['','',''],
  [' ',new Cell(new Txt('Bienvenido(a) es un placer para nosostros ofrecerle los mejores "SERVICIOS EDUCATIVOS"').alignment('left').fontSize(10).end).colSpan(2).end,''],
  ['','',''],
  ['', new Cell(new Txt('Para efectos de pago de matricula y mensualidades debe hacerlos con el número de cuenta asignado a su hijo(a).').alignment('left').fontSize(10).end).colSpan(2).end,''],
  ['','',''],
  ['','','']
]).widths([75,'*','*']).layout('noBorders').end)

pdf.add(new Table([
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['',new Cell(new Txt('Número Identidad').alignment('center').fontSize(11).bold().end).end,new Cell(new Txt('Nombre del estudiante').fontSize(11).alignment('center').bold().end).colSpan(2).end,'',''],
  ['',new Cell(new Txt(this.matriculaForm.get('id_alumno').value).alignment('center').bold().fontSize(13).end).end,new Cell(new Txt(this.datos_alumno[0].out_nombre).alignment('left').bold().fontSize(13).end).colSpan(3).end,'',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['',new Cell(new Txt('Año de matricula: ').alignment('left').bold().fontSize(11).end).end,new Cell(new Txt(this.anio).fontSize(11).alignment('left').end).end,new Cell(new Txt('Fecha de matricula: ').alignment('left').fontSize(11).bold().end).end,new Cell(new Txt(this.fechaActual).fontSize(11).alignment('left').end).end],
  [' ','','','',''],
  ['',new Cell(new Txt('Curso: ').alignment('left').bold().fontSize(11).end).end,new Cell(new Txt(this.curso).fontSize(10).end).colSpan(3).end,'',''],
  ['','','','',''],
  ['',new Cell(new Txt('Sección: ').alignment('left').bold().fontSize(11).end).end,new Cell(new Txt(this.seccion).fontSize(10).end).colSpan(3).end,'',''],
  ['','','','',''],
  ['',new Cell(new Txt('Sede: ').alignment('left').bold().fontSize(11).end).end,new Cell(new Txt(this.sede).fontSize(10).end).colSpan(3).end,'',''],
]).widths([75,'*','*','*','*']).layout('noBorders').end)


pdf.add(new Table([
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['','',''],
  ['',new Cell(new Txt('Valor a pagar _______________').bold().alignment('center').end).end,'']
]).widths([100,'*',100]).layout('noBorders').end)

pdf.add(new Table([
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  [' ',new Cell(new Txt('NOTA: SI NO REALIZA EL PAGO, EL ALUMNO(A) NO SE CONSIDERA COMO MATRICULADO').fontSize(11).alignment('center').bold().end).end]
]).widths([40,'*']).layout('noBorders').pageBreak('after').end)


/**
 * PAGINA #3
 */

pdf.add(new Table([
  [new Cell(new Txt('DESCUENTO POR GRUPO FAMILIAR').bold().end).end],
  [''],
  [''],
]).layout('noBorders').end)


pdf.add(new Table([
  [''],
  [''],
  [''],
  [new Cell(new Txt('Declaro que estoy de acuerdo con las obligaciones impuestas y los derechos otorgados por el instituto en este documento y el reglamento disciplinario que recibo, comprometiendome a acatarlo y respetarlo y en especial cumplir con responsabilidad y puntualidad el COMPROMISO ECONÓMICO que adquiero con la institución, Centro Educativo no Gubernamental "ALFONSO GUILLÉN ZELAYA", aceptando pagar desde el 5 de febrero y terminando el 5 de noviembre').fontSize(10).alignment('justify').bold().end).end],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
]).layout('noBorders').end)

pdf.add(new Table([

  [new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt(this.encargado.out_nombre).alignment('center').fontSize(10).end).border([false,true,false,false]).end,new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt(this.encargado.out_dni).alignment('center').fontSize(10).end).border([false,true,false,false]).end],
  [new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt('').end).border([false,false,false,false]).end],
  [new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt('NOMBRE Y FIRMA DEL PADRE, MADRE O ENCARGADO(A)').bold().alignment('left').fontSize(9).end).border([false,false,false,false]).end,new Cell(new Txt('').end).border([false,false,false,false]).end,new Cell(new Txt('NÚMERO DE TARJETA DE IDENTIDAD').bold().alignment('center').fontSize(9).end).border([false,false,false,false]).end]
]).widths([10,'*',5,'*']).end);

pdf.add(new Table([
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',''],
  ['',new Cell(new Txt('MATRICULADO POR ___________________________________________________').fontSize(9).bold().end).end]
]).widths([10,'*']).layout('noBorders').end)




pdf.footer(new Txt('*Documento exclusivo para uso de secretaría*').alignment('center').end);

    pdf.create().open();

  }

  /**FORMATO DE FECHA PARA PDF QUITA EL TIMEZONE */
  formatDate(fecha):string{
    let fws = fecha.split('T')
    let f = fws[fws.length-2]
    return f  
  }
/**CALCULO EDAD PARA PDF */
calcularEdad(fecha:string){
  let hoy = new Date();
  let cumpleanos = new Date(fecha);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  let m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}
 

/*LLAMA AL SERVICIO PARA INGRESAR UNA NUEVA MATRICULA */

nuevaMatricula(){
this.formEnviado=true
  if (this.matriculaForm.valid && this.formEnviado) {
  this.matriculaService.nuevaMatricula(this.matriculaForm.value).subscribe((resp:any)=>{
    Swal.fire('Hecho',resp.msg,'success')
    this.formEnviado=false
    this.matriculaForm.reset();
  },(error:any)=>{Swal.fire('Error',error.error.msg,'error')})

  }
}

/**VALIDACION CAMPOS DEL FORMULARIO */
campoNoValido(campo:string){
  if (this.matriculaForm.get(campo).invalid && this.formEnviado){
    return true
    }else{
      return false
    }
}
}
