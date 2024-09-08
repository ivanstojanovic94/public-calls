import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Application } from '../models/application';
import { User } from '../models/user';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Wrapper } from '../drafts/drafts.component';

export class LabelValue{
  label: string;
  value: string;
}

@Component({
  selector: 'app-sent-applications',
  templateUrl: './sent-applications.component.html',
  styleUrls: ['./sent-applications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SentApplicationsComponent implements OnInit {


  dataSource: MatTableDataSource<Application>;
  constructor(private service: ApplicationService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("loggedUser"));
    this.service.getSentApplications(this.user.username).subscribe((sentApplications: Application[])=>{
      this.appData=[];
      this.sentApps=sentApplications;

      this.filePropertyFlags=[];
      this.sentApps.forEach(sa=>{
       
        let wrapper=new Wrapper();
        wrapper.displayArr=[];
        wrapper.displayArr=Object.keys(sa.data).map(k => sa.data[k]);
        
        this.appData.push(wrapper);
        let arr=[];
        for(const item in sa.data){
          let regex=/((\.jpg)|(\.png)|(\.pdf)|(\.doc)|(\.docx)|(\.xlsx)|(\.txt))$/;
          if(regex.test(sa.data[item])){
            
            arr.push(true);
          }else{
            arr.push(false);
          }
        }
        this.filePropertyFlags.push(arr);
        
      })
      

    })
  }
 
 
  sentApps: Application[]=[];
  appData: Wrapper[]=[];
  user: User;
  filePropertyFlags: Array<boolean[]>;
  uploadsURI='http://localhost:4000/uploads/';

  initColumns =[{name:'callName', display:'Javni poziv'}, {name:'postingDate', display: 'Datum slanja'}, {name:'status', display: 'Status prijave'}];
  columnsToDisplay = this.initColumns.map(col=>col.name);
  expandedElement: Application | null;

  notShowingApp(app){
    this.service.stopShowingToUser(app.id).subscribe(res=>{
      if(res['message']=="ok"){
       
        this.sentApps.forEach((a,ind)=>{
          if(a.id==app.id) this.sentApps.splice(ind,1);
          
        })
      }
    })
    
  }

}
