import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

interface AnimatePictureCard {
  button: ElementRef<HTMLButtonElement>;
  classes: string;
  show: boolean;
}

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureCardComponent implements OnChanges {
  @Input() backgroundImage: string | undefined = '';
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';
  @Input() button: string | undefined = '';
  @Input() classes: string = '';
  @Input() buttonClasses?: string = '';
  @Input() triggerAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('buttonElement') buttonElement!: ElementRef<HTMLButtonElement>;

  constructor(private cdr: ChangeDetectorRef) {}
  triggerAnimate({ button, classes, show }: AnimatePictureCard) {
    show
      ? button.nativeElement.classList.add(classes)
      : button.nativeElement.classList.remove(classes);
  }

  ngOnChanges(changes: SimpleChanges) {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (
      triggerAnimationChange &&
      !triggerAnimationChange.firstChange &&
      this.buttonElement &&
      this.buttonClasses
    ) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimate({
          button: this.buttonElement,
          classes: this.buttonClasses,
          show: false,
        });
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimate({
            button: this.buttonElement,
            classes: this.buttonClasses!,
            show: true,
          });
          this.cdr.markForCheck();
        }, 20);
      } else if (
        triggerAnimationChange.previousValue === 'visible' &&
        triggerAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimate({
          button: this.buttonElement,
          classes: this.buttonClasses,
          show: false,
        });
        this.cdr.markForCheck();
      }
    }
  }
}
