import { CountryService } from './../../services/country.service';
import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryServices = inject( CountryService );

  cargando = signal( false );
  error = signal<string|null>( null );
  countries = signal<Country[]>([]);

  buscar( query: string){
    if( this.cargando() ) return; //Si esta en true que no haga nada para evitar enviar un monton de peticiones

    this.cargando.set(true);
    this.error.set(null); //Estamos limpiando el error en el caso de que lo haya

    this.countryServices.buscarPorCapital(query)
    .subscribe((resp) => {
      this.cargando.set( false ); //Lo establecemos en false xq ya terminamos de cargar la data
      this.countries.set(resp); // la signal contries contendra la respuesta es decir la data
    });
  }

}
