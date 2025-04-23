import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent {
  @Output() imageUploaded = new EventEmitter<File>();

  selectedImage: File | null = null;
  previewUrl: string | null = null;
  imageName: string = '';

  // Método para abrir el explorador de archivos
  openFileExplorer(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.handleImageSelection(files[0]);
      }
    });
  }

  // Procesar la imagen seleccionada
  handleImageSelection(file: File): void {
    // Verificar si es una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    this.selectedImage = file;
    this.imageName = file.name;

    // Crear una vista previa
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.imageUploaded.emit(file);
    };
    reader.readAsDataURL(file);
  }

  // Limpiar la imagen seleccionada
  clearImage(): void {
    this.selectedImage = null;
    this.previewUrl = null;
    this.imageName = '';
  }
}
