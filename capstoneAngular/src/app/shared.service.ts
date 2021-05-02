//This file contains the methods that serve as a direct connection to the API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //this creates a read-only variable with the link to the port the API is listening on. This can be changed both here and in the API
  //if you wish to have the API listen on a different port. Ensure it is changed there before this variable is changed.
  readonly APIUrl="http://localhost:5000/api";

  constructor(private http:HttpClient) { }

  //this method sends an HTTP Get request to the PeopleController in the API and returns the full list of data from the query in that method
  getPeopleList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/people');
  }

  //this method sends an HTTP POST request to the PeopleController in the API with the data passed to it and returns either "added successfully" or "failed to add" depending on whether or not it was successful
  addPeople(val:any){
    return this.http.post(this.APIUrl+'/people',val);
  }

  //this method sends an HTTP PUT request to the PeopleController in the API with the data passed to it and returns either "updated successfully" or "failed to update" depending on whether or not it was successful
  updatePeople(val:any){
    return this.http.put(this.APIUrl+'/people',val);
  }

  //This method sends an HTTP DELETE request to the PeopleController in the API with the value passed to it and returns either "deleted successfully" or "failed to delete" depending on whether or not it was successful
  deletePeople(val:any){
    return this.http.delete(this.APIUrl+'/people/'+ val);
  }

  //this method sends an HTTP Get request to the SkillsController in the API and returns the full list of data from the query in that method
  getSkillsList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/skills');
  }

  //this method sends an HTTP POST request to the SkillsController in the API with the data passed to it and returns either "added successfully" or "failed to add" depending on whether or not it was successful
  addSkills(val:any){
    return this.http.post(this.APIUrl+'/skills',val);
  }

  //this method sends an HTTP PUT request to the SkillsController in the API with the data passed to it and returns either "updated successfully" or "failed to update" depending on whether or not it was successful
  updateSkills(val:any){
    return this.http.put(this.APIUrl+'/skills',val);
  }

  //This method sends an HTTP DELETE request to the SkillsController in the API with the value passed to it and returns either "deleted successfully" or "failed to delete" depending on whether or not it was successful
  deleteSkills(val:any){
    return this.http.delete(this.APIUrl+'/skills/'+ val);
  }

  //this method sends an HTTP Get request to the TasksController in the API and returns the full list of data from the query in that method
  getTasksList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/tasks');
  }

  //this method sends an HTTP POST request to the TasksController in the API with the data passed to it and returns either "added successfully" or "failed to add" depending on whether or not it was successful
  addTasks(val:any){
    return this.http.post(this.APIUrl+'/tasks',val);
  }

  //this method sends an HTTP PUT request to the TasksController in the API with the data passed to it and returns either "updated successfully" or "failed to update" depending on whether or not it was successful
  updateTasks(val:any){
    return this.http.put(this.APIUrl+'/tasks',val);
  }

  //This method sends an HTTP DELETE request to the TasksController in the API with the value passed to it and returns either "deleted successfully" or "failed to delete" depending on whether or not it was successful
  deleteTasks(val:any){
    return this.http.delete(this.APIUrl+'/tasks/'+ val);
  }

  //this method sends an HTTP Get request to the UsersController in the API and returns the full list of data from the query in that method
  getUsersList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Users');
  }

  //this method sends an HTTP POST request to the UsersController in the API with the data passed to it and returns either "added successfully" or "failed to add" depending on whether or not it was successful
  addUsers(val:any){
    return this.http.post(this.APIUrl+'/Users',val);
  }

  //this method sends an HTTP PUT request to the UsersController in the API with the data passed to it and returns either "updated successfully" or "failed to update" depending on whether or not it was successful
  updateUsers(val:any){
    return this.http.put(this.APIUrl+'/Users',val);
  }

  //This method sends an HTTP DELETE request to the UsersController in the API with the value passed to it and returns either "deleted successfully" or "failed to delete" depending on whether or not it was successful
  deleteUsers(val:any){
    return this.http.delete(this.APIUrl+'/Users/'+ val);
  }

  //this method sends an HTTP Get request to the PeopleSkillsController in the API and returns the full list of People and the Skills associated with them
  getPeopleSkillsList(val:any){
    return this.http.get(this.APIUrl+'/PeopleSkills/'+ val)
  }

  //this method sends an HTTP Get request to the TasksSkillsController in the API and returns the full list of data People and the Tasks associated with them
  getPeopleTasksList(val:any){
    return this.http.get(this.APIUrl+'/TasksSkills/'+ val)
  }

  //this method sends an HTTP POST request to the PeopleSkillsController in the API with data from the PersonID and SkillID and returns with either "added successfully" or "failed to add" depending on whether or not it was successful
  updatePeopleSkillsList(val:any){
    return this.http.post(this.APIUrl+'/PeopleSkills/',val)
  }

  //this method sends an HTTP POST request to the TasksSkillsController in the API with data from the PersonID and Task and returns with either "added successfully" or "failed to add" depending on whether or not it was successful
  updatePeopleTasksList(val:any){
    return this.http.put(this.APIUrl+'/TasksSkills/' ,val)
  }

  //this method sends an HTTP DELETE request to the PeopleSkillsController in the API with a PeopleSkillID and returns with "deleted successfully" or "failed to delete" depending on whether or not it was successful
  deletePeopleSkillsList(val:any){
    return this.http.delete(this.APIUrl+'/PeopleSkills/'+ val);
  }
}
