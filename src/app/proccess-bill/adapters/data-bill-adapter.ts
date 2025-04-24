export class DataBillAdapter {
  codigo_postal: string = '';
  completo: boolean = false;
  domicilio: string = '';
  mensaje: string = '';
  nombre: string = '';
  regimen_fiscal: string = '';
  rfc: string = '';

  constructor() {}

  static toAdapter(data: any): DataBillAdapter {
    const dataBillAdapter = new DataBillAdapter();
    dataBillAdapter.codigo_postal = data.codigo_postal;
    dataBillAdapter.completo = data.completo;
    dataBillAdapter.domicilio = data.domicilio;
    dataBillAdapter.mensaje = data.mensaje;
    dataBillAdapter.nombre = data.nombre;
    dataBillAdapter.regimen_fiscal = data.regimen_fiscal;
    dataBillAdapter.rfc = data.rfc;

    return dataBillAdapter;
  }
}
