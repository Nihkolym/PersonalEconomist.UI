import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { DialogService } from './services/dialog.service';
import { ChoosableContainerDirective } from './directives/choosable/choosable-container.directive';
import { ChoosableItemDirective } from './directives/choosable/choosable-item.directive';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { WarnDialogComponent } from './dialogs/warn-dialog/warn-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const DIRECTIVES = [
  ChoosableItemDirective,
  ChoosableContainerDirective,
];

const ENTRY_COMPONENTS = [
  WarnDialogComponent,
  AuthComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS
  ],
  exports: [
    MaterialModule,
    ...ENTRY_COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ENTRY_COMPONENTS
  ]
})
export class SharedModule {

  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
            DialogService
          ],
      };
  }

}
