import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/http/auth/auth.service";
import {User} from "../../shared/models/user/User";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  user: User | null;
  constructor(
    private authSvc: AuthService
  ) {
    this.user = this.authSvc.userValue
  }

}
