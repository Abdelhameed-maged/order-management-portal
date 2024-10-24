import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/api/services/users.service';
import { User } from 'src/app/api/services/orders-service.service';
import { Router } from '@angular/router';
import { WizardService } from '../../services/wizard.service';
import { OrderWizardService } from 'src/app/api/services/order-wizard.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  userForm!: FormGroup;
  users: User[] = [];
  selectedUser!: User;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private orderWizardService: OrderWizardService,
    private wizardService: WizardService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onUserSelect(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const user = target ? this.users.find(u => u.Id === target.value) : undefined;
    if (user) {
      this.selectedUser = user;
      this.userForm.patchValue({
        name: user.Name,
        email: user.Email,
        phone: user.Phone,
        address: user.Address
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        Id: this.selectedUser ? this.selectedUser.Id : new Date().getTime().toString(),
        Name: this.userForm.value.name,
        Email: this.userForm.value.email,
        Phone: this.userForm.value.phone,
        Address: this.userForm.value.address,
        RegisterDate: this.selectedUser ? this.selectedUser.RegisterDate : new Date().toISOString()
      };

      if (!this.selectedUser) {
        this.usersService.addUser(user);
      }

      this.orderWizardService.setUser(user.Id);
      this.wizardService.setStepCompleted('personalInformation');
      this.router.navigate(['/order-wizard/payment-method']);
    }
  }
}