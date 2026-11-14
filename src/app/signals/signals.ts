import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
  // ── Section 2 · Angular Signals counter ──
  protected readonly angularCount = signal(0);

  // ── Section 3 · How Signals work ──
  protected readonly count = signal(0);
  protected readonly doubleCount = computed(() => this.count() * 2);
  protected readonly status = computed(() =>
    this.count() === 0 ? 'Zero' : this.count() > 0 ? 'Positive' : 'Negative',
  );

  // ── Section 4 · Change Detection ──
  protected readonly cdCount = signal(0);

  // ── Section 5 · Computed ──
  protected readonly price = signal(10);
  protected readonly quantity = signal(1);
  protected readonly total = computed(() => this.price() * this.quantity());

  /**
   * Highlights only start after the user's first change in each section,
   * so nothing flashes when the page first appears.
   */
  protected readonly touched = signal<string[]>([]);

  protected isTouched(section: string): boolean {
    return this.touched().includes(section);
  }

  private mark(section: string): void {
    if (!this.isTouched(section)) {
      this.touched.update((list) => [...list, section]);
    }
  }

  protected incrementAngular(): void {
    this.mark('angular');
    this.angularCount.update((value) => value + 1);
  }

  /** Sets `count` only when the value really changes (a signal set to the same value notifies nobody). */
  protected setCount(next: number): void {
    if (next !== this.count()) {
      this.mark('graph');
      this.count.set(next);
    }
  }

  protected updateCounterSignal(): void {
    this.mark('cd');
    this.cdCount.update((value) => value + 1);
  }

  protected changeQuantity(step: number): void {
    const next = Math.max(0, this.quantity() + step);
    if (next !== this.quantity()) {
      this.mark('cart');
      this.quantity.set(next);
    }
  }

  // Code examples (stored as strings so braces and {{ }} display as text)
  protected readonly signalCode = `count = signal(0);

increment() {
  this.count.update(value => value + 1);
}`;

  protected readonly templateCode = `<h2>{{ count() }}</h2>`;

  protected readonly graphCode = `count = signal(0);

doubleCount = computed(() => this.count() * 2);`;

  protected readonly computedCode = `price = signal(10);
quantity = signal(1);

total = computed(() => this.price() * this.quantity());`;
}
