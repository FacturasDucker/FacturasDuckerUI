export class CreateInvoiceAdapter {
  uuid: string = '';
  xml: string = '';
  folio: string = '';
  series: string = '';
  success: boolean = false;
  errorMessage?: string;

  constructor() {}

  static toAdapter(data: any): CreateInvoiceAdapter {
    const createInvoiceAdapter = new CreateInvoiceAdapter();
    createInvoiceAdapter.uuid = data.uuid;
    createInvoiceAdapter.xml = data.xml;
    createInvoiceAdapter.folio = data.folio;
    createInvoiceAdapter.series = data.series;
    createInvoiceAdapter.success = data.success;
    createInvoiceAdapter.errorMessage = data?.errorMessage ?? null;

    return createInvoiceAdapter;
  }
}
