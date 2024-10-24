import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from './orders-service.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', (done: DoneFn) => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should get user by ID', () => {
    const user = service.getUserById('1223-1223-1231');
    expect(user).toBeTruthy();
    expect(user?.Name).toBe('John Emad Peter');
  });

  it('should add a new user', (done: DoneFn) => {
    const newUser: User = {
      Id: '9999-9999-9999',
      Name: 'New User',
      Email: 'newuser@example.com',
      Phone: '0123456789',
      Address: '123 New Street, New City',
      RegisterDate: new Date().toISOString()
    };
    service.addUser(newUser);
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.Id === '9999-9999-9999');
      expect(user).toBeTruthy();
      expect(user?.Name).toBe('New User');
      done();
    });
  });

  it('should edit an existing user', (done: DoneFn) => {
    const updatedUser: User = {
      Id: '1223-1223-1231',
      Name: 'Updated Name',
      Email: 'updatedemail@example.com',
      Phone: '0987654321',
      Address: 'Updated Address',
      RegisterDate: new Date().toISOString()
    };
    service.editUser(updatedUser);
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.Id === '1223-1223-1231');
      expect(user).toBeTruthy();
      expect(user?.Name).toBe('Updated Name');
      done();
    });
  });

  it('should delete a user', (done: DoneFn) => {
    service.deleteUser('1223-1223-1231');
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.Id === '1223-1223-1231');
      expect(user).toBeUndefined();
      done();
    });
  });
});