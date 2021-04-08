import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="http://localhost:55659/api";

  constructor(private http:HttpClient) { }

  getPeopleList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/people');
  }

  addPeople(val:any){
    return this.http.post(this.APIUrl+'/people',val);
  }

  updatePeople(val:any){
    return this.http.put(this.APIUrl+'/people',val);
  }

  deletePeople(val:any){
    return this.http.delete(this.APIUrl+'/people/'+ val);
  }

  getSkillsList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/skills');
  }

  addSkills(val:any){
    return this.http.post(this.APIUrl+'/skills',val);
  }

  updateSkills(val:any){
    return this.http.put(this.APIUrl+'/skills',val);
  }

  deleteSkills(val:any){
    return this.http.delete(this.APIUrl+'/skills/'+ val);
  }

  getTasksList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/tasks');
  }

  addTasks(val:any){
    return this.http.post(this.APIUrl+'/tasks',val);
  }

  updateTasks(val:any){
    return this.http.put(this.APIUrl+'/tasks',val);
  }

  deleteTasks(val:any){
    return this.http.delete(this.APIUrl+'/tasks/'+ val);
  }
}
