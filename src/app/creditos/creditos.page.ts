import { Component, inject, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Credito } from '../shared/interfaces/credito.interface';
import { CreditoService } from '../shared/services/credito.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.page.html',
  styleUrls: ['./creditos.page.scss'],
  standalone: false
})
export class CreditosPage {
  creditos$!: Observable<Credito[]>;
  private readonly menuController = inject(MenuController);
  private readonly creditoService = inject(CreditoService);

  constructor() {
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  ionViewDidEnter() {
    this.buscar();
  }

  buscarPor(event: CustomEvent) {
    this.buscar(event.detail.value);
  }

  buscar(numeroNfse: string = '') {
    // delay apenas para mostrar o comportamento de aguardar carregar para apresentar
    this.creditos$ = this.creditoService.getAll(numeroNfse).pipe(delay(1000));
  }

}
