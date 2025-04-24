import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseHttpClient {
  readonly baseUrl: String = 'https://b3a9-148-230-178-165.ngrok-free.app';
  readonly httpClient: HttpClient = inject(HttpClient);
}
