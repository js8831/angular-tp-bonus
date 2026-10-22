import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-status-badge',
  styleUrl: './status-badge.css',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  public remote = input.required<boolean>();
}
