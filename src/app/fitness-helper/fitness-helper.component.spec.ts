import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHelperComponent } from './fitness-helper.component';

describe('FitnessHelperComponent', () => {
  let component: FitnessHelperComponent;
  let fixture: ComponentFixture<FitnessHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessHelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
