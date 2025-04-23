// Interface representing a fiscal ticket/receipt
export interface Ticket {
  formaPago: string;        // Payment method code
  tokenTicket: string;      // Unique ticket identifier
  regimenFiscal: string;    // Fiscal regime code
  usoCfdi: string;          // CFDI usage code
  evidenciaImagen?: File | null; // Optional image evidence file
 }
