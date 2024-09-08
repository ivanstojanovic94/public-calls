import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationService } from '../application.service';
import { FileService } from '../file.service';
import { Application } from '../models/application';
import { Display } from '../models/display';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

export class DialogData{
  toDisplay: Display[];
  appData: Application;
  filesToUpload: File[];
}

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogsComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
  public dialog: MatDialog, private service: ApplicationService, private fileService: FileService) { }
  
  

  ngOnInit(): void {
    this.currentApplication=this.dialogData.appData;
   
  }

  currentApplication: Application;

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 100;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('prijava.pdf');
    });     
  }

  potvrdi(){
    this.dialogRef.close();
    this.currentApplication.status="poslato";
    
    //radi nesto za potvrdu
    //posalji prijavu na server i obavesti korisnika
    this.service.saveApplication(this.currentApplication).subscribe(res=>{
      if(res['message']=="ok"){
        this.fileService.uploadFile(this.dialogData.filesToUpload).subscribe(res=>{
          
          this.dialog.open(ConfirmationDialog);
        })
        
      }else{
        console.log("greska");
      }

    })

    

   

  }

  odustani(){
    
    //radi nesto
    this.dialogRef.close();
    //novi prozor sa pitanjem da li zeli da sacuva prijavu ili ne
    this.dialog.open(DeclineDialog, {data: this.dialogData});

  }

}



@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
}
)

export class ConfirmationDialog{

  constructor(){}
}


@Component({
  selector: 'decline-dialog',
  templateUrl: 'decline-dialog.html',
}
)

export class DeclineDialog{

  constructor(public dialogRef: MatDialogRef<DeclineDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private service: ApplicationService, public dialog: MatDialog, private fileService: FileService){}

  sacuvaj(){
    //sacuvaj prijavu u nacrtima
    //console.log("sacuvao u nacrtima");
    this.dialogRef.close();
    this.data.appData.status="nedovrseno";
    
    //radi nesto za potvrdu
    //posalji prijavu na server i obavesti korisnika
    this.service.saveApplication(this.data.appData).subscribe(res=>{
      if(res['message']=="ok"){
        this.fileService.uploadFile(this.data.filesToUpload).subscribe(res=>{
        this.dialog.open(ConfirmationDialogDraft);})
        
      }else{
        console.log("greska");
      }

    })
  }
}


@Component({
  selector: 'confirmation-dialog-draft',
  templateUrl: 'confirmation-dialog-draft.html',
}
)

export class ConfirmationDialogDraft{

  constructor(){}
}





