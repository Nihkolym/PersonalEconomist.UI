import { Animal } from './../../enums/animal.enum';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {

  public Animal = Animal;

  constructor(
    public dialogRef: MatDialogRef<AnimalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public close(animal: Animal) {
    this.dialogRef.close(animal);
  }

}
