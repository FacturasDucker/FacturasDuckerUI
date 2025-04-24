import { CreateInvoiceConceptDTO } from './create-invoice-concept-dto';

export class CreateInvoiceDTO {
  rfcEmisor: string;
  nombreEmisor: string;
  rfcReceptor: string;
  nombreReceptor: string;
  usoCfdi: string;
  formaPago: string;
  metodoPago: string;
  moneda: string;
  serie: string;
  folio: string;
  conceptos: CreateInvoiceConceptDTO[];

  constructor(data?: Partial<CreateInvoiceDTO>) {
    this.rfcEmisor = data?.rfcEmisor || '';
    this.nombreEmisor = data?.nombreEmisor || '';
    this.rfcReceptor = data?.rfcReceptor || '';
    this.nombreReceptor = data?.nombreReceptor || '';
    this.usoCfdi = data?.usoCfdi || '';
    this.formaPago = data?.formaPago || '';
    this.metodoPago = data?.metodoPago || '';
    this.moneda = data?.moneda || 'MXN';
    this.serie = data?.serie || '';
    this.folio = data?.folio || '';
    this.conceptos = data?.conceptos || [];
  }

  // Static factory method to create from data
  static fromData(data: any): CreateInvoiceDTO {
    return new CreateInvoiceDTO(data);
  }

  // Method to convert to plain object/JSON
  toJson(): object {
    return {
      rfcEmisor: this.rfcEmisor,
      nombreEmisor: this.nombreEmisor,
      rfcReceptor: this.rfcReceptor,
      nombreReceptor: this.nombreReceptor,
      usoCfdi: this.usoCfdi,
      formaPago: this.formaPago,
      metodoPago: this.metodoPago,
      moneda: this.moneda,
      serie: this.serie,
      folio: this.folio,
      conceptos: this.conceptos,
    };
  }

  // Helper method to add a concepto
  addConcepto(concepto: CreateInvoiceConceptDTO): void {
    this.conceptos.push(concepto);
  }
}
