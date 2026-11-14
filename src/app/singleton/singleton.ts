import { Component, computed, signal } from '@angular/core';

type ViewId = 'home' | 'about' | 'contact';

interface SimulatedView {
  readonly id: ViewId;
  readonly label: string;
  readonly path: `/${ViewId}`;
  readonly title: string;
  readonly text: string;
  readonly accent: string;
  /** SVG path data for a 24×24 stroke icon. */
  readonly icon: string;
}

interface FlowStep {
  readonly title: string;
  readonly text: string;
  readonly code: string;
}

const VIEWS: readonly SimulatedView[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    title: 'Welcome home',
    text: 'This is the Home view.',
    accent: '#4f8cff',
    icon: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    title: 'About us',
    text: 'Same page. New view.',
    accent: '#a259ff',
    icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.5 9a7.5 7.5 0 0 1 15 0',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    title: 'Get in touch',
    text: 'No reload needed to get here.',
    accent: '#ff3d8b',
    icon: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-.5 1.5L12 13l8.5-6.5',
  },
];

/** Returns the current time as HH:MM:SS.mmm. */
function timestamp(): string {
  const now = new Date();
  const pad = (value: number, length = 2): string => String(value).padStart(length, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
}

@Component({
  selector: 'app-singleton',
  templateUrl: './singleton.html',
  styleUrl: './singleton.css',
})
export class Singleton {
  protected readonly views = VIEWS;

  protected readonly flowSteps: readonly FlowStep[] = [
    { title: 'You click a link', text: 'Angular catches the click.', code: 'routerLink="/about"' },
    { title: 'The URL updates', text: 'No new page is requested.', code: 'history.pushState()' },
    { title: 'The view is swapped', text: 'Only the outlet content changes.', code: '<router-outlet />' },
  ];

  /** Simulated route — never touches the real browser URL. */
  protected readonly activeId = signal<ViewId>('home');
  protected readonly activeView = computed(
    () => VIEWS.find((view) => view.id === this.activeId()) ?? VIEWS[0],
  );

  protected readonly swapCount = signal(0);

  /** The simulated shell (navbar + footer) is rendered once and never updated. */
  protected readonly shellLoadedAt = timestamp();
  protected readonly renderedAt = signal(timestamp());

  protected navigate(id: ViewId): void {
    if (id === this.activeId()) {
      return;
    }
    this.activeId.set(id);
    this.swapCount.update((count) => count + 1);
    this.renderedAt.set(timestamp());
  }
}
