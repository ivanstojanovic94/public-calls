import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  pushNotification(notification){
    let req = notification;
    return this.http.post(`${this.uri}/notifications/pushNotification`,req);

  }

  getNotifications(username){
    let req = {
      username: username
    }
    return this.http.post(`${this.uri}/notifications/getNotifications`,req);
  }

  deleteNotification(id){
    let req={
      id: id
    }

    return this.http.post(`${this.uri}/notifications/deleteNotification`,req);
  }

  markAsRead(id){
    let req={
      id: id
    }
    return this.http.post(`${this.uri}/notifications/markAsRead`,req);
  }
}
