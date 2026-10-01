import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { BarraBusca } from './barra-busca/barra-busca';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, BarraBusca],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('meu-project');
  menuProdutosAberto = false;

  private platformId = inject(PLATFORM_ID);

  auth = inject(AuthService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.verificarLogin();
    }
  }

  alternarMenuProdutos(): void {
    this.menuProdutosAberto = !this.menuProdutosAberto;
  }

  fecharMenuProdutos(): void {
    this.menuProdutosAberto = false;
  }
}
