import { Component, input } from '@angular/core';
import { Employee } from '../models/employee';

@Component({
  imports: [],
  selector: 'app-employee-card',
  styleUrl: './employee-card.css',
  templateUrl: './employee-card.html',
})
export class EmployeeCard {
  // Donnée reçue du parent : <app-employee-card [employee]="..." />
  // required : le parent est OBLIGÉ de la fournir.
  // C'est un signal > une fonction comme vu precedemment
  readonly employee = input.required<Employee>();
}
