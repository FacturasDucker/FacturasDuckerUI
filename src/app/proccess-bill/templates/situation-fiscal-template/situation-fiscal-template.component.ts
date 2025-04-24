import { Component, inject, Input, OnInit } from '@angular/core';
import { UploadFiscalComponent } from '../../components/upload-fiscal/upload-fiscal.component';
import { SelectServiceComponent } from '../../components/select-service/select-service.component';
import { GetServicesTypeService } from '../../services/processBill/get-services-type-service';
import { catchError, EMPTY } from 'rxjs';
import { ServiceTypeAdapter } from '../../adapters/service-type-adapter';

@Component({
  selector: 'situation-fiscal-template',
  standalone: true, // Added standalone decorator
  imports: [UploadFiscalComponent, SelectServiceComponent],
  templateUrl: './situation-fiscal-template.component.html',
  styleUrl: './situation-fiscal-template.component.css',
})
export class SituationFiscalTemplateComponent implements OnInit {
  @Input() handleFileUploaded: (file: File) => void = () => {};
  // Method to handle uploaded fiscal certificate file
  private getServicesTypeService: GetServicesTypeService = inject(
    GetServicesTypeService
  );
  servicesType: ServiceTypeAdapter[] = [];
  serviceType: ServiceTypeAdapter = new ServiceTypeAdapter(); // Default service type
  // Default service type
  ngOnInit(): void {
    // Initialize the service types from the service
    this.getServicesTypeService
      .getServicesType()
      .pipe(
        catchError((err: string) => {
          console.error('Error al obtener los datos de los servicios:', err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        const servicesTypeResponse = res.map((item) => ServiceTypeAdapter.fromApiResponse(item));
        this.servicesType = servicesTypeResponse; // Update the data bill with the response
        this.serviceType = this.servicesType[0]; // Set the default service type to the first one
        console.log('Respuesta de la API:', this.servicesType);
        // Handle the adapted data here if needed
      });
  }
}
