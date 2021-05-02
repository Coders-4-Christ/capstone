import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html',
  styleUrls: ['./add-edit-tasks.component.css']
})
export class AddEditTasksComponent implements OnInit {

  //constructor instantiates a service object so those methods can be used
  constructor(private service:SharedService) { }

  //generates a generic task object, as well as the necessary generic fields to be passed through the API
  @Input() tasks:any;
  TaskID:string;
  Task:string;
  Priority:string;
  EstimatedCost:string;
  AssignedToPersonID:string;

  //creates task instance
  ngOnInit(): void {
    this.TaskID=this.tasks.TaskID;
    this.Task=this.tasks.Task;
    this.Priority=this.tasks.Priority;
    this.EstimatedCost=this.tasks.EstimatedCost;
    this.AssignedToPersonID=this.tasks.AssignedToPersonID;
  }

  //gathers data from the form, populates the generic fields, and sends it to the API's addTasks method to be processed, returning whether or not it succeeded
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

  //gathers data from the form, repopulates the generic fields, and sends it to the API's updateTasks method to be processed, returning whether or not it succeeded
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
