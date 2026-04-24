import { UserInfoResponse } from './../../../../models/src/lib/profile/responses/university-detail-response';
import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class ProfileService {
  constructor(private apiClient: ApiClientService) {}
  getMyInfo(): Observable<UserInfoResponse> {
    return this.apiClient.get(`${environment.apiUrl}/me`);
  }
  updateMyInfo(data: { phoneNumber: string }): Observable<any> {
    return this.apiClient.put(`${environment.apiUrl}/me/info`, data);
  }
  changePass() {}
}
