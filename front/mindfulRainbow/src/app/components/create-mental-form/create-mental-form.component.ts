import { Component } from '@angular/core';
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
  IonRange,
  IonFooter,
  IonImg,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { MentalTrackerService } from 'src/app/services/mental-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-mental-form',
  templateUrl: './create-mental-form.component.html',
  styleUrls: ['./create-mental-form.component.scss'],
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
    IonRange,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonFooter,
    IonImg,
  ],
})
export class CreateMentalFormComponent {
  mentalForm: FormGroup;
  isEditMode: boolean = false;
  editMentalTrackerId: number = 0;
  intensity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private mentalService: MentalTrackerService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.mentalForm = this.formBuilder.group({
      emoji_img: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['', Validators.required],
      intensity: ['', Validators.required],
    });
    const mentalTrackerId = this.route.snapshot.paramMap.get('moodTrackingId');
    if (mentalTrackerId) {
      this.isEditMode = true;
      this.editMentalTrackerId = parseInt(mentalTrackerId);
      this.mentalService
        .getMentalTracker(this.editMentalTrackerId)
        .subscribe((result) => {
          this.mentalForm.patchValue(result);
        });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateMentalTracker();
    } else {
      this.createMentalTracker();
    }
  }
  createMentalTracker() {
    const formData = this.mentalForm.value;
    this.mentalService.createMentalTracker(formData).subscribe((result) => {
      console.log(result);
      this.presentAlert('Mood tracker was created successfully');
      this.mentalForm.reset();
      this.router.navigate(['/tabs/tab2']);
    });
  }
  updateMentalTracker() {
    const formData = this.mentalForm.value;
    this.mentalService
      .updateMentalTracker(this.editMentalTrackerId, formData)
      .subscribe((result) => {
        console.log(result);
        this.presentAlert('Mood tarcker was updated successfully');
        this.router.navigate(['/tabs/tab2']);
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
