import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  getTemperatura(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/temperatura/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAgua(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/agua/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getLuz(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/luz/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getHumo(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/humo/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getMovimiento(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/movimiento/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getInfrarrojo(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/infrarrojo/value", params)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getDistancia(id: number)
  {
    const params = {tienda_id: id};

    return this.http.post(this.url_api + "/sensor/distancia/value", params)
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
