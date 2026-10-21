import { Component, signal, computed } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-leave-counter',
  styleUrl: './leave-counter.css',
  templateUrl: './leave-counter.html',
})
export class LeaveCounter {
  protected readonly totalDays = 25;
  protected readonly daysTaken = signal(0);

  // Recalculés automatiquement quand daysTaken change.
  // Pour un signal calculé avec d'autres signaux; on utilise la fct computed qui prend une callback en argument
  protected readonly remainingDays = computed(() => this.totalDays - this.daysTaken());
  protected readonly isEmpty = computed(() => this.remainingDays() === 0);

  // Math.round : arrondir un nombre décimal à l'entier le plus proche.
  protected readonly usedPercent = computed(() =>
    Math.round((this.daysTaken() / this.totalDays) * 100),
  );

  protected fiveDays = signal(0);
  protected readonly history = signal<string[]>([]);

  protected addDay(): void {
    // on applique a la propriété this.daysTaken de l'objet/instance App la methode update() qui met a jour le signal
    this.daysTaken.update((days) => days + 1);
  }

  // pour modifier un signal en gardant un lien
  protected removeDay(): void {
    this.daysTaken.update((days) => days - 1);
  }

  protected reset(): void {
    this.daysTaken.set(0);
    this.fiveDays.set(0);
  }

  protected holiday(): void {
    if (this.remainingDays() >= 5) {
      this.daysTaken.update((days) => days + 5);
      this.fiveDays.set(5);
    }
  }
}
