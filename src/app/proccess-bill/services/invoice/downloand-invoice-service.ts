import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../core/data/http/http-client.service';
import { CreateInvoiceAdapter } from '../../adapters/create-invoice-adapter';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DownloadInvoiceService extends BaseHttpClient {
  downloadInvoice(createInvoiceAdapter: CreateInvoiceAdapter): Observable<any> {
    const xml = createInvoiceAdapter.xml;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
    });
    return this.httpClient.post(
      `https://3655-148-230-178-165.ngrok-free.app/xml/bills/download`,
      xml,
      {
        headers: headers,
        responseType: 'blob', // To handle binary response data (PDF)
      }
    );
  }
}
