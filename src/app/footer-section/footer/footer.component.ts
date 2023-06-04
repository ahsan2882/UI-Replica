import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnChanges {
  @Input() triggerAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('logo') logo!: ElementRef<HTMLElement>;
  @ViewChild('name') name!: ElementRef<HTMLElement>;
  @ViewChild('link') link!: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (triggerAnimationChange && !triggerAnimationChange.firstChange) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden' &&
        this.logo &&
        this.name &&
        this.link
      ) {
        this.logo.nativeElement.classList.remove('logo-appear');
        this.name.nativeElement.classList.remove('name-appear');
        this.link.nativeElement.classList.remove('link-appear');
        this.cdr.markForCheck();
        setTimeout(() => {
          this.logo.nativeElement.classList.add('logo-appear');
          this.name.nativeElement.classList.add('name-appear');
          this.link.nativeElement.classList.add('link-appear');
          this.cdr.markForCheck();
        }, 20);
      }
    }
  }
}
