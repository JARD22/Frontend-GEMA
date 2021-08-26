import { Component  } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
  ]
})
export class ReportesComponent  {

  // Grafico de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Kinder', 'Preparatoia', 'Primero','Segundo','Tercero','Cuarto','Quinto','Sexto'];

  public barChartLabelsColegio: Label[] = ['Septimo', 'Octavo', 'Noveno','10BCH','10BTP','11BCH','11BTPI','11BTP-CF','12BTPI','12BTPCF'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 36, 27, 30, 40], label: 'Alumnos' }
  ];
  public barChartDataColegio: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 33, 27, 25, 35, 40, 30], label: 'Alumnos' }
  ];

}
