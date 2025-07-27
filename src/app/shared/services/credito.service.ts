import { inject, Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { Credito } from '../interfaces/credito.interface';

@Injectable({
  providedIn: 'root',
})
export class CreditoService extends AbstractService<Credito> {

  constructor() {
    super('creditos', inject(HttpClient));
  }
}
