import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should render the navbar followed by the SPA page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')?.textContent).toContain('Angular Concepts');
    expect(compiled.querySelector('h1')?.textContent).toContain('Single Page Application');
  });

  it('should swap only the simulated view without changing the real URL', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const realUrl = window.location.href;
    const shellBefore = compiled.querySelector('.foot')?.textContent;

    const about = [...compiled.querySelectorAll<HTMLButtonElement>('.demo nav button')].find((b) =>
      b.textContent?.includes('About'),
    );
    about?.click();
    await fixture.whenStable();

    expect(compiled.querySelector('.path')?.textContent).toBe('/about');
    expect(compiled.querySelector('.stage h3')?.textContent).toBe('About us');
    expect(about?.getAttribute('aria-current')).toBe('page');
    expect(compiled.querySelector('.foot')?.textContent).toBe(shellBefore);
    expect(window.location.href).toBe(realUrl);
  });
});
