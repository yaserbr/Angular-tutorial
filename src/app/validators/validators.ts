import { Component, signal } from '@angular/core';
// Angular's Validators is imported as NgValidators because this component class is also named "Validators"
import { FormControl, FormGroup, ReactiveFormsModule, Validators as NgValidators } from '@angular/forms';

type FieldName = 'username' | 'email' | 'password';
type FieldState = 'Waiting' | 'Invalid' | 'Valid';

@Component({
  selector: 'app-validators',
  imports: [ReactiveFormsModule],
  templateUrl: './validators.html',
  styleUrl: './validators.css',
})
export class Validators {
  /** Real Angular Reactive Form with built-in validators. */
  protected readonly form = new FormGroup({
    username: new FormControl('', [NgValidators.required, NgValidators.minLength(3)]),
    email: new FormControl('', [NgValidators.required, NgValidators.email]),
    password: new FormControl('', [NgValidators.required, NgValidators.minLength(8)]),
  });

  protected readonly fields: { name: FieldName; label: string; type: string; rules: string }[] = [
    { name: 'username', label: 'Username', type: 'text', rules: 'required, minLength(3)' },
    { name: 'email', label: 'Email', type: 'email', rules: 'required, email' },
    { name: 'password', label: 'Password', type: 'password', rules: 'required, minLength(8)' },
  ];

  protected readonly submitted = signal(false);

  /** For the flow diagram: which field was edited last, and a counter that replays the animation. */
  protected readonly lastField = signal<FieldName | null>(null);
  protected readonly edits = signal(0);

  /** Waiting until the student touches or edits the field, then Valid / Invalid. */
  protected state(name: FieldName): FieldState {
    const control = this.form.controls[name];
    if (!control.touched && !control.dirty) {
      return 'Waiting';
    }
    return control.valid ? 'Valid' : 'Invalid';
  }

  /** A short message for the first error Angular reports on the field. */
  protected error(name: FieldName): string {
    const control = this.form.controls[name];
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('minlength')) {
      return `At least ${control.getError('minlength').requiredLength} characters.`;
    }
    return 'Enter a valid email address.';
  }

  protected field(name: FieldName) {
    return this.fields.find((f) => f.name === name)!;
  }

  /** What the diagram shows as the input value (passwords are masked). */
  protected shownValue(name: FieldName): string {
    const value = this.form.controls[name].value ?? '';
    return name === 'password' ? '•'.repeat(value.length) : value;
  }

  protected onInput(name: FieldName): void {
    this.submitted.set(false);
    this.lastField.set(name);
    this.edits.update((n) => n + 1);
  }

  protected submit(): void {
    this.submitted.set(true);
  }

  // Code examples (stored as strings so the template stays simple)
  protected readonly tsCode = `form = new FormGroup({
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ])
});`;

  protected readonly htmlCode = `<form [formGroup]="form">
  <input formControlName="username">
  <input formControlName="email">
  <input formControlName="password">

  <button [disabled]="form.invalid">
    Submit
  </button>
</form>`;
}
