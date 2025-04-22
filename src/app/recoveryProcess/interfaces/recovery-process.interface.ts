// interfaces/recovery-process.interface.ts

export enum RecoveryProcessState {
  PERSONAL_DATA = 'personal_data',
  LOADING = 'loading',
  INVOICE_READY = 'invoice_ready'
}

export interface PersonalData {
  empresa?: string;
  rfcCliente?: string;
  token?: string;
  numeroGuia?: string;
}

export interface InvoiceRecoveryRequest {
  personalData: PersonalData;
  timestamp: Date;
}
