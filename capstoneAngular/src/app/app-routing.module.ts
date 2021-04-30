import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PeopleComponent} from './people/people.component';
import {SkillsComponent} from './skills/skills.component';
import {TasksComponent} from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
{path:'people',component:PeopleComponent},
{path:'skills',component:SkillsComponent},
{path:'tasks',component:TasksComponent},
{path: 'users',component:UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
