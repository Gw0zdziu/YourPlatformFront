import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {SingUp} from 'src/app/shared/models/http/auth/SingUp';
import {first} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      userEmail: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get controls(){
    return this.registerForm.controls;
  }

  onSubmit(){
    const newUser = this.registerForm.value as SingUp;
    this.authSvc.signUp(newUser)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: err => console.log(err),
      })
  }
}
