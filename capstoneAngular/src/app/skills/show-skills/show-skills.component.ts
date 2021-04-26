import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.css']
})
export class ShowSkillsComponent implements OnInit {

  constructor(private service:SharedService) { }

  SkillsList:any=[];

  ModalTitle:string;
  ActivateAddEditSkillComp:boolean=false;
  skills:any;

  SkillsIDFilter:string="";
  SkillFilter:string="";
  SkillListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshSkillList();
  }

  addClick(){
    this.skills={
      SkillID:0,
      Skill:"",
    }
    this.ModalTitle="Add Skill";
    this.ActivateAddEditSkillComp=true;
  }

  editClick(item){
    this.skills=item;
    this.ModalTitle="Edit Skill";
    this.ActivateAddEditSkillComp=true;
  }

  closeClick(){
    this.ActivateAddEditSkillComp=false;
    this.refreshSkillList();
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteSkills(item.SkillID).subscribe(data=>{
        alert(data.toString());
        this.refreshSkillList();
      });
    }
  }

  refreshSkillList(){
    this.service.getSkillsList().subscribe(data=>{
      this.SkillsList=data;
      this.SkillListWithoutFilter=data;
    });
  }

  FilterFn(){
    var SkillsIDFilter = this.SkillsIDFilter;
    var SkillFilter = this.SkillFilter;

    this.SkillsList = this.SkillListWithoutFilter.filter(function (el){
      return el.SkillID.toString().toLowerCase().includes(
        SkillsIDFilter.toString().trim().toLowerCase()
      )&&
      el.Skill.toString().toLowerCase().includes(
        SkillFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop,asc){
    this.SkillsList = this.SkillListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
