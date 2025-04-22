import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarHomeComponent } from '../shared/components/navBarHome/navBarHome.component';

interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  isOpen: boolean;
  category: string;
}

interface Category {
  name: string;
  isActive: boolean;
}

interface FaqData {
  [key: string]: Array<{
    id: string;
    pregunta: string;
    respuesta: string;
  }>;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule , NavBarHomeComponent],
  templateUrl: './faq.component.html',

})
export class FaqComponent implements OnInit {
  categories: Category[] = [
    { name: 'Facturación', isActive: true },
    { name: 'Recuperación', isActive: false },
    { name: 'Conceptos', isActive: false },
    { name: 'Errores y correcciones', isActive: false }
  ];

  faqData: FaqData = {
    "Facturación": [
      {
        "id": "facturacion_01",
        "pregunta": "¿Dónde puedo elaborar mi factura?",
        "respuesta": "Puede elaborar su factura en nuestro portal de Facturación www.facturaelectronicagfa.mx donde es rápido y sencillo. Si su boleto no cuenta con token (boleto manual o de tijera), puede mandar una imagen de los boletos al siguiente correo cfdiboletoprimeraplus@flecha-amarilla.com junto con sus datos fiscales completos."
      },
      {
        "id": "facturacion_02",
        "pregunta": "¿Qué necesito para poder elaborar mi factura?",
        "respuesta": "Correo electrónico a donde se enviará la factura digital, boletos del servicio recibido y los datos fiscales completos: razón social, RFC, dirección completa y código postal."
      },
      {
        "id": "facturacion_03",
        "pregunta": "¿Puedo elaborar una factura de varios boletos?",
        "respuesta": "Sí, el portal permite ingresar hasta 19 boletos (tokens) por factura."
      },
      {
        "id": "facturacion_04",
        "pregunta": "¿Cuál es el plazo para elaborar mi factura?",
        "respuesta": "La factura debe generarse dentro del mes de la compra. No es posible facturar boletos fuera de ese periodo."
      },
      {
        "id": "facturacion_05",
        "pregunta": "¿Qué tipos de servicios puedo facturar en el portal?",
        "respuesta": "Puedes facturar: boletos de autobús, envíos Primera Plus, y consumo de alimentos."
      },
      {
        "id": "facturacion_06",
        "pregunta": "¿Qué necesito para facturar un boleto de autobús?",
        "respuesta": "Debes ingresar el RFC del solicitante y el token alfanumérico que aparece en tu boleto bajo el nombre 'Token de facturación'."
      },
      {
        "id": "facturacion_07",
        "pregunta": "¿Qué necesito para facturar un envío de Primera Plus?",
        "respuesta": "Debes ingresar el RFC y el token numérico que se encuentra en la parte superior de tu guía de envío."
      },
      {
        "id": "facturacion_08",
        "pregunta": "¿Qué necesito para facturar consumo de alimentos?",
        "respuesta": "Debes ingresar el RFC, el ticket de compra (código numérico), la fecha y hora del pago que aparecen en el ticket."
      }
    ],
    "Recuperación": [
      {
        "id": "recuperacion_01",
        "pregunta": "¿Cómo puedo recuperar mi factura si no la recibí por correo?",
        "respuesta": "Ingresa al portal www.facturaelectronicagfa.mx en el campo Recuperar CFDI, selecciona la empresa, llena los campos RFC y token, y descarga tu factura."
      },
      {
        "id": "recuperacion_02",
        "pregunta": "¿Qué empresas están disponibles para recuperación de CFDI?",
        "respuesta": "Puedes recuperar facturas de: TTUR, Envíos Primera Plus, Paquetería y mensajería Flecha Amarilla, Boletos de autobús y Consumo de alimentos."
      },
      {
        "id": "recuperacion_03",
        "pregunta": "¿Qué datos necesito para recuperar una factura de envío o paquete?",
        "respuesta": "Para Envíos Primera Plus: token numérico y RFC. Para Paquetería Flecha Amarilla: prefijo, número de guía y RFC."
      }
    ],
    "Conceptos": [
      {
        "id": "conceptos_01",
        "pregunta": "¿Qué es un token?",
        "respuesta": "Es un código identificador único que permite realizar la facturación de un servicio. Para boletos es alfanumérico, para envíos es numérico, y para alimentos es el ticket de compra."
      },
      {
        "id": "conceptos_02",
        "pregunta": "¿Qué es el complemento INE?",
        "respuesta": "Es un complemento fiscal obligatorio para identificar operaciones relacionadas con partidos políticos y campañas electorales en México. Se utiliza al facturar servicios de estas entidades."
      }
    ],
    "Errores y correcciones": [
      {
        "id": "errores_01",
        "pregunta": "¿Puedo corregir un error en mi factura?",
        "respuesta": "Sí, solo si el error es en el RFC (ej. errores de escritura). Debes enviar los datos fiscales correctos, el folio y número de factura al correo cfdiboletoprimeraplus@flecha-amarilla.com. No es posible cambiar la razón social."
      },
      {
        "id": "errores_02",
        "pregunta": "¿Qué pasa si la factura tarda en llegar?",
        "respuesta": "El proceso de emisión puede tardar hasta 72 horas. Si después de ese tiempo no recibes tu factura, utiliza el módulo de recuperación en el portal para descargarla manualmente."
      }
    ]
  };

  faqItems: FaqItem[] = [];
  filteredFaqItems: FaqItem[] = [];
  activeCategory: string = 'Facturación';

  ngOnInit(): void {
    this.processFaqData();
    this.filterFaqsByCategory('Facturación');
  }

  processFaqData(): void {
    const allFaqs: FaqItem[] = [];

    Object.keys(this.faqData).forEach(category => {
      const categoryFaqs = this.faqData[category].map((item: { id: string; pregunta: string; respuesta: string }) => ({
        ...item,
        isOpen: false,
        category
      }));
      allFaqs.push(...categoryFaqs);
    });

    // Set the first item to be open by default
    if (allFaqs.length > 0) {
      allFaqs[0].isOpen = true;
    }

    this.faqItems = allFaqs;
  }

  selectCategory(categoryName: string): void {
    this.categories.forEach(category => {
      category.isActive = category.name === categoryName;
    });

    this.activeCategory = categoryName;
    this.filterFaqsByCategory(categoryName);
  }

  filterFaqsByCategory(categoryName: string): void {
    this.filteredFaqItems = this.faqItems.filter(item => item.category === categoryName);
  }

  toggleFaq(id: string): void {
    this.filteredFaqItems = this.filteredFaqItems.map(item => ({
      ...item,
      isOpen: item.id === id ? !item.isOpen : item.isOpen
    }));

    // Also update the main array
    this.faqItems = this.faqItems.map(item => {
      if (item.id === id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
  }
}
