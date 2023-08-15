import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {SignIn} from 'src/app/shared/models/http/auth/SignIn';
import {first} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from "../../../shared/services/snackbar/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: NotificationService
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
      .subscribe({
        next: () => {
          this.router.navigate(['category','list'])
        },
        error: err => {
          this.snackbarService.openNotification(err)
        }
      })
  }

}
