import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FeedbackCard } from 'src/app/interfaces/feedback-card';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSliderComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() feedbackCards: FeedbackCard[] = [];

  prevIndex = 0;
  currentIndex = -1;
  translateX = this.currentIndex * -100;
  timer: any;
  slidesIndex: number[] = [];
  trackByFn(index: number, item: FeedbackCard): string {
    return item.personName;
  }
  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 200);
    this.slidesIndex = this.feedbackCards.map((_, index) => index);
  }
  onSlideChange(index: number): void {
    clearInterval(this.timer);
    this.currentIndex = index;
    this.translateX = this.currentIndex * -100;
    this.timer = setInterval(() => this.nextSlide(), 5000);
    this.cdr.markForCheck();
  }
  nextSlide(): void {
    if (this.currentIndex === this.feedbackCards.length - 1) {
      this.translateX -= 100;
      this.currentIndex = -1;
      this.cdr.markForCheck();
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.nextSlide();
      }, 50);
    } else if (this.currentIndex === -1) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
    this.prevIndex = this.currentIndex;
    const check = -100 * this.feedbackCards.length;
    if (this.translateX <= check) {
      this.translateX = 100;
    } else {
      this.currentIndex = this.currentIndex + 1;

      if (this.currentIndex === this.feedbackCards.length) {
        this.currentIndex = -1;
      }
      this.translateX -= 100;
    }
    this.cdr.markForCheck();
    if (this.prevIndex !== -1) {
      this.feedbackCards.forEach((item) => {
        item.enteringView = false;
        item.leavingView = false;
      });
      this.feedbackCards.filter(
        (item) => item.index === this.prevIndex
      )[0].leavingView = true;
    }
    this.feedbackCards.filter(
      (item) => item.index === this.currentIndex
    )[0].enteringView = true;
  }
}
