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
  IonImg,
  IonFooter,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TherapyService } from 'src/app/services/therapy.service';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';

@Component({
  selector: 'app-therapy-form',
  templateUrl: './therapy-form.component.html',
  styleUrls: ['./therapy-form.component.scss'],
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
    IonImg,
    IonFooter,
  ],
})
export class TherapyFormComponent implements OnInit {
  therapyForm!: FormGroup;
  isEditMode: boolean = false;
  editTherapyId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private therapyService: TherapyService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.therapyForm = this.formBuilder.group({
      emotion_after: ['', Validators.required],
      emotion_before: ['', Validators.required],
      reminder: ['', Validators.required],
      summary: ['', Validators.required],
      date: ['', Validators.required],
    });
    const therapyId = this.route.snapshot.paramMap.get('therapyId');
    if (therapyId) {
      this.isEditMode = true;
      this.editTherapyId = parseInt(therapyId);
      this.therapyService.getTherapy(this.editTherapyId).subscribe((result) => {
        this.therapyForm.patchValue(result);
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateTherapy();
    } else {
      this.createTherapy();
    }
  }
  createTherapy() {
    const formData = this.therapyForm.value;
    this.therapyService.createTherapy(formData).subscribe((result) => {
      console.log(result);
      this.presentAlert('Therapy tracker was created successfully');
      this.therapyForm.reset();
      this.router.navigate(['/tabs/tab2']);
    });
  }
  updateTherapy() {
    const formData = this.therapyForm.value;
    this.therapyService
      .updateTherapy(this.editTherapyId, formData)
      .subscribe((result) => {
        console.log(result);
        this.presentAlert('Therapy tarcker was updated successfully');
        this.router.navigate(['/tabs/tab5']);
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
