import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  //ngOnInit Se ejecuta antes de terminar de carga el componente
  ngOnInit(): void {
    //obtener los parametros de la ruta
    this.activatedRoute.params
      //con switchMap se recibe un nuevo valor, se desuscribe del observable anterior y se suscribe a uno nuevo
      //garantiza que siempre se esté manejando el último valor emitido
      .pipe(
        switchMap(({ id }) => this.countriesService.searchPaisByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        return (this.country = country);
      });
  }
}
