import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { ApplicationService } from '../application.service';
import { PublicCall } from '../models/publicCall';
import { AppsPerCall } from '../reports/reports.component';

export class AppsPerInstitution{

  institution: string;
  count: number;
}

@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {

  fileName='';
  displayedColumns = ['institution', 'count'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<AppsPerInstitution>;
  
  basicData: any;
  basicOptions: any;
  selected: string;
 

  constructor(private http: HttpClient, private appService: ApplicationService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.appService.numberOfAppsPerInstitution().subscribe((res: [])=>{
      this.filteredCalls=[];
    
      
      res.forEach(r=>{
        let obj =new AppsPerInstitution();
       
        obj.institution=r['_id'];
        obj.count=r['count'];
        this.filteredCalls.push(obj);
      })
     // console.log(this.appsPerCall);
     
       //
       this.data=[];
       this.selected="Prijave po pozivu";
       this.dataSource = new MatTableDataSource<AppsPerInstitution>(this.filteredCalls);
       this.dataSource.paginator = this.paginator;
       this.filteredCalls.forEach(call=>{
         
        this.data.push({'name':call.institution,'value':call.count});
       })
       
       
     
 
     
    })
    
  }

  appsPerCall: []=[];
 filteredCalls: AppsPerInstitution[]=[];
 callNames: string[]=[];
 data: any[]=[];
 
//appssPerInstitution?
//appssPerScientificField?
//callsPerCategory?

  

}
