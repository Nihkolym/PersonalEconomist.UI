import { ChoosableContainerDirective } from './directives/choosable/choosable-container.directive';
import { ChoosableItemDirective } from './directives/choosable/choosable-item.directive';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

const DIRECTIVES = [
  ChoosableItemDirective,
  ChoosableContainerDirective,
];

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    ...DIRECTIVES,
  ],
  exports: [
    MaterialModule,
    ...DIRECTIVES,
  ]
})
export class SharedModule {

  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [],
      };
  }

}
