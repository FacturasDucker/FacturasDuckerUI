import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../core/data/http/http-client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateInvoiceService extends BaseHttpClient {
  createInvoice(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrlMdmBillService}/api/invoices/process`,
      data
    );
  }
}
