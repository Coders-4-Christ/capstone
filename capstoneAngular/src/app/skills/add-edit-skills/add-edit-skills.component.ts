import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.css']
})
export class AddEditSkillsComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() skills:any;
  SkillID:string;
  Skill:string;

  ngOnInit(): void {
    this.SkillID=this.skills.SkillID;
    this.Skill=this.skills.Skill;
  }

  addSkills(){
    var val = {SkillID:this.SkillID,
                Skill:this.Skill};
    this.service.addSkills(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateSkills(){
    var val = {SkillID:this.SkillID,
      Skill:this.Skill};
    this.service.updateSkills(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
