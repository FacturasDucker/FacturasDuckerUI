// upload-fiscal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PdfPreviewModalComponent } from '../pdf-preview-modal/pdf-preview-modal.component';

@Component({
  selector: 'app-upload-fiscal',
  standalone: true,
  imports: [CommonModule, PdfPreviewModalComponent],
  templateUrl: './upload-fiscal.component.html'
})
export class UploadFiscalComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  
  isDragging = false;
  selectedFile: File | null = null;
  fileName: string = '';
  pdfPreviewUrl: SafeUrl | null = null;
  showModal = false;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  // Método para manejar cuando se arrastra un archivo sobre el componente
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  
  // Método para manejar cuando se deja de arrastrar sobre el componente
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }
  
  // Método para manejar cuando se suelta un archivo en el componente
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }
  
  // Método para manejar cuando se selecciona un archivo a través del input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }
  
  // Método común para procesar el archivo seleccionado
  handleFile(file: File): void {
    // Verificar si es un PDF
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecciona un archivo PDF');
      return;
    }
    
    this.selectedFile = file;
    this.fileName = file.name;
    this.generatePdfPreview(file);
  }
  
  // Método para generar la URL de vista previa del PDF
  generatePdfPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
  
  // Método para abrir el modal de vista previa
  openPreviewModal(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedFile && this.pdfPreviewUrl) {
      this.showModal = true;
    }
  }
  
  // Método para cerrar el modal de vista previa
  closePreviewModal(): void {
    this.showModal = false;
  }
  
  // Método para borrar el archivo seleccionado
  clearFile(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedFile = null;
    this.fileName = '';
    this.pdfPreviewUrl = null;
    this.showModal = false;
  }
  
  // Método para cargar el archivo
  uploadFile(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedFile) {
      this.fileUploaded.emit(this.selectedFile);
      // Aquí normalmente enviarías el archivo a un servidor
      console.log('Archivo listo para cargar:', this.selectedFile);
    } else {
      alert('Por favor, selecciona un archivo primero');
    }
  }
  
  // Método para detener la propagación en el área de drop cuando está seleccionado un archivo
  handleClick(event: MouseEvent): void {
    if (this.selectedFile) {
      event.stopPropagation();
      this.openPreviewModal();
    }
  }
}