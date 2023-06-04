import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit {
  @Input() color: string = '#ffffff';
  @Input() size: number = 12;
  @Input() radius: number = 10;
  @Input() gap: number = 3;
  ngOnInit(): void {}
}
