/**import statements*/
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {

  constructor(private service:SharedService) { }

//Instantiates generic user object as well as the required generic fields to be passed along
  @Input() user:any;
  UserID:string;
  FirstName:string;
  LastName:string;
  UserName:string;
  Passphrase:string;
  
  /**creates user instance*/
  ngOnInit(): void {
    this.UserID=this.user.UserID;
    this.FirstName=this.user.FirstName;
    this.LastName=this.user.LastName;
    this.UserName=this.user.UserName;
    this.Passphrase=this.user.Passphrase;
  }
  // gathers data to send through the addUsers service function and sends it to the API to be handled, giving the alert for whether or not it succeeded
  addUsers(){
    var val = {UserID:this.UserID,
                FirstName:this.FirstName,
                LastName:this.LastName,
                UserName:this.UserName,
                Passphrase:this.Passphrase};
    this.service.addUsers(val).subscribe(res=>{
      alert(res.toString());
    });
  }
 
  //gathers data from the update button to be sent through the updateUsers service function to the API where it gets handled, giving the alert for whether or not it succeeded
  updateUsers(){
    var val = {UserID:this.UserID,
      FirstName:this.FirstName,
      LastName:this.LastName,
      UserName:this.UserName,
      Passphrase:this.Passphrase};
    this.service.updateUsers(val).subscribe(res=>{
    alert(res.toString());
    });
  }
}

