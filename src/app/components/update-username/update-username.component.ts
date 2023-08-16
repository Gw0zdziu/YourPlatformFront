import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateUsername} from "../../shared/models/user/UpdateUsername";
import {User} from "../../shared/models/user/User";
import {UserService} from "../../shared/services/http/user/user.service";
import {AuthService} from "../../shared/services/http/auth/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/snackbar/notification.service";

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.css']
})
export class UpdateUsernameComponent {
  updateUsernameForm: FormGroup;
  @Input()user: User | null
  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router,
    private notificationSvc: NotificationService,
  ) {
    this.updateUsernameForm = this.fb.group({
      username: ['', Validators.required],
    })
  }

  updateUsername(){
    const updateUsername: UpdateUsername = {
      userId: this.user?.userId,
      username: this.updateUsernameForm.get('username')?.value
    }
    this.userSvc.updateUsername(updateUsername).subscribe({
      next: () => {
        this.authSvc.logout();
        this.router.navigate(['auth','login'])
      },
      error: err => {
        this.notificationSvc.openNotification(err);
      }
    })
  }
}
