import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-people',
  templateUrl: './add-edit-people.component.html',
  styleUrls: ['./add-edit-people.component.css']
})
export class AddEditPeopleComponent implements OnInit {

  //constructor initializes service object so the methods can be used
  constructor(private service:SharedService) { }

  //creates generic models and generic strings to be passed through the methods
  @Input() people:any;
  PersonID:string;
  Name:string;
  Birthday:string;
  Skill:string;
  Task:string;

  //creates initial person object
  ngOnInit(): void {
    this.PersonID=this.people.PersonID;
    this.Name=this.people.Name;
    this.Birthday=this.people.Birthday;
    this.Skill=this.people.Skill;
    this.Task=this.people.Task;
  }

  //gathers data from the form, sets the val variable to that, and sends it to the API
  //where it gets processed, returning whether or not it was successful
  addPeople(){
    var val = {PersonID:this.PersonID,
                Name:this.Name,
                Birthday:this.Birthday};
    this.service.addPeople(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  //gathers data from the form, sets the val variable to that, and sends it to the API
  //where it gets processed, returning whether or not it was successful
  updatePeople(){
    var val = {PersonID:this.PersonID,
      Name:this.Name,
      Birthday:this.Birthday
      };
    this.service.updatePeople(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
