import { inject, Injectable } from '@angular/core';
import { StepItem } from '../../shared/components/steper/steper.component';
import { GetDataBillService } from './processBill/get-data-bill-service';
import { catchError, EMPTY } from 'rxjs';
import { DataBillAdapter } from '../adapters/data-bill-adapter';
import { CreateInvoiceService } from './invoice/create-invoice-service';
import { formaPago } from '../data/forma_pago';
import { GetInvoiceDTO } from '../dtos/get-invoice-dto';
import { ProccessBillMock } from '../mock/proccess-bill-mock';
import { PostInvoiceService } from './invoice/post-invoice-service';
import { CreateInvoiceAdapter } from '../adapters/create-invoice-adapter';
import { DownloadInvoiceService } from './invoice/downloand-invoice-service';

@Injectable({ providedIn: 'root' })
export class ProccessBillService {
  private readonly _getDataBillService: GetDataBillService =
    inject(GetDataBillService);
  private readonly _createInvoiceService: CreateInvoiceService =
    inject(CreateInvoiceService); // Injecting the create invoice service
  // Current active step in the billing process
  private readonly _postInvoiceService: PostInvoiceService =
    inject(PostInvoiceService);
  private readonly _downloadInvoiceService: DownloadInvoiceService = inject(
    DownloadInvoiceService
  ); // Injecting the download invoice service

  activeStep = 1;

  // Definition of steps in the billing workflow
  mySteps: StepItem[] = [
    {
      value: 1,
      header: 'Datos básicos',
      content: 'Información básica para tu factura',
    }, // Basic data step
    {
      value: 2,
      header: 'Verificacion',
      content: 'Información de colaboradores',
    }, // Verification step
    { value: 3, header: 'Detalles token', content: 'Detalle de servicios' }, // Token details step
    {
      value: 4,
      header: 'Confirmación',
      content: 'Confirma los datos de tu factura',
    }, // Confirmation step
  ];

  dataBill: DataBillAdapter = new DataBillAdapter(); // Instance of the data bill adapter

  // Handle step change in the billing process
  onStepChange(step: number): void {
    console.log(`Paso cambiado a: ${step}`);
    this.activeStep = step;
  }

  // Method to handle file upload
  onUpload(file: File): void {
    console.log('Subiendo archivo...', file);
    this._getDataBillService
      .getDataBill(file)
      .pipe(
        catchError((err: string) => {
          console.error('Error al obtener los datos de la boleta:', err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        const dataBillResponse = DataBillAdapter.toAdapter(res?.data);
        console.log('Respuesta de la API:', dataBillResponse);
        this.dataBill = dataBillResponse; // Update the data bill with the response
        // Handle the adapted data here if needed
      });
    // TODO: Implement file upload logic
    // For example: API call, file processing, etc.
  }

  // Method to complete the billing process
  onComplete(): void {
    const invoiceDto = ProccessBillMock.getInvoiceDto();
    const createInvoiceDto = ProccessBillMock.getCreateInvoiceDto();
    // Get the data from the invoice
    this._createInvoiceService
      .createInvoice(invoiceDto)
      .pipe(
        catchError((err: string) => {
          console.error('Error al conseguir la factura:', err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log('Factura conseguida:', res);
        // Handle the adapted data here if needed
      });

    // Create the invoice using the data from the invoice DTO
    this._postInvoiceService
      .postInvoice(createInvoiceDto)
      .pipe(
        catchError((err: string) => {
          console.error('Error al crear la factura:', err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log('Factura creada:', res);
        const createInvoiceAdapter = CreateInvoiceAdapter.toAdapter(res);
        this._downloadInvoiceService.downloadInvoice(createInvoiceAdapter);
      });
    // TODO: Implement process completion logic
    // For example: send data, redirect, etc.
  }
}
