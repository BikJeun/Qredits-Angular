import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl: string = '/api/user'

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createNewStaff(newStaff: User): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl, newStaff).pipe
      (
        catchError(this.handleError)
      );
  }

  getStaffs(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "s").pipe
      (
        catchError(this.handleError)
      );
  }

  getStaffByStaffId(staffId: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + "ById/" + staffId).pipe(
      catchError(this.handleError)
    );
  }

  updateStaff(staff: User, id: string): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + "/updateUser/" + id, staff, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteStaff(staffId: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteUser" + staffId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}