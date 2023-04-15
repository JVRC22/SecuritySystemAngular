import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tienda } from '../Interfaces/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  getTiendas(): Observable<Tienda[]>
  {
    return this.http.get<Tienda[]>(this.url_api + "/tiendas")
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getTienda(id: number): Observable<Tienda>
  {
    return this.http.get<Tienda>(this.url_api + "/tienda/" + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addTienda(tienda: Tienda): Observable<Tienda>
  {
    return this.http.post<Tienda>(this.url_api + "/tienda", tienda)
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
