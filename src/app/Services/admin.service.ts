import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Interfaces/user';
import { InfoUsuario } from '../Interfaces/info-usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  getUsuariosNormales()
  {
    return this.http.get<User[]>(this.url_api + "/users/normal")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getUsuariosModeradores()
  {
    return this.http.get<User[]>(this.url_api + "/users/mod")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getInfoUsuario()
  {
    return this.http.get<InfoUsuario>(this.url_api + "/users/info")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //Error Handling
  private handleError(error: HttpErrorResponse)
  {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
