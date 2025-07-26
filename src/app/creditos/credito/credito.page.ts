import { Component, OnInit } from '@angular/core';
import { CreditoService } from '../../shared/services/credito.service';
import { ActivatedRoute } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { Credito } from '../../shared/interfaces/credito.interface';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.page.html',
  styleUrls: ['./credito.page.scss'],
  standalone: false
})
export class CreditoPage implements OnInit {
  numeroCredito!: string;
  credito$!: Observable<Credito>;

  constructor(
    private creditoService: CreditoService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.numeroCredito = this.activatedRoute.snapshot.paramMap.get('numeroCredito')!;
    this.credito$ = this.creditoService.getOne('credito/' + this.numeroCredito).pipe(delay(1000));
  }

}
