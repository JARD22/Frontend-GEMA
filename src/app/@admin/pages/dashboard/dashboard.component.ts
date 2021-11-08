import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  metricas:any;

  constructor(private matriculaService:MatriculaService) { }

  ngOnInit(): void {

    this.matriculaService.metricas(2022).subscribe((resp:any)=>{
      this.metricas = resp.metricas;
      console.log(this.metricas)
    })
  }

}
