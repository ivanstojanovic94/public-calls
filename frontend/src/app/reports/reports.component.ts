
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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

 
  
 
  selected: string;
  reports =["Prijave po pozivu", "Prijave po naučnom polju", "Prijave po instituciji"];

  constructor(private http: HttpClient, private appService: ApplicationService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.selected="Prijave po pozivu";
    
  }


 
//appssPerInstitution?
//appssPerScientificField?
//callsPerCategory?

  
  

}
