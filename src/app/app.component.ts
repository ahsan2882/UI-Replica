import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UI-Replica';
  sections: {
    id: number;
    name: string;
    state: 'hidden' | 'visible';
  }[] = [
    {
      id: 1,
      name: 'hero',
      state: 'hidden',
    },
    {
      id: 2,
      name: 'cards',
      state: 'hidden',
    },
    {
      id: 3,
      name: 'feedback',
      state: 'hidden',
    },
    {
      id: 4,
      name: 'support',
      state: 'hidden',
    },
    {
      id: 5,
      name: 'footer',
      state: 'hidden',
    },
  ];
  onSectionVisible(sectionId: string) {
    this.sections.forEach((section) => {
      section.state = 'hidden';
    });
    const section = this.sections.find((section) => section.name === sectionId);
    if (section) {
      section.state = 'visible';
    }
  }
}
