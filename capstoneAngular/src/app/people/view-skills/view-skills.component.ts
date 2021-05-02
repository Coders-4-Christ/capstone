import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ShowSkillsComponent } from 'src/app/skills/show-skills/show-skills.component';
import { ShowPeopleComponent } from '../show-people/show-people.component';

@Component({
  selector: 'app-view-skills',
  templateUrl: './view-skills.component.html',
  styleUrls: ['./view-skills.component.css']
})
export class ViewSkillsComponent implements OnInit {

  constructor(private service:SharedService) {
   }

   //generates generic list of tasks and skills
  @Input() SkillList:any=[];
  @Input() TaskList:any=[];


  //generates generic variables to be passed through the methods
  ThePersonID:any;
  currentSkill:any;
  Task:string;
  PersonSkillID:any;
  PersonTask:any;
  TaskDropList:any=[];
  selectedSkill:any;
  SkillDropList:any=[];


  ngOnInit(): void {
  }

  //refreshes the list of skills associated with the selected person
  refreshPeopleSkillList(item){
    this.service.getSkillsDropList(item).subscribe(data=>{
      this.SkillList=data;
    });
    //sets the selected skill in the dropdown to blank
    this.selectedSkill=["ignore"]
  }

//sets the generic models above to the data passed to the function, 
//confirms to delete, and sends the PersonSkill ID to the API to get handeled
  deletePSClick(item, ThePersonID, selectedSkill){
    this.ThePersonID=ThePersonID;
    this.PersonSkillID=item;
    this.selectedSkill=selectedSkill;
    if(confirm('Are you sure you want to remove '+ this.selectedSkill +'?')){
      this.service.deletePeopleSkillsList(item).subscribe(data=>{
        alert(data.toString());
        this.refreshPeopleSkillList(this.ThePersonID);
      });
    }
  }
}
