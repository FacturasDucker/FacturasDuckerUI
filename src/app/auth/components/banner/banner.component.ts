import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  title: string = 'PORTAL DE FACTURACIÓN';
  subtitle: string = 'BIENVENIDO AL';
  description: string = 'Genera tu CFDI de manera fácil, rápida y segura. Facturación disponible durante el mes de tu compra.';
}
