import { RouterModule, Router } from '@angular/router';
import { GoalService } from './services/goal.service';
import { DialogService } from './../../shared/services/dialog.service';
import { Component, Optional, Self } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Animal } from 'src/app/shared/enums/animal.enum';
import { StorageService } from 'src/app/core/auth/services/storage.service';
import { UserService } from '../+profile/services/user.service';
import { forkJoin } from 'rxjs';


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
    title: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  constructor(
    public dialogService: DialogService,
    public storageService: StorageService,
    public goalService: GoalService,
    public userService: UserService,
    public router: Router) {

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
    } else if (this.goalForm.valid) {
      const formData = new FormData(this.goalForm.value);
      formData.append('title', this.goalForm.get('title').value);
      formData.append('amount', this.goalForm.get('amount').value);
      formData.append('image', this.goalForm.get('image').value);

      const request = forkJoin(this.userService.updateUser({ avatar: this.goalForm.get('animal').value }), this.goalService.createGoal(formData));

      request.subscribe(() => {
        return this.router.navigate(['home']);
      })
    }
  }
}
