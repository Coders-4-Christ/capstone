import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.css']
})
export class ShowSkillsComponent implements OnInit {

  //constructor creates a service instance so that the methods can be used
  constructor(private service:SharedService) { }

  //creates a generic array for the list of skills
  SkillsList:any=[];

  //creates a generic variable for the modal title, Modal Activation boolean, and a generic skills object
  ModalTitle:string;
  ActivateAddEditSkillComp:boolean=false;
  skills:any;

  //creates empty filter strings to be used by the filter function
  SkillsIDFilter:string="";
  SkillFilter:string="";
  SkillListWithoutFilter:any=[];

  //refreshes the skills table when the page is loaded
  ngOnInit(): void {
    this.refreshSkillList();
  }

  //populates the generic skills object with the necessary empty fields
  addClick(){
    this.skills={
      SkillID:0,
      Skill:"",
    }
    //sets the modal window title to "Add Skill" and turns on the modal window activator
    this.ModalTitle="Add Skill";
    this.ActivateAddEditSkillComp=true;
  }

  //populates the generic skills object with items passed into the function by the form, sets the modal title to "Edit Skill" and turns on the modal window activator
  editClick(item){
    this.skills=item;
    this.ModalTitle="Edit Skill";
    this.ActivateAddEditSkillComp=true;
  }

  //turns off the modal window activator and refreshes the skill table
  closeClick(){
    this.ActivateAddEditSkillComp=false;
    this.refreshSkillList();
  }

  //after asking for confirmation, sends the SkillID through the deleteSkills service function to get handled by the API and returns whether or not it succeeded
  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteSkills(item.SkillID).subscribe(data=>{
        alert(data.toString());

        //refreshes the Skill table with the remaining data
        this.refreshSkillList();
      });
    }
  }

  //refreshes the skill table by sending a request to the API
  refreshSkillList(){
    this.service.getSkillsList().subscribe(data=>{
      this.SkillsList=data;
      this.SkillListWithoutFilter=data;
    });
  }

  //creates variables and populates them with the filter data
  FilterFn(){
    var SkillsIDFilter = this.SkillsIDFilter;
    var SkillFilter = this.SkillFilter;

    //returns any data in the table that matches what was typed into each filter text box
    this.SkillsList = this.SkillListWithoutFilter.filter(function (el){
      return el.SkillID.toString().toLowerCase().includes(
        SkillsIDFilter.toString().trim().toLowerCase()
      )&&
      el.Skill.toString().toLowerCase().includes(
        SkillFilter.toString().trim().toLowerCase()
      )
    });
  }

  //sorts the data in each field either ascending or descending
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
