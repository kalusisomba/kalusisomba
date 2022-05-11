import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSearchKeywordService } from 'src/app/core/services/addSearchKeyword.service';

@Component({
  selector: 'app-addsearchkeyword',
  templateUrl: './addsearchkeyword.component.html',
  styleUrls: ['./addsearchkeyword.component.scss']
})
export class AddsearchkeywordComponent implements OnInit {

  createForm;

  constructor(
    public searchkeywordService: AddSearchKeywordService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.createForm = this.formBuilder.group({
      searchKeyword: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    this.searchkeywordService.createAddSearchKeyword(formData.value).subscribe(_res => {
      this.router.navigateByUrl('classes/list');
    });
  }

}
