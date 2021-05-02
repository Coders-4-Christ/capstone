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

  constructor(private service:SharedService) { }

  PeopleList:any=[];
  SkillList:any=[];
  SkillDropList:any=[];
  TaskList:any=[];
  TaskDropList:any=[];

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

  PersonIDFilter:string="";
  NameFilter:string="";
  BirthdayFilter:string="";
  PeopleListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshPeopleList();
    this.refreshSkillList();
    this.refreshTaskList();
  }

  addClick(){
    this.people={
      PersonID:0,
      Name:"",
      Birthday:"",
      Skill:"",
      Task:""
    }
    this.ModalTitle="Add Person";
    this.ActivateAddEditPeopleComp=true;
  }

  addSkillClick(item){
    this.ThePersonID=item;
    var val={
      PersonID:this.ThePersonID,
      SkillID:this.selectedSkill
    };
    this.service.updatePeopleSkillsList(val).subscribe(data=>{
      this.SkillList=data;
    });
    this.refreshPeopleSkillList(this.ThePersonID);
  }

  addTaskClick(item){
    this.AssignedToID=item;
    var val={
      PersonID:this.ThePersonID,
      Task:this.selectedTask
    }
    this.service.updatePeopleTasksList(val).subscribe(data=>{
      this.TaskList=data;
    });
    this.refreshPeopleTasksList(this.AssignedToID)
  }

  editClick(item){
    this.people=item;
    this.ModalTitle="Edit " + this.people.Name;
    this.ActivateAddEditPeopleComp=true;
  }

  viewClick(item, name){
    this.ThePersonID=item;
    this.name=name;
    this.refreshPeopleSkillList(item);
    this.refreshPeopleTasksList(item);
    this.ModalTitle="View Tasks and Skills for "+ this.name;
    this.ActivateViewSkillsComp=true;
  }

  closeClick(){
    this.ActivateAddEditPeopleComp=false;
    this.ActivateViewSkillsComp=false;
    this.refreshPeopleList();
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete ' + item.Name + '?')){
      this.service.deletePeople(item.PersonID).subscribe(data=>{
        alert(data.toString());
        this.refreshPeopleList();
      });
    }
  }

  refreshPeopleSkillList(item){
    this.service.getPeopleSkillsList(item).subscribe(data=>{
      this.SkillList=data;
    });
    this.selectedSkill=["ignore"];
  }

  refreshPeopleTasksList(item){
    this.service.getPeopleTasksList(item).subscribe(data=>{
      this.TaskList=data;
    });
    this.selectedTask=["ignore"];
  }


  refreshPeopleList(){
    this.service.getPeopleList().subscribe(data=>{
      this.PeopleList=data;
      this.PeopleListWithoutFilter=data;
    });
  }

  refreshSkillList(){
    this.service.getSkillsList().subscribe(data=>{
      this.SkillDropList=data;
    });
  }
  
  refreshTaskList(){
    this.service.getTasksList().subscribe(data=>{
      this.TaskDropList=data;
    });
  }

  FilterFn(){
    var PersonIDFilter = this.PersonIDFilter;
    var NameFilter = this.NameFilter;
    var BirthdayFilter = this.BirthdayFilter;

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

