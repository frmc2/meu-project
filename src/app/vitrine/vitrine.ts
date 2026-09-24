import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BarraBusca } from '../barra-busca/barra-busca';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, BarraBusca],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {}
