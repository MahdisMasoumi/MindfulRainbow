import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonSearchbar,
  SearchbarInputEventDetail,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonFooter,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Iuser } from '../interfaces/iuser';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonRow,
    IonCol,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    RegisterComponent,
    IonImg,
    IonSearchbar,
    CommonModule,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonFooter,
  ],
})
export class Tab1Page implements OnInit {
  ngOnInit() {}

  profile!: Iuser;
  today = Date.now();

  constructor(private usersService: UsersService) {
    usersService.getProfile().subscribe((result) => {
      this.profile = result;
    });
  }
}

// handleInput(event: CustomEvent<SearchbarInputEventDetail>) {
//   const query = (event.detail.value || '').toLowerCase();
//   // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
// }
