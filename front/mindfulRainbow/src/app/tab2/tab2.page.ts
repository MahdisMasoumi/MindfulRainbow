import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonImg,
  IonApp,
  IonMenu,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MentalTrackerComponent } from 'src/app/components/mental-tracker/mental-tracker.component';

import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { ImentalTracker } from '../interfaces/imental-tracker';
import { MentalTrackerService } from '../services/mental-tracker.service';
import { add } from 'ionicons/icons';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterLink,
    IonCard,
    IonImg,
    IonApp,
    IonMenu,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
    MentalTrackerComponent,
  ],
})
export class Tab2Page {
  mentals!: ImentalTracker[];

  constructor(
    private mentalTrackerService: MentalTrackerService,
    private router: Router
  ) {
    addIcons({ add });
    this.loadMentalTrackers();
  }
  ionViewWillEnter() {
    this.loadMentalTrackers();
  }
  loadMentalTrackers() {
    this.mentalTrackerService.getMentalTrackers().subscribe(
      (result) => {
        this.mentals = result;
      },
      (error) => {
        console.error('Failed to load mental trackers:', error);
      }
    );
  }

  deleteMentalTracker(moodTrackingId: number) {
    const index = this.mentals.findIndex((mentalTracker) => {
      return mentalTracker.id === moodTrackingId;
    });

    this.mentals.splice(index, 1);

    this.mentalTrackerService.deleteMentalTracker(moodTrackingId).subscribe(
      (result) => {
        alert('Mood tracker was deleted successfully');
      },
      (error) => {
        console.error('Failed to delete mood tracker:', error);
        // Add appropriate error handling here
      }
    );
  }

  ngOnInit() {}
}
