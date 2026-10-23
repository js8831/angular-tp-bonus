import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TeamStore } from '../../team-store';

// Le modèle du formulaire : une propriété par champ.
interface EmployeeDraft {
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  department: string;
  remote: boolean;
}

// Les valeurs de départ, réutilisées pour vider le formulaire (module 19).
const EMPTY_DRAFT: EmployeeDraft = {
  firstName: '',
  lastName: '',
  email: '',
  job: '',
  department: 'Informatique',
  remote: false,
};

@Component({
  imports: [FormField, FormRoot, MatButton],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  private readonly store = inject(TeamStore);
  private readonly router = inject(Router);

  protected readonly departments = ['Informatique', 'Ressources humaines', 'Commercial'];

  // 1. Le modèle : un signal qui contient toutes les valeurs du formulaire.
  // { ...EMPTY_DRAFT } : une copie indépendante, pour ne jamais modifier EMPTY_DRAFT.
  private readonly draft = signal<EmployeeDraft>({ ...EMPTY_DRAFT });

  // 2. Le formulaire : un champ par propriété du modèle.
  // L'objet utilisé directement par le HTML pour lier les champs
  protected readonly employeeForm = form(this.draft, {
    // 3. L'action de soumission : appelée à l'envoi du formulaire.
    // On transforme le brouillon en formulaire intelligent avec sa règle de soumission
    // async : elle pourrait attendre une réponse d'API (jour 4).
    submission: {
      // action : ce qui s'exécute à l'envoi du formulaire (appelle la méthode save)
      action: async () => this.save(),
    },
  });
  // Remet les valeurs à zéro ET efface l'historique (état "touché") des champs
  protected resetForm(): void {
    this.employeeForm().reset({ ...EMPTY_DRAFT });
  }

  // Quand on valide le formulaire, la méthode save() s'exécute et fait trois choses dans l'ordre :
  private async save(): Promise<void> {
    // 1. On sauvegarde les données actuelles du brouillon dans la mémoire globale de l'app
    this.store.add(this.draft());
    // 2. On remet le formulaire à zéro
    this.resetForm();
    // 3. On redirige l'utilisateur vers la page de l'équipe
    await this.router.navigate(['/equipe']);
  }
}
