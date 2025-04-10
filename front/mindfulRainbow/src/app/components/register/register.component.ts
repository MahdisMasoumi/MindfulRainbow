import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import {
  AlertController,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonToolbar,
  IonTitle,
  IonButton,
  IonImg,
  IonFooter,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  lockClosedOutline,
  mailOutline,
  personAddOutline,
  personOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonHeader,
    IonItem,
    IonInput,
    IonButton,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButton,
    IonImg,
    IonFooter,
    IonIcon,
  ],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private alertController: AlertController
  ) {
    addIcons({
      personOutline,
      lockClosedOutline,
      mailOutline,
      personAddOutline,
    });
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    this.userService.createUser(this.registerForm.value).subscribe({
      next: (result) => {
        console.log(result);
        this.presentAlert('User was created successfully');
<<<<<<< HEAD
        this.router.navigate(['/tab1']);
=======
        this.router.navigate(['/tab5']);
>>>>>>> 545b9fb9a32ba8404f27613f02ca3f08c58c6fcd
      },
      error: (err) => {
        console.log(err);
        alert('Registration failed');
      },
    });
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  ngOnInit() {}
}
