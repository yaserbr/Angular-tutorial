import { CanDeactivateFn } from '@angular/router';
import { ValidatorsPage } from './validators';

// Runs when the user tries to leave the Validators page
export const unsavedChangesGuard: CanDeactivateFn<ValidatorsPage> = (component) => {
  if (component.hasUnsavedData()) {
    component.showLeaveWarning.set(true); // show the warning on the page
    return false; // the form has data → block navigation
  }

  return true; // the form is empty (or submitted) → allow navigation
};
