import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { ApplicationService } from '../application.service';
import { PublicCall } from '../models/publicCall';
import { AppsPerCall } from '../reports/reports.component';

export class AppsPerField{
  field: string;
  count: number;
}

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {

  fileName='';
  displayedColumns = ['field', 'count'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<AppsPerField>;
  
  basicData: any;
  basicOptions: any;
  selected: string;
  reports =["Prijave po pozivu", "Prijave po naucnom polju"];

  constructor(private http: HttpClient, private appService: ApplicationService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.appService.numberOfAppsPerScienceField().subscribe((res: [])=>{
      this.filteredCalls=[];
      
      res.forEach(r=>{
        let obj =new AppsPerField();
        obj.field=r['_id'];
        obj.count=r['count'];
        this.filteredCalls.push(obj);
      })
     // console.log(this.appsPerCall);
     
       //
       this.data=[];
       this.selected="Prijave po pozivu";
       this.dataSource = new MatTableDataSource<AppsPerField>(this.filteredCalls);
       this.dataSource.paginator = this.paginator;
       this.filteredCalls.forEach(call=>{
         
        this.data.push({'name':call.field,'value':call.count});
       })
       
       
     
 
     
    })
    
  }

  appsPerCall: []=[];
 filteredCalls: AppsPerField[]=[];
 callNames: string[]=[];
 data: any[]=[];
 
//appssPerInstitution?
//appssPerScientificField?
//callsPerCategory?

  

}
