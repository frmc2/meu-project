import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  nome = '';
  sobrenome = '';
  cpf = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mensagem = '';
  erro = '';

  cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      this.mensagem = '';
      return;
    }

    const usuario = {
      nome: `${this.nome.trim()} ${this.sobrenome.trim()}`.trim(),
      cpf: this.cpf.trim(),
      email: this.email.trim().toLowerCase(),
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.nome = '';
    this.sobrenome = '';
    this.cpf = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.erro = '';
    this.mensagem = 'Cadastro realizado. Agora você pode entrar com seu e-mail e senha.';
  }
}
