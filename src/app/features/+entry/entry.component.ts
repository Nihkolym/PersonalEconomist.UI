import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  public goalImageSrc: string = null;

  public onFileSelected(event) {
    const input = event.target;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.goalImageSrc = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
