import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImportDataService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  uploadFile(data:any) {
    return this.http.post(this.url + 'file/upload', 'file' + data);
  }
  uploadFileX(body:any) {
    return this.http.post(this.url + "file/upload", body);
  }

  postFile(data: any, token: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`,
      })
    }
    console.log(headers);
    return this.http.post(this.url + 'file/upload', data, headers);
  }
 
}
