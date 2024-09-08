import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from './models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  saveApplication(app: Application){
    let req = app;

    return this.http.post(`${this.uri}/applications/saveApplication`, req);

  }

  getDrafts(username){
    let req={
      username: username
    }
    return this.http.post(`${this.uri}/applications/getDrafts`,req);
  }

  deleteDraft(id){
    let req={
      id: id
    }

    return this.http.post(`${this.uri}/applications/deleteDraft`,req);
  }

  getSentApplications(username){
    let req={
      username: username
    }
    return this.http.post(`${this.uri}/applications/sentApplications`,req);
  }

  getApplicationsOfCall(idCall){
    let req={
      id: idCall
    }
    return this.http.post(`${this.uri}/applications/appsOfCall`,req);

  }

  acceptApplication(id){
    let req={
      id: id
    }
    return this.http.post(`${this.uri}/applications/acceptApp`,req);
  }
  
  declineApplication(id){
    let req={
      id: id
    }

    return this.http.post(`${this.uri}/applications/declineApp`,req);
  }

  stopShowingToUser(id){
    let req={
      id: id
    }
    return this.http.post(`${this.uri}/applications/stopShowingApp`,req);

  }

  numberOfAppsPerCall(){
    return this.http.get(`${this.uri}/applications/numberOfAppsPerCall`);
  }
  numberOfAppsPerScienceField(){
    return this.http.get(`${this.uri}/applications/numberOfAppsPerScienceField`);
  }
  numberOfAppsPerInstitution(){
    return this.http.get(`${this.uri}/applications/numberOfAppsPerInstitution`);
  }
 
}
