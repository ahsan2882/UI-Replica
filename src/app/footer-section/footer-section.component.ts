import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSectionComponent implements OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sectionAnimation'].firstChange) {
      console.log(changes['sectionAnimation'].currentValue);
    }
  }
}
