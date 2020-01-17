import { ApplicationRef, ElementRef, Input } from "@angular/core";

export class NgElementsBase {
  constructor(protected app: ApplicationRef, protected el: ElementRef) {}

  public state: any = {};

  @Input()
  public get setState() {
    return newState => {
      console.log(newState);
      this._setStateFromOutside(newState);
      this.app.tick();
    };
  }

  public set setState(value: any) {
    console.error("setState cannot be override");
  }

  @Input()
  public get getState() {
    return (propertyKey: any) => {
      return this.state[propertyKey];
    };
  }

  public set getState(value: any) {
    console.error("getValue cannot be override");
  }

  protected emmitComponentLoad() {
    this.emitEvent("loaded", true);
  }

  protected emitEvent(eventName: string, val: any) {
    const domEvent = new CustomEvent(eventName, { detail: val });
    this.el.nativeElement.dispatchEvent(domEvent);
  }

  private _setStateFromOutside(newState) {
    if (typeof newState !== "object") {
      console.error("new state is not an object");
      return;
    }

    if (
      Object.keys(newState).length > 0 &&
      !Object.keys(newState).every(objectKey =>
        Object.keys(this.state).includes(objectKey)
      )
    ) {
      console.error("adding new props to state is not allowed");
      return;
    }
    this.state = {
      ...this.state,
      ...newState
    };
  }
}
