import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output()
  isMenuClosedEmitter = new EventEmitter<boolean>()

  @Input()
  isMenuClosed: boolean

  @Input()
  isMobile: boolean

  constructor() {
  }

  closeMenu(){
    this.isMenuClosed = !this.isMenuClosed;
    this.isMenuClosedEmitter.emit(this.isMenuClosed)
  }
}
