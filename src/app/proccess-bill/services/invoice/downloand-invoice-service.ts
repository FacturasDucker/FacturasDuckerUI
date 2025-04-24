import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../core/data/http/http-client.service';
import { CreateInvoiceAdapter } from '../../adapters/create-invoice-adapter';

@Injectable({ providedIn: 'root' })
export class DownloadInvoiceService extends BaseHttpClient {
  downloadInvoice(createInvoiceAdapter: CreateInvoiceAdapter) {
    const xml = createInvoiceAdapter.xml;
    this.httpClient.post(
      `${this.baseUrlInvoiceService}/xml/bills/download`,
      xml,
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/xml',
          Accept: 'application/pdf',
        },
      }
    );
  }
}
