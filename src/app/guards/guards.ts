import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.html',
  styleUrl: './guards.css',
})
export class Guards {
  // ── Demo 1: role-based simulation (no real authentication) ──
  role = signal('user'); // 'admin' or 'user'
  result = signal(''); // '', 'granted' or 'denied'
  attempts = signal(0); // counts clicks so the animation replays

  selectRole(newRole: string) {
    this.role.set(newRole);
    this.result.set('');
  }

  openDashboard() {
    this.attempts.update((n) => n + 1);
    // The "guard": only Admin may enter
    if (this.role() === 'admin') {
      this.result.set('granted');
    } else {
      this.result.set('denied');
    }
  }

  // ── Demo 2: CanDeactivate simulation ──
  draft = signal(''); // text typed in the form (not saved)
  leaveStep = signal(''); // '', 'confirm', 'left' or 'stayed'

  leavePage() {
    // The "guard": warn only when there are unsaved changes
    if (this.draft() !== '') {
      this.leaveStep.set('confirm');
    } else {
      this.leaveStep.set('left');
    }
  }

  confirmLeave() {
    this.draft.set('');
    this.leaveStep.set('left');
  }

  stay() {
    this.leaveStep.set('stayed');
  }

  // Code example shown on the page
  guardCode = `import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return true;
};`;
}
