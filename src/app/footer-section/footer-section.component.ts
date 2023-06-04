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

  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (sectionAnimationChange && !sectionAnimationChange.firstChange) {
      console.log(sectionAnimationChange.currentValue);
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden' &&
        this.headings &&
        this.lists
      ) {
        const allHeadings = this.headings.toArray();
        const allLists = this.lists.toArray();
        allHeadings.forEach((element, index) => {
          console.log(element);
          element.nativeElement.classList.remove(`heading-${index}-appear`);
        });
        allLists.forEach((liElement, liIndex) => {
          const listElements = Array.from(liElement.nativeElement.children);
          listElements.forEach((element, liElIndex) => {
            console.log(`li-${liIndex}-${liElIndex}`);
            element.classList.remove(`li-${liIndex}-${liElIndex}`);
          });
        });
        this.cdr.markForCheck();
        setTimeout(() => {
          allHeadings.forEach((element, index) => {
            element.nativeElement.classList.add(`heading-${index}-appear`);
          });
          allLists.forEach((liElement, liIndex) => {
            const listElements = Array.from(liElement.nativeElement.children);
            listElements.forEach((element, liElIndex) => {
              console.log(`li-${liIndex}-${liElIndex}`);
              element.classList.add(`li-${liIndex}-${liElIndex}`);
            });
          });
          this.cdr.markForCheck();
        }, 10);
      }
    }
  }
}
