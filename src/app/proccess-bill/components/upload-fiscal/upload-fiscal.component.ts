// upload-fiscal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PdfPreviewModalComponent } from '../pdf-preview-modal/pdf-preview-modal.component';
@Component({
  selector: 'app-upload-fiscal',
  standalone: true,
  imports: [CommonModule, PdfPreviewModalComponent],
  templateUrl: './upload-fiscal.component.html',
})
export class UploadFiscalComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  isDragging = false;
  selectedFile: File | null = null;
  fileName: string = '';
  pdfPreviewUrl: SafeUrl | null = null;
  showModal = false;
  constructor(private sanitizer: DomSanitizer) {}
  // Handle file drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  // Handle file drag leave event
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }
  // Process file drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }
  // Handle file selection from input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }
  // Process and validate the selected file
  handleFile(file: File): void {
    // Verify if it's a PDF
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecciona un archivo PDF');
      return;
    }
    this.selectedFile = file;
    this.fileName = file.name;
    this.generatePdfPreview(file);
  }
  // Generate PDF preview from file
  generatePdfPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          e.target.result as string
        );
      }
    };
    reader.readAsDataURL(file);
  }
  // Open PDF preview modal
  openPreviewModal(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedFile && this.pdfPreviewUrl) {
      this.showModal = true;
    }
  }
  // Close PDF preview modal
  closePreviewModal(): void {
    this.showModal = false;
  }
  // Clear selected file and reset state
  clearFile(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedFile = null;
    this.fileName = '';
    this.pdfPreviewUrl = null;
    this.showModal = false;
  }
  // Upload selected file
  uploadFile(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedFile) {
      this.fileUploaded.emit(this.selectedFile);
      // Here you would normally send the file to a server
      // console.log('Archivo listo para cargar:', this.selectedFile);
    } else {
      alert('Por favor, selecciona un archivo primero');
    }
  }
  // Prevent propagation and open preview when file area is clicked
  handleClick(event: MouseEvent): void {
    if (this.selectedFile) {
      event.stopPropagation();
      this.openPreviewModal();
    }
  }
}
