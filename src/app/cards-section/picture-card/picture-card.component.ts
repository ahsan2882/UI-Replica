import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureCardComponent {
  @Input() backgroundImage: string | undefined = '';
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';
  @Input() button: string | undefined = '';
  @Input() classes: string = '';
}
