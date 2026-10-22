import { Component, input } from '@angular/core';
import { Employee } from '../models/employee';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  imports: [StatusBadge],
  selector: 'app-employee-card',
  styleUrl: './employee-card.css',
  templateUrl: './employee-card.html',
})
export class EmployeeCard {
  // Donnée reçue du parent : <app-employee-card [employee]="..." />
  // required : le parent est OBLIGÉ de la fournir.
  // C'est un signal > une fonction
  readonly employee = input.required<Employee>();
}
