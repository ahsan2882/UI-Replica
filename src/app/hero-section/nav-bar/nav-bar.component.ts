import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationLinks } from 'src/app/interfaces/navigation-links';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  @Input() links: NavigationLinks[] = [];
}
