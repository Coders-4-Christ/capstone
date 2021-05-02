import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {SharedService} from 'src/app/shared.service';
import { SkillsComponent } from 'src/app/skills/skills.component';
import { ViewSkillsComponent } from '../view-skills/view-skills.component';

@Component({
  selector: 'app-show-people',
  templateUrl: './show-people.component.html',
  styleUrls: ['./show-people.component.css']
})
export class ShowPeopleComponent implements OnInit {

  //constructor generates service object so the methods can be used
  constructor(private service:SharedService) { }

  //generates generic arrays to be used in the functions
  PeopleList:any=[];
  SkillList:any=[];
  SkillDropList:any=[];
  TaskList:any=[];
  TaskDropList:any=[];

  //generates generic models to be used in the functions
  ModalTitle:string;
  ActivateAddEditPeopleComp:boolean=false;
  ActivateViewSkillsComp:boolean=false;
  ThePersonID:0;
  AssignedToID:0;
  people:any;
  name:any;
  skill:any;
  selectedSkill:any;
  selectedTask:any;

  //generates empty filter strings
  PersonIDFilter:string="";
  NameFilter:string="";
  BirthdayFilter:string="";
  PeopleListWithoutFilter:any=[];

  //refreshes people list and task list when the page is loaded
  ngOnInit(): void {
    this.refreshPeopleList();
    this.refreshTaskList();
  }

  //populates generic people object with empty data necessary to be passed on
  addClick(){
    this.people={
      PersonID:0,
      Name:"",
      Birthday:"",
      Skill:"",
      Task:""
    }
    //sets the modal title to "Add Person" and turns on the Modal Window activator
    this.ModalTitle="Add Person";
    this.ActivateAddEditPeopleComp=true;
  }

  //gets the person id passed, sets the variable to be passed to the API with the neccessary data
  addSkillClick(item){
    this.ThePersonID=item;
    var val={
      PersonID:this.ThePersonID,
      SkillID:this.selectedSkill
    };
    //calls API method and refreshes the lists necessary
    this.service.updatePeopleSkillsList(val).subscribe(data=>{
      this.SkillList=data;
      this.refreshPeopleSkillList(this.ThePersonID);
      this.refreshSkillList(this.ThePersonID);
    });
  }

  //gets the person id passed, sets the variable to be passed to the API with the neccessary data
  addTaskClick(item){
    this.AssignedToID=item;
    var val={
      PersonID:this.ThePersonID,
      Task:this.selectedTask
    };
    //calls API method and refreshes the lists necessary
    this.service.updatePeopleTasksList(val).subscribe(data=>{
      this.TaskList=data;
      this.refreshPeopleTasksList(this.AssignedToID);
    });
  }

  //sets the generic people item to the data passed to it, sets the Modal Window title, 
  //and turns on the Modal Window activator
  editClick(item){
    this.people=item;
    this.ModalTitle="Edit " + this.people.Name;
    this.ActivateAddEditPeopleComp=true;
  }

  //sets the refreshes everything necessary in the view window,
  //sets the modal title, and activates the Modal Window title
  viewClick(item, name){
    this.ThePersonID=item;
    this.name=name;
    this.refreshSkillList(item);
    this.refreshPeopleSkillList(item);
    this.refreshPeopleTasksList(item);
    this.ModalTitle="View Tasks and Skills for "+ this.name;
    this.ActivateViewSkillsComp=true;
  }

  //Turns off the modal window activators and refreshes the list
  closeClick(){
    this.ActivateAddEditPeopleComp=false;
    this.ActivateViewSkillsComp=false;
    this.refreshPeopleList();
  }

  //after confirmation, sends the PersonID to the deletePeople API method
  deleteClick(item){
    if(confirm('Are you sure you want to delete ' + item.Name + '?')){
      this.service.deletePeople(item.PersonID).subscribe(data=>{
        alert(data.toString());
        //refreshes people list with the remaining data
        this.refreshPeopleList();
      });
    }
  }

  //refreshes the list of skills depending on the person selected
  refreshPeopleSkillList(item){
    this.service.getPeopleSkillsList(item).subscribe(data=>{
      this.SkillList=data;
    });
    //sets the skill in the dropdown list to blank
    this.selectedSkill=["ignore"];
  }

  //refreshes the list of skills depending on the person selected
  refreshPeopleTasksList(item){
    this.service.getPeopleTasksList(item).subscribe(data=>{
      this.TaskList=data;
    });
    //sets the task in the dropdown list to blank
    this.selectedTask=["ignore"];
  }

  //sends a get request to the API through the method and retuns the list of people from that method
  refreshPeopleList(){
    this.service.getPeopleList().subscribe(data=>{
      this.PeopleList=data;
      this.PeopleListWithoutFilter=data;
    });
  }

  //refreshes the skill list in the dropdown menu depending on what skills the person already has
  refreshSkillList(item){
    this.service.getSkillsDropList(item).subscribe(data=>{
      this.SkillDropList=data;
    });
  }
  
  //refreshes the list of tasks in the dropdown menu
  refreshTaskList(){
    this.service.getTasksList().subscribe(data=>{
      this.TaskDropList=data;
    });
  }

  //populates the generic empty filter strings to data passed through
  FilterFn(){
    var PersonIDFilter = this.PersonIDFilter;
    var NameFilter = this.NameFilter;
    var BirthdayFilter = this.BirthdayFilter;

    //returns data that matches what is entered in the filter text boxes
    this.PeopleList = this.PeopleListWithoutFilter.filter(function (el){
      return el.PersonID.toString().toLowerCase().includes(
        PersonIDFilter.toString().trim().toLowerCase()
      )&&
      el.Name.toString().toLowerCase().includes(
        NameFilter.toString().trim().toLowerCase()
      )&&
      el.Birthday.toString().toLowerCase().includes(
        BirthdayFilter.toString().trim().toLowerCase()
      )
    });
  }

  //sorts data in the table either ascending or decending
  sortResult(prop,asc){
    this.PeopleList = this.PeopleListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}

