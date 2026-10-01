import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saves the submitted form for the login page', async () => {
    const preencher = (seletor: string, valor: string) => {
      const campo = fixture.nativeElement.querySelector(seletor) as HTMLInputElement;
      campo.value = valor;
      campo.dispatchEvent(new Event('input', { bubbles: true }));
    };

    preencher('#name', 'Ana');
    preencher('#sobrenome', 'Silva');
    preencher('#cpf', '12345678900');
    preencher('#email', 'ANA@EXEMPLO.COM');
    preencher('#password', 'senha123');
    preencher('#confirm-password', 'senha123');
    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    expect(usuario.nome).toBe('Ana Silva');
    expect(usuario.email).toBe('ana@exemplo.com');
    expect(usuario.senha).toBe('senha123');
    expect(component.nome).toBe('');
    expect(component.sobrenome).toBe('');
    expect(component.cpf).toBe('');
    expect(component.email).toBe('');
    expect(component.senha).toBe('');
    expect(component.confirmarSenha).toBe('');
    expect((fixture.nativeElement.querySelector('#name') as HTMLInputElement).value).toBe('');
    expect((fixture.nativeElement.querySelector('#cpf') as HTMLInputElement).value).toBe('');
    expect((fixture.nativeElement.querySelector('#email') as HTMLInputElement).value).toBe('');
  });
});
