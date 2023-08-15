import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from 'src/app/shared/models/user/User';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from "./shared/services/snackbar/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit{
  isMenuClosed: boolean = true;
  isMobile: boolean;
  user?: User | null;
  isLogged: boolean;
  constructor(
    private  breakpointObserver:BreakpointObserver,
    private cdref: ChangeDetectorRef,
    private authSvc: AuthService,
    private router: Router,
    private notificationSvc: NotificationService
  ) {
    this.user = this.authSvc.userValue;
    this.authSvc.validateToken().subscribe({
      next: value => {
        if (value){
          this.authSvc.user.subscribe(x => this.user = x)
          this.isLogged = this.user ? true : false;
        }
      },
      error: error => {
        this.router.navigateByUrl('/auth/login')
      }
    })
  }

  closeMenu(isMenuClosed: any){
    this.isMenuClosed = isMenuClosed
    document.body.style.overflow = this.isMenuClosed ? 'visible' : 'hidden';
  }

  isUserIsLogged(isLogged: any){
    this.isLogged = isLogged;
  }



  ngAfterViewInit() {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => {
      this.isMobile = result.matches;
      if (result.matches){
        this.isMenuClosed = true;
      }
    })
    this.cdref.detectChanges();
  }

}
