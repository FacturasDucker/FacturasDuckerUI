// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { NavBarComponent } from "./shared/components/navBar/navBar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, NavBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'FacturasDucker';

  // Inyección de dependencias usando inject() y exposición directa del servicio
  protected loaderService = inject(LoaderService);
}
