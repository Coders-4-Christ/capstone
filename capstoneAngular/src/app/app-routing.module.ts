import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PeopleComponent} from './people/people.component';
import {SkillsComponent} from './skills/skills.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
{path:'people',component:PeopleComponent},
{path:'skills',component:SkillsComponent},
{path:'tasks',component:TasksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
