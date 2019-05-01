import { WarnDialogComponent } from './../dialogs/warn-dialog/warn-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable()
export class DialogService {
    constructor(public dialog: MatDialog) { }

    public warn(label: string) {
        return this.dialog.open(WarnDialogComponent, {
          data: {
            label
          },
          panelClass: 'warn-panel',
          backdropClass: 'warn-backdrop',
        });
    }
}
