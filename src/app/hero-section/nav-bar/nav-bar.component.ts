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

  ngOnChanges(changes: SimpleChanges): void {
    const triggerAnimationChange = changes['triggerAnimation'];
    if (triggerAnimationChange && !triggerAnimationChange.firstChange) {
      if (
        triggerAnimationChange.currentValue === 'visible' &&
        triggerAnimationChange.previousValue === 'hidden'
      ) {
        this.logo.nativeElement.classList.remove('logo-appear');
        const navLinks = Array.from(this.navBar.nativeElement.children).filter(
          (element) => element.tagName === 'LI'
        );
        navLinks.forEach((element, index) => {
          element.classList.remove(`nav-item-${index}-appear`);
        });
        const navBtns = Array.from(this.navBtn.nativeElement.children).filter(
          (element) => element.tagName === 'BUTTON'
        );
        navBtns.forEach((element, index) => {
          element.classList.remove(`nav-btn-${index}`);
        });
        this.cdr.markForCheck();
        setTimeout(() => {
          this.logo.nativeElement.classList.add('logo-appear');
          navLinks.forEach((element, index) => {
            element.classList.add(`nav-item-${index}-appear`);
          });
          navBtns.forEach((element, index) => {
            element.classList.add(`nav-btn-${index}`);
          });
          this.cdr.markForCheck();
        }, 10);
      }
    }
  }
}
