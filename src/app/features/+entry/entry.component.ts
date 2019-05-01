import { DialogService } from './../../shared/services/dialog.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Animal } from 'src/app/shared/enums/animal.enum';
import { StorageService } from 'src/app/core/auth/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  public goalImageSrc: string = null;

  public Animal = Animal;

  public get userName() {
    return this.storageService.userName;
  }

  public goalForm: FormGroup = new FormGroup({
    animal: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  constructor(public dialogService: DialogService, public storageService: StorageService) {

  }

  public onFileSelected(event) {
    const input = event.target;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.goalImageSrc = e.target.result;
          this.goalForm.get('image').setValue(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  public chooseAnimal(animal: Animal) {
    this.goalForm.get('animal').setValue(animal);
  }

  public onFormSubmit() {
    if (this.goalForm.get('animal').invalid) {
      this.dialogService.warn('You should choose animal before create first goal');
    }
  }
}
