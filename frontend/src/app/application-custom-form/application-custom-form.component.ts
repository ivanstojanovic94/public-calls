import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { ConfirmationDialogDraft, DialogsComponent } from '../dialogs/dialogs.component';
import { FileService } from '../file.service';
import { Application } from '../models/application';
import { DataConfig } from '../models/dataConfig';
import { Display } from '../models/display';
import { PublicCall } from '../models/publicCall';
import { User } from '../models/user';
import { QuestionService } from '../question.service';

//import { QuestionService } from '../question.service';

@Component({
  selector: 'app-custom-form-component',
  templateUrl: './application-custom-form.component.html',
  styleUrls: ['./application-custom-form.component.css'],
  providers:  [QuestionService]
})
export class ApplicationCustomFormComponent implements OnInit {
  

  constructor(private service: QuestionService, private http: HttpClient, public dialog: MatDialog, 
    private router: Router, private fileService: FileService,private appservice: ApplicationService) {
   
  }

  ngOnInit(): void {
    let idCall;
    let draft:Application;
    let modeEdit=localStorage.getItem("modeEdit");
    let id;
    if(modeEdit=="on"){
      draft=JSON.parse(localStorage.getItem("draftToEdit"));
      this.draft=draft;
      id=draft.idCall;
      

    }else{
      idCall=localStorage.getItem("idSelectedCall");
      id=idCall;
    }
    this.currentUser=JSON.parse(localStorage.getItem("loggedUser"));
    this.service.getQuestionsFromBackend(parseInt(id)).subscribe((publicCall: PublicCall)=>{
    
      this.pCall=publicCall;
      this.questions=publicCall.applicationDataConfig;
      

      if(modeEdit=="on"){
      this.questions.forEach((q,i)=>{
        if(q.type!="file"){
        q.value=draft.data[q.name];}else{
          //to show user uploaded document or not?
        }

      })}
      
      this.questions.forEach(q=>{
        
        let curr;
        
          curr={
          key: q.label,
          value: (modeEdit=="on" ? q.value : ""),
        }
        
        this.displayed.push(curr);
        let k=q.name;
        let  obj: Object={};
        if(q.type=="file"){
          obj[k]="Nije izabran nijedan dokument";
          

         if(draft!=null && modeEdit=="on"){
           if(draft.data[k]!="" && draft.data[k]!=null){
            obj[k]=draft.data[k];
            this.filedsDraft.push(k);
            q.required=false;
          }}
        this.fileNames= {...this.fileNames,...obj};
         }
        
      })
      this.form=this.toFormGroup();
      modeEdit="off";
      localStorage.setItem("modeEdit",modeEdit);
     
      
    
    })
  }


  form: FormGroup;
  payLoad='';
  pCall: PublicCall={} as PublicCall;
  questions: DataConfig<any>[];
  uri = 'http://localhost:4000';
  url=`${this.uri}/publicCalls/getPublicCallById`;
  envBaseURI='http://localhost:3000/uploads';
  currentApplication: Application;
  currentUser: User;
  displayed: Display[]=[];
  fileToUpload: File | null = null;
  fieldName:string;
  fileName='';
  files: File[]=[];
  fields: string[]=[];
  fileNames: Object={};
  draft: Application={} as Application;
  filedsDraft:string[]=[];

 
 
 

  onFileChange(event,name) {
    let selectedFile=event.target.files[0];
    this.files.push(selectedFile);
    this.fields.push(name);
    this.fileNames[name]=selectedFile.name;
    
    
    
    
    
  }


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
  

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    
   
    this.currentApplication=new Application();
    this.currentApplication.data=JSON.parse(this.payLoad);
    
    this.currentApplication.idCall=this.pCall.id;
    this.currentApplication.user=this.currentUser.username;
    this.currentApplication.field=this.pCall.scienceField;
    this.currentApplication.institution=this.pCall.institution;

    this.files.forEach((file,ind)=>{
      this.currentApplication.data[this.fields[ind]]=file.name;
    })
    if(this.draft!=null){
      this.filedsDraft.forEach(field=>{
        this.currentApplication.data[field]=this.fileNames[field];
      })
      
    }
    
   
    let date=new Date();
    this.currentApplication.postingDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    this.currentApplication.callName=this.pCall.name;
    this.currentApplication.labels=[];
    this.currentApplication.toShowUser=1;
  
    this.pCall.applicationDataConfig.forEach(pc=>{
      this.currentApplication.labels.push(pc.label);
    })
    Object.keys(this.currentApplication.data).forEach((key,ind)=>{
      this.displayed[ind].value=this.currentApplication.data[key];
    })
    const dialogRef=this.dialog.open(DialogsComponent, {data: {toDisplay: this.displayed, appData: this.currentApplication, filesToUpload: this.files}});
    dialogRef.afterClosed().subscribe(result=>{
      //do smth else???/
      this.form.reset();
      this.payLoad="";
      this.fileName='';
      this.fileNames=[];
      this.files=[];
      this.fields=[];
    })
   
    
  }

  return(){
    this.router.navigate(['plainUser']);
    
  }


  save(){
    this.payLoad = JSON.stringify(this.form.getRawValue());
    
   
    this.currentApplication=new Application();
    this.currentApplication.data=JSON.parse(this.payLoad);
    
    this.currentApplication.idCall=this.pCall.id;
    this.currentApplication.user=this.currentUser.username;
    this.currentApplication.field=this.pCall.scienceField;
    this.currentApplication.institution=this.pCall.institution;

    this.files.forEach((file,ind)=>{
      this.currentApplication.data[this.fields[ind]]=file.name;
    })
    if(this.draft!=null){
      this.filedsDraft.forEach(field=>{
        this.currentApplication.data[field]=this.fileNames[field];
      })
      
    }
    
   
    let date=new Date();
    this.currentApplication.postingDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    this.currentApplication.callName=this.pCall.name;
    this.currentApplication.labels=[];
    this.currentApplication.toShowUser=1;
  
    this.pCall.applicationDataConfig.forEach(pc=>{
      this.currentApplication.labels.push(pc.label);
    })
   
    //sacuvaj prijavu u nacrtima
    //console.log("sacuvao u nacrtima");
    
    this.currentApplication.status="nedovrseno";
    
    //radi nesto za potvrdu
    //posalji prijavu na server i obavesti korisnika
    this.appservice.saveApplication(this.currentApplication).subscribe(res=>{
      if(res['message']=="ok"){
        this.fileService.uploadFile(this.files).subscribe(res=>{
        this.dialog.open(ConfirmationDialogDraft);
        this.form.reset();
      this.payLoad="";
      this.fileName='';
      this.fileNames=[];
      this.files=[];
      this.fields=[];
      })
        
      }else{
        console.log("greska");
      }

    })
       
   
    
  
  }
  
}
 

 


