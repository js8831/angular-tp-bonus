import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeCard } from './employee-card/employee-card';
import { LeaveCounter } from './leave-counter/leave-counter';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  imports: [RouterOutlet, LeaveCounter, EmployeeCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('decouverte-angular');
  // protected : utilisable dans le template, mais pas depuis d'autres classes.
  // readonly : la valeur ne sera jamais remplacée.
  protected readonly appName = 'TechCorp Équipe';
  protected readonly userName = 'Jean';
  protected message = '';
  protected text = '';

  // Un signal qui contient le statut du jour, "sur site" au départ.
  protected readonly status = signal<Status>('sur site');

  protected sayHello(): void {
    // fait reference à l'instance de la classe App
    this.message = 'Bienvenue dans Techcorp Equipe, ' + this.userName + '!';
  }

  protected deleteMsg(): void {
    this.message = '';
  }

  protected updateInput(v: string): void {
    this.text = v;
  }

  protected changeStatus(newStatus: Status): void {
    // set() remplace la valeur : l'écran se met à jour tout seul.
    this.status.set(newStatus);
  }
}
