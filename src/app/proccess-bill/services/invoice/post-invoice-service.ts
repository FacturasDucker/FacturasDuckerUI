import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../core/data/http/http-client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostInvoiceService extends BaseHttpClient {
  postInvoice(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrlInvoiceService}/api/bills/create`,
      data
    );
  }
}
