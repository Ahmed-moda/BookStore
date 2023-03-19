import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebokComponent } from './updatebok.component';

describe('UpdatebokComponent', () => {
  let component: UpdatebokComponent;
  let fixture: ComponentFixture<UpdatebokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatebokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
