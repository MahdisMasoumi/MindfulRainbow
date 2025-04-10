import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  AlertController,
  IonFooter,
  IonImg,
  IonProgressBar,
  IonRange,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-goals-form',
  templateUrl: './goals-form.component.html',
  styleUrls: ['./goals-form.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonButton,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonFooter,
    IonImg,
    IonProgressBar,
    IonRange,
  ],
})
export class GoalsFormComponent implements OnInit {
  goalForm!: FormGroup;
  isEditMode: boolean = false;
  editGoalId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private goalService: GoalsService
  ) {
    this.goalForm = this.formBuilder.group({
      category: ['', Validators.required],
      start_date: ['', Validators.required],
      target_date: ['', Validators.required],
      goal_name: ['', Validators.required],
      milestones: ['', Validators.required],
      summary: ['', Validators.required],
      // completion_status: ['', Validators.required],
    });
    const goalId = this.route.snapshot.paramMap.get('goalId');
    if (goalId) {
      this.isEditMode = true;
      this.editGoalId = parseInt(goalId);
      this.goalService.getGoal(this.editGoalId).subscribe((result) => {
        this.goalForm.patchValue(result);
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateGoal();
    } else {
      this.createGoal();
    }
  }
  createGoal() {
    const formData = this.goalForm.value;
    this.goalService.createGoal(formData).subscribe((result) => {
      console.log(result);
      this.presentAlert('Mood tracker was created successfully');
      this.goalForm.reset();
      this.router.navigate(['/tabs/tab4']);
    });
  }
  updateGoal() {
    const formData = this.goalForm.value;
    this.goalService
      .updateGoal(this.editGoalId, formData)
      .subscribe((result) => {
        console.log(result);
        this.presentAlert('Mood tarcker was updated successfully');
        this.router.navigate(['/tabs/tab4']);
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
