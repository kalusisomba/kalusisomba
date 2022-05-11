import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsearchkeywordComponent } from './addsearchkeyword/addsearchkeyword.component';
import { AddtrainingDataComponent } from './addtraining-data/addtraining-data.component';
import { TrainingDataComponent } from './training-data/training-data.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'prepareTrainingData', pathMatch: 'full' },
      { path: 'prepareTrainingData', component: TrainingDataComponent },
      { path: 'addTrainingData', component: AddtrainingDataComponent },
      { path: 'addSearchKeyword', component: AddsearchkeywordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeltrainingRoutingModule { }
