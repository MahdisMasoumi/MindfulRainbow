import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'welcome-page',
    loadComponent: () =>
      import('./pages/welcome-page/welcome-page.page').then(
        (m) => m.WelcomePagePage
      ),
  },
  {
    path: 'tab3',
    loadComponent: () => import('./tab3/tab3.page').then((m) => m.Tab3Page),
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then((m) => m.Tab4Page),
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then((m) => m.Tab5Page),
  },
];
