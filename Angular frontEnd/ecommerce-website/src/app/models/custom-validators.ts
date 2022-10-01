import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static noWhiteSpace(formControl: FormControl): ValidationErrors | null {

        if (formControl.value != null && formControl.value.trim().length == 0) {
            return { 'noWhiteSpace': true }
        }
        else {
            return null;
        }
    }
}
