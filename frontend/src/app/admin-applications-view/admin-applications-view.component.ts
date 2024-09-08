import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { ApplicationListingDialogComponent } from '../application-listing-dialog/application-listing-dialog.component';
import { ApplicationService } from '../application.service';
import { Application } from '../models/application';
import { PublicCall } from '../models/publicCall';

@Component({
  selector: 'app-admin-applications-view',
  templateUrl: './admin-applications-view.component.html',
  styleUrls: ['./admin-applications-view.component.css']
})
export class AdminApplicationsViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'scienceField', 'institution', 'publishDate', 'deadline', 'actionColumn'];
  dataSource: MatTableDataSource<PublicCall>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 
  publicCalls: PublicCall[]=[];
  applications: Application[]=[];

  constructor(private service: AdminService, private appService: ApplicationService, private dialog: MatDialog) {
    
   }

   
 ngOnInit():void{
  this.service.retrieveAllPublicCalls().subscribe((calls: PublicCall[])=>{
    this.publicCalls=calls;
    this.dataSource=new MatTableDataSource(calls);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
    
 })

 }

 viewApps(id){
   
   //get all applications for public call
   //show them in new dialog
   this.appService.getApplicationsOfCall(id).subscribe((apps: Application[])=>{
     this.applications=apps;
     //show in dialog
     const dialogRef=this.dialog.open(ApplicationListingDialogComponent,{data: this.applications, height: '600px', width:'600px'});
    dialogRef.afterClosed().subscribe(result=>{

    });
   })



 }

  

 

}
