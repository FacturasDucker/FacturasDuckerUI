import { Injectable, signal } from '@angular/core';
import { ComplementoIne } from '../interfaces/ComplementoIne';

@Injectable({providedIn: 'root'})
export class complementIneService {
   complementIne = signal<ComplementoIne>({
    ambito:"",
    clavesContabilidad:"",
    entidad:"",
    tipoComite:"",
    tipoProceso:""
   })

   getComplementIne():ComplementoIne{
     return this.complementIne()
   }

   updatedComplementIne(newComplementIne:ComplementoIne){
      this.complementIne.set(newComplementIne)
   }

   updatedComplementIneField<K extends keyof ComplementoIne>(field: K, value: ComplementoIne[K]){
      this.complementIne.update((currentIne)=>({
        ...currentIne,
        [field]:value
      }))
   }
    
}