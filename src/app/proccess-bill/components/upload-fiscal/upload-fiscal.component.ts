import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-fiscal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-fiscal.component.html'
})
export class UploadFiscalComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  
  isDragging = false;
  selectedFile: File | null = null;
  fileName: string = '';
  
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
  }
  
  // Método para borrar el archivo seleccionado
  clearFile(): void {
    this.selectedFile = null;
    this.fileName = '';
  }
  
  // Método para cargar el archivo
  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploaded.emit(this.selectedFile);
      // Aquí normalmente enviarías el archivo a un servidor
      console.log('Archivo listo para cargar:', this.selectedFile);
    } else {
      alert('Por favor, selecciona un archivo primero');
    }
  }
}