import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionEditComponent } from './direccion-edit.component';

describe('DireccionEditComponent', () => {
  let component: DireccionEditComponent;
  let fixture: ComponentFixture<DireccionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireccionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
