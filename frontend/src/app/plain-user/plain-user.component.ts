import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DataConfig } from '../models/dataConfig';
import { PublicCall } from '../models/publicCall';
import { User } from '../models/user';
import { UserCustomService } from '../user-custom.service';
import { UserGeneralService } from '../user.general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';




@Component({
  selector: 'app-plain-user',
  templateUrl: './plain-user.component.html',
  styleUrls: ['./plain-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
  
 
})
export class PlainUserComponent implements OnInit {

  
  
  dataSource: MatTableDataSource<PublicCall>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,private userGeneralService: UserGeneralService, private userCustomService: UserCustomService) {

    
  }

  
    
  
    
   

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("loggedUser"));
    //dovuci sve javne pozive sa backenda
    this.userCustomService.getAllPublicCalls(this.user.category).subscribe((publicCalls: PublicCall[])=>{
      this.allPublicCalls=publicCalls;
      this.dataSource=new MatTableDataSource(publicCalls);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    
    })
    
  }


  selectedCall: PublicCall;
  user: User;
  currentPass: string;
  pass: string;
  passconfirm: string;
  messagePassword: string;
  success: boolean;
  allPublicCalls: PublicCall[]=[];
  initColumns =[{name:'name', display:'Naziv'},{name: 'scienceField', display: 'Naučno polje'},{name: 'institution', display: 'Institucija'}, {name:'publishDate', display: 'Datum objave'}, {name:'deadline', display: 'Rok prijave'}];
  columnsToDisplay = this.initColumns.map(col=>col.name);
  expandedElement: PublicCall | null;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  notifications(){
    this.router.navigate(['notifications']);
  }

  account(){
    this.router.navigate(['account']);
  }
 

  signOut(){
    localStorage.clear();
    this.router.navigate(['/']);
    
  }

  changePassword(){
    if(this.currentPass != this.user.password){
      this.messagePassword="Lozinka koja je uneta je netačna!";
      this.success=false;
    }else{
    
    if(this.pass != this.passconfirm || this.pass=="" || this.pass==null || this.passconfirm=="" || this.passconfirm==null){
      this.messagePassword="Lozinka i potvrda lozinke se razlikuju!";
      

    }else{
      
    
      //change on back
      this.userGeneralService.changePassword(this.user.username,this.pass).subscribe(res=>{
        if(res['message']=='ok'){
          this.messagePassword="Uspešno ste promenili lozinku!";
          this.success=true;
        }
      });
      this.user.password=this.pass;


      
    }}
    setTimeout(()=>{
      this.currentPass="";
      this.passconfirm="";
      this.pass="";
      this.messagePassword="";
      this.success=false;
      
    },10000)
  }


  deactivateAccount(){
    if(this.currentPass != this.user.password || this.currentPass=="" || this.currentPass==null){
      this.messagePassword="Lozinka koja je uneta nije ispravna!";
      this.success=false;
    }else{
      //ok 
      this.userGeneralService.deactivateAccount(this.user.password).subscribe(res=>{
        if(res['message']=='ok'){
          this.messagePassword="Vaš nalog je deaktiviran. Žao nam je što odlazite.";
          this.success=true;
        }
        });
        setTimeout(()=>{
          this.messagePassword="";
          this.success=false;
          localStorage.removeItem('loggedUser');
          this.router.navigate(['/']);
        },10000)
      
    }
    setTimeout(()=>{
      this.messagePassword="";
          this.success=false;

    },5000)
    
  }

  applyForCall(publicCall: PublicCall){
    this.selectedCall=publicCall;
    localStorage.setItem("idSelectedCall",publicCall.id.toString());
    this.router.navigate(['applicationForm']);

  }




  

}
