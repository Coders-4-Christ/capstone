import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { ShowPeopleComponent } from './people/show-people/show-people.component';
import { AddEditPeopleComponent } from './people/add-edit-people/add-edit-people.component';
import { SkillsComponent } from './skills/skills.component';
import { ShowSkillsComponent } from './skills/show-skills/show-skills.component';
import { AddEditSkillsComponent } from './skills/add-edit-skills/add-edit-skills.component';
import { TasksComponent } from './tasks/tasks.component';
import { ShowTasksComponent } from './tasks/show-tasks/show-tasks.component';
import { AddEditTasksComponent } from './tasks/add-edit-tasks/add-edit-tasks.component';
import { SharedService } from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';
import { AddEditUsersComponent } from './users/add-edit-users/add-edit-users.component';
import { ShowUsersComponent } from './users/show-users/show-users.component';
import { LoginComponent } from './login/login.component';
import { ViewSkillsComponent } from './people/view-skills/view-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    ShowPeopleComponent,
    AddEditPeopleComponent,
    SkillsComponent,
    ShowSkillsComponent,
    AddEditSkillsComponent,
    TasksComponent,
    ShowTasksComponent,
    AddEditTasksComponent,
    UsersComponent,
    AddEditUsersComponent,
    ShowUsersComponent,
    LoginComponent,
    ViewSkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
