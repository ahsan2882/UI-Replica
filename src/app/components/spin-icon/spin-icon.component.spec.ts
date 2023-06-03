import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinIconComponent } from './spin-icon.component';

describe('SpinIconComponent', () => {
  let component: SpinIconComponent;
  let fixture: ComponentFixture<SpinIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
