import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatChip } from './habitat-chip';

describe('HabitatChip', () => {
  let component: HabitatChip;
  let fixture: ComponentFixture<HabitatChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitatChip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitatChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
