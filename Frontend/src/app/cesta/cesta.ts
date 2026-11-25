import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CestaService } from './cesta.service';

@Component({
  selector: 'app-cesta',
  imports: [RouterLink],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta {
  cesta = inject(CestaService);
  mostrarPopup = false;

  limparCesta() {
    this.cesta.limpar();
  }

  removerUnidade(produtoId: number) {
    this.cesta.removerUnidade(produtoId);
  }

  calcularValor(preco: number, quantidade: number): number {
    return preco * quantidade;
  }

  calcularTotal(): number {
    return this.cesta.itens.reduce(
      (total, item) => total + this.calcularValor(item.produto.preco, item.quantidade),
      0,
    );
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  finalizar() {
    if (this.cesta.itens.length === 0) {
      return;
    }

    this.cesta.limpar();
    this.mostrarPopup = true;
  }

  fecharPopup() {
    this.mostrarPopup = false;
  }
}
