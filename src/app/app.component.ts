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
export class AppComponent implements /*AfterViewInit, */OnInit{
  isMenuOpen: boolean = false
 /* @ViewChild('sidenav') sidenav!: MatSidenav;*/
  marginContent = 32;
  isMobile: boolean;
  user?: User | null;
  constructor(
    private  breakpointObserver:BreakpointObserver,
    private cdref: ChangeDetectorRef,
    private authSvc: AuthService,
    private router: Router,
    private notificationSvc: NotificationService
  ) {
      this.authSvc.user.subscribe(x => this.user = x)
  }

  ngOnInit() {
    this.user = this.authSvc.userValue;
  }

  closeMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe(result => {
      this.isMobile = result.matches;
      if (result.matches){
        /*this.sidenav.mode = 'over';
        this.sidenav.close().then();
        this.marginContent = 16;*/
      }else {
        /*this.sidenav.open().then();
        this.sidenav.mode = 'side'
        this.marginContent = 32*/
      }
    })
    this.cdref.detectChanges();
  }

  logout(){
    this.authSvc.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('')
        this.notificationSvc.openNotification('Pomyślnie wylogowano')

      },
      error: err => {
        this.notificationSvc.openNotification(err.error.message)
      }
    })
  }
}
