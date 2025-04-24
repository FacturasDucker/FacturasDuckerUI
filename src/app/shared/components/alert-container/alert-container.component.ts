import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './alert-container.component.html',
  styleUrl: './alert-container.component.css'
})
export class AlertContainerComponent {
  private alertService = inject(AlertService);

  // Obtenemos las alertas del servicio
  alerts = this.alertService.getAlerts;

  // Manejamos el cierre de una alerta
  closeAlert(id: string): void {
    this.alertService.removeAlert(id);
  }
}
