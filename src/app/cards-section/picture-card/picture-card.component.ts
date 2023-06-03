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

  ngOnChanges(changes: SimpleChanges) {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (triggerAnimationChange && !triggerAnimationChange.firstChange) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden'
      ) {
        this.buttonElement.nativeElement.classList.remove(this.buttonClasses!);
        this.cdr.markForCheck();
        setTimeout(() => {
          this.buttonElement.nativeElement.classList.add(this.buttonClasses!);
          this.cdr.markForCheck();
        }, 10);
      }
    }
  }
}
