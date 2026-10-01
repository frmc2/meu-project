import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  
  nome = '';
  email = '';
  senha = '';

  cadastrar() {
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log("Usuário Cadastrado")
  }
}
