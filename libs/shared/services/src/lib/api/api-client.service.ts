import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string) {
    return this.httpClient.get<T>(url);
  }

  post<TResponse>(url: string, body: any) {
    return this.httpClient.post<TResponse>(url, body);
  }

  put(url: string, body: any) {
    return this.httpClient.put(url, body);
  }

  delete<TResponse>(url: string) {
    return this.httpClient.delete<TResponse>(url);
  }
}
