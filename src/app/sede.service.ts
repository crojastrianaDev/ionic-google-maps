import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Sede } from './app/sede';
import { tap, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  private sedeUrl = 'api/sedes';

  constructor(private http: HttpClient) {}

  private log(message: string) {
    console.log(`Sede Service ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getSedes(): Observable<Sede[]> {
    return this.http.get<Sede[]>(this.sedeUrl).pipe(
      tap((_) => this.log('Sede Almacenados')),
      catchError(this.handleError('GetSedes', []))
    );
  }
  addSede(sede: Sede): Observable<Sede> {
    return this.http.post<Sede>(this.sedeUrl, sede, httpOptions).pipe(
      tap((sede: Sede) => {
        console.log(sede.nombre);
      })
    );
  }
}
