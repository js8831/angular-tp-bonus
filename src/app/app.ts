import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeCard } from './employee-card/employee-card';
import { LeaveCounter } from './leave-counter/leave-counter';
import { SearchBox } from './search-box/search-box';
import { TeamStore } from './team-store';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  // Chaque composant utilisé dans le template doit être listé ici.
  imports: [RouterOutlet, LeaveCounter, EmployeeCard, SearchBox],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // protected : utilisable dans le template, mais pas depuis d'autres classes.
  // readonly : la valeur ne sera jamais remplacée.
  protected readonly title = signal('decouverte-angular');

  protected readonly appName = 'TechCorp Équipe';
  protected readonly userName = 'Jean';
  protected message = '';
  protected text = '';

  // Un signal qui contient le statut du jour, "sur site" au départ.
  protected readonly status = signal<Status>('sur site');

  // inject() : Angular fournit l'instance unique du service.
  private readonly store = inject(TeamStore);

  protected search = signal('');

  protected readonly filteredEmployees = computed(() => {
    // on trim et met en minuscule le contenu de search qui est un signal
    const text = this.search().trim().toLowerCase();
    // la variable filtre l'array employees et pour chaque employee elle verifie avec includes
    // si le contenu de text correspond au nom et prenom d'un employee
    return this.store
      .employees()
      .filter((employee) =>
        (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(text),
      );
  });

  // on appelle la fonction remove de TeamStore via l'injection
  protected remove(id: number): void {
    this.store.remove(id);
  }

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
