import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Produto, produtos } from '../model/produto';

export type ItemCesta = {
  produto: Produto;
  quantidade: number;
};

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  private readonly chaveArmazenamento = 'cesta';
  private readonly estaNoNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly itensSignal = signal<ItemCesta[]>([]);

  get itens(): ItemCesta[] {
    return this.itensSignal();
  }

  private readonly aoAlterarEmOutraAba = (evento: StorageEvent): void => {
    if (evento.key === this.chaveArmazenamento || evento.key === null) {
      this.itensSignal.set(this.lerItens(evento.newValue));
    }
  };

  constructor() {
    if (!this.estaNoNavegador) return;

    try {
      this.itensSignal.set(this.lerItens(localStorage.getItem(this.chaveArmazenamento)));
    } catch {
      // A cesta continua funcionando em memória caso o navegador bloqueie o armazenamento.
    }

    window.addEventListener('storage', this.aoAlterarEmOutraAba);
  }

  adicionar(produto: Produto) {
    const item = this.itens.find((item) => item.produto.id === produto.id);

    if (item) {
      this.itensSignal.update((itens) =>
        itens.map((itemAtual) =>
          itemAtual.produto.id === produto.id
            ? { ...itemAtual, quantidade: itemAtual.quantidade + 1 }
            : itemAtual,
        ),
      );
    } else {
      this.itensSignal.update((itens) => [...itens, {
        produto,
        quantidade: 1,
      }]);
    }

    this.salvarItens();
  }

  removerUnidade(produtoId: number) {
    const itensAtuais = this.itens;
    const indice = itensAtuais.findIndex((item) => item.produto.id === produtoId);

    if (indice === -1) {
      return;
    }

    const item = itensAtuais[indice];

    if (item.quantidade > 1) {
      this.itensSignal.update((itens) =>
        itens.map((itemAtual) =>
          itemAtual.produto.id === produtoId
            ? { ...itemAtual, quantidade: itemAtual.quantidade - 1 }
            : itemAtual,
        ),
      );
    } else {
      this.itensSignal.update((itens) =>
        itens.filter((itemAtual) => itemAtual.produto.id !== produtoId),
      );
    }

    this.salvarItens();
  }

  limpar() {
    this.itensSignal.set([]);
    this.salvarItens();
  }

  private salvarItens(): void {
    if (!this.estaNoNavegador) return;

    try {
      localStorage.setItem(this.chaveArmazenamento, JSON.stringify(this.itens));
    } catch {
      // Mantém a cesta ativa em memória quando o armazenamento não estiver disponível.
    }
  }

  private lerItens(valor: string | null): ItemCesta[] {
    if (!valor) return [];

    try {
      const dados: unknown = JSON.parse(valor);
      if (!Array.isArray(dados)) return [];

      return dados.flatMap((dado: unknown): ItemCesta[] => {
        if (!dado || typeof dado !== 'object') return [];

        const registro = dado as { produto?: { id?: unknown }; quantidade?: unknown };
        const idProduto = Number(registro.produto?.id);
        const quantidade = Number(registro.quantidade);
        const produtoAtual = produtos.find((produto) => produto.id === idProduto);

        if (!produtoAtual || !Number.isInteger(quantidade) || quantidade < 1) return [];

        return [{ produto: produtoAtual, quantidade }];
      });
    } catch {
      return [];
    }
  }
}
