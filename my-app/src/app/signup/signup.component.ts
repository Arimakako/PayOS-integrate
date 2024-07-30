import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  alertMessage: string = ''; // Property to store alert message

  constructor(private http: HttpClient) {}

  // Kiểm tra tính hợp lệ của email
  isValidEmail(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  // Kiểm tra xem mật khẩu có khớp nhau không
  isPasswordValid(): boolean {
    return this.password === this.confirmPassword;
  }
  showModal: boolean = false;
  register() {
    if (!this.isPasswordValid()) {
      this.showAlert('Passwords do not match!');
      return;
    }
  
    if (!this.isValidEmail(this.email)) {
      this.showAlert('Invalid email format');
      return;
    }
  
    let bodyData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    };
  
    this.http.post('http://localhost:9992/user/create', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          this.showAlert('User Registered Successfully');
        },
        (error: any) => {
          console.log(error);
          // Xử lý dựa trên mã lỗi hoặc thông điệp lỗi từ phía server
          if (error.status === 400 && error.error.message === 'Email already exists') {
            this.showAlert('Email already exists');
          } else {
            this.showAlert('Error registering user');
          }
        }
      );
  }
  
  showAlert(message: string) {
    this.alertMessage = message;
    this.showModal = true; // Show the modal by setting this to true
  }
  closeModal() {
    this.showModal = false; // Hide the modal
  }
}
