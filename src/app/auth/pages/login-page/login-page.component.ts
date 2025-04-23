// Handles user authentication process with loader simulation
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

    // Display the loader with a custom message
    this.loaderService.show('Iniciando sesión...');

    // Simulate a request with a longer timeout
    // to be able to clearly see the loader in action
    setTimeout(() => {
      // Hide loader after 3 seconds
      this.loaderService.hide();

      console.log('Inicio de sesión simulado completado');
    }, 3000); // 3 seconds of waiting to clearly see the loader
  }
}
