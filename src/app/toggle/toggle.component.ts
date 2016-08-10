import { Component } from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'toggle-demo',
  templateUrl: 'toggle.component.html',
  directives: [
    PrismDirective
  ],
})
export class ToggleDemo {
  protected checkbox1 = true;
  protected checkbox2 = false;

  protected radioOption = '1';
}
