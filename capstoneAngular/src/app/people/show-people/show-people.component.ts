import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-people',
  templateUrl: './show-people.component.html',
  styleUrls: ['./show-people.component.css']
})
export class ShowPeopleComponent implements OnInit {

  constructor(private service:SharedService) { }

  PeopleList:any=[];

  ModalTitle:string;
  ActivateAddEditPeopleComp:boolean=false;
  people:any;

  PersonIDFilter:string="";
  NameFilter:string="";
  BirthdayFilter:string="";
  PeopleListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshPeopleList();
  }

  addClick(){
    this.people={
      PersonID:0,
      Name:"",
      Birthday:""
    }
    this.ModalTitle="Add Person";
    this.ActivateAddEditPeopleComp=true;
  }

  editClick(item){
    this.people=item;
    this.ModalTitle="Edit Person";
    this.ActivateAddEditPeopleComp=true;
  }

  closeClick(){
    this.ActivateAddEditPeopleComp=false;
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
