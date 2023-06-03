import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
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
  feedbackCards: FeedbackCard[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sectionAnimation'].firstChange) {
      console.log(changes['sectionAnimation'].currentValue);
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
