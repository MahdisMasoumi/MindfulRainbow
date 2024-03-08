import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class WelcomePagePage implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {
    addIcons({ chevronForward });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (result) => {
        localStorage.setItem('auth_token', result.token);
        alert('Login was successful');
        this.router.navigate(['/tabs/tab2']);
      },
      error: (err) => {
        console.log(err);
        alert('Login failed');
      },
    });
  }
  ngOnInit() {}
}
