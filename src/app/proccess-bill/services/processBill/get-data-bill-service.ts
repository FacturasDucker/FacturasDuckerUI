import { Injectable } from "@angular/core";
import { BaseHttpClient } from "../../../core/data/http/http-client.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class GetDataBillService extends BaseHttpClient{
  // Method to get the data of the bill
  getDataBill(file : File): Observable<any> {
    // Create a FormData object to properly send the file
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<any>(
        `${this.baseScrappingService}/extract-csf`,
        formData
    );

  }

}