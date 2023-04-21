import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUsuario } from '../Interfaces/info-usuario';
import { User } from '../Interfaces/user';
import { Invitacion } from '../Interfaces/invitacion';
import { TiendaUser } from '../Interfaces/tienda-user';
import { Tienda } from '../Interfaces/tienda';

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
    return this.http.get<User>(this.url_api + "/users/access")
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

  getAllInfoPersonal()
  {
    return this.http.get<InfoUsuario[]>(this.url_api + "/users/info/all")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateMyUser(user: User)
  {
    return this.http.put<User>(this.url_api + "/user/update/access", user)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateMyInfoPersonal(info_usuario: InfoUsuario)
  {
    return this.http.put<InfoUsuario>(this.url_api + "/user/update/info", info_usuario)
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

  //Invitaciones
  getInvitaciones(id: number)
  {
    return this.http.get<Invitacion[]>(this.url_api + "/invitaciones/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  enviarInvitacion(invitacion: Invitacion)
  {
    return this.http.post<Invitacion>(this.url_api + "/invitacion", invitacion)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  procesarInvitacion(dict: any)
  {
    return this.http.post(this.url_api + "/invitacion/process", dict)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  unirmeATienda(invitacion: Invitacion)
  {
    const dict = {user_id: invitacion.user_id, codigo: String(invitacion.codigo)}

    return this.http.post(this.url_api + "/tienda/invite", dict)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getTiendasOwner()
  {
    return this.http.get<TiendaUser[]>(this.url_api + "/tiendas/invitados/owners")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  misTiendasToken()
  {
    return this.http.get<TiendaUser[]>(this.url_api + "/tiendas/propias")
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
