import { Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
    {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'supervisor', component: SupervisorComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'relatorios', component: RelatoriosComponent }
    ]
  }
];