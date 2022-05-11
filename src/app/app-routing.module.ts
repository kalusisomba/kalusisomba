import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/Guards/auth.guard';
import { TrainingDataService } from './core/services/trainingData.service';
import { AddsearchkeywordComponent } from './Modules/modelTraining/addsearchkeyword/addsearchkeyword.component';
import { AddtrainingDataComponent } from './Modules/modelTraining/addtraining-data/addtraining-data.component';
import { ModeltrainingModule } from './Modules/modelTraining/modeltraining.module';
import { TrainingDataComponent } from './Modules/modelTraining/training-data/training-data.component';
import { AdminDashboardComponent } from './Shared/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Lazyloading admin module
  {
    path: 'home', component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      // {
      //   path: 'schools',
      //   loadChildren: () => import('./Modules/General/schools/schools.module').then(m => m.SchoolsModule)
      // },
      {
      path: 'TrainingData', data:{ preload: true}, loadChildren: () => import('./Modules/modelTraining/modeltraining.module').then(m => m.ModeltrainingModule)
      },
      

    ]
  },

  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot
    (routes, 
      {
        // preloading lazyloaded modules
        preloadingStrategy: TrainingDataService
      },
      // {enableTracing: true},
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
