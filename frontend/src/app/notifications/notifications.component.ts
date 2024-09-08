import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notiification } from '../models/notification';
import { User } from '../models/user';
import { NotificationsService } from '../notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {

  constructor(private router: Router,private service: NotificationsService) { }

  ngOnInit(): void {
    //get all notifications for user
    this.user=JSON.parse(localStorage.getItem("loggedUser"));
    this.service.getNotifications(this.user.username).subscribe((notifs: Notiification[])=>{
      this.notificationsArray=notifs;
    })
  

  }

  notificationsArray: Notiification[]=[];
  user: User;
  selectedMsg: Notiification;

  return(){
    this.router.navigate(['plainUser']);
    
  }

  notifications(){
    this.router.navigate(['notifications']);
  }

  account(){
    this.router.navigate(['account']);
  }
  deleteMessage(notify){
    this.service.deleteNotification(notify.id).subscribe(res=>{
      if(res['message']=="ok"){
        this.notificationsArray.forEach((no,index)=>{
          if(no.id==notify.id) this.notificationsArray.splice(index,1);
        })
      }
    })

  }
  markAsRead(notify){
    this.service.markAsRead(notify.id).subscribe(res=>{
      if(res['message']=="ok"){
        this.notificationsArray.forEach((no,index)=>{
          if(no.id==notify.id) this.notificationsArray[index].read=1;
        })
      }
    })

  }

}
