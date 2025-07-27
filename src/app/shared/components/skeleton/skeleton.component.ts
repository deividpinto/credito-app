import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  standalone: false
})
export class SkeletonComponent {
  @Input() animated: boolean = true;
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() borderRadius: string = '8px';

  constructor() {
  }

}
