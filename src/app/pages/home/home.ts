import { Component, signal } from '@angular/core';
import { LeaveCounter } from '../../leave-counter/leave-counter';
import { MatButton } from '@angular/material/button';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  imports: [LeaveCounter, MatButton],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly userName = 'Claire';
  protected message = '';

  // Un signal qui contient le statut du jour, "sur site" au départ.
  protected readonly status = signal<Status>('sur site');

  protected sayHello(): void {
    // fait reference à l'instance de la classe App
    this.message = 'Bienvenue dans Techcorp Equipe, ' + this.userName + '!';
  }

  protected text = '';

  protected updateInput(v: string): void {
    this.text = v;
  }
  protected deleteMsg(): void {
    this.message = '';
  }

  protected changeStatus(newStatus: Status): void {
    // set() remplace la valeur : l'écran se met à jour tout seul.
    this.status.set(newStatus);
  }
}
