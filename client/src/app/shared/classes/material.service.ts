import {ElementRef} from "@angular/core";

declare var M;

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {
  static toast(message: String) {
    M.toast({html: message, classes: 'red'});
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement, {dismissible: false});
  }

  static updateTextFields() {
    M.updateTextFields();
  }
}
