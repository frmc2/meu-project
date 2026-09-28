import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto, produtos } from '../model/produto';

@Component({
  selector: 'app-detalhe-produto',
  imports: [RouterLink],
  templateUrl: './detalhe-produto.html',
  styleUrl: './detalhe-produto.css',
})
export class DetalheProduto {
  produtos: Produto[] = produtos;
  produto!: Produto;

  constructor(private route: ActivatedRoute) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.produto = produtos.find(p => p.id === id)!;

  }
}
