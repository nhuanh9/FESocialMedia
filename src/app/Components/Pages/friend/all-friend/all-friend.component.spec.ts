import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFriendComponent } from './all-friend.component';

describe('AllFriendComponent', () => {
  let component: AllFriendComponent;
  let fixture: ComponentFixture<AllFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
