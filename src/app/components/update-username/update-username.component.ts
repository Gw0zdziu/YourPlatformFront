import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateUsername} from "../../shared/models/user/UpdateUsername";
import {User} from "../../shared/models/user/User";
import {UserService} from "../../shared/services/http/user/user.service";

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
      next: value => {
        const newUsername = updateUsername.username
        console.log(this.user)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
