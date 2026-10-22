import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  // Chaque composant utilisé dans le template doit être listé ici.
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // protected : utilisable dans le template, mais pas depuis d'autres classes.
  // readonly : la valeur ne sera jamais remplacée.
  protected readonly appName = 'TechCorp Équipe';
}
