import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeByUserComponent } from './like-by-user.component';

describe('LikeByUserComponent', () => {
  let component: LikeByUserComponent;
  let fixture: ComponentFixture<LikeByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
