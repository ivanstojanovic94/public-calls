import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { DataConfig } from '../models/dataConfig';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  constructor(private service: TemplatesService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  i: number=1;
  userGroupOption: string;
  userGroups: any[]=[];
 
  registrationData: DataConfig<any>[]=[];
  label:string;
  requiredData: boolean;
  options: any[]=[];

  typeChecker:string;
  optionValue:string;
  optionKey: string;


  addGroupOption(){
    let ob={
      key: this.userGroupOption.replace(/\s/g,"").toLocaleLowerCase(),
      value: this.userGroupOption

    }
    this.userGroups.push(ob);
    this.userGroupOption="";
    this.i++;
   

  }

  addOption(){
    let ob={
      key: this.optionValue.replace(/\s/g,"").toLocaleLowerCase(),
      value: this.optionValue

    }
    this.options.push(ob);
    this.optionValue="";
    this.optionKey="";

  }

  addGroup(stepper: MatStepper){
    let fieldConfigObj = new DataConfig<any>();
    fieldConfigObj.label="Grupa korisnika";
    fieldConfigObj.name="category";
    fieldConfigObj.required=true;
    fieldConfigObj.options=this.userGroups;
    fieldConfigObj.value="";
    fieldConfigObj.type="select";
    fieldConfigObj.inputType="";
    this.registrationData.push(fieldConfigObj);
    this.userGroups=[];
    this.i=1;
    stepper.next();
  
  }

  addData(){
    let fieldConfigObj = new DataConfig<any>();
    fieldConfigObj.label=this.label;
    fieldConfigObj.name=this.label.replace(/\s/g,"").toLocaleLowerCase();
    fieldConfigObj.required=this.requiredData;
    fieldConfigObj.options=this.options;
    fieldConfigObj.value="";
    
    switch(this.typeChecker){
      case "text":{
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="text";
        break;
      }
      case "email":{
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="email";
        break;
      }
      case "date": {
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="date";
        break;
      }
      case "password":{
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="password";
        break;
      }
      case "url":{
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="url";
        break;
      }
      case "file":{
        fieldConfigObj.type="input";
        fieldConfigObj.inputType="file";
        break;
      }
      case "checkbox":{
        fieldConfigObj.type="checkbox";
        fieldConfigObj.inputType="checkbox";
        break;
      }
      case "radio":{
        fieldConfigObj.type="radio";
        fieldConfigObj.inputType="radio";
        break;
      }
      case "select": {
        fieldConfigObj.type="select";
        fieldConfigObj.inputType="";
        break;
      }
      default: {
        fieldConfigObj.type="";
        fieldConfigObj.inputType="";
        break;
      }
    }
    this.registrationData.push(fieldConfigObj);
    this.options=[];
    this.label="";
    this.typeChecker="";
    this.requiredData=false;
    



  }

  addRegistrationTemplate(stepper:MatStepper){
    this.service.deleteOldTemplate().subscribe(res=>{
      if(res['message']=='ok'){
        
        this.service.addNewTemplate(this.registrationData).subscribe(res=>{
        if(res['message']=='ok'){
          
        this.dialog.open(TemplateConfirmationDialog);
        stepper.selectedIndex=0;
      }
        }
        )
      }
    })

  }


}

@Component({
  selector: 'app-template-confirmation',
  templateUrl: './template-confirmation.html',
 
})

export class TemplateConfirmationDialog{

}
