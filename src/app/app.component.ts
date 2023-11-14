import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from 'src/app/shared/models/user/User';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from "./shared/services/snackbar/notification.service";
import {LoaderService} from "./shared/services/loader/loader.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit{
  isMenuClosed: boolean = true;
  isMobile: boolean;
  user?: User | null;
  isLogged: boolean;
  constructor(
    private  breakpointObserver:BreakpointObserver,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.user = this.authSvc.userValue;
    this.authSvc.validateToken().subscribe({
      next: value => {
        if (value){
          this.authSvc.user.subscribe(x => this.user = x)
          this.isLogged = !!this.user
        }
      },
      error: error => {
        this.router.navigate(['auth','login'])
      }
    })
  }

  ngOnInit() {
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

  closeMenu(isMenuClosed: any){
    this.isMenuClosed = isMenuClosed
    document.body.style.overflow = this.isMenuClosed ? 'visible' : 'hidden';
  }

}
