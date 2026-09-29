import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto, produtos } from '../model/produto';
import { CestaService } from '../cesta/cesta.service';

@Component({
  selector: 'app-detalhe-produto',
  imports: [RouterLink],
  templateUrl: './detalhe-produto.html',
  styleUrl: './detalhe-produto.css',
})
export class DetalheProduto {
  produtos: Produto[] = produtos;
  produto!: Produto;
  private cesta = inject(CestaService);
  mensagemCesta = '';

  constructor(private route: ActivatedRoute) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produto = produtos.find(p => p.id === id)!;

  }

  adicionarNaCesta() {
    this.cesta.adicionar(this.produto);

    const item = this.cesta.itens.find((item) => item.produto.id === this.produto.id);
    this.mensagemCesta = `Produto adicionado à cesta. Quantidade: ${item?.quantidade}`;
  }
}
