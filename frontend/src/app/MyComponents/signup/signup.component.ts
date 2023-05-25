import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  response: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', [Validators.required, this.passwordMatchValidator]]
    });
  }

  onSubmit() {
    console.log('Submitting signup form');


    if (this.signupForm.valid) {
      console.log('Form is valid');

      const name = this.signupForm.value.name;
      const number = this.signupForm.value.number;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const repassword = this.signupForm.value.repassword;
      


      const credentials = {
        name: name,
        number: number,
        email: email,
        password: password,
        repassword: repassword
      };

      console.log('Sending signup request');

      // Send the form data to the backend using HttpClient
      this.http.post('http://localhost:3000/api/signup', credentials)
        .pipe(
          catchError((error) => {
            console.error('Signup error:', error.error);
            console.log('Status code:', error.status);
            throw error;
          })
        )
        .subscribe((response: any) => {
          // Handle the success response from the backend
          console.log('Signup success:', response);
          this.response = response;
          
          // Perform any further actions, such as showing a success message, redirecting, etc.
        });

      // Reset the form
    } else {
      console.log('Form is invalid');
    }
  }

  passwordMatchValidator(control: FormControl) {
    const password = control.root.get('password');
    const repassword = control.value;

    if (password && repassword && password.value !== repassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
