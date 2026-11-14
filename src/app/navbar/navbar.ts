import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly links = [
    { path: '/', full: 'Single Page Application', short: 'SPA' },
    { path: '/lazy-loading', full: 'Lazy Loading', short: 'Lazy' },
    { path: '/signals', full: 'Signals', short: 'Signals' },
    { path: '/validators', full: 'Validators', short: 'Forms' },
  ];
}
