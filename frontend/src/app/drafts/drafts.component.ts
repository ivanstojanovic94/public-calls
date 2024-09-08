import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ApplicationService } from '../application.service';
import { Application } from '../models/application';
import { Display } from '../models/display';
import { PublicCall } from '../models/publicCall';
import { User } from '../models/user';
import { QuestionService } from '../question.service';

export class Wrapper{
  displayArr: string[];
}

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css'],
  providers:  [QuestionService]
})
export class DraftsComponent implements OnInit {

  constructor(private applicationsService: ApplicationService, private publicCallsService: QuestionService,
    private router: Router) { }

  ngOnInit(): void {
    //retrieve all drafts from backend
    this.user=JSON.parse(localStorage.getItem("loggedUser"));
    this.applicationsService.getDrafts(this.user.username).subscribe((drafts: Application[])=>{
      this.values=[];
      this.draftApps=drafts;
      this.filePropertyFlags=[];
      this.draftApps.forEach(draft=>{
        let wrapper=new Wrapper();
        wrapper.displayArr=[];
        wrapper.displayArr=Object.keys(draft.data).map(k => draft.data[k]);
        //console.log(wrapper);
        this.values.push(wrapper);
        let arr=[];
        for(const item in draft.data){
          let regex=/((\.jpg)|(\.png)|(\.pdf)|(\.doc)|(\.docx)|(\.xlsx)|(\.txt))$/;
          if(regex.test(draft.data[item])){
            
            arr.push(true);
          }else{
            arr.push(false);
          }
        }
        this.filePropertyFlags.push(arr);
      })
     

      
    })

  }

  draftApps: Application[]=[];
  publicCalls: PublicCall[]=[];
  values: Wrapper[]=[];
  user: User;
  filePropertyFlags: Array<boolean[]>;
  uploadsURI='http://localhost:4000/uploads/';

  deleteDraft(draft){
    this.applicationsService.deleteDraft(draft.id).subscribe(res=>{
      if(res['message']=="ok"){
        //deleted
       // this.reloadComponent();
       this.ngOnInit();
     
        
      }
    })

  }

  editDraft(draft){

    localStorage.setItem("draftToEdit",JSON.stringify(draft));
    localStorage.setItem("modeEdit","on");
    this.applicationsService.deleteDraft(draft.id).subscribe(res=>{
      if(res['message']=="ok"){
        //deleted
       // this.reloadComponent();
       this.router.navigate(['applicationForm'])
     
        
      }
    })

    

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
