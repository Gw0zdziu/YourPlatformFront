import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdatePassword} from "../../shared/models/user/UpdatePassword";
import {UserService} from "../../shared/services/http/user/user.service";
import {AuthService} from "../../shared/services/http/auth/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/snackbar/notification.service";
import {User} from "../../shared/models/user/User";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true
  @Input()user: User | null

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router,
    private notificationSvc: NotificationService,
  ) {
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }

  updatePassword(){
    const updatePassword: UpdatePassword = {
      userId: this.user?.userId,
      oldPassword: this.updatePasswordForm.get('oldPassword')?.value,
      newPassword: this.updatePasswordForm.get('newPassword')?.value
    }
    this.userSvc.updatePassword(updatePassword).subscribe({
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
