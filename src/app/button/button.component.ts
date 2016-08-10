import { Component } from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  templateUrl: 'button.component.html',
  directives: [
    PrismDirective
  ],
})
export class ButtonDemo {
  public buttonType = 'raised';
  public doRipple = false;
  public colored = '';
  public btnDisabled = false;
}
