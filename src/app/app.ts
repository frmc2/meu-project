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

  private platformId = inject(PLATFORM_ID);

  auth = inject(AuthService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.verificarLogin();
    }
  }
}
