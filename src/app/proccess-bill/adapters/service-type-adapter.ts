export interface FieldMapping {
  id: number;
  standardFieldName: string;
  sourceFieldName: string;
}

export class ServiceTypeAdapter {
  id: number;
  name: string;
  description: string;
  rfcEmitter: string;
  emitterName: string;
  defaultCurrency: string;
  series: string;
  fieldMappings: FieldMapping[];

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.rfcEmitter = data?.rfcEmitter || '';
    this.emitterName = data?.emitterName || '';
    this.defaultCurrency = data?.defaultCurrency || 'MXN';
    this.series = data?.series || '';
    this.fieldMappings = data?.fieldMappings || [];
  }

  // Helper method to get a source field name from its standard name
  getSourceFieldName(standardName: string): string {
    const mapping = this.fieldMappings.find(
      (m) => m.standardFieldName === standardName
    );
    return mapping?.sourceFieldName || standardName;
  }

  // Helper method to get the mapping for a specific standard field
  getFieldMapping(standardName: string): FieldMapping | undefined {
    return this.fieldMappings.find((m) => m.standardFieldName === standardName);
  }

  // Static method to create from API response
  static fromApiResponse(response: any): ServiceTypeAdapter {
    return new ServiceTypeAdapter(response);
  }
}
