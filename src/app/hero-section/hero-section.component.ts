import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NavigationLinks } from '../interfaces/navigation-links';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements OnInit, OnChanges {
  @Input() sectionAnimation: 'hidden' | 'visible' = 'hidden';

  @ViewChild('heading') heading!: ElementRef<HTMLElement>;
  @ViewChild('boxesContainer') boxesContainer!: ElementRef<HTMLElement>;
  @ViewChild('heroBtn') heroBtn!: ElementRef<HTMLElement>;
  @ViewChild('imgElement') imgElement!: ElementRef<HTMLElement>;

  navigationLinks: NavigationLinks[] = [];
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (sectionAnimationChange && !sectionAnimationChange.firstChange)
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        const headingSpans = Array.from(
          this.heading.nativeElement.children
        ).filter((element) => element.tagName === 'SPAN');
        headingSpans.forEach((element, index) => {
          element.classList.remove(`text-appear-${index}`);
        });
        const boxes = Array.from(
          this.boxesContainer.nativeElement.children
        ).filter((element) => element.tagName === 'DIV');
        boxes.forEach((element, index) => {
          element.classList.remove(`box-${index}`);
        });
        this.heroBtn.nativeElement.classList.remove('btn-appear');
        this.imgElement.nativeElement.classList.remove('image-appear');
        this.cdr.markForCheck();
        setTimeout(() => {
          headingSpans.forEach((element, index) => {
            element.classList.add(`text-appear-${index}`);
          });
          boxes.forEach((element, index) => {
            element.classList.add(`box-${index}`);
          });
          this.heroBtn.nativeElement.classList.add('btn-appear');
          this.imgElement.nativeElement.classList.add('image-appear');
          this.cdr.markForCheck();
        }, 10);
      }
  }
  ngOnInit(): void {
    this.navigationLinks = [
      {
        title: 'Home',
        isLink: true,
        link: '#',
      },
      {
        title: 'Services',
        isButton: true,
        showArrow: true,
      },
      {
        title: 'About us',
        isLink: true,
        link: '#',
      },
      {
        title: 'Blog',
        isLink: true,
        link: '#',
      },
      {
        title: 'Career',
        isLink: true,
        link: '#',
      },
    ];
  }
}
