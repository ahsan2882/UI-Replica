import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CardsCategory } from '../interfaces/cards-category';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsSectionComponent implements OnInit, OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';
  cardsList: CardsCategory[] = [];
  ngOnInit(): void {
    // width: small -> 1x
    // width: medium -> 2x
    // width: large -> 3x
    // height: small -> 1x
    // height: medium -> 2x
    // height: large -> 3x
    this.cardsList = [
      {
        image: 'assets/images/home.avif',
        button: 'Home Insurance',
        width: 'large',
        height: 'large',
        index: 0,
      },
      {
        image: 'assets/images/beach.avif',
        width: 'small',
        height: 'large',
        index: 1,
      },
      {
        title: 'Best choice',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        button: 'View all services',
        width: 'medium',
        height: 'large',
        index: 2,
      },
      {
        image: 'assets/images/car.avif',
        width: 'medium',
        height: 'small',
        button: 'Vehicle damage',
        index: 3,
      },
      {
        image: 'assets/images/house.avif',
        width: 'medium',
        height: 'small',
        button: 'Mortgage insurance',
        index: 4,
      },
      {
        image: 'assets/images/medical.avif',
        width: 'medium',
        height: 'small',
        button: 'Medical expenses',
        index: 5,
      },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sectionAnimation'].firstChange) {
      console.log(changes['sectionAnimation'].currentValue);
    }
  }
  trackByFn(index: number, card: CardsCategory): string | number {
    return card.image
      ? card.image
      : card.title
      ? card.title
      : card.index
      ? card.index
      : index;
  }
}
