import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path:'usuarios',
        loadChildren:()=> import('./users/users.module').then(m=>m.UsersModule)
      },
      {
        path:'listado-alumnos',
        loadChildren:()=> import('./listado-alumnos/listado-alumnos.module').then(m=>m.ListadoAlumnosModule)
      },
      {
        path:'nueva-matricula',
        loadChildren: ()=>import('./nueva-matricula/nueva-matricula.module').then(m=>m.NuevaMatriculaModule)
      },
      {
        path:'editar-alumno',
        loadChildren:()=> import('./editar-alumno/editar-alumno-routing.module').then(m=>m.EditarAlumnoRoutingModule)
      },
      {
        path:'nueva-persona',
        loadChildren:()=> import('./nueva-persona/nueva-persona.module').then(m=>m.NuevaPersonaModule)
      },
      {
        path:'nuevo-usuario',
        loadChildren:()=> import('./nuevo-usuario/nuevo-usuario.module').then(m=>m.NuevoUsuarioModule)
      },
      {
        path:'contratos',
        loadChildren:()=>import('./contratos/contratos.module').then(m=>m.ContratosModule)
      },
      {
        path:'cursos-secciones',
        loadChildren:()=>import('./cursos/cursos-secciones.module').then(m=>m.CursosSeccionesModule)
      },
      {
        path:'pantallas-rol',
        loadChildren:()=>import('./pantallas-rol/pantallas-rol.module').then(m=> m.PantallasRolModule)
      },
      {
        path:'roles',
        loadChildren:()=>import('./roles/roles.module').then(m=>m.RolesModule)
      },
      {
        path:'reportes',
        loadChildren:()=>import('./reportes/reportes.module').then(m=>m.ReportesModule)
      },
      {
        path:'parametros',
        loadChildren:()=>import('./parametros/parametros.module').then(m=>m.ParametrosModule)
      },
      {
        path:'clausulas-contrato',
        loadChildren:()=>import('./clausulas-contrato/clausulas-contrato.module').then(m=>m.ClausulasContratoModule)
      },
      {
        path:'secciones',
        loadChildren:()=>import('./secciones/secciones.module').then(m=>m.SeccionesModule)
      },
      {
        path:'persona',
        loadChildren:()=>import('./persona/persona.module').then(m=>m.PersonaModule)
      },
      {
        path:'lista-personas',
        loadChildren:()=>import('./lista-personas/lista-personas.module').then(m=>m.ListaPersonasModule)
      },
      {
        path:'colegios',
        loadChildren:()=>import('./colegios/colegios.module').then(m=>m.ColegiosModule)
      },
      {
        path:'**',
        redirectTo:'admin',
        pathMatch:'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
