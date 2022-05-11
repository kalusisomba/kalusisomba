import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainingData } from 'src/app/core/models/trainingData';
import { TrainingDataService } from 'src/app/core/services/trainingData.service';

@Component({
  selector: 'app-training-data',
  templateUrl: './training-data.component.html',
  styleUrls: ['./training-data.component.scss']
})
export class TrainingDataComponent implements OnInit {
  submitForm;
  form: FormGroup;
  Data: TrainingData[];
  trainingDatas: TrainingData[] = [];
  trainingData: boolean;

  constructor(
    public trainingDataService: TrainingDataService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      trainingData: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

    this.trainingDataService.getTrainingDatas().subscribe(data => {
      this.trainingDatas = data.data;
      console.log(data.response);
      console.log(this.trainingDatas);
    });
  }

  CheckAllOptions() {
    if (this.trainingDatas.every(val => val.is_positive == true))
      this.trainingDatas.forEach(val => { val.is_positive = false });
    else
      this.trainingDatas.forEach(val => { val.is_positive = true
      });

    // console.log(this.trainingDatas)
  }    

  deleteTrainingData(id) {
    if (confirm("Are you sure to delete ")) {
      this.trainingDataService.deleteTrainingData(id).subscribe(res => {
        this.trainingDatas = this.trainingDatas.filter(item => item.comment_id !== id);
        this.toastr.warning("Data deleted successfully!", "Success");
      });
    }
  }

  onSubmit(formData) {
    // this.trainingDataService.createTrainingData(formData.value).subscribe(_res => {

    // });
    console.log(this.form.value);
  }

  save() {
    this.trainingDataService.createTrainingData(this.trainingDatas).subscribe(_res => {
        this.toastr.success("Data submitted successfully!", "Success");
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    })
    // console.log(this.trainingDatas);
  }

}
