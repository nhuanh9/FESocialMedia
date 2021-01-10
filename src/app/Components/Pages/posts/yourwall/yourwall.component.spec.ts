import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourwallComponent } from './yourwall.component';

describe('YourwallComponent', () => {
  let component: YourwallComponent;
  let fixture: ComponentFixture<YourwallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourwallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourwallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
