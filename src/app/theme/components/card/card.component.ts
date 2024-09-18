import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template:`
    <ng-content></ng-content>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
