import {
  Component,
  Input,
  forwardRef,
  Provider,
  ViewChild,
  Renderer,
  ElementRef,
  NgModule
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR as DEPRECATED_NG_VALUE_ACCESSOR,
  ControlValueAccessor as DEPRECATED_ControlValueAccessor
} from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

const DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(DEPRECATED_NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSliderComponent),
  multi: true
});

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MdlSliderComponent),
  multi: true
});

@Component({
  selector: 'mdl-slider',
  providers: [DEPRECATED_MD_INPUT_CONTROL_VALUE_ACCESSOR, MD_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '[class.mdl-slider__container]': 'true',
    '(mouseup)': 'onMouseUp($event)',
    '(mousedown)': 'onMouseDown($event)'
  },
  template: `
    <input class="mdl-slider is-upgraded" 
            type="range" 
            [min]="min" 
            [max]="max" 
            [(ngModel)]="value" 
            tabindex="0"
            #input>
    <div class="mdl-slider__background-flex">
      <div class="mdl-slider__background-lower" #lower></div>
      <div class="mdl-slider__background-upper" #uppper></div>
  </div>
  `,
  styles: [
    `
    :host {
        height: 22px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    `
  ]
})
export class MdlSliderComponent implements DEPRECATED_ControlValueAccessor, ControlValueAccessor {
  private value_: any;

  @Input() public min: number;
  @Input() public max: number;
  @ViewChild('lower') private lowerEl: ElementRef;
  @ViewChild('uppper') private upperEl: ElementRef;
  @ViewChild('input') private inputEl: ElementRef;

  constructor(private renderer: Renderer, private elRef: ElementRef) {
  }

  get value(): any { return this.value_; };
  @Input() set value(v: any) {
    this.value_ = v;
    this.updateSliderUI();
    if ( this.onChangeCallback ) {
      this.onChangeCallback(v);
    }
  }

  public writeValue(value: number): void {
    this.value_ = value;
    this.updateSliderUI();
  }

  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private updateSliderUI() {
    var fraction = (this.value_ - this.min) / (this.max - this.min);

    this.renderer.setElementClass(this.inputEl.nativeElement, 'is-lowest-value', fraction === 0);

    this.renderer.setElementStyle(this.lowerEl.nativeElement, 'flex', '' + fraction);
    this.renderer.setElementStyle(this.upperEl.nativeElement, 'flex', '' + (1 - fraction));
  }

  public onMouseUp(event) {
    event.target.blur();
  }

  public onMouseDown(event: MouseEvent) {
    if (event.target !== this.elRef.nativeElement) {
      return;
    }
    // Discard the original event and create a new event that
    // is on the slider element.
    event.preventDefault();
    var newEvent = new MouseEvent('mousedown', {
      relatedTarget: event.relatedTarget,
      button: event.button,
      buttons: event.buttons,
      clientX: event.clientX,
      clientY: this.inputEl.nativeElement.getBoundingClientRect().y,
      screenX: event.screenX,
      screenY: event.screenY
    });
    this.inputEl.nativeElement.dispatchEvent(newEvent);
  }
}

/** @deprecated */
export const MDL_SLIDER_DIRECTIVES = [MdlSliderComponent];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: MDL_SLIDER_DIRECTIVES,
  declarations: MDL_SLIDER_DIRECTIVES,
})
export class MdlSliderModule {}
