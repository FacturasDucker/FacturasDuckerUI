import { Component, Input } from '@angular/core';
import { UploadFiscalComponent } from "../../components/upload-fiscal/upload-fiscal.component";
import { SelectServiceComponent } from "../../components/select-service/select-service.component";

@Component({
  selector: 'situation-fiscal-template',
  standalone: true, // Added standalone decorator
  imports: [UploadFiscalComponent, SelectServiceComponent],
  templateUrl: './situation-fiscal-template.component.html',
  styleUrl: './situation-fiscal-template.component.css'
})
export class SituationFiscalTemplateComponent {
  @Input() handleFileUploaded: (file: File) => void = () => {};
  // Method to handle uploaded fiscal certificate file
  
}
