import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../core/data/http/http-client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetServicesTypeService extends BaseHttpClient {
  // Method to get the type of service
  getServicesType(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrlMdmBillService}/api/business-units`
    );
  }
}
