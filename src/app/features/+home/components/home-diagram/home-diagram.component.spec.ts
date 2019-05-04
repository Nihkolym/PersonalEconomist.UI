import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiagramComponent } from './home-diagram.component';

describe('HomeDiagramComponent', () => {
  let component: HomeDiagramComponent;
  let fixture: ComponentFixture<HomeDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
