import { Injectable } from '@angular/core';
import { Merchant } from '../models/merchant';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getCurrentStaff(): Merchant {
    return JSON.parse(sessionStorage.currentStaff);
  }

  setCurrentStaff(currentStaff: Merchant | null): void {
    sessionStorage.currentStaff = JSON.stringify(currentStaff);
  }

  getUsername(): string {
    return sessionStorage.firstName;
  }



  setUsername(firstName: string | undefined): void {
    sessionStorage.firstName = firstName;
  }



  getPassword(): string {
    return sessionStorage.password;
  }



  setPassword(password: string | undefined): void {
    sessionStorage.password = password;
  }
}
