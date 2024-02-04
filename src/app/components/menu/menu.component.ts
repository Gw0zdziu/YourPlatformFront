import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/services/snackbar/notification.service";
import {AuthService} from "../../shared/services/http/auth/auth.service";
import {User} from "../../shared/models/user/User";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @Output()
  isMenuClosedEmitter = new EventEmitter<boolean>()

  @Input()
  isMenuClosed: boolean

  @Input()
  isMobile: boolean

  user: User | null
  constructor(
    private router: Router,
    private notificationSvc: NotificationService,
    private authSvc: AuthService
  ) {
  }

  ngOnInit() {
    this.authSvc.user.subscribe(x => this.user = x)
  }

  closeMenu(){
    this.isMenuClosed = !this.isMenuClosed;
    this.isMenuClosedEmitter.emit(this.isMenuClosed)
  }

  logout(){
    this.authSvc.logout().subscribe({
      next: () => {
        this.router.navigate(['auth','login'])
        this.notificationSvc.openNotification('Pomyślnie wylogowano')
      },
      error: err => {
        this.notificationSvc.openNotification(err)
      }
    })
  }
}
