// src/app/auth/pages/register-page/register-page.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private loaderService = inject(LoaderService);

  onRegister(event: Event) {
    event.preventDefault();

    // Mostrar el loader con un mensaje personalizado
    this.loaderService.show('Creando tu cuenta...');

    // Simular una petición con un tiempo de espera más largo
    // para poder ver claramente el loader en acción
    setTimeout(() => {
      // Ocultar el loader después de 4 segundos
      this.loaderService.hide();

      // Opcional: Puedes agregar aquí alguna redirección o mensaje
      console.log('Registro simulado completado');
    }, 4000); // 4 segundos para ver el loader aún más tiempo
  }
}
