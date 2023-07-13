import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from 'src/app/shared/models/user/User';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  marginContent = 32;
  isMobile: boolean;
  user?: User | null;
  constructor(
    private  breakpointObserver:BreakpointObserver,
    private cdref: ChangeDetectorRef,
    private authSvc: AuthService,
    private router: Router
  ) {
      this.authSvc.user.subscribe(x => this.user = x)
  }

  ngOnInit() {
    this.user = this.authSvc.userValue;
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe(result => {
      this.isMobile = result.matches;
      if (result.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close().then();
        this.marginContent = 16;
      }else {
        this.sidenav.open().then();
        this.sidenav.mode = 'side'
        this.marginContent = 32
      }
    })
    this.cdref.detectChanges();
  }

  refresh(){
    this.authSvc.refreshToken().subscribe({
      next: value => {
        console.log(value)
      },
      error: err => {
        const {error} = err
        console.log(error.message)
        console.log(err.status)
      }
    })
  }

  logout(){
    this.authSvc.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.authSvc.userValue = null
        this.router.navigateByUrl('')
      },
      error: err => {
        const {error} = err
        console.log(error.message)
      }
    })
  }
}
