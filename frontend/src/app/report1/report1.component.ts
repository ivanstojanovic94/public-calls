
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { ApplicationService } from '../application.service';
import { DataConfig } from '../models/dataConfig';
import { PublicCall } from '../models/publicCall';

import { TemplatesService } from '../templates.service';

export class AppsPerCall{
  call: PublicCall;
  count: number;
}

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {

  fileName='';
  displayedColumns = ['id', 'name', 'publishDate', 'deadline', 'count'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<AppsPerCall>;
  
  basicData: any;
  basicOptions: any;
 
  

  constructor(private http: HttpClient, private appService: ApplicationService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.appService.numberOfAppsPerCall().subscribe((res: [])=>{
      this.appsPerCall=res;
     // console.log(this.appsPerCall);
     this.adminService.retrieveAllPublicCalls().subscribe((calls: PublicCall[])=>{
      this.filteredCalls=[];
      this.callNames=[];
      this.data=[];
       calls.forEach(call=>{
         this.appsPerCall.forEach(apc=>{
           if(apc['_id']==call.id){
             let obj=new AppsPerCall();
             obj.call=call;
             obj.count=apc['count'];
             this.filteredCalls.push(obj);
             this.data.push({'name':call.name,'value':apc['count']});
             
             
           }
         })

       })
       //
       
       this.dataSource = new MatTableDataSource<AppsPerCall>(this.filteredCalls);
       this.dataSource.paginator = this.paginator;
       
     
 
     })
    })
    
  }

  appsPerCall: []=[];
 filteredCalls: AppsPerCall[]=[];
 callNames: string[]=[];
 data: any[]=[];
 
//appssPerInstitution?
//appssPerScientificField?
//callsPerCategory?

  
  

}
