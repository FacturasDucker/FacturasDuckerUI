// Interface for INE (National Electoral Institute) electoral complement
export interface ComplementoIne {
  tipoProceso: string; // Type of electoral process
  tipoComite: string; // Type of electoral committee
  entidad: string; // Electoral entity/state
  ambito: string; // Electoral scope (local/federal)
  clavesContabilidad: string; // Accounting keys
}
