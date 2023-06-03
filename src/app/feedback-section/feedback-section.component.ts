import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FeedbackCard } from '../interfaces/feedback-card';

@Component({
  selector: 'app-feedback-section',
  templateUrl: './feedback-section.component.html',
  styleUrls: ['./feedback-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSectionComponent implements OnInit, OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('heading') heading!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;

  feedbackCards: FeedbackCard[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (!sectionAnimationChange.firstChange) {
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        const spans = Array.from(
          (this.heading.nativeElement as HTMLElement).children
        ).filter((element) => element.tagName === 'SPAN');
        spans.forEach((element, index) => {
          element.classList.remove(`text-appear-${index + 1}`);
        });
        this.icon.nativeElement.classList.remove('icon-wrapper');
        this.cdr.markForCheck();
        setTimeout(() => {
          spans.forEach((element, index) => {
            element.classList.add(`text-appear-${index + 1}`);
          });
          this.icon.nativeElement.classList.add('icon-wrapper');
          this.cdr.markForCheck();
        }, 10);
      }
    }
  }

  ngOnInit(): void {
    this.feedbackCards = [
      {
        personName: 'Alexander Blake',
        personDesignation: 'CEO, ABC Company',
        personImage: 'assets/images/person4.jpg',
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cum officia blanditiis. Quasi, possimus doloribus sequi nostrum provident aliquam aliquid assumenda, saepe incidunt reprehenderit porro alias libero enim vero minus.',
        index: 0,
        enteringView: false,
        leavingView: false,
      },
      {
        personName: 'Aylin Carter',
        personDesignation: 'CEO, ABC Company',
        personImage: 'assets/images/person2.jpg',
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cum officia blanditiis. Quasi, possimus doloribus sequi nostrum provident aliquam aliquid assumenda, saepe incidunt reprehenderit porro alias libero enim vero minus.',
        index: 1,
        enteringView: false,
        leavingView: false,
      },

      {
        personName: 'Michael Smith',
        personDesignation: 'CEO, ABC Company',
        personImage: 'assets/images/person5.jpg',
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cum officia blanditiis. Quasi, possimus doloribus sequi nostrum provident aliquam aliquid assumenda, saepe incidunt reprehenderit porro alias libero enim vero minus.',
        index: 2,
        enteringView: false,
        leavingView: false,
      },
      {
        personName: 'Hannah Taylor',
        personDesignation: 'CEO, ABC Company',
        personImage: 'assets/images/person1.jpg',
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cum officia blanditiis. Quasi, possimus doloribus sequi nostrum provident aliquam aliquid assumenda, saepe incidunt reprehenderit porro alias libero enim vero minus.',
        index: 3,
        enteringView: false,
        leavingView: false,
      },
      {
        personName: 'Katherine Jones',
        personDesignation: 'CEO, ABC Company',
        personImage: 'assets/images/person3.jpg',
        feedbackText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cum officia blanditiis. Quasi, possimus doloribus sequi nostrum provident aliquam aliquid assumenda, saepe incidunt reprehenderit porro alias libero enim vero minus.',
        index: 4,
        enteringView: false,
        leavingView: false,
      },
    ];
  }
}
