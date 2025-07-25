import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  formRecuperarSenha: FormGroup;
  section: 'login' | 'esqueci-senha' = 'login';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private menuController: MenuController,
  ) {
    this.menuController.enable(false);
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.formRecuperarSenha = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  async login() {
    if (!this.formLogin.valid) {
      // await toast('Preencha corretamente os campos.', 'warning');
      return;
    }

    // await loading(
      this.authService.entrar(this.formLogin.getRawValue()).subscribe({
        next: () => {
          this.formLogin.reset();
          this.router.navigate(['/classe-psicofarmacos']);
        },
        error: async (erro: any) => {
          // await toast(erro.message, 'danger');
        },
      })
    // );
  }

  async recuperarSenha() {
    if (this.formRecuperarSenha.invalid) {
      // await toast('Preencha corretamente os campos.', 'warning');
      return;
    }
    // await loading(
      this.usuarioService.post(this.formRecuperarSenha.getRawValue(), 'esqueci-senha')
        .subscribe({
          next: () => {
            // toast('Sua nova senha foi enviada ao seu e-mail.', 'success');
            this.section = 'login';
            this.formRecuperarSenha.reset();
          },
          error: (erro: any) => {
            // toast(erro.message, 'danger');
          }
        })
    // );
  }

  toggleSection(section: 'login' | 'esqueci-senha') {
    this.section = section;
  }
}
