import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-support-section',
  templateUrl: './support-section.component.html',
  styleUrls: ['./support-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportSectionComponent implements OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sectionAnimation'].firstChange) {
      console.log(changes['sectionAnimation'].currentValue);
    }
  }
}
