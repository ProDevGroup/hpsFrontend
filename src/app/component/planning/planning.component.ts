import { Component, OnInit, ViewChild } from '@angular/core';
import { KeyValue } from '@angular/common';
import { PlanningServiceService } from './planning-service.service';
import { Planning } from '../models/planning.model';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import * as fs from 'file-saver';


interface defaultValue {
  key: string,
  value: number,
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {


  licenseKey = 'non-commercial-and-evaluation';
  months:any = []; //['202107', '202108', '202109', '202110', '202111'];
  planningData: Planning[] =[];
  data:any =[] ;
  monthsList: defaultValue[]=[];


  choixAffichage: boolean = true;
  dataChart: any = [300, 150];
  changedData: any;
  ecartVentes: any;
  chartOptions = {
    bezierCurve: false,
    responsive: true,
    title: {
      display: false,
      text: 'Combo Bar Line Chart',
    },

    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: true,
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#818284',
      },
      position: 'bottom',
    },
    scales: {
      yAxes: [
        {
          id: 'A',
          gridLines: {
            display: true,
            lineWidth: 0,
            zeroLineWidth: 1,
          },
          position: 'left',
        }
      ],
    },
  };



  constructor(private planningService: PlanningServiceService,
              private toastrService: ToastrService) { }

  getTableData() {
    const dataPlan: any[] = [];
   
    let Data = this.planningData;
  
    this.months = this.months.filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);

      Data.forEach((planning: Planning) => {
      let quarterValues: { [k: string]: any } = {};
     // console.log("defff;;;;" , JSON.stringify(planning.defaultValues.forEach((kvp: KeyValue<string, number>, index: number) => kvp.key)));
      console.log("defff;;;;" , planning);
        //let def : defaultValue;
        let def = planning.defaultValues && planning.defaultValues[0].key;
      console.log(def);

      if(planning?.location != undefined){
        console.log(planning?.location);

      }
      
      planning.defaultValues?.forEach((kvp: { value: any; }, index: number) => {
        quarterValues[`month${index + 1}`] = kvp.value;
        
        console.log("quarterValues...." + JSON.stringify(quarterValues));
        
      });

      dataPlan.push({
        id: planning?.id,
        location: planning?.location,
        projectName: planning?.projectName,
        ...quarterValues,
      });
    });
    console.log(' palnningData...', dataPlan);

  
    this.data = dataPlan;

    this.getPlanningChartValues();
  }

  getDefaultValuesByMonths(months:string[], value:number[]):  KeyValue<string, number>[] {
    const defaultValues: KeyValue<string, number>[] = [];

    for(let i=0; i<months?.length ; i++){
      defaultValues.push({ key: months[i], value: value[i] });
    }

    return defaultValues;
  }

  getPlannings() {
    this.planningService.getPlanning().subscribe((res:any) => {
      
    
      res.forEach((element: Planning) => {
        let planning = {
            id: element.id,
            location: element.location,
            projectName: element.projectName,
            values: element.values,
            months: element.months,
            defaultValues: this.getDefaultValuesByMonths(element.months, element.values)
          };

        element.months.forEach(month=>{
          this.months.push(month);
        })  

        this.planningData.push(planning);
      });
      this.getTableData();
      console.log(' palnningData', this.planningData);
    });
  }

  isCollapsedVerticalLeft = false;
  isCollapsedHorizontalTop = false;
  toggleCollapsedVerticalLeft(): void {
    this.isCollapsedVerticalLeft = !this.isCollapsedVerticalLeft;
  }

  toggleCollapsedHorizontalTop(): void {
    this.isCollapsedHorizontalTop = !this.isCollapsedHorizontalTop;
  }
  
  choixGraph() {
    this.choixAffichage = true;
  }
  choixTable() {
    this.choixAffichage = false;
  }

  getPlanningChartValues() {
    this.planningService.getPlanningValues().subscribe((response: any) => {
      console.log('planning values===', response);
      //this.ecartVentes = response.chartValues;
      response && this.populate_chart(response);
      console.log('response::', response);

    },
    (error: any) => {
      if (error.error.code === '001') {
        this.toastrService.warning(
          `No planning values!`
        );
      } 
     
    });

  }
  populate_chart(data: any) {
    console.log(data + 'new object');

    this.changedData = {
      lineTension: '0',
      labels: data.months,
      datasets: [
        {
          yAxisID: 'A',
          type: 'bar',
          label: 'Hours',
          backgroundColor: '#24ccb8',
          data:  data.chartValues,

        }
      ],
    };
    this.dataChart = Object.assign({}, this.changedData);
  }

  exportExcel() {
    let name = "planning" + '_' + Date.now;
    this.planningService.exportExcel()
      .subscribe((response: any) => {
        this.downloadFile(response, name);
      });
  }
  downloadFile(data: any, name: any) {
    const blob = new Blob([data], { type: 'blob' });
    fs.saveAs(blob, name + '.xlsx');
  }

  ngOnInit(): void {
    this.getPlannings();

  }
  
}
