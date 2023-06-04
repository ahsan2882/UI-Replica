import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NavigationLinks } from 'src/app/interfaces/navigation-links';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnChanges {
  @Input() links: NavigationLinks[] = [];
  @Input() triggerAnimation: 'hidden' | 'visible' = 'hidden';
  @ViewChild('logo') logo!: ElementRef<HTMLElement>;
  @ViewChild('navBar') navBar!: ElementRef<HTMLElement>;
  @ViewChild('navBtn') navBtn!: ElementRef<HTMLElement>;
  constructor(private cdr: ChangeDetectorRef) {}

  triggerAnimate(
    logo: ElementRef<HTMLElement>,
    links: Element[],
    btns: Element[],
    show: boolean
  ) {
    if (show) {
      logo.nativeElement.classList.add('logo-appear');
      links.forEach((element, index) => {
        element.classList.add(`nav-item-${index}-appear`);
      });
      btns.forEach((element, index) => {
        element.classList.add(`nav-btn-${index}`);
      });
    } else {
      logo.nativeElement.classList.add('logo-appear');
      links.forEach((element, index) => {
        element.classList.add(`nav-item-${index}-appear`);
      });
      btns.forEach((element, index) => {
        element.classList.add(`nav-btn-${index}`);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (
      triggerAnimationChange &&
      !triggerAnimationChange.firstChange &&
      this.logo &&
      this.navBar &&
      this.navBtn
    ) {
      const navLinks = Array.from(this.navBar.nativeElement.children).filter(
        (element) => element.tagName === 'LI'
      );
      const navBtns = Array.from(this.navBtn.nativeElement.children).filter(
        (element) => element.tagName === 'BUTTON'
      );
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden'
      ) {
        this.triggerAnimate(this.logo, navLinks, navBtns, false);
        this.cdr.markForCheck();
        setTimeout(() => {
          this.triggerAnimate(this.logo, navLinks, navBtns, true);
          this.cdr.markForCheck();
        }, 20);
      } else if (
        triggerAnimationChange.previousValue === 'visible' &&
        triggerAnimationChange.currentValue === 'hidden'
      ) {
        this.triggerAnimate(this.logo, navLinks, navBtns, false);
        this.cdr.markForCheck();
      }
    }
  }
}
