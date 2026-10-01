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
  sobrenome = '';
  email = '';
  senha = '';
  cpf = '';

  cadastrar() {
    console.log("Cadastrando usuário: ", this.nome, this.email, this.senha);
    const usuario = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log("Usuário Cadastrado ", usuario);
  }
}
