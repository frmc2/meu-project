import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { BarraBusca } from './barra-busca/barra-busca';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, BarraBusca, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  dropdownOpen = signal(false);
  paletteMenuOpen = signal(false);
  paletaDaltonismo = signal<'padrao' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('padrao');

  @ViewChild('paletteToggle') private paletteToggle?: ElementRef<HTMLButtonElement>;
  
  backgroundClass: 'padrao' | 'imagem' = 'padrao';

  private readonly chavePaleta = 'frutiger-store-paleta-daltonismo';

  trocarBackground(opcao: 'padrao' | 'imagem') {
    this.backgroundClass = opcao;
  }

  toggleDropdown(): void {
    this.paletteMenuOpen.set(false);
    this.dropdownOpen.update(isOpen => !isOpen);
  }

  togglePaletteMenu(): void {
    this.dropdownOpen.set(false);
    this.paletteMenuOpen.update(isOpen => !isOpen);
  }

  selecionarPaleta(paleta: 'padrao' | 'protanopia' | 'deuteranopia' | 'tritanopia'): void {
    this.paletaDaltonismo.set(paleta);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.chavePaleta, paleta);
    }
  }

  fecharMenusComEscape(): void {
    const retornarFocoAoBotao = this.paletteMenuOpen();
    this.fecharMenuProdutos();

    if (retornarFocoAoBotao) {
      queueMicrotask(() => this.paletteToggle?.nativeElement.focus());
    }
  }

  fecharMenuProdutos(): void {
    this.dropdownOpen.set(false);
    this.paletteMenuOpen.set(false);
  }

  protected readonly title = signal('meu-project');

  private platformId = inject(PLATFORM_ID);

  auth = inject(AuthService);


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.verificarLogin();

      const paletaSalva = localStorage.getItem(this.chavePaleta);
      if (paletaSalva === 'protanopia' || paletaSalva === 'deuteranopia' || paletaSalva === 'tritanopia') {
        this.paletaDaltonismo.set(paletaSalva);
      }
    }
  }

}
