import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the credentials saved by registration', async () => {
    localStorage.setItem('usuario', JSON.stringify({
      nome: 'Ana Silva',
      email: 'ana@exemplo.com',
      senha: 'senha123',
    }));

    const email = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    email.value = 'ANA@EXEMPLO.COM';
    email.dispatchEvent(new Event('input', { bubbles: true }));

    const senha = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
    senha.value = 'senha123';
    senha.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(localStorage.getItem('logado')).toBe('true');
    expect(component.auth.getClient()).toBe('Ana Silva');
    expect(component.erro).toBe('');
    expect(component.email).toBe('');
    expect(component.senha).toBe('');
    expect((fixture.nativeElement.querySelector('#email') as HTMLInputElement).value).toBe('');
    expect((fixture.nativeElement.querySelector('#password') as HTMLInputElement).value).toBe('');
  });
});
