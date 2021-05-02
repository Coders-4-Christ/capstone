// import proper dependencies
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
// connect proper html and css forms
@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit {

  constructor(private service:SharedService) { }
// create generic array of tasks
  TasksList:any=[];

  //creates generic variable for modal title, generic task object, and activation boolean for the Modal Window
  ModalTitle:string;
  ActivateAddEditTaskComp:boolean=false;
  tasks:any;

  //instantiates filter strings to be used in the filter function
  TaskIDFilter:string="";
  TaskFilter:string="";
  PriorityFilter:string="";
  EstimatedCostFilter:string="";
  AssignedToPersonIDFilter:string="";
  TasksListWithoutFilter:any=[];

  //refreshes the task table when the page is loaded
  ngOnInit(): void {
    this.refreshTaskList();
  }
// create functionality using Click function by filling the generic task object with the necessary empty fields
  addClick(){
    this.tasks={
      TaskID:0,
      Task:"",
      Priority:0,
      EstimatedCost:"",
      AssignedToPersonID:""
    }
    //sets the title of the modal window and turns on the modal window activator
    this.ModalTitle="Add Task";
    this.ActivateAddEditTaskComp=true;
  }

  //populates the task object with the data from the form, sets the modal window title to "Edit Task" and turns on the modal window activator
  editClick(item){
    this.tasks=item;
    this.ModalTitle="Edit Task";
    this.ActivateAddEditTaskComp=true;
  }

  //turns off the modal window activator and refreshes the task table
  closeClick(){
    this.ActivateAddEditTaskComp=false;
    this.refreshTaskList();
  }

//if the user accepts the confirmation popup, the TaskID from that row gets passed to the deleteTasks service method, sending it through the API and deleting that row
  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteTasks(item.TaskID).subscribe(data=>{
        alert(data.toString());
        //refreshes table with remaining data
        this.refreshTaskList();
      });
    }
  }
// refresh data list assigned to taskslists
  refreshTaskList(){
    this.service.getTasksList().subscribe(data=>{
      this.TasksList=data;
      this.TasksListWithoutFilter=data;
    });
  }
// make filter functionality by creating variables and setting them to the filtered data
  FilterFn(){
    var TaskIDFilter = this.TaskIDFilter;
    var TaskFilter = this.TaskFilter;
    var PriorityFilter = this.PriorityFilter;
    var EstimatedCostFilter = this.EstimatedCostFilter;
    var AssignedToPersonIDFilter = this.AssignedToPersonIDFilter;

    //returns any values in the original table that includes things written in the filters
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

  //sorts table either ascending or descending
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
