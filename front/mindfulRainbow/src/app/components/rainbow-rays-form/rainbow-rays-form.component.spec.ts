import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RainbowRaysFormComponent } from './rainbow-rays-form.component';

describe('RainbowRaysFormComponent', () => {
  let component: RainbowRaysFormComponent;
  let fixture: ComponentFixture<RainbowRaysFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RainbowRaysFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RainbowRaysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
