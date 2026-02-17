import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { STORED_KEYS } from '../../../constants/storedKeys';
import { UserdataResponse } from '../../models/user/userdata.interface';
import { UserDecodedData } from './../../models/user/user-decoded-data.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  userDataDecoded: UserDecodedData = {} as UserDecodedData;

  sendRegisterData(userdata: object): Observable<UserdataResponse> {
    return this.httpClient.post<UserdataResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userdata,
    );
  }
  sendLoginData(userdata: object): Observable<UserdataResponse> {
    return this.httpClient.post<UserdataResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userdata,
    );
  }

  decodeUserToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(STORED_KEYS.userToken)) {
        const token = localStorage.getItem(STORED_KEYS.userToken)!;
        this.userDataDecoded = jwtDecode(token);

        console.log(this.userDataDecoded, 'userData');
      }
    }
  }

  userLogOut(): void {
    localStorage.removeItem(STORED_KEYS.userToken);
    this.router.navigate(['/login']);
  }
}
