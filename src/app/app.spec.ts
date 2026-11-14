import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should render the navbar followed by the SPA page', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')?.textContent).toContain('Angular Concepts');
    expect(compiled.querySelector('h1')?.textContent).toContain('Single Page Application');
  });

  it('should swap only the simulated view without changing the real URL', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const realUrl = window.location.href;
    const footBefore = compiled.querySelector('.foot');

    const about = [...compiled.querySelectorAll<HTMLButtonElement>('.demo nav button')].find((b) =>
      b.textContent?.includes('About'),
    );
    about?.click();
    await fixture.whenStable();

    expect(compiled.querySelector('.path')?.textContent).toBe('/about');
    expect(compiled.querySelector('.stage h3')?.textContent).toBe('About us');
    expect(about?.getAttribute('aria-current')).toBe('page');
    // The persistent footer is the same element, never re-created
    expect(compiled.querySelector('.foot')).toBe(footBefore);
    expect(window.location.href).toBe(realUrl);
  });
});
