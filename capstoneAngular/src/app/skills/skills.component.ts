import { Component, OnInit } from '@angular/core';

/* Link to CSS and HTML files */
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
/* OnInit is called after Angular has initialized all data-bound properties of a directive and handles additional initialization tasks*/
export class SkillsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
