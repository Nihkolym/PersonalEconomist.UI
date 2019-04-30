import { Directive, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChoosableItemDirective } from './choosable-item.directive';

@Directive({
    selector: '[appChoosableContainer]',
})
export class ChoosableContainerDirective implements AfterViewInit {
  @ContentChildren(ChoosableItemDirective) items: QueryList<ChoosableItemDirective>;

  ngAfterViewInit(): void {
    this.items.forEach(item => item.choose.subscribe(() => {
      this.items.filter(i => i !== item).forEach(i => i.unselectItem());
      item.selectItem();
    }));
  }
}
