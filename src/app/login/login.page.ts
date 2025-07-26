import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {
    this.menuController.enable(false);
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async login() {
    if (!this.formLogin.valid) {
      await this.presentToast('Preencha corretamente os campos.', 'warning');
      return;
    }

    await this.showLoading();
    this.authService.entrar(this.formLogin.getRawValue()).subscribe({
      next: () => {
        this.formLogin.reset();
        this.router.navigate(['/creditos']);
        this.loadingController.dismiss();
      },
      error: async (erro: any) => {
        await this.loadingController.dismiss();
        await this.presentToast(erro?.message || 'Houve um problema ao autenticar, por favor, tente novamente.');
      },
    });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Autenticando...',
    });

    await loading.present();
  }

  async presentToast(message: string, color: 'primary' | 'dark' | 'danger' | 'warning' = 'dark',
                     position: 'top' | 'middle' | 'bottom' = 'top') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position,
      color: color,
    });

    await toast.present();
  }
}
