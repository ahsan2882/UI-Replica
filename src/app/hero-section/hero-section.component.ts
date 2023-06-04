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

  triggerAnimation(
    headings: Element[],
    boxes: Element[],
    btn: ElementRef<HTMLElement>,
    img: ElementRef<HTMLElement>,
    show: boolean
  ) {
    if (show) {
      headings.forEach((element, index) => {
        element.classList.add(`text-appear-${index}`);
      });
      boxes.forEach((element, index) => {
        element.classList.add(`box-${index}`);
      });
      btn.nativeElement.classList.add('btn-appear');
      img.nativeElement.classList.add('image-appear');
    } else {
      headings.forEach((element, index) => {
        element.classList.remove(`text-appear-${index}`);
      });
      boxes.forEach((element, index) => {
        element.classList.remove(`box-${index}`);
      });
      btn.nativeElement.classList.remove('btn-appear');
      img.nativeElement.classList.remove('image-appear');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const sectionAnimationChange = changes['sectionAnimation'];
    if (
      sectionAnimationChange &&
      !sectionAnimationChange.firstChange &&
      this.heading &&
      this.boxesContainer &&
      this.heroBtn &&
      this.imgElement
    ) {
      const headingSpans = Array.from(
        this.heading.nativeElement.children
      ).filter((element) => element.tagName === 'SPAN');
      const boxes = Array.from(
        this.boxesContainer.nativeElement.children
      ).filter((element) => element.tagName === 'DIV');
      if (
        sectionAnimationChange.currentValue === 'visible' &&
        sectionAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimation(
          headingSpans,
          boxes,
          this.heroBtn,
          this.imgElement,
          false
        );
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimation(
            headingSpans,
            boxes,
            this.heroBtn,
            this.imgElement,
            true
          );
          this.cdr.markForCheck();
        }, 20);
      } else if (
        sectionAnimationChange.previousValue === 'visible' &&
        sectionAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimation(
          headingSpans,
          boxes,
          this.heroBtn,
          this.imgElement,
          false
        );
      }
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
