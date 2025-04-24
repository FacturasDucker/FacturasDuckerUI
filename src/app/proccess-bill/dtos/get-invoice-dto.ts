export class GetInvoiceDTO {
  rfc: string;
  nombre: string;
  correo: string;
  cp: string;
  formaPago: string;
  tokenTicket: string;
  regimenFiscal: string;
  usoCfdi: string;
  unidadNegocio: number;

  constructor(data?: Partial<GetInvoiceDTO>) {
    this.rfc = data?.rfc || '';
    this.nombre = data?.nombre || '';
    this.correo = data?.correo || '';
    this.cp = data?.cp || '';
    this.formaPago = data?.formaPago || '';
    this.tokenTicket = data?.tokenTicket || '';
    this.regimenFiscal = data?.regimenFiscal || '';
    this.usoCfdi = data?.usoCfdi || '';
    this.unidadNegocio = data?.unidadNegocio || 0;
  }

  // Static factory method to create from form or other data
  static fromData(data: any): GetInvoiceDTO {
    return new GetInvoiceDTO({
      rfc: data.rfc,
      nombre: data.nombre,
      correo: data.correo,
      cp: data.cp,
      formaPago: data.formaPago,
      tokenTicket: data.tokenTicket,
      regimenFiscal: data.regimenFiscal,
      usoCfdi: data.usoCfdi,
      unidadNegocio: data.unidadNegocio,
    });
  }

  // Optional: Method to convert to plain object/JSON
  toJson(): object {
    return {
      rfc: this.rfc,
      nombre: this.nombre,
      correo: this.correo,
      cp: this.cp,
      formaPago: this.formaPago,
      tokenTicket: this.tokenTicket,
      regimenFiscal: this.regimenFiscal,
      usoCfdi: this.usoCfdi,
      unidadNegocio: this.unidadNegocio,
    };
  }
}
