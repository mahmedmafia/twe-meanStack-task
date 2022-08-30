import { Component, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users:User[]=[];
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.users=this.userService.getUsers();
  }

}
