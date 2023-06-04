import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ElementRef,
  ChangeDetectorRef,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSectionComponent implements OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';

  @ViewChildren('heading0,heading1,heading2') headings!: QueryList<
    ElementRef<HTMLElement>
  >;
  @ViewChildren('insuranceList,companyList,bonusList') lists!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(private cdr: ChangeDetectorRef) {}

  triggerAnimation(
    headings: ElementRef<HTMLElement>[],
    lists: ElementRef<HTMLElement>[],
    show: boolean
  ) {
    headings.forEach((element, index) => {
      const classList = element.nativeElement.classList;
      show
        ? classList.add(`heading-${index}-appear`)
        : classList.remove(`heading-${index}-appear`);
    });
    lists.forEach((liElement, liIndex) => {
      const listElements = Array.from(liElement.nativeElement.children);
      listElements.forEach((element, liElIndex) => {
        const classList = element.classList;
        show
          ? classList.add(`li-${liIndex}-${liElIndex}`)
          : classList.remove(`li-${liIndex}-${liElIndex}`);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (
      sectionAnimationChange &&
      !sectionAnimationChange.firstChange &&
      this.headings &&
      this.lists
    ) {
      const allHeadings = this.headings.toArray();
      const allLists = this.lists.toArray();
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimation(allHeadings, allLists, false);
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimation(allHeadings, allLists, true);
          this.cdr.markForCheck();
        }, 20);
      } else if (
        sectionAnimationChange.previousValue === 'visible' &&
        sectionAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimation(allHeadings, allLists, false);
        this.cdr.markForCheck();
      }
    }
  }
}
