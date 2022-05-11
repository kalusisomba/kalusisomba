import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse, LoginResponseData } from './model/login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/Guards/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginMsg: any;
  invalidLogin = false;
  isLoginFailed = false;
  errorMessage = 'wrong log in details';
  private apiURL = environment.apiUrl;
  loginForm: any;

  // loginForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  constructor(private auth: AuthService, private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, private toastr: ToastrService) {
    //validate form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit(): void {

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
    }

  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const credentials = JSON.stringify(this.loginForm.value);
      console.warn(credentials);
      this.http.post(this.apiURL + '/accounts/login', credentials
        //  {
        //   // headers: new HttpHeaders({
        //   //   "Content-Type": "application/json",
        //   //   'Access-Control-Allow-Credentials': 'true',
        //   //   'Access-Control-Allow-Origin': '*',
        //   // })
        // }
      ).subscribe(
        (response) => {

          const ApiResponse: any = (<LoginResponse>response).data;
          this.loginMsg = (<LoginResponse>response).response;

          // Get token from apiResponse object
          const token = (<LoginResponseData>ApiResponse).jwtToken;

          //Store token in local storage
          localStorage.setItem("jwt", token);

          console.warn(token);
          this.invalidLogin = false;

          // Toast
          this.toastr.success("User logged in successfully!", this.loginMsg);
          this.router.navigate(['/home']);

        }
        
      );
    }
  }
}
