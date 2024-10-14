import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
  })

  export class DialogOverviewExampleDialog {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>){}
  }