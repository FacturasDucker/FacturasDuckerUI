import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-banner.component.html',
  styleUrls: ['./register-banner.component.css']
})
export class RegisterBannerComponent {
  subtitle: string = 'BIENVENIDO AL';
  title: string = 'PORTAL DE FACTURACIÓN';
  description: string = 'Genera tu CFDI de manera fácil, rápida y segura. Facturación disponible durante el mes de tu compra.';
}