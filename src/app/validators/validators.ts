import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validators',
  imports: [ReactiveFormsModule],
  templateUrl: './validators.html',
  styleUrl: './validators.css',
})





export class ValidatorsPage {


  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  submitted = false;

  // Shown when unsavedChangesGuard blocks navigation
  showLeaveWarning = signal(false);

  constructor() {
    // Hide the warning as soon as the form is empty again
    this.form.valueChanges.subscribe(() => {
      if (!this.hasUnsavedData()) {
        this.showLeaveWarning.set(false);
      }
    });
  }

  submit() {
    this.submitted = true;
  }

  // Used by unsavedChangesGuard: true when the user typed something and did not submit
  hasUnsavedData() {
    if (this.submitted) {
      return false;
    }
    const values = this.form.value;
    return values.username !== '' || values.email !== '' || values.password !== '';
  }
}
