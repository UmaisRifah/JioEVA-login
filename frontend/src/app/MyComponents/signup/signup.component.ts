import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
    // Handle form submission logic here
        if (this.signupForm.valid) {
      const name = this.signupForm.value.name;
      const number = this.signupForm.value.number;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const repassword = this.signupForm.value.repassword;

      console.log('Name:', name);
      console.log('Phone Number:', number);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Re-written Password:',repassword);
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