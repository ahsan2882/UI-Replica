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

  triggerAnimate(
    logo: ElementRef<HTMLElement>,
    name: ElementRef<HTMLElement>,
    link: ElementRef<HTMLElement>,
    show: boolean
  ) {
    if (show) {
      logo.nativeElement.classList.add('logo-appear');
      name.nativeElement.classList.add('name-appear');
      link.nativeElement.classList.add('link-appear');
    } else {
      logo.nativeElement.classList.remove('logo-appear');
      name.nativeElement.classList.remove('name-appear');
      link.nativeElement.classList.remove('link-appear');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (
      triggerAnimationChange &&
      !triggerAnimationChange.firstChange &&
      this.logo &&
      this.name &&
      this.link
    ) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimate(this.logo, this.name, this.link, false);
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimate(this.logo, this.name, this.link, true);
          this.cdr.markForCheck();
        }, 20);
      } else if (
        triggerAnimationChange.previousValue === 'visible' &&
        triggerAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimate(this.logo, this.name, this.link, false);
        this.cdr.markForCheck();
      }
    }
  }
}
