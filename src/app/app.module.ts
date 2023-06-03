import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsSectionComponent } from './cards-section/cards-section.component';
import { SupportSectionComponent } from './support-section/support-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { NavBarComponent } from './hero-section/nav-bar/nav-bar.component';
import { FeedbackCardComponent } from './feedback-section/feedback-card/feedback-card.component';
import { CardSliderComponent } from './feedback-section/card-slider/card-slider.component';
import { FormComponent } from './footer-section/form/form.component';
import { FooterComponent } from './footer-section/footer/footer.component';
import { FeedbackSectionComponent } from './feedback-section/feedback-section.component';
import { PictureCardComponent } from './cards-section/picture-card/picture-card.component';
import { SpinIconComponent } from './components/spin-icon/spin-icon.component';
import { ScrollIntoViewDirective } from './directives/scroll/scroll-into-view.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardsSectionComponent,
    SupportSectionComponent,
    FooterSectionComponent,
    HeroSectionComponent,
    NavBarComponent,
    FeedbackCardComponent,
    CardSliderComponent,
    FormComponent,
    FooterComponent,
    FeedbackSectionComponent,
    PictureCardComponent,
    SpinIconComponent,
    ScrollIntoViewDirective,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
