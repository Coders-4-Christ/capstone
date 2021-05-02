/**import statements*/
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  constructor(private service:SharedService) { }
   /**creates array of users */
  UserList:any=[];

  ModalTitle:string;
  ActivateAddEditUsersComp:boolean=false;
  user:any;

  UserIDFilter:string="";
  FirstNameFilter:string="";
  LastNameFilter:string="";
  UserListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshUserList();
  }
   /**click event for adding user */
  addClick(){
    this.user={
      UserID:0,
      FirstName:"",
      LastName:"",
      UserName:"",
      Passphrase:""
    }
    this.ModalTitle="Add User";
    this.ActivateAddEditUsersComp=true;
  }
  /**click event for editing user */
  editClick(item){
    this.user=item;
    this.ModalTitle="Edit User";
    this.ActivateAddEditUsersComp=true;
  }
  /**click event to close window */
  closeClick(){
    this.ActivateAddEditUsersComp=false;
    this.refreshUserList();
  }
  /**deletes user */
  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteUsers(item.UserID).subscribe(data=>{
        alert(data.toString());
        this.refreshUserList();
      });
    }
  }
  /**refreshes list of users with updated information */
  refreshUserList(){
    this.service.getUsersList().subscribe(data=>{
      this.UserList=data;
      this.UserListWithoutFilter=data;
    });
  }
  /**toggles filter */
  FilterFn(){
    var UserIDFilter = this.UserIDFilter;
    var FirstNameFilter = this.FirstNameFilter;
    var LastNameFilter = this.LastNameFilter;

    this.UserList = this.UserListWithoutFilter.filter(function (el){
      return el.UserID.toString().toLowerCase().includes(
        UserIDFilter.toString().trim().toLowerCase()
      )&&
      el.FirstName.toString().toLowerCase().includes(
        FirstNameFilter.toString().trim().toLowerCase()
      )&&
      el.LastName.toString().toLowerCase().includes(
        LastNameFilter.toString().trim().toLowerCase()
      )
    });
  }
  /**sorts results list */
  sortResult(prop,asc){
    this.UserList = this.UserListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
