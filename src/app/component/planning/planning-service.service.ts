import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


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
}
