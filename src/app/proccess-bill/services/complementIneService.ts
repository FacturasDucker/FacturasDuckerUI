import { Injectable, signal } from '@angular/core';
import { ComplementoIne } from '../interfaces/ComplementoIne';

@Injectable({providedIn: 'root'})
export class ComplementIneService {
  // Reactive signal to store INE complement information
  complementIne = signal<ComplementoIne>({
    ambito: "",           // Electoral scope
    clavesContabilidad: "", // Accounting keys
    entidad: "",          // Electoral entity
    tipoComite: "",       // Committee type
    tipoProceso: ""       // Process type
  });

  // Retrieve current INE complement information
  getComplementIne(): ComplementoIne {
    return this.complementIne();
  }

  // Update entire INE complement object
  updateComplementIne(newComplementIne: ComplementoIne) {
    this.complementIne.set(newComplementIne);
  }

  // Partially update a specific field of the INE complement
  updateComplementIneField<K extends keyof ComplementoIne>(field: K, value: ComplementoIne[K]) {
    this.complementIne.update((currentIne) => ({
      ...currentIne,
      [field]: value
    }));
  }
}
