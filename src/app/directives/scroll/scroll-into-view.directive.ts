import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[scrollIntoView]',
})
export class ScrollIntoViewDirective implements AfterViewInit, OnDestroy {
  @Output() scrolledIntoView: EventEmitter<void> = new EventEmitter();
  private observer!: IntersectionObserver;
  private isInView = false;

  constructor(private elementRef: ElementRef) {}
  ngOnDestroy(): void {
    this.observer.disconnect();
  }
  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };
    this.observer = new IntersectionObserver(this.handleIntersection, options);
    this.observer.observe(this.elementRef.nativeElement);
  }
  private handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.isInView) {
        this.isInView = true;
        this.scrolledIntoView.emit();
        this.scrollIntoView();
      } else if (!entry.isIntersecting && this.isInView) {
        this.isInView = false;
      }
    });
  };
  private scrollIntoView() {
    const childElement =
      this.elementRef.nativeElement.querySelector(':scope > *');
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const margin = parseInt(getComputedStyle(childElement).marginTop);

    const scrollPosition = window.scrollY + rect.top - margin;
    window.scrollTo({
      top:
        this.elementRef.nativeElement.offsetTop < 100
          ? scrollPosition - 70
          : this.elementRef.nativeElement.localName.includes('footer')
          ? scrollPosition + 70
          : scrollPosition,
      behavior: 'smooth',
    });
  }
}
