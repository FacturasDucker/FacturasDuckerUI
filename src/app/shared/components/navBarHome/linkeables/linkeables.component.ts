/**
 * Name: LinkeablesComponent (Updated)
 * Location: src/app/shared/components/navBarHome/linkeables/linkeables.component.ts
 * Description: Component that displays navigation links in the top navigation bar.
 * Updated to include contact page link.
 */
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
  // Navigation links for the top navigation bar
  navLinks = [
    { label: 'HOME', route: 'main' },
    { label: 'FAQ', route: 'faq' },
    { label: 'CONTACT', route: 'contacto' },
    { label: 'GFA', route: 'gfa' }
  ];
}
