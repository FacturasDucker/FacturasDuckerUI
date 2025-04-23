import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Using signals instead of BehaviorSubject
  private isLoadingSignal = signal<boolean>(false);
  private loadingMessageSignal = signal<string>('Loading...');

  // Expose signals as readonly for components using signal API
  public isLoading = this.isLoadingSignal.asReadonly();
  public loadingMessage = this.loadingMessageSignal.asReadonly();

  // Convert signals to observables for compatibility with existing code
  public isLoading$ = toObservable(this.isLoadingSignal);
  public loadingMessage$ = toObservable(this.loadingMessageSignal);

  constructor() { }

  // Method to show loader
  show(message: string = 'Loading...'): void {
    this.loadingMessageSignal.set(message);
    this.isLoadingSignal.set(true);
  }

  // Method to hide loader
  hide(): void {
    this.isLoadingSignal.set(false);
  }
}
