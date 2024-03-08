import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },

      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: 'tab5',
        loadComponent: () =>
          import('../tab5/tab5.page').then((m) => m.Tab5Page),
      },

      {
        path: 'register',
        loadComponent: () =>
          import('../components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'create-form',
        loadComponent: () =>
          import(
            '../components/create-mental-form/create-mental-form.component'
          ).then((m) => m.CreateMentalFormComponent),
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit-form/:moodTrackingId',
        loadComponent: () =>
          import(
            '../components/create-mental-form/create-mental-form.component'
          ).then((m) => m.CreateMentalFormComponent),
      },
      {
        path: 'create-rainbowRays',
        loadComponent: () =>
          import(
            '../components/rainbow-rays-form/rainbow-rays-form.component'
          ).then((m) => m.RainbowRaysFormComponent),
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit-rainbowRay/:rainbowRayId',
        loadComponent: () =>
          import(
            '../components/rainbow-rays-form/rainbow-rays-form.component'
          ).then((m) => m.RainbowRaysFormComponent),
      },
      {
        path: 'create-goals',
        loadComponent: () =>
          import('../components/goals-form/goals-form.component').then(
            (m) => m.GoalsFormComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'goals-form/:goalId',
        loadComponent: () =>
          import('../components/goals-form/goals-form.component').then(
            (m) => m.GoalsFormComponent
          ),
      },
      {
        path: 'create-therapy',
        loadComponent: () =>
          import('../components/therapy-form/therapy-form.component').then(
            (m) => m.TherapyFormComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'therapy-form/:therapyId',
        loadComponent: () =>
          import('../components/therapy-form/therapy-form.component').then(
            (m) => m.TherapyFormComponent
          ),
      },
      {
        path: 'welcome-page',
        loadComponent: () =>
          import('../pages/welcome-page/welcome-page.page').then(
            (m) => m.WelcomePagePage
          ),
      },
      {
        path: '',
        redirectTo: '/welcome-page',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/welcome-page',
    pathMatch: 'full',
  },
];
