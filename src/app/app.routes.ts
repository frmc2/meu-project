import { Routes } from '@angular/router';
import { BarraBusca } from './barra-busca/barra-busca';
import { Cesta } from './cesta/cesta';
import { Login } from './login/login';
import { ResultadoBusca } from './resultado-busca/resultado-busca';
import { Cadastro } from './cadastro/cadastro';
import { Vitrine } from './vitrine/vitrine';
import { Reenvio } from './reenvio/reenvio';
import { DetalheProduto } from './detalhe-produto/detalhe-produto';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';

export const routes: Routes = [
    {path:"", component: Vitrine, pathMatch: 'full' },
    {path:"cesta", component: Cesta },
    {path:"login", component: Login },
    {path:"resultado-busca", component: ResultadoBusca },
    {path:"cadastro", component: Cadastro },
    {path:"barra-busca", component: BarraBusca },
    {path:"reenvio", component: Reenvio },
    {path:"detalhe-produto", component: DetalheProduto },
    {path:"esqueci-senha", component: EsqueciSenha }
];
