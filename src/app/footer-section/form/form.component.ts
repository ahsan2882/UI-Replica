import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

interface Category {
  name: string;
  id: string;
  selected: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnChanges {
  @Input() triggerAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('heading') heading!: ElementRef<HTMLElement>;
  @ViewChild('btnCategories') btnCategories!: ElementRef<HTMLElement>;
  @ViewChild('inputBoxes') inputBoxes!: ElementRef<HTMLElement>;
  @ViewChild('buttonElement') buttonElement!: ElementRef<HTMLButtonElement>;

  constructor(private cdr: ChangeDetectorRef) {}
  categories: Category[] = [
    {
      name: 'Travel',
      id: 'travel',
      selected: true,
    },
    {
      name: 'Health',
      id: 'health',
      selected: false,
    },
    {
      name: 'CASCO',
      id: 'casco',
      selected: false,
    },
    {
      name: 'Property',
      id: 'property',
      selected: false,
    },
    {
      name: 'Fire',
      id: 'fire',
      selected: false,
    },
  ];
  selectCategory(id: string): void {
    this.categories.forEach((item) => (item.selected = false));
    this.categories.filter((item) => item.id === id)[0].selected = true;
    this.cdr.markForCheck();
  }
  trackByFn(index: number, item: Category): string {
    return item.id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (triggerAnimationChange && !triggerAnimationChange.firstChange) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden' &&
        this.heading &&
        this.btnCategories &&
        this.inputBoxes &&
        this.buttonElement
      ) {
        this.heading.nativeElement.classList.remove('heading-appear');
        this.btnCategories.nativeElement.classList.remove(
          'btn-container-appear'
        );
        const btns = Array.from(this.btnCategories.nativeElement.children);
        btns.forEach((element, index) => {
          element.classList.remove(`btn-${index}-appear`);
        });
        const inputContainers = Array.from(
          (this.inputBoxes.nativeElement as HTMLDivElement).children
        );
        inputContainers.forEach((element, index) => {
          element.classList.remove(`input-${index}-appear`);
        });
        this.buttonElement.nativeElement.classList.remove('btn-appear');
        this.cdr.markForCheck();
        setTimeout(() => {
          this.heading.nativeElement.classList.add('heading-appear');
          this.btnCategories.nativeElement.classList.add(
            'btn-container-appear'
          );
          btns.forEach((element, index) => {
            element.classList.add(`btn-${index}-appear`);
          });
          inputContainers.forEach((element, index) => {
            element.classList.add(`input-${index}-appear`);
          });
          this.buttonElement.nativeElement.classList.add('btn-appear');
          this.cdr.markForCheck();
        }, 20);
      }
    }
  }
}
