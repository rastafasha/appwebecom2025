import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotofooterComponent } from './fotofooter.component';

describe('FotofooterComponent', () => {
  let component: FotofooterComponent;
  let fixture: ComponentFixture<FotofooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotofooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotofooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
