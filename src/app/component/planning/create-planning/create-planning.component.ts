import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { PlanningServiceService } from '../planning-service.service';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.css']
})
export class CreatePlanningComponent implements OnInit {

  project: Project ={
    id: '',
    projectName: '',
    projectDesc: '',
    organization: '',
    country: '',
    city: '',
    value: 0
  }

  constructor(private planService: PlanningServiceService,
              private router: Router,
              /* private tokenStorage: TokenStorageService */) { }

  ngOnInit(): void {
   // this.trip.clientId =  this.tokenStorage.getUser().id;
        //console.log("trip-form test: " + JSON.stringify(th));
  }

  onSavePlan() {
    this.planService.createProject(this.project).subscribe(
      data => {
        console.log(data);
        this.project = new Project();
        this.backToList();
      },
      (error: any) => console.log(error));
  }

  backToList() {
    this.router.navigate(['/planning'])
  }

  
}
