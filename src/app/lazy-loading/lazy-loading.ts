import { Component, DestroyRef, computed, inject, signal } from '@angular/core';

type PageId = 'home' | 'about' | 'dashboard';

interface SimulatedPage {
  readonly id: PageId;
  readonly label: string;
  readonly title: string;
  readonly text: string;
}

const PAGES: readonly SimulatedPage[] = [
  { id: 'home', label: 'Home', title: 'Welcome home', text: 'Home.js was part of the first download.' },
  { id: 'about', label: 'About', title: 'About us', text: 'About.js was downloaded just now.' },
  { id: 'dashboard', label: 'Dashboard', title: 'Dashboard', text: 'Dashboard.js arrived on demand.' },
];

/** How long the simulated download takes (milliseconds). */
const DOWNLOAD_TIME = 1200;

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.html',
  styleUrl: './lazy-loading.css',
})
export class LazyLoading {
  protected readonly pages = PAGES;

  /** Simulated state: which bundles are downloaded, which one is downloading, which page is shown. */
  protected readonly loaded = signal<PageId[]>(['home']);
  protected readonly loading = signal<PageId | null>(null);
  protected readonly active = signal<PageId>('home');
  protected readonly current = computed(() => PAGES.find((page) => page.id === this.active()) ?? PAGES[0]);

  /** Real Angular code, shown as an example (stored as a string so the template stays simple). */
  protected readonly routeCode = `{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard')
      .then(m => m.Dashboard)
}`;

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected isLoaded(id: PageId): boolean {
    return this.loaded().includes(id);
  }

  protected open(id: PageId): void {
    // Already downloaded: show it immediately, no second download
    if (this.isLoaded(id)) {
      this.active.set(id);
      return;
    }
    // First visit: simulate downloading the bundle, then show the page
    this.loading.set(id);
    this.timer = setTimeout(() => {
      this.loaded.update((list) => [...list, id]);
      this.loading.set(null);
      this.active.set(id);
    }, DOWNLOAD_TIME);
  }

  protected reset(): void {
    clearTimeout(this.timer);
    this.loaded.set(['home']);
    this.loading.set(null);
    this.active.set('home');
  }
}
