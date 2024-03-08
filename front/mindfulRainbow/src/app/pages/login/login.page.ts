import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronForward,
  lockClosedOutline,
  mailOutline,
  personOutline,
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from 'src/app/components/register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    RegisterComponent,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    addIcons({ personOutline, lockClosedOutline, chevronForward, mailOutline });
  }
  login() {
    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (result) => {
        localStorage.setItem('auth_token', result.token); //Saves the token to our web browser local storage
        alert('Login was successful');
        this.router.navigate(['/tabs/tab1']);
      },
      error: (err) => {
        console.log(err);
        alert('Login failed');
      },
    });
  }

  ngOnInit() {}
}
