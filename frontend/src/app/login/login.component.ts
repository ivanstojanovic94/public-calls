import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserGeneralService } from '../user.general.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userGeneralService: UserGeneralService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  //usernameCtrl=new FormControl('',[Validators.required]);
  //passwordCtrl=new FormControl('',Validators.required);



  login(){
    this.userGeneralService.login(this.username, this.password).subscribe((user:User)=>{
      if(user){

        localStorage.setItem('loggedUser',JSON.stringify(user));
        if(user.type==0){
          this.router.navigate(['plainUser']);
        }else{
          this.router.navigate(['admin']);
        }
      }else{
        this.message = "Korisničko ime ili lozinka nisu ispravni!";
        this.username="";
        this.password="";
      }
    })

    
  }





}
