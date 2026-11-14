import { Routes } from '@angular/router';
import { Signals } from './signals/signals';
import { Singleton } from './singleton/singleton';

export const routes: Routes = [
  { path: '', component: Singleton },
  {
    // Real lazy loading: this page's code is downloaded only when the user opens it
    path: 'lazy-loading',
    loadComponent: () => import('./lazy-loading/lazy-loading').then((m) => m.LazyLoading),
  },
  { path: 'signals', component: Signals },
  { path: '**', redirectTo: '' },
];
