import { Routes } from '@angular/router';
import { Guards } from './guards/guards';
import { Singleton } from './singleton/singleton';
import { ValidatorsPage } from './validators/validators';
import { unsavedChangesGuard } from './validators/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: Singleton },
  {
    // Real lazy loading: this page's code is downloaded only when the user opens it
    path: 'lazy-loading',
    loadComponent: () => import('./lazy-loading/lazy-loading').then((m) => m.LazyLoading),
  },
  { path: 'validators', component: ValidatorsPage, canDeactivate: [unsavedChangesGuard] },
  { path: 'guards', component: Guards },
  { path: '**', redirectTo: '' },
];
