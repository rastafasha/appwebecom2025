import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestwelcomeComponent } from './bestwelcome.component';

describe('BestwelcomeComponent', () => {
  let component: BestwelcomeComponent;
  let fixture: ComponentFixture<BestwelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestwelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestwelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
