/* Import the required dependencies */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditTasksComponent } from './add-edit-tasks.component';

/* Create Function for Task */
describe('AddEditTasksComponent', () => {
  let component: AddEditTasksComponent;
  let fixture: ComponentFixture<AddEditTasksComponent>;
/* Execute Function of current Task*/
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/* Confirm completed Action*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
