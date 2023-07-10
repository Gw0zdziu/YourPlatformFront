import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      userEmail: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
}
