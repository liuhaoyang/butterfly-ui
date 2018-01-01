import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyComponent } from './dependency.component';

describe('DependencyComponent', () => {
  let component: DependencyComponent;
  let fixture: ComponentFixture<DependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
