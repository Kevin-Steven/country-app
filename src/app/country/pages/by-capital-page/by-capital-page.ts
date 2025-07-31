import { CountryService } from './../../services/country.service';
import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";

import type { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryServices = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({ params }) => {
      if(!params.query) return [];
      //todo - Esto no permite transformar cualquier observable en una promesa
      return await firstValueFrom(this.countryServices.buscarPorCapital(params.query));
    }
  })

  // cargando = signal(false);
  // error = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // buscar(query: string) {
  //   if (this.cargando()) return; //Si esta en true que no haga nada para evitar enviar un monton de peticiones

  //   this.cargando.set(true);
  //   this.error.set(null); //Estamos limpiando el error en el caso de que lo haya

  //   this.countryServices.buscarPorCapital(query).subscribe({
  //     next: (countries) => {
  //       this.cargando.set(false);
  //       this.countries.set(countries);
  //     },

  //     error: (err) => {
  //       this.cargando.set(false);
  //       this.countries.set([]);
  //       this.error.set(err);
  //     },
  //   });
  // }
}
