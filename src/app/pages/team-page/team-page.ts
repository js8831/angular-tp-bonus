import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeCard } from '../../employee-card/employee-card';
import { SearchBox } from '../../search-box/search-box';
import { TeamStore } from '../../team-store';

@Component({
  imports: [EmployeeCard, SearchBox],
  selector: 'app-team-page',
  styleUrl: './team-page.css',
  templateUrl: './team-page.html',
})
export class TeamPage {
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
}
