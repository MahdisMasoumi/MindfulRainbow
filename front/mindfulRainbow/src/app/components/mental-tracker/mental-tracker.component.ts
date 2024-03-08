import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonInput,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
  IonRange,
  IonImg,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImentalTracker } from 'src/app/interfaces/imental-tracker';
import { CommonModule } from '@angular/common';
import { add, archive, createOutline, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-mental-tracker',
  templateUrl: './mental-tracker.component.html',
  styleUrls: ['./mental-tracker.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    RouterLink,
    IonInput,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonCardTitle,
    IonCardSubtitle,
    IonRange,
    IonImg
  ],
})
export class MentalTrackerComponent {
  constructor(private route: ActivatedRoute) {
    addIcons({ add, trash, createOutline });
  }
  @Input() moodTracking!: ImentalTracker;
  @Output() deleteEvent = new EventEmitter();

  ngOnChanges(value: SimpleChanges) {
    console.log('change');
  }

  onDelete() {
    console.log('onDelete method called');
    if (confirm('Are you sure you want to delete this mental')) {
      this.deleteEvent.emit(this.moodTracking.id);
    }
  }
}
