import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserGeneralService } from '../user.general.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  constructor(private userGeneralService: UserGeneralService, private router: Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("loggedUser"));
    //this.userData=Object.keys(this.user.data);
  }

  messagePassword: string;
  currentPass: string;
  pass: string;
  success: boolean;
  passconfirm: string;
  user: User;
  userData:string[]=[];

  notifications(){
    this.router.navigate(['notifications']);
  }

  account(){
    this.router.navigate(['account']);
  }

  return(){
    if(this.user.category=="admin"){
      this.router.navigate(['admin']);
    }else{
    this.router.navigate(['plainUser']);
    }
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
}
