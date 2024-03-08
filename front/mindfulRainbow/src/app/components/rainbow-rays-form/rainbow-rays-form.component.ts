import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonFooter,
  IonImg,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { RainbowRaysService } from 'src/app/services/rainbow-rays.service';

@Component({
  selector: 'app-rainbow-rays-form',
  templateUrl: './rainbow-rays-form.component.html',
  styleUrls: ['./rainbow-rays-form.component.scss'],
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
    IonLabel,
    IonFooter,
    IonImg,
  ],
})
export class RainbowRaysFormComponent {
  rainbowRaysForm: FormGroup;
  isEditModee: boolean = false;
  editRainbowRayId: number = 0;
  image!: File;

  constructor(
    private formBuilder: FormBuilder,
    private rainbowRaysService: RainbowRaysService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {
    this.rainbowRaysForm = this.formBuilder.group({
      date: ['', Validators.required],
      days: ['', Validators.required],
      images: ['', Validators.required],
      notes: ['', Validators.required],
    });
    const rainId = this.route.snapshot.paramMap.get('rainbowRayId');
    if (rainId) {
      this.isEditModee = true;
      this.editRainbowRayId = parseInt(rainId);
      this.rainbowRaysService
        .getRainbowRay(this.editRainbowRayId)
        .subscribe((result) => {
          this.rainbowRaysForm.patchValue(result);
        });
    }
  }
  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    if (this.isEditModee) {
      this.updateRainbowRay();
    } else {
      this.createRainbowRay();
    }
  }
  createRainbowRay() {
    let formData = new FormData();
    if (this.image) {
      formData.append('image', this.image);
    }
    for (let key in this.rainbowRaysForm.value) {
      formData.append(key, this.rainbowRaysForm.value[key]);
    }

    this.rainbowRaysService.createRainbowRay(formData).subscribe((result) => {
      console.log(result);
      this.presentAlert('rainbow rays was created successfully');
      this.rainbowRaysForm.reset();
      this.router.navigate(['/tabs/tab3']);
    });
  }
  updateRainbowRay() {
    let formData = new FormData();
    // const formData = this.rainbowRaysForm.value;
    if (this.image) {
      formData.append('image', this.image);
    }
    for (let key in this.rainbowRaysForm.value) {
      formData.append(key, this.rainbowRaysForm.value[key]);
    }
    this.rainbowRaysService
      .updateRainbowRay(this.editRainbowRayId, formData)
      .subscribe((result) => {
        console.log(result);
        this.presentAlert('mental was updated successfully');
        this.router.navigate(['/tabs/tab3']);
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
