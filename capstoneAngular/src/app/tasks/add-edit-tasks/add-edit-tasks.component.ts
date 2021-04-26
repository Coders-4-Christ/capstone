import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html',
  styleUrls: ['./add-edit-tasks.component.css']
})
export class AddEditTasksComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() tasks:any;
  TaskID:string;
  Task:string;
  Priority:string;
  EstimatedCost:string;
  AssignedToPersonID:string;

  ngOnInit(): void {
    this.TaskID=this.tasks.TaskID;
    this.Task=this.tasks.Task;
    this.Priority=this.tasks.Priority;
    this.EstimatedCost=this.tasks.EstimatedCost;
    this.AssignedToPersonID=this.tasks.AssignedToPersonID;
  }

  addTasks(){
    var val = {TaskID:this.TaskID,
                Task:this.Task,
                Priority:this.Priority,
                EstimatedCost:this.EstimatedCost,
                AssignedToPersonID:this.AssignedToPersonID};
    this.service.addTasks(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateTasks(){
    var val = {TaskID:this.TaskID,
      Task:this.Task,
      Priority:this.Priority,
      EstimatedCost:this.EstimatedCost,
      AssignedToPersonID:this.AssignedToPersonID};
    this.service.updateTasks(val).subscribe(res=>{
    alert(res.toString());
    });
  }
}
