import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
import { environment } from 'src/environments/environment';
import { catchError, retry, throwError } from 'rxjs';
import { Pregunta } from '../Interfaces/pregunta';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  login(user: User)
  {
    return this.http.post<User>(this.url_api+ "/login", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  logout()
  {
    return this.http.get(this.url_api + "/logout")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  register()
  {}

  verificarDisponibilidad(user: User)
  {
    return this.http.post(this.url_api + "/verify/access", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  verPreguntas()
  {
    return this.http.get<Pregunta[]>(this.url_api + "/preguntas")
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
