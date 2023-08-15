import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true

  constructor(
    private fb: FormBuilder
  ) {
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }

  updatePassword(){

  }
}
