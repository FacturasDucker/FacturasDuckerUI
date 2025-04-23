/**
 * Nombre: LinkeablesComponent (Actualizado)
 * Ubicación: src/app/shared/components/navBarHome/linkeables/linkeables.component.ts
 * Descripción: Componente que muestra los enlaces de navegación en la barra superior.
 * Se ha actualizado para incluir el enlace a la página de contacto.
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
  navLinks = [
    { label: 'INICIO', route: 'main' },
    { label: 'FAQ', route: 'faq' },
    { label: 'CONTACTO', route: 'contacto' },
    { label: 'GFA', route: 'gfa' }
  ];
}
