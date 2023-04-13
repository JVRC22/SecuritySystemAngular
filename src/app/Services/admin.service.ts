import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Interfaces/user';
import { InfoUsuario } from '../Interfaces/info-usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  //Ambos
  getUsuarioUnico(id: number): Observable<User>
  {
    return this.http.get<User>(this.url_api + "/user/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateUsuario(id: number, user: User)
  {
    return this.http.put<User>(this.url_api + "/users/" + id, user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateUsuarioPassword(id: number, user: User)
  {
    return this.http.put<User>(this.url_api + "/users/password/" + id, user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //Usuarios Gestion
  getUsuariosNormales(): Observable<User[]>
  {
    return this.http.get<User[]>(this.url_api + "/users/normal")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getInfoUsuario(id: number)
  {
    return this.http.get<InfoUsuario>(this.url_api + "/users/info/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  updateInfoUsuario(info: InfoUsuario)
  {
    const id = info.id;

    return this.http.put<InfoUsuario>(this.url_api + "/users/info/" + id, info)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteUsuario(id: number)
  {
    return this.http.delete(this.url_api + "/users/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  //Moderadores Gestion
  getUsuariosModeradores(): Observable<User[]>
  {
    return this.http.get<User[]>(this.url_api + "/users/mod")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addUsuarioModerador(user: User)
  {
    return this.http.post<User>(this.url_api + "/users/mod", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteUsuarioModerador(id: number)
  {
    return this.http.delete(this.url_api + "/users/mod/" + id)
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
