// src/app/shared/components/loader/loader.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() fullScreen: boolean = false;
  @Input() message: string = 'Cargando...';
}
