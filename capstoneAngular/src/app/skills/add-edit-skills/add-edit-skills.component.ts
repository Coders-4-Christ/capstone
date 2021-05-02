import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.css']
})
export class AddEditSkillsComponent implements OnInit {

  //constructor creates a service instance so that the methods can be used
  constructor(private service:SharedService) { }

  //creates generic skills object and the necessary generic fields
  @Input() skills:any;
  SkillID:string;
  Skill:string;

  //instantiates a skill object
  ngOnInit(): void {
    this.SkillID=this.skills.SkillID;
    this.Skill=this.skills.Skill;
  }

  //gathers data from the form and sends it through the addSkills function to the API to be processed. Returns whether or not it was successful
  addSkills(){
    var val = {SkillID:this.SkillID,
                Skill:this.Skill};
    this.service.addSkills(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  //gathers data from the form and sends it through the updateSkills function to the API to be processed. Returns whether or not it was successful
  updateSkills(){
    var val = {SkillID:this.SkillID,
      Skill:this.Skill};
    this.service.updateSkills(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
