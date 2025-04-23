// Enum and interfaces for invoice recovery process

// Defines the possible states of the recovery process
export enum RecoveryProcessState {
  PERSONAL_DATA = 'personal_data',  // Initial state for entering personal data
  LOADING = 'loading',              // Processing state while retrieving invoice
  INVOICE_READY = 'invoice_ready'   // Final state when invoice is available
}

// Interface for personal data input
export interface PersonalData {
  empresa?: string;     // Optional company name
  rfcCliente?: string;  // Optional client RFC (tax ID)
  token?: string;       // Optional token
  numeroGuia?: string;  // Optional guide number
}

// Interface for complete invoice recovery request
export interface InvoiceRecoveryRequest {
  personalData: PersonalData;  // Personal data used for invoice retrieval
  timestamp: Date;             // Timestamp of the recovery request
}
