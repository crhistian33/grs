import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeasedComponent } from './ceased.component';

describe('CeasedComponent', () => {
  let component: CeasedComponent;
  let fixture: ComponentFixture<CeasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeasedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
