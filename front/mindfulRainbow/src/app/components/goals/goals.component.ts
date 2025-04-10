import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, createOutline, trash } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { Igoals } from 'src/app/interfaces/igoals';
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
  IonProgressBar,
  IonRange,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
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
    IonProgressBar,
    IonRange,
  ],
})
export class GoalsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    addIcons({ add, trash, createOutline });
  }
  @Input() goal!: Igoals;
  @Output() deleteEvent = new EventEmitter();

  ngOnChanges(value: SimpleChanges) {
    console.log('change');
  }

  onDelete() {
    console.log('onDelete method called');
    if (confirm('Are you sure you want to delete this mental')) {
      this.deleteEvent.emit(this.goal.id);
    }
  }

  ngOnInit() {}
}
