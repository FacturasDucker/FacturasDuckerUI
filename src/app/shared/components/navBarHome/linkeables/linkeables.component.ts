import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-linkeables',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './linkeables.component.html',
})
export class LinkeablesComponent {
  navLinks = [
    { label: 'INICIO', route: 'main' },
    { label: 'CHATBOT', route: 'faq' },
    { label: 'CONTACTO', route: 'contacto' },
    { label: 'GFA', route: 'gfa' }
  ];
}
