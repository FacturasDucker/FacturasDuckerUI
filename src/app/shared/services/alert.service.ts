import { Injectable, signal } from '@angular/core';
import { AlertType } from '../components/alert/alert.component';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  actionLabel?: string;
  autoClose?: boolean;
  autoCloseTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Signal para las alertas activas
  private alerts = signal<Alert[]>([]);

  // Exponer las alertas como readonly
  public getAlerts = this.alerts.asReadonly();

  constructor() {}

  /**
   * Mostrar una nueva alerta
   */
  addAlert(alert: Omit<Alert, 'id'>): string {
    const id = this.generateId();
    const newAlert: Alert = {
      ...alert,
      id
    };

    this.alerts.update(alerts => [...alerts, newAlert]);
    return id;
  }

  /**
   * Eliminar una alerta por su ID
   */
  removeAlert(id: string): void {
    this.alerts.update(alerts => alerts.filter(alert => alert.id !== id));
  }

  /**
   * Cerrar todas las alertas
   */
  clearAlerts(): void {
    this.alerts.set([]);
  }

  /**
   * Convenience methods for different alert types
   */
  success(message: string, title: string = 'Éxito', options: Partial<Alert> = {}): string {
    return this.addAlert({
      type: 'success',
      title,
      message,
      autoClose: true,
      autoCloseTime: 5000,
      ...options
    });
  }

  error(message: string, title: string = 'Error', options: Partial<Alert> = {}): string {
    return this.addAlert({
      type: 'error',
      title,
      message,
      autoClose: false,
      ...options
    });
  }

  warning(message: string, title: string = 'Advertencia', options: Partial<Alert> = {}): string {
    return this.addAlert({
      type: 'warning',
      title,
      message,
      autoClose: true,
      autoCloseTime: 7000,
      ...options
    });
  }

  info(message: string, title: string = 'Información', options: Partial<Alert> = {}): string {
    return this.addAlert({
      type: 'info',
      title,
      message,
      autoClose: true,
      autoCloseTime: 5000,
      ...options
    });
  }

  /**
   * Generar un ID único para la alerta
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
