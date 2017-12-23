import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTracesComponent } from './find-traces.component';

describe('FindTracesComponent', () => {
  let component: FindTracesComponent;
  let fixture: ComponentFixture<FindTracesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTracesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
