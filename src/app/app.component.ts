import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'YourPlatformFront';
  menuButtonIsVisible = false;
  backdropSideNav  = false;
  marginContent = 16;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  constructor(
    private  breakpointObserver:BreakpointObserver,
    private cdref: ChangeDetectorRef
  ) {}


  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.Small]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Large]){
        this.menuButtonIsVisible = false;
        this.sidenav.mode = 'side'
        this.sidenav.open().then();
        this.marginContent = 32;
      }
      if (result.breakpoints[Breakpoints.Small]){
        this.menuButtonIsVisible = true;
        this.sidenav.mode = 'over';
        this.sidenav.close().then();
        this.marginContent = 16;
      }
    })
    this.cdref.detectChanges();
  }
}
