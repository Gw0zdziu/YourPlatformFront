import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {SignIn} from 'src/app/shared/models/http/auth/SignIn';
import {first} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    const credentials = this.loginForm.value as SignIn;
    this.authSvc.signIn(credentials)
      .pipe(first())
      .subscribe({
        next: x => {
          this.router.navigate([''])
          console.log(x);
        },
        error: err => console.log(err),
      })
  }

}
