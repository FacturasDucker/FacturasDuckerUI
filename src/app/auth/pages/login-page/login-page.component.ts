// src/app/auth/pages/login-page/login-page.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { BannerComponent } from "../../components/banner/banner.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [BannerComponent, LoginFormComponent],
  templateUrl: './login-page.component.html'
})
export default class LoginPageComponent {
  private loaderService = inject(LoaderService);

  onLogin(event: Event) {
    event.preventDefault();

    // Mostrar el loader con un mensaje personalizado
    this.loaderService.show('Iniciando sesión...');

    // Simular una petición con un tiempo de espera más largo
    // para poder ver claramente el loader en acción
    setTimeout(() => {
      // Ocultar el loader después de 3 segundos
      this.loaderService.hide();

      // Opcional: Puedes agregar aquí alguna redirección o mensaje
      console.log('Inicio de sesión simulado completado');
    }, 3000); // 3 segundos de espera para ver claramente el loader
  }
}
