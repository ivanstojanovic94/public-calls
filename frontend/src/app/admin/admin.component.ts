import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../admin.service';
import { DataConfig } from '../models/dataConfig';
import { PublicCall } from '../models/publicCall';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog.example';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserGeneralService } from '../user.general.service';
import { MatStepper } from '@angular/material/stepper';
import { TemplatesService } from '../templates.service';
import { TemplateRegister } from '../models/templateRegister';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminService, private userGeneralService: UserGeneralService, public dialog: MatDialog, private router: Router,
    private templateService: TemplatesService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('loggedUser'));
    this.templateService.getTemplate().subscribe((template: TemplateRegister) => {
      let category = template.data[0];
      let groups = category['options'];
      groups.forEach(group => {
        this.grupeKorisnika.push(group['value']);
      })
      this.grupeKorisnika.push('svi');
    })
  }

  grupeKorisnika = []; //get from back
  javniPoziv = new PublicCall();
  scienceFields = ["prirodno-matematička oblast", "tehničko-tehnološka oblast", "medicinska oblast", "biotehnička oblast", "društvene nauke", "humanističke nauke"];
  //javniPozivPodak=new DataConfig<any>();
  javniPozivPodaci: DataConfig<any>[] = [];
  label: string;
  requiredData: boolean;
  value: any;
  options = [];
  typeChecker: string;
  optionValue: string;
  optionKey: string;
  message: string;
  deadline: string;
  publishDatePretty: string;
  deadlinePretty: string;
  admin: User;
  pass: string;
  passconfirm: string;
  messagePassword: string;
  currentPass: string;
  success: boolean;
  scienceField: string;

  return() {
    this.router.navigate(['admin']);
  }

  account() {
    this.router.navigate(['account']);
  }

  addOption() {
    let ob = {
      key: this.optionValue.replace(/\s/g, "").toLocaleLowerCase(),
      value: this.optionValue
    }
    this.options.push(ob);
    this.optionValue = "";
    this.optionKey = "";
  }

  addData() {
    let fieldConfigObj = new DataConfig<any>();
    fieldConfigObj.label = this.label;
    fieldConfigObj.name = this.label.replace(/\s/g, "").toLocaleLowerCase();
    fieldConfigObj.required = this.requiredData;
    fieldConfigObj.options = this.options;
    fieldConfigObj.value = "";

    switch (this.typeChecker) {
      case "text": {
        fieldConfigObj.type = "input";
        fieldConfigObj.inputType = "text";
        break;
      }
      case "email": {
        fieldConfigObj.type = "input";
        fieldConfigObj.inputType = "email";
        break;
      }
      case "date": {
        fieldConfigObj.type = "input";
        fieldConfigObj.inputType = "date";
        break;
      }
      case "password": {
        fieldConfigObj.type = "input";
        fieldConfigObj.inputType = "password";
        break;
      }
      case "url": {
        fieldConfigObj.type = "input";
        fieldConfigObj.inputType = "url";
        break;
      }
      case "file": {
        fieldConfigObj.type = "file";
        fieldConfigObj.inputType = "file";
        break;
      }
      case "checkbox": {
        fieldConfigObj.type = "checkbox";
        fieldConfigObj.inputType = "checkbox";
        break;
      }
      case "radio": {
        fieldConfigObj.type = "radio";
        fieldConfigObj.inputType = "radio";
        break;
      }
      case "select": {
        fieldConfigObj.type = "select";
        fieldConfigObj.inputType = "";
        break;
      }
      default: {
        fieldConfigObj.type = "";
        fieldConfigObj.inputType = "";
        break;
      }
    }
    this.javniPozivPodaci.push(fieldConfigObj);
    this.options = [];
    this.label = "";
    this.typeChecker = "";
    this.requiredData = false;
  }

  openCall(stepper: MatStepper) {

    let publishDate = new Date();
    let publishDateFormated = `${publishDate.getDate()}/${publishDate.getMonth() + 1}/${publishDate.getFullYear()}`;
    let year = this.javniPoziv.deadline.split("-")[0];
    let month = this.javniPoziv.deadline.split("-")[1];
    let day = this.javniPoziv.deadline.split("-")[2];
    let deadlineFormated = day + "/" + month + "/" + year;

    if (this.javniPoziv.userGroup == "" || this.javniPoziv.userGroup == null) {
      this.javniPoziv.userGroup = "svi";
    }
    this.service.openPublicCall(this.javniPoziv.name, publishDateFormated, deadlineFormated, this.javniPoziv.basicInfo, this.javniPoziv.userGroup, this.javniPoziv.scienceField, this.javniPoziv.institution, this.javniPozivPodaci).subscribe(res => {
      if (res['message'] == "added call") {
        this.message = "Uspešno ste otvorili javni poziv!";
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
          this.message = "";
        })
      } else {
        console.log(res);
      }
    });
    this.javniPoziv = {} as PublicCall;
    this.javniPozivPodaci = [];
    this.publishDatePretty = "";
    this.deadlinePretty = "";
    stepper.selectedIndex = 0;
  }

  setDatesPretty() {
    let publishDate = new Date();
    this.publishDatePretty = `${publishDate.getDate()}/${publishDate.getMonth() + 1}/${publishDate.getFullYear()}`;
    if (this.javniPoziv.deadline != null && this.javniPoziv.deadline != "") {
      let year = this.javniPoziv.deadline.split("-")[0];
      let month = this.javniPoziv.deadline.split("-")[1];
      let day = this.javniPoziv.deadline.split("-")[2];
      this.deadlinePretty = day + "/" + month + "/" + year;
    }
  }

  signOut() {
    localStorage.removeItem("loggedUser");
    this.router.navigate(['/']);
  }

  changePassword() {
    if (this.currentPass != this.admin.password) {
      this.messagePassword = "Lozinka koja je uneta je netačna!";
      this.success = false;
    } else {
      if (this.pass != this.passconfirm || this.pass == "" || this.pass == null || this.passconfirm == "" || this.passconfirm == null) {
        this.messagePassword = "Lozinka i potvrda lozinke se razlikuju!";

      } else {
        //change on back
        this.userGeneralService.changePassword(this.admin.username, this.pass).subscribe(res => {
          if (res['message'] == 'ok') {
            this.messagePassword = "Uspešno ste promenili lozinku!";
            this.success = true;
          }
        });
        this.admin.password = this.pass;
      }
    }

    setTimeout(() => {
      this.currentPass = "";
      this.passconfirm = "";
      this.pass = "";
      this.messagePassword = "";
      this.success = false;
    }, 10000)
  }


  deactivateAccount() {
    if (this.currentPass != this.admin.password || this.currentPass == "" || this.currentPass == null) {
      this.messagePassword = "Lozinka koja je uneta nije ispravna!";
      this.success = false;
    } else {
      //ok 
      this.userGeneralService.deactivateAccount(this.admin.password).subscribe(res => {
        if (res['message'] == 'ok') {
          this.messagePassword = "Vaš nalog je deaktiviran. Žao nam je što odlazite.";
          this.success = true;
        }
      });

      setTimeout(() => {
        this.messagePassword = "";
        this.success = false;
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/']);
      }, 10000)
    }

    setTimeout(() => {
      this.messagePassword = "";
      this.success = false;
    }, 5000)
  }
}