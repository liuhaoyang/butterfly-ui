import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracesComponent } from './traces.component';

describe('FindTracesComponent', () => {
  let component: TracesComponent;
  let fixture: ComponentFixture<TracesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
