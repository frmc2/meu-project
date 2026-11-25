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

const errosPermitidos = (tamanho: number): number =>
  tamanho <= 3 ? 0 : tamanho <= 5 ? 1 : 2;

// Nota de um termo digitado contra uma palavra (0 = não casou)
function pontuarTermo(termo: string, palavra: string): number {
  if (termo === palavra) return 100;
  if (palavra.startsWith(termo)) return 80; // digitação incompleta
  if (termo.length >= 4 && palavra.includes(termo)) return 50;

  const max = errosPermitidos(termo.length);
  if (max === 0) return 0;

  // compara com a palavra inteira e com o começo dela (incompleto + erro)
  const dist = Math.min(
    distanciaEdicao(termo, palavra),
    distanciaEdicao(termo, palavra.slice(0, termo.length)),
  );
  return dist <= max ? 40 - dist * 10 : 0;
}

// Melhor nota de um termo entre as palavras de um texto
function melhorNota(termo: string, palavras: string[]): number {
  let melhor = 0;
  for (const palavra of palavras) {
    melhor = Math.max(melhor, pontuarTermo(termo, palavra));
  }
  return melhor;
}

function pontuarProduto(produto: Produto, buscaNormalizada: string): number {
  if (!buscaNormalizada) return 1;

  const nome = normalizarTexto(produto.nome);
  const palavrasNome = nome.split(' ').filter(Boolean);
  const palavrasExtras = normalizarTexto(`${produto.categoria} ${produto.descricao}`)
    .split(' ')
    .filter(Boolean);
  const termos = buscaNormalizada.split(' ').filter(Boolean);

  // "coca cola" / "coca-cola" / "kitkat": compara sem espaços, só no nome
  const buscaCompacta = buscaNormalizada.replace(/ /g, '');
  if (buscaCompacta.length >= 4 && nome.replace(/ /g, '').includes(buscaCompacta)) {
    return 120;
  }

  let total = 0;
  for (const termo of termos) {
    const notaNome = melhorNota(termo, palavrasNome);
    // categoria/descrição valem menos e só aceitam match exato ou por prefixo
    const notaExtra = Math.floor(
      melhorNota(termo, palavrasExtras.filter((p) => p === termo || p.startsWith(termo))) * 0.4,
    );

    const nota = Math.max(notaNome, notaExtra);
    if (nota === 0) return 0; // TODOS os termos precisam casar
    total += nota;
  }
  return total / termos.length;
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
    this.route.queryParamMap.pipe(map((params) => params.get('categoria'))),
    { initialValue: null },
  );

  readonly termoBusca = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('q') ?? '')),
    { initialValue: '' },
  );

  readonly produtosFiltrados = computed(() => {
    const categoria = this.categoriaSelecionada();
    const categoriaNormalizada = categoria ? normalizarTexto(categoria) : '';
    const buscaNormalizada = normalizarTexto(this.termoBusca());

    return this.produtos
      .filter(
        (produto) =>
          !categoriaNormalizada ||
          normalizarTexto(produto.categoria) === categoriaNormalizada,
      )
      .map((produto) => ({ produto, nota: pontuarProduto(produto, buscaNormalizada) }))
      .filter((item) => item.nota > 0)
      .sort((a, b) => b.nota - a.nota)
      .map((item) => item.produto);
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