/**
 * Nombre: PerfilUserComponent (Actualizado)
 * Ubicación: src/app/shared/components/perfil-user/perfil-user.component.ts
 * Descripción: Componente que muestra la información básica del usuario en la barra de navegación.
 * La versión actualizada incluye navegación al perfil del usuario.
 */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-perfil-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './perfil-user.component.html',
})
export class PerfilUserComponent {
  // Nombre del usuario para mostrar en la UI
  userName: string = 'Juan Hernández';

  // Iniciales para el avatar
  get userInitials(): string {
    const names = this.userName.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`
      : names[0].substring(0, 2);
  }
}
