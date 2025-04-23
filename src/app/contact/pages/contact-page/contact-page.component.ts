/**
 * Nombre: ContactPageComponent
 * Ubicación: src/app/contact/pages/contact-page/contact-page.component.ts
 * Descripción: Componente principal para la página de contacto.
 * Muestra información de contacto para diferentes departamentos.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";

// Interfaz para los elementos de contacto
interface ContactItem {
  department: string;
  primaryContact: {
    name: string;
    email: string;
  };
  secondaryContact?: {
    name: string;
    email: string;
  };
  highlighted?: boolean;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, NavBarHomeComponent],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  // Lista de contactos
  contactItems: ContactItem[] = [
    {
      department: 'Envíos primera plus',
      primaryContact: {
        name: 'Aldo Baruc Mora Valtierra',
        email: 'coordenviosppIus@flecha-amarilla.com'
      },
      secondaryContact: {
        name: 'Diego Esau Estrada Medina',
        email: 'auxeppon@flecha-amarilla.com'
      },
      highlighted: true
    },
    {
      department: 'Consumo de alimentos',
      primaryContact: {
        name: 'Teresa de Jesús Vargas Ojeda',
        email: 'tj.vargas@flecha-amarilla.com'
      },
      secondaryContact: {
        name: 'Veronica Noemi Ibarra Rangel',
        email: 'vn.ibarra@flecha-amarilla.com'
      }
    },
    {
      department: 'Paquetería',
      primaryContact: {
        name: 'Martha Ramírez',
        email: 'centerpaq02@flecha-amarilla.com'
      },
      secondaryContact: {
        name: 'Beatriz Armenta Vera',
        email: 'centerpaq03@flecha-amarilla.com'
      }
    },
    {
      department: 'Primera Plus',
      primaryContact: {
        name: 'Departamento Fiscal',
        email: 'cfdiboletoprimerapIus@flecha-amarilla.com'
      }
    }
  ];

  // Método para manejar el hover de los elementos de contacto
  setHighlighted(index: number, highlighted: boolean): void {
    // Eliminamos el highlight de todos los elementos
    this.contactItems.forEach(item => item.highlighted = false);

    // Aplicamos el highlight solo al elemento seleccionado
    if (highlighted) {
      this.contactItems[index].highlighted = true;
    }
  }

  // Método para abrir el correo electrónico del contacto
  sendEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }
}
