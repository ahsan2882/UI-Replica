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

  triggerAnimation(
    spans: Element[],
    icon: ElementRef<HTMLElement>,
    show: boolean
  ) {
    spans.forEach((element, index) => {
      const classList = element.classList;
      show
        ? classList.add(`text-appear-${index + 1}`)
        : classList.remove(`text-appear-${index + 1}`);
    });
    const iconClassList = icon.nativeElement.classList;
    show
      ? iconClassList.add('icon-wrapper')
      : iconClassList.remove('icon-wrapper');
  }
  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (
      sectionAnimationChange &&
      !sectionAnimationChange.firstChange &&
      this.heading &&
      this.icon
    ) {
      const spans = Array.from(
        (this.heading.nativeElement as HTMLElement).children
      ).filter((element) => element.tagName === 'SPAN');
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimation(spans, this.icon, false);
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimation(spans, this.icon, true);
          this.cdr.markForCheck();
        }, 20);
      } else if (
        sectionAnimationChange.previousValue === 'visible' &&
        sectionAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimation(spans, this.icon, false);
        this.cdr.markForCheck();
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
