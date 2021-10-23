import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private url = environment.baseUrl;
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'text'
    })
  }
  constructor(private http: HttpClient,
    private router: Router) { }

  login(body: any) {
    return this.http.post(this.url + 'user/authenticate', body, this.headers);
  }
  getAuthUser() {
    let id = localStorage.getItem("USER_ID");
    return this.http.get(this.url + 'user/' + id);
  }
  findById(id: any) {
    return this.http.get(this.url + 'user/' + id);
  }
 
}
