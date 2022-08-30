import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    { name: 'farid', rank: 2 },
    { name: 'sad', rank: 3 },
    { name: 'fad', rank: 1 },
    { name: 'ah', rank: 6 },
    { name: 'ss', rank: 4 },
    { name: 'a', rank: 8 },
    { name: 'ss', rank: 5 },
    { name: 'zz', rank: 7 },

  ]
  constructor() { }
  getUsers() {
    return this.users;
  }
  addUser(name:string,rank:number){
    this.users.push({name,rank});
  }

}
export interface User {
  name: string;
  rank: number;
}
