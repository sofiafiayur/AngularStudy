import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatepickerWrapperComponent } from './mat-datepicker-wrapper.component';

describe('MatDatepickerWrapperComponent', () => {
  let component: MatDatepickerWrapperComponent;
  let fixture: ComponentFixture<MatDatepickerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDatepickerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatepickerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
