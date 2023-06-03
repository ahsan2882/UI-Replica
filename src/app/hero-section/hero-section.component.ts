import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
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
  title = "Darcy's insurance products";
  navigationLinks: NavigationLinks[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sectionAnimation'].firstChange) {
      console.log(changes['sectionAnimation'].currentValue);
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
