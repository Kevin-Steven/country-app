import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/mapper.country';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  buscarPorCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`) // Observable
      .pipe(map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)), //Map de RXJS
        catchError(error => { //Capturando el error (manejo de errores)
          console.log('Error fetching ', error);

          return throwError(() => new Error(`No se pudo obtener países con - ${query}`));
        })
      );
  }

  buscarPorPais(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`
    query = query.toLowerCase();
    
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo encontrar el país ${query}`));
      })
    );
  }
  // const url = `${API_URL}/name/${query}`;
}
