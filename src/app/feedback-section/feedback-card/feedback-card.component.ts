import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackCardComponent {
  @Input() name: string = '';
  @Input() designation: string = '';
  @Input() feedback: string = '';
  @Input() image: string = '';
  @Input() enteringView: boolean = false;
  @Input() leavingView: boolean = false;
}
