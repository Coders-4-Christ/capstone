import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPeopleComponent } from './add-edit-people.component';

describe('AddEditPeopleComponent', () => {
  let component: AddEditPeopleComponent;
  let fixture: ComponentFixture<AddEditPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
