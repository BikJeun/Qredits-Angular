import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Voucher } from '../models/voucher';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  baseUrl: string = '/api/voucher'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createPromoCode(newCode: Voucher, merchId: string): Observable<Voucher> {
    return this.httpClient.put<Voucher>(this.baseUrl + "/createVoucher/" + merchId, newCode).pipe(
      catchError(this.handleError)
    )
  }

  getPromoCodes(merchId: string): Observable<Voucher[]> {
    return this.httpClient.get<Voucher[]>(this.baseUrl + "/getAllVouchersByMerchant/" + merchId).pipe(
      catchError(this.handleError)
    )
  }

  updatePromoCode(updateCode: Voucher, merchId: string, vouchId: string): Observable<Number> {
    return this.httpClient.post<Number>(this.baseUrl + "/updateVoucher/" + merchId + "/" + vouchId, updateCode).pipe(
      catchError(this.handleError)
    )
  }

  deleteVoucher(voucherId: string, merchId: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteVoucher/" + merchId + "/" + voucherId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + error.error;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }



}
