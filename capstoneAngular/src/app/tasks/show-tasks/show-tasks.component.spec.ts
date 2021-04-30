/* import proper dependencies */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowTasksComponent } from './show-tasks.component';
/* define show tasks component */
describe('ShowTasksComponent', () => {
  let component: ShowTasksComponent;
  let fixture: ComponentFixture<ShowTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/* confirm creation of show tasks component */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
