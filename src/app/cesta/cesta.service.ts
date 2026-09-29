import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

export type ItemCesta = {
  produto: Produto;
  quantidade: number;
};

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  itens: ItemCesta[] = [];

  adicionar(produto: Produto) {
    const item = this.itens.find((item) => item.produto.id === produto.id);

    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({
        produto,
        quantidade: 1,
      });
    }
  }

  removerUnidade(produtoId: number) {
    const indice = this.itens.findIndex((item) => item.produto.id === produtoId);

    if (indice === -1) {
      return;
    }

    const item = this.itens[indice];

    if (item.quantidade > 1) {
      item.quantidade--;
    } else {
      this.itens.splice(indice, 1);
    }
  }

  limpar() {
    this.itens = [];
  }
}
