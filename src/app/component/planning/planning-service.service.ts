import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class PlanningServiceService {


  private url = environment.baseUrl;
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  getPlanning() {
    return this.http.get(this.url + 'planning/allplanning');
  }

  createProject(project: Project) {
    return this.http.post(this.url + 'project/createProject', project);
  }
  
  getPlanningValues() {
    return this.http.get(this.url + 'planning/chartValues');
  }
  
  exportExcel() {
    return this.http.get(
      this.url + 'file/exportExcel',
      { responseType: 'blob' }
    );
  }
}
