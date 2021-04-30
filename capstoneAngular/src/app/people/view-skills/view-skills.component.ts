import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-view-skills',
  templateUrl: './view-skills.component.html',
  styleUrls: ['./view-skills.component.css']
})
export class ViewSkillsComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() SkillList:any=[];
  @Input() TaskList:any=[];

  people:any;
  PersonID:string;
  Skill:string;
  Task:string;

  ngOnInit(): void {
  }
}
