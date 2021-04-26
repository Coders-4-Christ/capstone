import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit {

  constructor(private service:SharedService) { }

  TasksList:any=[];

  ModalTitle:string;
  ActivateAddEditTaskComp:boolean=false;
  tasks:any;

  TaskIDFilter:string="";
  TaskFilter:string="";
  PriorityFilter:string="";
  EstimatedCostFilter:string="";
  AssignedToPersonIDFilter:string="";
  TasksListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshTaskList();
  }

  addClick(){
    this.tasks={
      TaskID:0,
      Task:"",
      Priority:0,
      EstimatedCost:"",
      AssignedToPersonID:""
    }
    this.ModalTitle="Add Task";
    this.ActivateAddEditTaskComp=true;
  }

  editClick(item){
    this.tasks=item;
    this.ModalTitle="Edit Task";
    this.ActivateAddEditTaskComp=true;
  }

  closeClick(){
    this.ActivateAddEditTaskComp=false;
    this.refreshTaskList();
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteTasks(item.TaskID).subscribe(data=>{
        alert(data.toString());
        this.refreshTaskList();
      });
    }
  }

  refreshTaskList(){
    this.service.getTasksList().subscribe(data=>{
      this.TasksList=data;
      this.TasksListWithoutFilter=data;
    });
  }

  FilterFn(){
    var TaskIDFilter = this.TaskIDFilter;
    var TaskFilter = this.TaskFilter;
    var PriorityFilter = this.PriorityFilter;
    var EstimatedCostFilter = this.EstimatedCostFilter;
    var AssignedToPersonIDFilter = this.AssignedToPersonIDFilter;

    this.TasksList = this.TasksListWithoutFilter.filter(function (el){
      return el.TaskID.toString().toLowerCase().includes(
        TaskIDFilter.toString().trim().toLowerCase()
      )&&
      el.Task.toString().toLowerCase().includes(
        TaskFilter.toString().trim().toLowerCase()
      )&&
      el.Priority.toString().toLowerCase().includes(
        PriorityFilter.toString().trim().toLowerCase()
      )&&
      el.EstimatedCost.toString().toLowerCase().includes(
        EstimatedCostFilter.toString().trim().toLowerCase()
      )&&
      el.AssignedToPersonID.toString().toLowerCase().includes(
        AssignedToPersonIDFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop,asc){
    this.TasksList = this.TasksListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
