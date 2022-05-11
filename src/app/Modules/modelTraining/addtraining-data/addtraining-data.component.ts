import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTrainingDataService } from 'src/app/core/services/addTrainingData.service';

@Component({
  selector: 'app-addtraining-data',
  templateUrl: './addtraining-data.component.html',
  styleUrls: ['./addtraining-data.component.scss']
})
export class AddtrainingDataComponent implements OnInit {

  createForm;

  constructor(
    public addTrainingDataService: AddTrainingDataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.createForm = this.formBuilder.group({
      comment: ['', Validators.required],
      is_positive: [''],

    });
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    this.addTrainingDataService.createAddTrainingData(formData.value).subscribe(_res => {
      // this.router.navigateByUrl('classes/list');
    });
  }

}
