import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PeopleComponent} from './people/people.component';
import {SkillsComponent} from './skills/skills.component';
import {TasksComponent} from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';


//Creates Routes to each component:
//path:'{pathname}' represents what will be typed in the browser to navigate to that component
//component:{componentName} represents what component that path name represents
const routes: Routes = [
{path:'people',component:PeopleComponent},
{path:'skills',component:SkillsComponent},
{path:'tasks',component:TasksComponent},
{path: 'users',component:UsersComponent}

];


//Imports and exports routing to ensure it works
//{useHash:true} hashes each page so that navigation does not get lost in translation
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
