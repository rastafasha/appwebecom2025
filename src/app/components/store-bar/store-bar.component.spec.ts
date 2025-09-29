import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBarComponent } from './store-bar.component';

describe('StoreBarComponent', () => {
  let component: StoreBarComponent;
  let fixture: ComponentFixture<StoreBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
