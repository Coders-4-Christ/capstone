import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  //the constructor instantiates a service instance so those methods can be used
  constructor(private service:SharedService) { }

  //creates a generic array to store data from the list of users
  UserList:any=[];

  //creates a generic string to store the title of the modal window in
  ModalTitle:string;

  //creates a boolean that acts as an activator for the modal window
  ActivateAddEditUsersComp:boolean=false;

  //creates a generic user object
  user:any;

  //creates empty strings to store data to be used in the filters
  UserIDFilter:string="";
  FirstNameFilter:string="";
  LastNameFilter:string="";
  UserListWithoutFilter:any=[];

  //refreshes the table shown when the page is opened
  ngOnInit(): void {
    this.refreshUserList();
  }

  //creates a user object and adds the blank attributes required to be sent to the API
  addClick(){
    this.user={
      UserID:0,
      FirstName:"",
      LastName:"",
      UserName:"",
      Passphrase:""
    }

    //sets the title of the modal window
    this.ModalTitle="Add User";

    //sets the activator boolean to true
    this.ActivateAddEditUsersComp=true;
  }

  //takes the populated user item from the table and places it into a modal window with the title "Edit User"
  editClick(item){
    this.user=item;
    this.ModalTitle="Edit User";
    this.ActivateAddEditUsersComp=true;
  }

  //turns the activtor boolean off and refreshes the table
  closeClick(){
    this.ActivateAddEditUsersComp=false;
    this.refreshUserList();
  }

  //Picks up UserID from the table and sends it to the service method deleteUsers, which deletes the object
  deleteClick(item){
    if(confirm('Are you sure you want to delete this?')){
      this.service.deleteUsers(item.UserID).subscribe(data=>{
        alert(data.toString());

        //refreshes the table with the remaining data
        this.refreshUserList();
      });
    }
  }

  //this method is used to refresh the data in the Users Table on the page
  refreshUserList(){
    //calls the service method "getUsersList" and subscribes it to the generic UserList object and the UserListWithoutFilter object
    this.service.getUsersList().subscribe(data=>{
      this.UserList=data;
      this.UserListWithoutFilter=data;
    });
  }

  //function used to filter data based on a textbox
  FilterFn(){
    //sets variables
    var UserIDFilter = this.UserIDFilter;
    var FirstNameFilter = this.FirstNameFilter;
    var LastNameFilter = this.LastNameFilter;

    //sets the generic user list to the unfiltered list so data is not lost, then applies a filter to it and returns that data in the table (same is done with UserID, FirstName, and LastName)
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

  //this method is used to sort the data either ascending or decending in each column
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
