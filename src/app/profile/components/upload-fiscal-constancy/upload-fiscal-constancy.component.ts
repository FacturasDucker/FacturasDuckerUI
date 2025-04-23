/**
 * Name: UploadFiscalConstancyComponent
 * Location: src/app/profile/components/upload-fiscal-constancy/upload-fiscal-constancy.component.ts
 * Description: Component for uploading fiscal constancy documents.
 * Allows dragging and dropping PDF files or selecting them via button.
 */
import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-fiscal-constancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-fiscal-constancy.component.html'
})
export class UploadFiscalConstancyComponent {
  // Event emitter for completed file upload
  @Output() uploadComplete = new EventEmitter<File>();

  // Signal to track drag state
  isDragging = signal<boolean>(false);

  // Signal to store selected file
  selectedFile = signal<File | null>(null);

  // Getter for file name
  get fileName(): string {
    return this.selectedFile()?.name || '';
  }

  // Handle dragover event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  // Handle dragleave event
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  // Handle file drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // Handle file selection through input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  // Common method to process selected file
  handleFile(file: File): void {
    // Verify if file is a PDF
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    this.selectedFile.set(file);
  }

  // Clear selected file
  clearFile(): void {
    this.selectedFile.set(null);
  }

  // Upload file
  uploadFile(): void {
    const file = this.selectedFile();
    if (file) {
      this.uploadComplete.emit(file);
    } else {
      alert('Please select a file first');
    }
  }
}
