import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashedComponent } from './trashed.component';

describe('TrashedComponent', () => {
  let component: TrashedComponent;
  let fixture: ComponentFixture<TrashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
