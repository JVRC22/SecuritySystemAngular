import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUsuario } from '../Interfaces/info-usuario';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  verifiyToken() 
  {
    return this.http.get(this.url_api + "/verify/token")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  buscarUsuario(user: User)
  {
    return this.http.post<User>(this.url_api + "/user/email/phone", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  recuperacionRepuesta(info_usuario: InfoUsuario)
  {
    return this.http.post<User>(this.url_api + "/user/pregunta/answer", info_usuario)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updatePassword(user: User)
  {
    return this.http.put<User>(this.url_api + "/user/update/password", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateMyPassword(user: User)
  {
    return this.http.put<User>(this.url_api + "/user/update/password/auth", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  verifyCode(id: number, user: User)
  {
    const dict = {codigo_verificacion: String(user.codigo_verificacion)}

    return this.http.put<User>(this.url_api + "/receive/code/" + id, dict)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getMyPregunta(id: number)
  {
    return this.http.get(this.url_api + "/user/pregunta/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getMyInfoUsuario()
  {
    return this.http.get<User>(this.url_api + "/users/info")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getMyInfoPersonal()
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
