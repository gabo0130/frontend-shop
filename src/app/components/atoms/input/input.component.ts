import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `<input [type]="type" [placeholder]="placeholder" [(ngModel)]="value" [required]="required">`,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() required = false;
}