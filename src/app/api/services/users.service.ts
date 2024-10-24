import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import usersData from '../order-master-dp/users.json';
import { User } from './orders-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(usersData);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() {
    // Initialize users from JSON file
    this.usersSubject.next(usersData);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: string): User | undefined {
    const users = this.usersSubject.getValue();
    return users.find(user => user.Id === id);
  }

  addUser(user: User): void {
    const users = this.usersSubject.getValue();
    users.push(user);
    this.usersSubject.next(users);
  }

  editUser(updatedUser: User): void {
    const users = this.usersSubject.getValue();
    const index = users.findIndex(user => user.Id === updatedUser.Id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.usersSubject.next(users);
    }
  }

  deleteUser(id: string): void {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.filter(user => user.Id !== id);
    this.usersSubject.next(updatedUsers);
  }
}