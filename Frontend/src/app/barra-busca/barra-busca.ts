import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busca',
  imports: [FormsModule],
  templateUrl: './barra-busca.html',
  styleUrl: './barra-busca.css',
})
export class BarraBusca {
  termo = '';

  constructor(private router: Router) {}

  pesquisar(): void {
    const busca = this.termo.trim();

    if (!busca) {
      return;
    }

    this.router.navigate(['/resultado-busca'], {
      queryParams: { q: busca },
    });
  }
}