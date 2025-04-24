import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() show = false;
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() actionLabel = '';
  @Input() autoClose = true;
  @Input() autoCloseTime = 5000; // 5 seconds by default

  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  timeoutId: any = null;

  ngOnInit(): void {
    if (this.autoClose) {
      this.startAutoCloseTimer();
    }
  }

  ngOnChanges(): void {
    // Reset timer if the alert is shown again
    if (this.show && this.autoClose) {
      this.clearTimer();
      this.startAutoCloseTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startAutoCloseTimer(): void {
    this.timeoutId = setTimeout(() => {
      this.onClose();
    }, this.autoCloseTime);
  }

  clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  onClose(): void {
    this.clearTimer();
    this.close.emit();
  }

  onAction(): void {
    this.action.emit();
  }

  get alertIconPath(): string {
    switch (this.type) {
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'error':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'info':
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  get alertIconColor(): string {
    switch (this.type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
      default:
        return 'text-blue-500';
    }
  }

  get alertBgColor(): string {
    switch (this.type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  }

  get alertBorderColor(): string {
    switch (this.type) {
      case 'success':
        return 'border-green-100';
      case 'error':
        return 'border-red-100';
      case 'warning':
        return 'border-yellow-100';
      case 'info':
      default:
        return 'border-blue-100';
    }
  }
}
