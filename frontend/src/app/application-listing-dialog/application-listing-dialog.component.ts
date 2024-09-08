import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationService } from '../application.service';
import { Wrapper } from '../drafts/drafts.component';
import { Application } from '../models/application';
import { Notiification } from '../models/notification';
import { NotificationsService } from '../notifications.service';

/*export class DataDialogWrapper{
  apps: Application[];
}*/

@Component({
  selector: 'app-application-listing-dialog',
  templateUrl: './application-listing-dialog.component.html',
  styleUrls: ['./application-listing-dialog.component.css']
})
export class ApplicationListingDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Application[], public dialogRef: MatDialogRef<ApplicationListingDialogComponent>,
  private service: ApplicationService, private serviceNotification: NotificationsService) { }

  ngOnInit(): void {
    this.applications=this.data;
    this.values=[];
    this.filePropertyFlags=[];
      
      this.applications.forEach(app=>{
        let wrapper=new Wrapper();
        wrapper.displayArr=[];
        wrapper.displayArr=Object.keys(app.data).map(k => app.data[k]);
        for(const item in app.data){
          let regex=/((\.jpg)|(\.png)|(\.pdf)|(\.doc)|(\.docx)|(\.xlsx)|(\.txt))$/;
          if(regex.test(app.data[item])){
            this.filePropertyFlags.push(true);
          }else{
            this.filePropertyFlags.push(false);
          }
        }
        //console.log(this.filePropertyFlags);
       
        this.values.push(wrapper);
  })}

  applications: Application[]=[];
  values: Wrapper[]=[];
  filePropertyFlags: boolean[];
  uploadsURI='http://localhost:4000/uploads/';

  accept(app){
    this.service.acceptApplication(app.id).subscribe(res=>{
      if(res['message']=="ok"){
        this.applications.forEach((element,index)=>{
          if(element.id==app.id) this.applications[index].status="prihvaceno";
       });
      //push notification
      let notifyAccept= new Notiification();
      notifyAccept.publicCallName=app.callName;
      let date=new Date();
      notifyAccept.date=(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
      notifyAccept.user=app.user;
      notifyAccept.read=0;
      notifyAccept.message=`Vaša prijava za javni poziv ${notifyAccept.publicCallName} je prihvaćena!`;
      this.serviceNotification.pushNotification(notifyAccept).subscribe(res=>{
        if(res['message']=="ok") {};
      })
      

      }
    });

  }
  decline(app){
    this.service.declineApplication(app.id).subscribe(res=>{
      if(res['message']=="ok"){
        
        this.applications.forEach((element,index)=>{
          if(element.id==app.id) this.applications[index].status="odbijeno";
       });
      }
    });

  }


}