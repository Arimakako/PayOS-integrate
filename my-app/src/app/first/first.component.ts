import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Property to store success message

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:9992/user/login", bodyData)
      .pipe(
        catchError((error) => {
          this.errorMessage = "An error occurred during login.";
          // Handle additional error processing here if needed
          return throwError(error);
        })
      )
      .subscribe((resultData: any) => {
        if (resultData.status) {
          // Set success message and navigate to a different route on successful login
          this.successMessage = "Login Successful!";
          this.router.navigateByUrl(''); // Update with your successful login route
        } else {
          this.errorMessage = "Incorrect Email or Password";
        }
      });
  }
}

