/* Import necessary dependencies */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
/*  define variables */
describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
/* declare funactionality of variables */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/* create final component */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
