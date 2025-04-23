import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class LoadingStateComponent {
  // Signal for the main loading message
  loadingMessage = signal<string>('Processing your request...');

  // Signal for additional information during loading
  additionalInfo = signal<string>('Please wait while we complete your transaction');

  // Method to update loading messages dynamically
  updateLoadingState(mainMessage: string, additionalMessage: string): void {
    this.loadingMessage.set(mainMessage);
    this.additionalInfo.set(additionalMessage);
  }
}
