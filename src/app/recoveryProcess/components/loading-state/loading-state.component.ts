// components/loading-state/loading-state.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class LoadingStateComponent {
  // Usando señales para manejar el estado
  loadingMessage = signal('Buscando Factura por favor espere');

  // Información adicional sobre el tiempo estimado
  additionalInfo = signal('Este proceso puede tardar hasta cinco minutos, si lo desea puede buscar su factura en el: MÓDULO DE RECUPERACIÓN');
}
