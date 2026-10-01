import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BarraBusca } from '../barra-busca/barra-busca';
import { Produto, produtos } from '../model/produto';
import { CestaService } from '../cesta/cesta.service';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, BarraBusca],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
  produtos: Produto[] = produtos;
  private readonly cesta = inject(CestaService);
  private readonly auth = inject(AuthService);

  mensagemCesta = '';
  produtoAdicionadoId: number | null = null;
  mostrarModalLogin = false;

  adicionarNaCesta(produto: Produto): void {
    if (!this.auth.verificarLogin()) {
      this.produtoAdicionadoId = null;
      this.mostrarModalLogin = true;
      return;
    }

    this.mostrarModalLogin = false;
    this.cesta.adicionar(produto);

    const item = this.cesta.itens.find((item) => item.produto.id === produto.id);
    this.produtoAdicionadoId = produto.id;
    this.mensagemCesta = `Produto adicionado à cesta. Quantidade: ${item?.quantidade}`;
  }

  fecharModalLogin(): void {
    this.mostrarModalLogin = false;
  }
}
