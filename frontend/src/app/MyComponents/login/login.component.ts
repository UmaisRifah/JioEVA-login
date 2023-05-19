import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onRememberMeChange(event: any) {
    const rememberMe = event.checked;
    this.loginForm.get('rememberMe')?.setValue(rememberMe);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const rememberMe = this.loginForm.value.rememberMe;

      const credentials = {
        email: email,
        password: password,
        rememberMe: rememberMe
      };

      this.http.post('http://localhost:3000/api/login', credentials)
        .pipe(
          catchError(error => {
            console.error('Login failed');
            console.error(error);
            // Handle the error
            throw error; // Rethrow the error to propagate it
          })
        )
        .subscribe((response: any) => {
          console.log('Login successful');
          console.log(response);
          if (response.redirectUrl) {
            window.location.href = response.redirectUrl;
          }
          // Handle the response from the backend
          // You can perform further actions based on the response, such as redirecting to a different page
        });

      // Reset the form
      this.loginForm.reset();
    }
  }
}
