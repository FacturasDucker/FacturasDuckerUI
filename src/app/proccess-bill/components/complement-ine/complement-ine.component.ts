import { Component, inject } from '@angular/core';
import { complementIneService } from '../../services/complementIneService';
import { ComplementoIne } from '../../interfaces/ComplementoIne';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { entidadesMexico } from '../../data/entidadesMexico';

@Component({
  selector: 'bill-complement-ine',
  imports: [CommonModule, FormsModule],
  templateUrl: './complement-ine.component.html',
  styleUrl: './complement-ine.component.css'
})
export class ComplementIneComponent {
  ineServices = inject(complementIneService);
  ineComplement = this.ineServices.getComplementIne();
  
  // Arreglo de entidades para el selector
  entidades = entidadesMexico;

  // Opciones para el tipo de proceso
  tiposProceso = [
    'Ordinario',
    'Precampaña',
    'Campaña'
  ];

  // Opciones para el tipo de comité
  tiposComite = [
    'Ejecutivo nacional',
    'Ejecutivo estatal',
    'Directivo estatal',
    'Directivo municipal'
  ];

  // Opciones para ámbito
  ambitos = [
    'Federal',
    'Local'
  ];

  updateComplementIne<K extends keyof ComplementoIne>(key: K, value: ComplementoIne[K]){
    console.log(entidadesMexico)
    const updateIne = {
      ...this.ineComplement,
      [key]: value
    }
    this.ineServices.updatedComplementIne(updateIne)
    this.ineComplement = updateIne
  }
}