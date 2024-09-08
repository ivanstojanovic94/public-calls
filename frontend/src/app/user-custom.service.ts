import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCustomService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }


  getAllPublicCalls(userGroup){

    const req={
      userGroup: userGroup
    }

    return this.http.post(`${this.uri}/publicCalls/getAllPublicCalls`,req);

  }
}
