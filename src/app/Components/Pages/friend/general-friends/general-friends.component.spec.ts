import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFriendsComponent } from './general-friends.component';

describe('GeneralFriendsComponent', () => {
  let component: GeneralFriendsComponent;
  let fixture: ComponentFixture<GeneralFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
