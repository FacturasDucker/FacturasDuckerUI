import { CreateInvoiceDTO } from '../dtos/create-invoice-dto';
import { GetInvoiceDTO } from '../dtos/get-invoice-dto';

export class ProccessBillMock {
  static getInvoiceDto(): GetInvoiceDTO {
    return GetInvoiceDTO.fromData({
      rfc: 'XAXX010101000',
      nombre: 'Cliente Ejemplo S.A.',
      correo: 'facturacion@cliente-ejemplo.com',
      cp: '06700',
      formaPago: '01',
      tokenTicket: 'ticket-123',
      regimenFiscal: '601',
      usoCfdi: 'G_03',
      unidadNegocio: 1,
    });
  }

  static getCreateInvoiceDto(): CreateInvoiceDTO {
    return CreateInvoiceDTO.fromData({
      rfcEmisor: 'FACW951024M98',
      nombreEmisor: 'Empresa Estándar S.A. de C.V.',
      rfcReceptor: 'XAXX010101000',
      nombreReceptor: 'Cliente Ejemplo S.A.',
      usoCfdi: 'G_03',
      formaPago: '01',
      metodoPago: 'PUE',
      moneda: 'MXN',
      serie: 'A',
      folio: '104033',
      conceptos: [
        {
          claveProdServ: '10101501',
          descripcion: 'Servicio de consultoría',
          cantidad: 1,
          unidad: 'Servicio',
          valorUnitario: 5000.0,
          importe: 5000.0,
        },
        {
          claveProdServ: '10101501',
          descripcion: 'Desarrollo de software',
          cantidad: 2,
          unidad: 'Hora',
          valorUnitario: 1000.0,
          importe: 2000.0,
        },
      ],
    });
  }
}
