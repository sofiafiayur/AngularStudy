import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGettingdataComponent } from './gettingdata.component';

describe('GettingdataComponent', () => {
  let component: AppGettingdataComponent;
  let fixture: ComponentFixture<AppGettingdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGettingdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGettingdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
