import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser =  {
    userName: '',
    password: '',
    password2: ''
  };
  warning: string;
  success: boolean = false;
  loading: boolean = false;

  registerSubscription: Subscription;

  constructor(private authService: AuthService) {}

  onSubmit(f:NgForm): void {
    console.log(this.registerUser)

    // if (
    //   this.registerUser.userName != '' &&
    //   this.registerUser.password == this.registerUser.password2
    // ) {
    //   this.loading = true;
    //   this.registerSubscription = this.authService
    //     .register(this.registerUser)
    //     .subscribe(
    //       () => {

    //         this.success = true;
    //         this.warning = '';
    //         this.loading = false;
    //       },
    //       (err) => {
    //         console.log(err)
    //         this.success = false;
    //         // this.warning = err.error.message;
    //         this.loading = false;
    //       }
    //     );
    // } else {
    //   this.warning = 'Passwords dont match.';
    // }

    if (
      this.registerUser.password &&
      this.registerUser.password == this.registerUser.password2
    ) {
      this.loading = true;
      this.authService.register(this.registerUser).subscribe(
        () => {
          this.success = true;
          this.loading = false;
          this.warning = null;
        },
        (error) => {
          this.success = false;
          this.loading = false;
          this.warning = error.error.message;
        }
      );
    } else {
      this.warning = 'Passwords do not match.';
    }
  }

  ngOnInit(): void {}
}
