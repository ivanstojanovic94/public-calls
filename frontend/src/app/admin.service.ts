import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  openPublicCall(name, publishDate, deadline, basicInfo, userGroup, scienceField, institution, applicationDataConfig){

    const reqData = {
      name: name,
      publishDate: publishDate,
      deadline: deadline,
      basicInfo: basicInfo,
      userGroup: userGroup,
      scienceField: scienceField,
      institution: institution,
      applicationDataConfig: applicationDataConfig

    };


    return this.http.post(`${this.uri}/admin/openCall`,reqData);

  }

  retrieveAllPublicCalls(){
    return this.http.get(`${this.uri}/publicCalls/retrievePublicCalls`);
  }

  


}
