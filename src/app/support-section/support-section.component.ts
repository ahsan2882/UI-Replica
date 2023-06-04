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

  triggerAnimate(
    headings: Element[],
    divs: Element[],
    btn: ElementRef<HTMLButtonElement>,
    img: ElementRef<HTMLImageElement>,
    show: boolean
  ) {
    if (show) {
      headings.forEach((element, index) => {
        element.classList.add(`text-appear-${index}`);
      });
      divs.forEach((element, index) => {
        element.classList.add(`box-appear-${index}`);
      });
      btn.nativeElement.classList.add('button-appear');
      img.nativeElement.classList.add('image-appear');
    } else {
      headings.forEach((element, index) => {
        element.classList.remove(`text-appear-${index}`);
      });
      divs.forEach((element, index) => {
        element.classList.remove(`box-appear-${index}`);
      });
      btn.nativeElement.classList.remove('button-appear');
      img.nativeElement.classList.remove('image-appear');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (
      sectionAnimationChange &&
      !sectionAnimationChange.firstChange &&
      this.heading &&
      this.textElement &&
      this.buttonElement &&
      this.imageElement
    ) {
      const headingSpans = Array.from(
        this.heading.nativeElement.children
      ).filter((element) => element.tagName === 'SPAN');
      const textDivs = Array.from(
        this.textElement.nativeElement.children
      ).filter((element) => element.tagName === 'DIV');
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimate(
          headingSpans,
          textDivs,
          this.buttonElement,
          this.imageElement,
          false
        );
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimate(
            headingSpans,
            textDivs,
            this.buttonElement,
            this.imageElement,
            true
          );
          this.cdr.markForCheck();
        }, 20);
      } else if (
        sectionAnimationChange.previousValue === 'visible' &&
        sectionAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimate(
          headingSpans,
          textDivs,
          this.buttonElement,
          this.imageElement,
          false
        );
        this.cdr.markForCheck();
      }
    }
  }
}
