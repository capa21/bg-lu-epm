import {ApplicationRef, ElementRef, Input} from '@angular/core';

export class NgElementsBase {

  constructor(protected app: ApplicationRef,
              protected el: ElementRef) {

  }

  public state: any = {};

  @Input()
  public get setState() {
    return (newState) => {
      this._setStateFromOutside(newState);
      this.app.tick();
    };
  }

  public set setState(value: any) {
    console.error('setState method cannot be override');
  }

  protected emmitComponentLoad() {
    const domEvent = new CustomEvent('loaded', {detail: true});
    this.el.nativeElement.dispatchEvent(domEvent);
  }

  protected emitEvent(eventName: string, val: any) {
    const domEvent = new CustomEvent(eventName, {detail: val});
    this.el.nativeElement.dispatchEvent(domEvent);
  }

  private _setStateFromOutside(newState) {
    if (typeof newState !== 'object') {
      console.error('new state is not an object');
      return;
    }

    if (
      Object.keys(newState).length > 0 &&
      !Object.keys(newState).every(objectKey => Object.keys(this.state).includes(objectKey))
    ) {
      console.error('adding new props to state is not allowed');
      return;
    }
    this.state = {
      ...this.state,
      ...newState,
    };
  }
}
