import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeltrainingRoutingModule } from './modeltraining-routing.module';
import { TrainingDataComponent } from './training-data/training-data.component';
import { AddtrainingDataComponent } from './addtraining-data/addtraining-data.component';
import { AddsearchkeywordComponent } from './addsearchkeyword/addsearchkeyword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrainingDataComponent,
    AddtrainingDataComponent,
    AddsearchkeywordComponent
  ],
  imports: [
    CommonModule,
    ModeltrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModeltrainingModule { }
