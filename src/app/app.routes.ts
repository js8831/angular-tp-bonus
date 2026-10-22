import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TeamPage } from './pages/team-page/team-page';
import { AddEmployee } from './pages/add-employee/add-employee';

export const routes: Routes = [
  // title : le titre de l'onglet, différent pour chaque page.
  // '' = /, 'equipe' = /equipe etc.
  { path: '', title: 'Accueil | TechCorp Équipe', component: Home },
  { path: 'equipe', title: 'Équipe | TechCorp Équipe', component: TeamPage },
  { path: 'ajouter', title: 'Ajouter un collègue | TechCorp Équipe', component: AddEmployee },
  // Toute autre adresse renvoie vers l'accueil. Toujours en dernier.
  { path: '**', redirectTo: '' },
];

// ici les routes se parcourent de haut en bas c'est déclaratif. faire donc du plus précis au plus général
