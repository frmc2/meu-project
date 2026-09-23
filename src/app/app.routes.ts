import { Routes } from '@angular/router';
import { BarraBusca } from './barra-busca/barra-busca';
import { Cadastro } from './cadastro/cadastro';
import { Vitrine } from './vitrine/vitrine';

export const routes: Routes = [
    {path:'', component: Vitrine, pathMatch: 'full' }
];
