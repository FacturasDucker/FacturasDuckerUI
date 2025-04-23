/**
 * Nombre: ProfilePageComponent
 * Ubicación: src/app/profile/pages/profile-page/profile-page.component.ts
 * Descripción: Componente principal para la página de perfil del usuario.
 * Contiene la lógica para mostrar información del usuario y gestionar constancias fiscales.
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
  showUploadModal = signal<boolean>(false);
  showSuccessModal = signal<boolean>(false);
  selectedConstancyType = signal<string>('Personal');

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

  // Método para abrir modal de carga
  openUploadModal(): void {
    this.showUploadModal.set(true);
  }

  // Método para cerrar modal de carga
  closeUploadModal(): void {
    this.showUploadModal.set(false);
  }

  // Método para mostrar modal de éxito
  showSuccessMessage(): void {
    this.showSuccessModal.set(true);
  }

  // Método para cerrar modal de éxito
  closeSuccessModal(): void {
    this.showSuccessModal.set(false);
  }

  // Método que se llama al hacer clic en "Continuar" o "Editar Seleccionado"
  onContinue(): void {
    this.showSuccessMessage();
  }

  // Método para la carga de la constancia fiscal
  onUploadConstancy(): void {
    // Aquí iría la lógica de carga
    // Simulamos éxito después de un breve retraso
    setTimeout(() => {
      this.closeUploadModal();
      this.showSuccessMessage();
    }, 1000);
  }
}
