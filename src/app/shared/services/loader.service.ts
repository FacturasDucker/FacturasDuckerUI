// src/app/shared/services/loader.service.ts
import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Usando signals en lugar de BehaviorSubject
  private isLoadingSignal = signal<boolean>(false);
  private loadingMessageSignal = signal<string>('Cargando...');

  // Exponemos los signals para componentes que usen la API de signals
  public isLoading = this.isLoadingSignal.asReadonly();
  public loadingMessage = this.loadingMessageSignal.asReadonly();

  // Convertir signals a observables para compatibilidad con código existente
  public isLoading$ = toObservable(this.isLoadingSignal);
  public loadingMessage$ = toObservable(this.loadingMessageSignal);

  constructor() { }

  // Método para mostrar el loader
  show(message: string = 'Cargando...'): void {
    this.loadingMessageSignal.set(message);
    this.isLoadingSignal.set(true);
  }

  // Método para ocultar el loader
  hide(): void {
    this.isLoadingSignal.set(false);
  }
}
