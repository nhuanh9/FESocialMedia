import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendswallComponent } from './friendswall.component';

describe('FriendswallComponent', () => {
  let component: FriendswallComponent;
  let fixture: ComponentFixture<FriendswallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendswallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendswallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
