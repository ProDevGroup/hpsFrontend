import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environment.baseUrl ;
  private headers = {
    headers: new HttpHeaders({
     
    })
  }
  constructor(private http: HttpClient) { }

  postUser(data: User){
    return this.http.post(this.url +'user/create', data);
  }
  
}
