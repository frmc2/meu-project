import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Produto, produtos } from '../model/produto';
import { map } from 'rxjs';
import { CestaService } from '../cesta/cesta.service';
import { AuthService } from '../services/auth';

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function distanciaEdicao(a: string, b: string): number {
  let linhaAnterior = Array.from({ length: b.length + 1 }, (_, indice) => indice);

  for (let indiceA = 1; indiceA <= a.length; indiceA++) {
    const linhaAtual = [indiceA];

    for (let indiceB = 1; indiceB <= b.length; indiceB++) {
      const custo = a[indiceA - 1] === b[indiceB - 1] ? 0 : 1;
      linhaAtual[indiceB] = Math.min(
        linhaAtual[indiceB - 1] + 1,
        linhaAnterior[indiceB] + 1,
        linhaAnterior[indiceB - 1] + custo,
      );
    }

    linhaAnterior = linhaAtual;
  }

  return linhaAnterior[b.length];
}

function palavraCorresponde(termo: string, palavra: string): boolean {
  if (termo === palavra) return true;

  // Permite procurar por partes do nome, como "salgadinh" em "salgadinho".
  if (termo.length >= 3 && (palavra.includes(termo) || termo.includes(palavra))) {
    return true;
  }

  // Tolerância pequena a erros de digitação, sem fazer buscas curtas
  // combinarem com muitos produtos por acidente.
  const errosPermitidos = termo.length <= 3 ? 0 : termo.length <= 5 ? 1 : 2;
  return distanciaEdicao(termo, palavra) <= errosPermitidos;
}

function produtoCorresponde(produto: Produto, buscaNormalizada: string): boolean {
  if (!buscaNormalizada) return true;

  const textoProduto = normalizarTexto(
    `${produto.nome} ${produto.categoria} ${produto.descricao}`,
  );
  const buscaCompacta = buscaNormalizada.replace(/\s/g, '');
  const textoCompacto = textoProduto.replace(/\s/g, '');
  const termos = buscaNormalizada.split(/\s+/).filter(Boolean);

  // Também reconhece variações de separadores: "coca cola" / "coca-cola"
  // e "kit kat" / "kitkat".
  if (
    termos.some((termo) => termo.length >= 3) &&
    (textoProduto.includes(buscaNormalizada) || textoCompacto.includes(buscaCompacta))
  ) {
    return true;
  }

  const palavrasProduto = textoProduto.split(/\s+/).filter(Boolean);

  return termos.every((termo) =>
    palavrasProduto.some((palavra) => palavraCorresponde(termo, palavra)),
  );
}

@Component({
  selector: 'app-resultado-busca',
  imports: [RouterLink],
  templateUrl: './resultado-busca.html',
  styleUrl: './resultado-busca.css',
})
export class ResultadoBusca {
  private readonly route = inject(ActivatedRoute);
  private readonly cesta = inject(CestaService);
  private readonly auth = inject(AuthService);

  readonly produtos: Produto[] = produtos;

  readonly categoriaSelecionada = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('categoria'))),
    { initialValue: null },
  );

  readonly termoBusca = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('q') ?? '')),
    { initialValue: '' },
  );

  readonly produtosFiltrados = computed(() => {
    const categoria = this.categoriaSelecionada();
    const buscaNormalizada = normalizarTexto(this.termoBusca());

    return this.produtos.filter((produto) => {
      const categoriaCorresponde = !categoria ||
        normalizarTexto(produto.categoria) === normalizarTexto(categoria);

      return categoriaCorresponde && produtoCorresponde(produto, buscaNormalizada);
    });
  });

  mensagemCesta = '';
  produtoAdicionadoId: number | null = null;
  mostrarModalLogin = false;

  adicionarNaCesta(produto: Produto): void {
    if (!this.auth.verificarLogin()) {
      this.produtoAdicionadoId = null;
      this.mostrarModalLogin = true;
      return;
    }

    // pop up para obrigar o usuário a logar antes de adicionar o produto à cesta
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
