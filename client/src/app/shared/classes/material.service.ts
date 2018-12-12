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

  static initializeMultiSelect(ref: ElementRef) {
    M.FormSelect.init(ref.nativeElement);
  }

  static initializeDatePicker(ref: ElementRef) {
    M.Datepicker.init(ref.nativeElement, {
      selectMonths: false,
      selectDays: false,
      selectYears: true,
      format: 'yyyy'
    });
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement, {dismissible: false});
  }

  static updateTextFields() {
    M.updateTextFields();
  }
}
