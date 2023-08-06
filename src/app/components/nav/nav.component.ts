import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from "../../shared/services/snackbar/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/http/auth/auth.service";
import {User} from "../../shared/models/user/User";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  @Input()
  isMenuClosed: boolean;

  @Input()
  isLogged: boolean;

  @Input()
  isMobile: boolean;

  @Output()
  isMenuClosedEmitter = new EventEmitter<boolean>();

  @Output()
  isLoggedEmitter = new EventEmitter<boolean>()

  user: User | null;

  constructor(
    private notificationSvc: NotificationService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.authSvc.user.subscribe(x => this.user = x)
    this.isLogged = this.user ? true : false;
  }

  ngOnInit() {
    this.user = this.authSvc.userValue;
  }
  closeMenu(){
    this.isMenuClosed = !this.isMenuClosed;
    this.isMenuClosedEmitter.emit(this.isMenuClosed)
  }

  logout(){
    this.authSvc.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('')
        this.notificationSvc.openNotification('Pomyślnie wylogowano')
        this.isLogged = !this.isLogged;
      },
      error: err => {
        this.notificationSvc.openNotification(err.error.message)
      }
    })
  }
}
