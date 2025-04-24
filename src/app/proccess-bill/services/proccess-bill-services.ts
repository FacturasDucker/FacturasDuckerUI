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

  private invoiceResponse: CreateInvoiceAdapter = new CreateInvoiceAdapter(); // Instance of the create invoice adapter

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
        this.invoiceResponse = CreateInvoiceAdapter.toAdapter(res);
      });
    this._downloadInvoiceService
      .downloadInvoice(this.invoiceResponse)
      .pipe(
        catchError((err: string) => {
          console.error('Error al descargar la factura:', err);
          return EMPTY;
        })
      )
      .subscribe((resApi) => {
        const res = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Comprobante Version="4.0" Serie="A" Folio="10001" Fecha="2025-04-22T15:11:23" Sello="hxkSSUwfUW31FK7Yvwe+2n91KkMElfpaM4CLLTq3G55Z0BnpW05H1+gZghHH8wyCmLZT9hSPS2hTeoqUR28PHOzLeve8F884xWhnCMreL//5Jl0h5tcKKtKk6SK412OUHxiFFZbjaKsZNNpZVsJStD29rpm5q9UgJkhuG2/JWaaRtsHzJ8OAifDYd1yPVVyt4IUkWLwQna7c1+2Qi7BB7cRIPeflckFrBMsXqePLxA/wpSNtB/MKm2qD52vQL01Vm3XzmixSsWn6NxX2nw1/XVzCVDC17ALMsF7uilWxk2FijT18XKWlngTNuNom4yZvqgPqTO8EJxjPB2mIshAEnw==" FormaPago="01" NoCertificado="292233162870206001759766198444326234574038513973" Certificado="CERTIFICADOB64..." SubTotal="7000.0" Moneda="MXN" Total="7000.0" TipoDeComprobante="I" Exportacion="01" MetodoPago="PUE" LugarExpedicion="06000" xmlns="http://www.sat.gob.mx/cfd/4"><Emisor Rfc="FACW951024M98" Nombre="Empresa Ejemplo S.A. de C.V." RegimenFiscal="601"/><Receptor Rfc="FACW951024M98" Nombre="Cliente Pérez" DomicilioFiscalReceptor="06000" RegimenFiscalReceptor="605" UsoCFDI="G03"/><Conceptos><Concepto ClaveProdServ="10101501" Cantidad="1.0" ClaveUnidad="H87" Unidad="Servicio" Descripcion="Servicio de consultoría" ValorUnitario="5000.0" Importe="5000.0" ObjetoImp="01"/><Concepto ClaveProdServ="10101501" Cantidad="2.0" ClaveUnidad="H87" Unidad="Hora" Descripcion="Desarrollo de software" ValorUnitario="1000.0" Importe="2000.0" ObjetoImp="01"/></Conceptos></Comprobante>'; 
        // Handle the downloaded blob (PDF or other document)
        const contentType = 'text/xml';

        // Create a blob URL from the response
        const blob = new Blob([resApi], { type: contentType });
        const url = window.URL.createObjectURL(blob);

        // Create a download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura-${
          this.invoiceResponse.folio || 'descargada'
        }.xml`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        console.log('Factura descargada exitosamente ', resApi);
      });
  }
}
