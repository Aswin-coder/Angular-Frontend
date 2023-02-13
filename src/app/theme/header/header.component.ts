import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import screenfull from 'screenfull';
import { Router } from '@angular/router';
import { AuthService, User } from '@core/authentication';
import { Tutorial,Current } from '../../models/tutorial.model';
import { TutorialService } from '../../shared copy/tutorial.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  host: {
    class: 'matero-header',
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {




  tutorialsCurrent!: Tutorial[];
  currentTutorial?: Tutorial = {};
  showAdmin:boolean=true;
  public dateTime?:any
  public hh?:any
  public mm?:any
  public ss?:any
  public day?:any
  public date?:any
  public month?:any
  public year?:any
  public ampm?:any
  public dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
  public montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")

  user!: User;
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  constructor(private router: Router,private auth: AuthService,private tutorialService: TutorialService){}
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
    this.retrieveTutorialsCurrent();
    this.renderTime();

  }
  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }


  renderTime()
  {
    const date=new Date();
    this.year=date.getFullYear();
    this.day=date.getDay();
    this.month=date.getMonth();
    this.date=date.getDate();
    this.hh=date.getHours();
    this.mm=date.getMinutes();
    if(this.mm<10)
    this.mm="0"+this.mm;
    this.ss=date.getSeconds();
    if(this.ss<10)
    this.ss="0"+this.ss;
    if(this.hh>12){
    this.hh-=12
    this.ampm="PM"
    }
    else
    {
      this.ampm="AM"
    }
  }

  retrieveTutorialsCurrent(): void {
    console.log(this.tutorialsCurrent);
    this.tutorialService.getAllCurrent()
      .subscribe({
        next: (data) => {
          this.tutorialsCurrent = data;
          console.log(data);
          this.showAdmin=true
        },
        error: (e) => console.error(e)
      });
      console.log(this.tutorialsCurrent)
  }


}
