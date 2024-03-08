import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { RainbowRaysComponent } from '../components/rainbow-rays/rainbow-rays.component';
import { RainbowRaysFormComponent } from '../components/rainbow-rays-form/rainbow-rays-form.component';
import { IrainbowRays } from '../interfaces/irainbow-rays';
import { RainbowRaysService } from '../services/rainbow-rays.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
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
    RainbowRaysComponent,
    RainbowRaysFormComponent,
  ],
})
export class Tab3Page implements OnInit {
  rainbowRay!: IrainbowRays[];

  constructor(
    private rainbowRaysService: RainbowRaysService,
    private router: Router
  ) {
    addIcons({ add });
    this.loadRainbowRays();
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.loadRainbowRays();
  }
  loadRainbowRays() {
    this.rainbowRaysService.getRainbowRays().subscribe(
      (result) => {
        this.rainbowRay = result;
      },
      (error) => {
        console.error('Failed to load rainbowRay rainbow rays:', error);
      }
    );
  }

  deleteRainbowRay(rainbowRayId: number) {
    const index = this.rainbowRay.findIndex((rainbowRay) => {
      return rainbowRay.id === rainbowRayId;
    });

    this.rainbowRay.splice(index, 1);

    this.rainbowRaysService.deleteRainbowRay(rainbowRayId).subscribe(
      (result) => {
        alert('Mood tracker was deleted successfully');
      },
      (error) => {
        console.error('Failed to delete mood tracker:', error);
        // Add appropriate error handling here
      }
    );
  }
}
