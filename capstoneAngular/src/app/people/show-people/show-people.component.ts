import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
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
  TaskList:any=[];

  ModalTitle:string;
  ActivateAddEditPeopleComp:boolean=false;
  ActivateViewSkillsComp:boolean=false;
  ThePersonID:0;
  people:any;

  PersonIDFilter:string="";
  NameFilter:string="";
  BirthdayFilter:string="";
  SkillFilter:string="";
  TaskFilter:string="";
  PeopleListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshPeopleList();
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

  editClick(item){
    this.people=item;
    this.ModalTitle="Edit Person";
    this.ActivateAddEditPeopleComp=true;
  }

  viewClick(item){
    this.refreshSkillList(item);
    this.refreshTaskList(item);
    this.ThePersonID=item;
    this.ModalTitle="View Tasks and Skills";
    this.ActivateViewSkillsComp=true;
  }

  closeClick(){
    this.ActivateAddEditPeopleComp=false;
    this.ActivateViewSkillsComp=false;
    this.refreshPeopleList();
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deletePeople(item.PersonID).subscribe(data=>{
        alert(data.toString());
        this.refreshPeopleList();
      });
    }
  }

refreshSkillList(item){
  this.service.getPeopleSkillsList(item).subscribe(data=>{
    this.SkillList=data;
  });
}

refreshTaskList(item){
  this.service.getTaskSkillsList(item).subscribe(data=>{
    this.TaskList=data;
  });
}

  refreshPeopleList(){
    this.service.getPeopleList().subscribe(data=>{
      this.PeopleList=data;
      this.PeopleListWithoutFilter=data;
    });
  }

  FilterFn(){
    var PersonIDFilter = this.PersonIDFilter;
    var NameFilter = this.NameFilter;
    var BirthdayFilter = this.BirthdayFilter;
    var SkillFilter = this.SkillFilter;
    var TaskFilter = this.TaskFilter;

    this.PeopleList = this.PeopleListWithoutFilter.filter(function (el){
      return el.PersonID.toString().toLowerCase().includes(
        PersonIDFilter.toString().trim().toLowerCase()
      )&&
      el.Name.toString().toLowerCase().includes(
        NameFilter.toString().trim().toLowerCase()
      )&&
      el.Birthday.toString().toLowerCase().includes(
        BirthdayFilter.toString().trim().toLowerCase()
      )&&
      el.Skill.toString().toLowerCase().includes(
        SkillFilter.toString().trim().toLowerCase()
      )&&
      el.Task.toString().toLowerCase().includes(
        TaskFilter.toString().trim().toLowerCase()
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

