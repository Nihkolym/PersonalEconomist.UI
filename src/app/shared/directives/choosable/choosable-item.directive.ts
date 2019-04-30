import { Directive, Output, EventEmitter, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[appChoosableItem]',
})
export class ChoosableItemDirective {
    @Output() choose: EventEmitter<void> = new EventEmitter<void>();

    @Input() public choosenClass = null;

    @HostListener('click', ['$event.target']) onClick() {
      this.choose.emit();
    }

    constructor(private renderer: Renderer2, private element: ElementRef) { }

    public selectItem() {
      this.renderer.addClass(this.element.nativeElement, this.choosenClass);
    }

    public unselectItem() {
      this.renderer.removeClass(this.element.nativeElement, this.choosenClass);
    }
}
