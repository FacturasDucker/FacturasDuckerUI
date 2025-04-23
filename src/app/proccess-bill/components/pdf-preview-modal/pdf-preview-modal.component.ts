import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-preview-modal.component.html'
})
export class PdfPreviewModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() fileName = '';
  @Input() pdfUrl: SafeUrl | null = null;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit(): void {
    // Listen to the Escape key to close the modal
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    // Remove the event listener when the component is destroyed
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));

    // Ensure that body scroll is enabled when destroying the component
    document.body.style.overflow = 'auto';
  }

  ngOnChanges(): void {
    // Control body scroll based on whether the modal is visible
    if (this.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.show) {
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
    document.body.style.overflow = 'auto';
  }
}
