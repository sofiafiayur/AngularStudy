import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatepickerWrapperMmyyyyComponent } from './mat-datepicker-wrapper-mmyyyy.component';

describe('MatDatepickerWrapperMmyyyyComponent', () => {
  let component: MatDatepickerWrapperMmyyyyComponent;
  let fixture: ComponentFixture<MatDatepickerWrapperMmyyyyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDatepickerWrapperMmyyyyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatepickerWrapperMmyyyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
