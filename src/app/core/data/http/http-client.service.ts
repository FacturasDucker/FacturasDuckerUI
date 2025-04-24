import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseHttpClient {
  private readonly baseUrl: String = 'http://localhost:';
  readonly baseScrappingService = `${this.baseUrl}8089`;
  readonly baseUrlMdmBillService = `${this.baseUrl}8088`;
  readonly baseUrlInvoiceService = `${this.baseUrl}8082`;
  readonly httpClient: HttpClient = inject(HttpClient);
}
