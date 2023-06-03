import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
export class FormComponent {
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
}
