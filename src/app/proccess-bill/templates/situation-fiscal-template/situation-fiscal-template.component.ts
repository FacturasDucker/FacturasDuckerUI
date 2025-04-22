import { Component } from '@angular/core';
import { UploadFiscalComponent } from "../../components/upload-fiscal/upload-fiscal.component";
import { SelectServiceComponent } from "../../components/select-service/select-service.component";

@Component({
  selector: 'situation-fiscal-template',
  imports: [UploadFiscalComponent, SelectServiceComponent],
  templateUrl: './situation-fiscal-template.component.html',
  styleUrl: './situation-fiscal-template.component.css'
})
export class SituationFiscalTemplateComponent {
   
  handleFileUploaded(file: File): void {
    console.log('Archivo recibido:', file.name);
    // Aquí puedes enviar el archivo a un servicio para procesarlo
    // Por ejemplo: this.fiscalService.uploadFile(file).subscribe(...)
  }
}
