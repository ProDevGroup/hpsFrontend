import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { PlanningServiceService } from './planning-service.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  //carData : any[] | undefined;
  licenseKey = 'non-commercial-and-evaluation';
  years = ['202107', '202108', '202109', '202110', '202111'];
  planningData: any =[];
  data:any =[] ;

  constructor(private planningService: PlanningServiceService) { }

  getTableData() {
    let dataPlan: any[] = [];

     /* let carData = [
      { id: 1, make: 'Tesla', model: 'Model S',value:[1,2,3,4,4.1], defaultValues: this.getDefaultValuesByYear() },
      { id: 2, make: 'Mercedes', model: 'S-Class Coupe',value:[5,6,7,8,8.1], defaultValues: this.getDefaultValuesByYear() },
      { id: 3, make: 'Toyota', model: 'Corolla',value:[9,10,11,12,12.1], defaultValues: this.getDefaultValuesByYear() },
      { id: 4, make: 'Volvo', model: 'S60',value:[13,14,15,16,16.1], defaultValues: this.getDefaultValuesByYear() },
    ]; */

    let Data = this.planningData;
      Data.forEach((planning: { defaultValues: any[]; value: any[]; id: any; location: any; projectName: any; }) => {
      const quarterValues: { [k: string]: any } = {};
      console.log("qua;;;;" , planning);

      planning.defaultValues.forEach((kvp, index) => {
        quarterValues[`year${index + 1}`] = kvp;
        
        console.log("quarterValues...." + JSON.stringify(quarterValues));
        
      });

      dataPlan.push({
        id: planning.id,
        location: planning.location,
        projectName: planning.projectName,
        ...quarterValues,
      });
    });
    console.log(' palnningData...', this.planningData);

    /* for (let i = 0; i < this.planningData.length; i++) {
      console.log("work", i);
      
      const quarterValues: { [k: string]: any } = {};    

      /* this.planningData.defaultValues.forEach((kvp, index) => {
        console.log("work2");
        
        quarterValues[`year${index + 1}`] = Data[i].value[index];
        
        console.log("quarterValues" + JSON.stringify(quarterValues));
        
      }); 
      if (Data.length > 0) {
        for (let index = 0; index < this.years.length; index++) {
        quarterValues[`year${index + 1}`] = this.planningData[i].value[index];
        console.log("work2");
        console.log("quarterValues" + JSON.stringify(quarterValues));
        
      }
      }
      
      console.log("work2", i);

      dataPlan.push({
        id: Data[i].id,
        location: Data[i].location,
        projectName: Data[i].projectName,
        ...quarterValues,
      });
    } */

    this.data = dataPlan;
  }

  getDefaultValuesByQuarter(value:number[]): KeyValue<string, number>[] {
    const defaultValues: KeyValue<string, number>[] = [];

    for(let i=0; i<this.years.length ; i++){
      defaultValues.push({ key: this.years[i], value: value[i] });
    }
    /* this.years.forEach(year => {
      defaultValues.push({ key: year, value: 233 });
    }); */
    console.log("defaultValues" + JSON.stringify(defaultValues));

    return defaultValues;
  }

  getPlannings() {
    this.planningService.getPlanning().subscribe((res:any) => {
      
      res.forEach((element: { id: any; location: any; projectName: any; values: any; quarters: any; }) => {
        let planning = [
          {
            id: element.id,
            location: element.location,
            projectName: element.projectName,
            values: element.values,
            quarters: element.quarters,
            defaultValues: this.getDefaultValuesByQuarter(element.values)
          },
        ];
        this.planningData.push(planning);
      });
//      this.planningData = res;
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
  

  ngOnInit(): void {
    this.getPlannings();

  }
  
}
