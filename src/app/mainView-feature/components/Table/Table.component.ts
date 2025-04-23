import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TableRow {
  id: string;
  clientInitials: string;
  clientName: string;
  clientType: string;
  location: string;
  businessName: string;
  serviceType: string;
  billingDate: string;
  email: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  // Define rows as a class property
  rows: TableRow[] = [
    {
      id: '001',
      clientInitials: 'M',
      clientName: 'Madata - Cores',
      clientType: 'Agricultura',
      location: 'Timbrada',
      businessName: 'Madata S.A.S',
      serviceType: '2 T. de proyecto',
      billingDate: '2 Fechas',
      email: 'DD/MM/AA'
    },
    // Add more rows as needed
  ];

  constructor(private router: Router) {}

  // Method to navigate to recovery page
  navigateToRecovery(rowData: TableRow): void {
    this.router.navigate(['/recovery'], {
      state: {
        rowData: rowData
      }
    });
  }
}
