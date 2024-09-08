import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DataConfig } from '../models/dataConfig';
import { Display } from '../models/display';
import { TemplateRegister } from '../models/templateRegister';
import { User } from '../models/user';

import { TemplatesService } from '../templates.service';
import { UserGeneralService } from '../user.general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: TemplatesService, private userService: UserGeneralService,
    public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {

    this.service.getTemplate().subscribe((templateData: TemplateRegister)=>{
      this.helper=new TemplateRegister();
      this.helper=templateData;
     // console.log(this.helper);
      this.questions=this.helper.data;
      //console.log(JSON.stringify(this.questions));
      
      this.form=this.toFormGroup();
    })
  }

  username: string;
  password: string;
  confirmPassword: string;
  message: string;
  helper: TemplateRegister={} as TemplateRegister;

  form: FormGroup;
  payLoad="";
  
  questions: DataConfig<any>[]=[];
  uri = 'http://localhost:4000';
  url=`${this.uri}/publicCalls/getPublicCallById`;
  
  newUser: User;
  displayed: Display[]=[];

  
  isValid(question) { 
   
    return this.form.controls[question.name].valid; 
  
    }

  toFormGroup() {
    
    
    const group: any = {};

    this.questions.forEach(question => {
     
      group[question.name] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }




  onSubmit(stepper: MatStepper){
    //register user
    //check if username allready exists??
    if(this.password != this.confirmPassword){
      this.message="Lozinka i potvrda lozinke se razlikuju!";
      stepper.previous();

    }else{
      //passed the intro checkings
      this.payLoad = JSON.stringify(this.form.getRawValue());
      let data=this.form.getRawValue();
      this.newUser=new User();
      this.newUser.data=JSON.parse(this.payLoad);
      this.newUser.username=this.username;
      this.newUser.password=this.password;
      this.newUser.activeAccount=1;
      this.newUser.type=0;
      this.newUser.category=data['category'];
      //save user plus info after successful registration
      this.userService.register(this.newUser).subscribe(res=>{
        if(res['message']=='ok'){
         
          //open dialog with info
         let dialogRef= this.dialog.open(RegistrationConfirmation);
         dialogRef.afterClosed().subscribe(res=>{
           this.form.reset();
           this.username="";
           this.password="";
           this.confirmPassword="";
           this.message="";
           this.payLoad="";
           stepper.selectedIndex=0;
         })
        }else{
          if(res['message']=='usernameExists'){
            this.message="Korisničko ime već postoji!";
            stepper.selectedIndex=0;
          }
          //username already exists
        }
      })

      

    }
  }

  return(){
    this.router.navigate(['/']);
    
  }
 
  

}

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.html',
 
})
export class RegistrationConfirmation{
  constructor(private router: Router){}
  backToLogin(){
    this.router.navigate(['/']);
  }
}
