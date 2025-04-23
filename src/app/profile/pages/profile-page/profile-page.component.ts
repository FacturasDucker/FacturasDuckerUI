/**
 * Name: ProfilePageComponent
 * Location: src/app/profile/pages/profile-page/profile-page.component.ts
 * Description: Main component for user profile page.
 * Manages user information display and fiscal certificate management.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";
import { FormsModule } from '@angular/forms';
import { UploadFiscalConstancyComponent } from '../../components/upload-fiscal-constancy/upload-fiscal-constancy.component';
import { BasicUserInfo } from '../../../proccess-bill/interfaces/basicUserInfo';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, NavBarHomeComponent, FormsModule, UploadFiscalConstancyComponent],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {
  // Signal to control upload modal visibility
  showUploadModal = signal<boolean>(false);

  // Signal to control success modal visibility
  showSuccessModal = signal<boolean>(false);

  // Signal to track selected fiscal certificate type
  selectedConstancyType = signal<string>('Personal');

  // Signal to store user data
  userData = signal<BasicUserInfo>({
    rfc: 'GOMR9208259V8',
    nombre: 'RAÚL ULISES GÓMEZ MÉNDEZ',
    correo: 'ru.gomez@flecha-amarilla.com',
    cp: '37530',
    estado: 'GUANAJUATO',
    ciudad: 'LEÓN',
    colonia: 'Parque Industrial Colinas',
    calle: 'Circuito Paseo de las Colinas',
    numeroExt: '301'
  });

  // Open upload modal
  openUploadModal(): void {
    this.showUploadModal.set(true);
  }

  // Close upload modal
  closeUploadModal(): void {
    this.showUploadModal.set(false);
  }

  // Show success message modal
  showSuccessMessage(): void {
    this.showSuccessModal.set(true);
  }

  // Close success modal
  closeSuccessModal(): void {
    this.showSuccessModal.set(false);
  }

  // Handle continue or edit selected action
  onContinue(): void {
    this.showSuccessMessage();
  }

  // Handle fiscal certificate upload
  onUploadConstancy(): void {
    // Simulates upload process
    // Shows success modal after a brief delay
    setTimeout(() => {
      this.closeUploadModal();
      this.showSuccessMessage();
    }, 1000);
  }
}
