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
  selector: 'app-support-section',
  templateUrl: './support-section.component.html',
  styleUrls: ['./support-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportSectionComponent implements OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('heading') heading!: ElementRef<HTMLElement>;
  @ViewChild('textElement') textElement!: ElementRef<HTMLDivElement>;
  @ViewChild('buttonElement') buttonElement!: ElementRef<HTMLButtonElement>;
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (sectionAnimationChange && !sectionAnimationChange.firstChange) {
      console.log(
        sectionAnimationChange.currentValue,
        sectionAnimationChange.previousValue
      );
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden' &&
        this.heading &&
        this.textElement &&
        this.buttonElement &&
        this.imageElement
      ) {
        const headingSpans = Array.from(
          this.heading.nativeElement.children
        ).filter((element) => element.tagName === 'SPAN');
        headingSpans.forEach((element, index) => {
          element.classList.remove(`text-appear-${index}`);
        });
        const textDivs = Array.from(
          this.textElement.nativeElement.children
        ).filter((element) => element.tagName === 'DIV');
        textDivs.forEach((element, index) => {
          element.classList.remove(`box-appear-${index}`);
        });
        this.buttonElement.nativeElement.classList.remove('button-appear');
        this.imageElement.nativeElement.classList.remove('image-appear');
        this.cdr.markForCheck();
        setTimeout(() => {
          headingSpans.forEach((element, index) => {
            element.classList.add(`text-appear-${index}`);
          });
          textDivs.forEach((element, index) => {
            element.classList.add(`box-appear-${index}`);
          });
          this.buttonElement.nativeElement.classList.add('button-appear');
          this.imageElement.nativeElement.classList.add('image-appear');
          this.cdr.markForCheck();
        }, 20);
      }
    }
  }
}
