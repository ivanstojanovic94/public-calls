import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserGeneralService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

login(username: string, password:string){
  const req={
    username: username,
    password: password
  }
  return this.http.post(`${this.uri}/userGeneral/login`, req);
}

changePassword(username, newPass){
  const req={
    username: username,
    newPass: newPass
  };

  return this.http.post(`${this.uri}/userGeneral/changePassword`,req);

}

deactivateAccount(username){
  const req={
    username: username
  };

  return this.http.post(`${this.uri}/userGeneral/deactivateAccount`,req);
}

register(user: User){
  const req=user;
  return this.http.post(`${this.uri}/userGeneral/register`,req);
}



}