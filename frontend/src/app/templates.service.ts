import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getTemplate(){
    return this.http.get(`${this.uri}/registrationTemplate/getTemplate`);
  }

  addNewTemplate(template){
    let req={
      data: template
    }
    return this.http.post(`${this.uri}/registrationTemplate/addNewTemplate`,req);

 
  }

  deleteOldTemplate(){
    return this.http.delete(`${this.uri}/registrationTemplate/deleteOldTemplate`);
  }
}
