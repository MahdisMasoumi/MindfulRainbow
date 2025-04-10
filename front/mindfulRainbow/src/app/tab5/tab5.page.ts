import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Itherapy } from '../interfaces/itherapy';
import { TherapyService } from '../services/therapy.service';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TherapyComponent } from '../components/therapy/therapy.component';
import { TherapyFormComponent } from '../components/therapy-form/therapy-form.component';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    TherapyComponent,
    TherapyFormComponent,
    IonFooter,
    IonImg,
  ],
})
export class Tab5Page implements OnInit {
  therapy!: Itherapy[];

  constructor(private therapyService: TherapyService, private router: Router) {
    addIcons({ add });
    this.loadtherapy();
  }
  ionViewWillEnter() {
    this.loadtherapy();
  }
  loadtherapy() {
    this.therapyService.getTherapies().subscribe(
      (result) => {
        this.therapy = result;
      },
      (error) => {
        console.error('Failed to load therapys:', error);
      }
    );
  }

  deleteTherapy(therapyId: number) {
    const index = this.therapy.findIndex((therapy) => {
      return therapy.id === therapyId;
    });

    this.therapy.splice(index, 1);

    this.therapyService.deleteTherapy(therapyId).subscribe(
      (result) => {
        alert('therapy was deleted successfully');
      },
      (error) => {
        console.error('Failed to delete therapy:', error);
      }
    );
  }

  ngOnInit() {}
}
