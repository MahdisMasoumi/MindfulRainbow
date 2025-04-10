import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trash } from 'ionicons/icons';
import { IrainbowRays } from 'src/app/interfaces/irainbow-rays';

@Component({
  selector: 'app-rainbow-rays',
  templateUrl: './rainbow-rays.component.html',
  styleUrls: ['./rainbow-rays.component.scss'],
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
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonCardTitle,
    IonCardSubtitle,
  ],
})
export class RainbowRaysComponent {
  constructor(private route: ActivatedRoute) {
    addIcons({ add, trash, createOutline });
  }
  @Input() rainbowRay!: IrainbowRays;
  @Output() deleteEvent = new EventEmitter(); //creating a custom event

  ngOnChanges(value: SimpleChanges) {
    console.log('ngOnChanges', value);
  }

  onDelete() {
    console.log('onDelete method called');
    if (confirm('Are you sure you want to delete this rainbowRays')) {
      this.deleteEvent.emit(this.rainbowRay.id); //trigger the deleteEvent
    }
  }
}
