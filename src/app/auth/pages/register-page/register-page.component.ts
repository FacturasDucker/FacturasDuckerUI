import { Component } from '@angular/core';
import { RegisterBannerComponent } from '../../components/register-banner/register-banner.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterBannerComponent, RegisterFormComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  // Aquí puedes añadir lógica específica de la página de registro si es necesario
}