import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsBarComponent } from './brands-bar.component';

describe('BrandsBarComponent', () => {
  let component: BrandsBarComponent;
  let fixture: ComponentFixture<BrandsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
