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

  @Input() SkillList:any=[];
  @Input() TaskList:any=[];

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

  refreshPeopleSkillList(item){
    this.service.getPeopleSkillsList(item).subscribe(data=>{
      this.SkillList=data;
    });
    this.selectedSkill=["ignore"]
  }


  deletePSClick(item, ThePersonID, selectedSkill){
    //this.refreshPeopleSkillList(ThePersonID);
    this.PersonSkillID=item;
    this.selectedSkill=selectedSkill;
    if(confirm('Are you sure you want to remove '+ this.selectedSkill +'?')){
      this.service.deletePeopleSkillsList(item).subscribe(data=>{
        alert(data.toString());
      });
    }
    //this.selectedSkill=["ignore"];
    this.refreshPeopleSkillList(ThePersonID);
  }
}
