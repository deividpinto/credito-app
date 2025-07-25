import { Component } from '@angular/core';
import { StorageService } from './shared/services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    {title: 'Créditos', url: '/creditos', icon: 'wallet'},
  ];

  constructor(private storageService: StorageService,
              private router: Router,
              private alertController: AlertController) {
  }

  async confirmarSair() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      subHeader: '',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.info('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.storageService.clearUsuario();
            this.router.navigate(['/login']);
          },
        },
      ]
    });

    await alert.present();
  }
}
