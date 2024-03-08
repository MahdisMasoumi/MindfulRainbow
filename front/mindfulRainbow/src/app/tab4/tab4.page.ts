import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Igoals } from '../interfaces/igoals';
import { GoalsService } from '../services/goals.service';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { GoalsComponent } from '../components/goals/goals.component';
import { GoalsFormComponent } from '../components/goals-form/goals-form.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
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
    GoalsComponent,
    GoalsFormComponent,
  ],
})
export class Tab4Page implements OnInit {
  goal!: Igoals[];

  constructor(private goalService: GoalsService, private router: Router) {
    addIcons({ add });
    this.loadGoals();
  }
  ionViewWillEnter() {
    this.loadGoals();
  }
  loadGoals() {
    this.goalService.getGoals().subscribe(
      (result) => {
        this.goal = result;
      },
      (error) => {
        console.error('Failed to load goals:', error);
      }
    );
  }

  deleteGoal(goalId: number) {
    const index = this.goal.findIndex((goal) => {
      return goal.id === goalId;
    });

    this.goal.splice(index, 1);

    this.goalService.deleteGoal(goalId).subscribe(
      (result) => {
        alert('goal was deleted successfully');
      },
      (error) => {
        console.error('Failed to delete goal:', error);
      }
    );
  }

  ngOnInit() {}
}
