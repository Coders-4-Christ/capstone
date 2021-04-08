import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-people',
  templateUrl: './add-edit-people.component.html',
  styleUrls: ['./add-edit-people.component.css']
})
export class AddEditPeopleComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() people:any;
  PersonID:string;
  Name:string;
  Birthday:string;

  ngOnInit(): void {
    this.PersonID=this.people.PersonID;
    this.Name=this.people.Name;
    this.Birthday=this.people.Birthday;
  }

  addPeople(){
    var val = {PersonID:this.PersonID,
                Name:this.Name,
                Birthday:this.Birthday};
    this.service.addPeople(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updatePeople(){
    var val = {PersonID:this.PersonID,
      Name:this.Name,
      Birthday:this.Birthday};
    this.service.updatePeople(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
