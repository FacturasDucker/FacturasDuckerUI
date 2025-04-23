/**
 * Name: PerfilUserComponent (Updated)
 * Location: src/app/shared/components/perfil-user/perfil-user.component.ts
 * Description: Component displaying basic user information in the navigation bar.
 * Updated version includes navigation to user profile.
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
  // User name to display in the UI
  userName: string = 'John Hernandez';

  // Generate user initials for avatar
  get userInitials(): string {
    const names = this.userName.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`
      : names[0].substring(0, 2);
  }
}
