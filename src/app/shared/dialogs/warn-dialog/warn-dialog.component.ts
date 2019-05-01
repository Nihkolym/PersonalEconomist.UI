import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.css']
})
export class WarnDialogComponent  {

  public label = null;

  constructor(
    public dialogRef: MatDialogRef<WarnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.label = data.label;
  }
}
