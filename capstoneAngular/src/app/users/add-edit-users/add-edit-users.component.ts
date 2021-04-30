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

  /**creates user object*/
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
  /**adds user*/
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
  /**updates user*/
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

