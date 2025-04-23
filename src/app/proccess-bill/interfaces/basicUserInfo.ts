// Interface defining basic user information for Mexican entities
export interface BasicUserInfo {
  rfc: string;     // Tax identification number (Registro Federal de Contribuyentes)
  nombre: string;  // Full name
  correo: string;  // Email address
  cp: string;      // Postal code
  estado: string;  // State
  ciudad: string;  // City
  colonia: string; // Neighborhood/Suburb
  calle: string;   // Street name
  numeroExt: string; // External building number
 }
