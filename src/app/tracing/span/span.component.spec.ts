import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanComponent } from './span.component';

describe('SpanComponent', () => {
  let component: SpanComponent;
  let fixture: ComponentFixture<SpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
