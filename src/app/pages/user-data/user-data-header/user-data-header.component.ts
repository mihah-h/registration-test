import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-data-header',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-data-header.component.html',
  styleUrl: './user-data-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDataHeaderComponent {
  @Output() public exit = new EventEmitter();
}
