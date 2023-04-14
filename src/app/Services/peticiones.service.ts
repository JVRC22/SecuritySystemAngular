import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Peticion } from '../Interfaces/peticion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  url_api = environment.urlapi;

  constructor(private http: HttpClient) { }

  getPeticiones(): Observable<Peticion[]>
  {
    return this.http.get<Peticion[]>(this.url_api + '/peticiones')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addPeticion(peticion: Peticion): Observable<Peticion>
  {
    return this.http.post<Peticion>(this.url_api + '/peticion', peticion)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateStatusPeticion(id: number, peticion: any): Observable<Peticion>
  {
    return this.http.put<Peticion>(this.url_api + '/peticion/status/' + id, peticion)
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
