import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeCard } from './employee-card/employee-card';
import { LeaveCounter } from './leave-counter/leave-counter';
import { Employee } from './models/employee';
import { SearchBox } from './search-box/search-box';

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

  // type Employee de l interface dans models
  protected readonly employees: Employee[] = [
    {
      id: 1,
      firstName: 'Claire',
      lastName: 'Martin',
      email: 'claire.martin@techcorp.fr',
      job: 'Développeuse front-end',
      department: 'Informatique',
      remote: true,
    },

    {
      id: 2,
      firstName: 'Julien',
      lastName: 'Bernard',
      email: 'julien.bernard@techcorp.fr',
      job: 'Chef de projet',
      department: 'Informatique',
      remote: false,
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Lefèvre',
      email: 'sarah.lefevre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: false,
    },
    {
      id: 4,
      firstName: 'Navin',
      lastName: 'Ram',
      email: 'navin.ram@techcorp.fr',
      job: 'Commercial',
      department: 'Commercial',
      remote: false,
    },
  ];

  protected search = signal('');

  protected readonly filteredEmployees = computed(() => {
    // on trim et met en minuscule le contenu de search qui est un signal
    const text = this.search().trim().toLowerCase();
    // la variable filtre l'array employees et pour chaque employee elle verifie avec includes
    // si le contenu de text correspond au nom et prenom d'un employee
    return this.employees.filter((employee) =>
      (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(text),
    );
  });

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
